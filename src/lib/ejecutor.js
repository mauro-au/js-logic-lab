import { extraerSoluciones, resaltar } from './codigo.js';

const ICONOS = { ok: '✅', fallo: '❌', error: '💥', pendiente: '⏳' };
const NIVELES = ['log', 'info', 'warn', 'error'];
const PREFIJO_SOLO = 'solo_';
const MAX_LOG_USUARIO = 400;

const escapar = (valor) =>
  String(valor ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

function mostrar(v) {
  if (typeof v === 'bigint') return `${v}n`;
  if (Array.isArray(v)) return `[${v.map(mostrar).join(', ')}]`;
  if (typeof v === 'string') return JSON.stringify(v);
  if (v && typeof v === 'object') {
    try { return JSON.stringify(v); } catch { return String(v); }
  }
  return String(v);
}

function resumir(v, max = 60) {
  if (Array.isArray(v) && mostrar(v).length > max) {
    const cabeza = [];
    let largo = 0;
    for (const item of v) {
      const t = mostrar(item);
      if (largo + t.length > max - 12) break;
      cabeza.push(t);
      largo += t.length + 2;
    }
    const resto = v.length - cabeza.length;
    return `Array(${v.length}) [${cabeza.join(', ')}${resto > 0 ? ', …' : ''}]`;
  }
  const t = mostrar(v);
  return t.length > max ? `${t.slice(0, max - 1)}…` : t;
}

const entradaTexto = (entrada) => entrada.map(mostrar).join(', ');
const entradaCorta = (entrada) => entrada.map((a) => resumir(a, 30)).join(', ');

const formatearTiempo = (ms) =>
  ms == null ? '—' : ms < 1 ? `${(ms * 1000).toFixed(1)} µs` : `${ms.toFixed(2)} ms`;

/* ---------- Terminal estructurada: cada línea lleva origen y tipo ---------- */

function emitir(origen, nivel, texto, meta = null) {
  const previo = { origen: globalThis.__origenLog, meta: globalThis.__metaLog };
  globalThis.__origenLog = origen;
  globalThis.__metaLog = meta;
  try {
    console[nivel](texto);
  } finally {
    globalThis.__origenLog = previo.origen;
    globalThis.__metaLog = previo.meta;
  }
}
const sistema = (nivel, texto, meta) => emitir('sistema', nivel, texto, meta);

// Ejecuta una acción guardando (sin imprimir) los console.* que haga tu código
function conCaptura(accion) {
  const logs = [];
  const originales = {};
  for (const nivel of NIVELES) {
    originales[nivel] = console[nivel];
    console[nivel] = (...args) => logs.push({ nivel, args });
  }
  let valor;
  let error = null;
  try {
    valor = accion();
  } catch (e) {
    error = e;
  } finally {
    for (const nivel of NIVELES) console[nivel] = originales[nivel];
  }
  return { valor, error, logs };
}

const textoLog = (args) => {
  const t = args.map((a) => (typeof a === 'string' ? a : mostrar(a))).join(' ');
  return t.length > MAX_LOG_USUARIO ? `${t.slice(0, MAX_LOG_USUARIO)}… (+${t.length - MAX_LOG_USUARIO} car.)` : t;
};

function imprimirLogsUsuario(logs) {
  logs.forEach(({ nivel, args }) => emitir('usuario', nivel, textoLog(args), { tipo: 'log' }));
}

/* ---------- Evaluación (una vez, con logs) ---------- */

function evaluar(fn, caso) {
  const { valor, error, logs } = conCaptura(() => fn(...caso.entrada));

  if (error) {
    return { estado: 'error', texto: `Error: ${error?.message ?? error}`, valor: undefined, logs };
  }
  if (valor === undefined || valor === null) {
    return { estado: 'pendiente', texto: '—', valor: undefined, logs };
  }
  const ok = mostrar(valor) === mostrar(caso.esperado);
  return { estado: ok ? 'ok' : 'fallo', texto: mostrar(valor), valor, logs };
}

/* ---------- Benchmark: promedio de muchas repeticiones ---------- */

let sumidero; // evita que el motor descarte llamadas "inútiles"

function medir(fn, casos) {
  let promedio = null;

  conCaptura(() => {
    const correr = () => {
      for (const c of casos) sumidero = fn(...c.entrada);
    };

    const t = performance.now();
    correr();
    const primera = performance.now() - t;

    if (primera > 20) {
      promedio = primera;
      return;
    }

    for (let i = 0; i < 10; i++) correr();

    let n = 0;
    const inicio = performance.now();
    let ahora = inicio;
    while (ahora - inicio < 40 && n < 5000) {
      for (let k = 0; k < 20; k++) correr();
      n += 20;
      ahora = performance.now();
    }
    promedio = (ahora - inicio) / n;
  });

  return promedio;
}

/**
 * Crea la función ejecutar() de un ejercicio.
 * @param {object}   config
 * @param {object}   config.soluciones  import * as soluciones from './soluciones.js'
 * @param {Array}    config.casos       [{ entrada: [args], esperado }]
 * @param {Function} [config.demo]      (solucion) => resultado a mostrar (opcional)
 */
export function crearEjecutor({ soluciones, casos, demo }) {
  return function ejecutar(opciones = {}) {
    const { solo = null, colapsadas = [], codigoAbierto = [], codigo = '' } = opciones ?? {};
    const funcionesFuente = extraerSoluciones(codigo);

    const todas = Object.entries(soluciones).filter(([, f]) => typeof f === 'function');

    if (!todas.length) {
      sistema('warn', 'No hay soluciones. Exporta una función en soluciones.js', { tipo: 'info' });
      return '<p class="sol-vacio">⚠️ No hay soluciones. Exporta una función en <code>soluciones.js</code>.</p>';
    }

    /* ---------- Filtro: prefijo "solo_" o selección manual ---------- */
    const conPrefijo = todas.filter(([n]) => n.startsWith(PREFIJO_SOLO));
    let lista = todas;
    let filtro = null;
    if (conPrefijo.length) {
      lista = conPrefijo;
      filtro = 'prefijo';
    } else if (solo && todas.some(([n]) => n === solo)) {
      lista = todas.filter(([n]) => n === solo);
      filtro = 'manual';
    }

    /* ---------- 1) Evaluar y medir (sin imprimir nada) ---------- */
    const datos = lista.map(([nombre, fn]) => {
      const resultados = casos.map((caso) => ({ caso, ...evaluar(fn, caso) }));
      const pasados = resultados.filter((r) => r.estado === 'ok').length;
      const pendientes = resultados.some((r) => r.estado === 'pendiente');
      const completa = pasados === casos.length;
      const promedio = completa ? medir(fn, casos) : null;
      return { nombre, fn, resultados, pasados, pendientes, promedio };
    });

    const medidos = datos.filter((d) => d.promedio != null);
    const mejor = medidos.length > 1 ? Math.min(...medidos.map((d) => d.promedio)) : null;

    /* ---------- 2) Terminal + HTML ---------- */
    if (filtro === 'prefijo') {
      sistema('info', `Filtrado por prefijo "${PREFIJO_SOLO}": ${lista.length} de ${todas.length} soluciones`, { tipo: 'info' });
    } else if (filtro === 'manual') {
      sistema('info', `Mostrando solo "${solo}": ${todas.length - 1} soluciones ocultas`, { tipo: 'info' });
    }

    const bloques = datos.map((d) => {
      const { nombre, fn, resultados, pasados, pendientes, promedio } = d;
      const claseEstado = pasados === casos.length ? 'ok' : pendientes ? 'pendiente' : 'fallo';

      const esMejor = mejor != null && promedio === mejor;
      const razon = mejor != null && promedio != null ? promedio / mejor : 1;
      const esLenta = mejor != null && !esMejor && razon >= 1.1;
      const nota = esMejor ? '🏆 más rápida' : esLenta ? `×${razon.toFixed(1)} más lenta` : '';

      /* ---------- TERMINAL ---------- */
      sistema(
        'log',
        `▸ ${nombre}  ${pasados}/${casos.length} · ${formatearTiempo(promedio)} ${nota}`.trim(),
        {
          tipo: 'solucion',
          nombre,
          aciertos: `${pasados}/${casos.length}`,
          tiempo: formatearTiempo(promedio),
          nota,
          estado: claseEstado,
          rendimiento: esMejor ? 'mejor' : esLenta ? 'lenta' : '',
        }
      );

      resultados.forEach(({ caso, estado, valor, texto, logs }) => {
        const llamada = `${nombre}(${entradaCorta(caso.entrada)})`;
        const nivel = estado === 'error' ? 'error' : estado === 'fallo' ? 'warn' : 'log';

        const resultado =
          estado === 'ok' ? resumir(valor)
          : estado === 'pendiente' ? 'pendiente'
          : estado === 'error' ? texto
          : '';

        sistema(nivel, `${ICONOS[estado]} ${llamada}${resultado ? ` → ${resultado}` : ''}`, {
          tipo: 'caso',
          estado,
          icono: ICONOS[estado],
          llamada,
          resultado,
        });

        if (estado === 'fallo') {
          sistema('warn', `esperado: ${resumir(caso.esperado, 120)}`, {
            tipo: 'detalle', etiqueta: 'esperado', valor: resumir(caso.esperado, 120),
          });
          sistema('warn', `obtenido: ${resumir(valor, 120)}`, {
            tipo: 'detalle', etiqueta: 'obtenido', valor: resumir(valor, 120),
          });
        }

        imprimirLogsUsuario(logs);
      });

      /* ---------- DEMO ---------- */
      let bloqueDemo = '';
      if (demo && !pendientes) {
        const r = conCaptura(() => demo(fn));
        if (r.error) {
          sistema('error', `Demo falló: ${r.error?.message ?? r.error}`, {
            tipo: 'caso', estado: 'error', icono: ICONOS.error, llamada: 'Demo', resultado: String(r.error?.message ?? r.error),
          });
          bloqueDemo = `<p class="sol-vacio">💥 Demo falló: ${escapar(r.error?.message ?? r.error)}</p>`;
        } else {
          sistema('log', `★ Demo → ${resumir(r.valor, 90)}`, {
            tipo: 'caso', estado: 'demo', icono: '★', llamada: 'Demo (reto principal)', resultado: resumir(r.valor, 90),
          });
          bloqueDemo = `
            <details class="sol-demo">
              <summary>Ver demo (reto principal)</summary>
              <pre>${escapar(mostrar(r.valor))}</pre>
            </details>`;
        }
        imprimirLogsUsuario(r.logs);
      }

      /* ---------- TABLA HTML ---------- */
      const filas = resultados
        .map(
          ({ caso, estado, texto }) => `
          <tr class="fila-${estado}">
            <td class="col-estado">${ICONOS[estado]}</td>
            <td><code>${escapar(entradaTexto(caso.entrada))}</code></td>
            <td><code>${escapar(mostrar(caso.esperado))}</code></td>
            <td><code>${escapar(texto)}</code></td>
          </tr>`
        )
        .join('');

      const insignia = esMejor
        ? '<span class="sol-badge rapida">🏆 más rápida</span>'
        : esLenta
          ? `<span class="sol-badge lenta">×${razon.toFixed(1)} más lenta</span>`
          : '';

      const botonSolo =
        filtro !== 'prefijo' && todas.length > 1
          ? `<button type="button" class="btn-solo" data-accion="solo" data-solucion="${escapar(nombre)}">${
              filtro === 'manual' ? 'Ver todas' : 'Solo esta'
            }</button>`
          : '';

      const abierta = !colapsadas.includes(nombre);

      const textoCodigo = funcionesFuente.get(nombre) ?? fn.toString();
      const bloqueCodigo = `
        <details class="sol-codigo" data-nombre="${escapar(nombre)}" ${codigoAbierto.includes(nombre) ? 'open' : ''}>
          <summary>Ver código</summary>
          <div class="codigo-caja">
            <button type="button" class="btn-copiar" data-accion="copiar">Copiar</button>
            <pre><code class="hljs">${resaltar(textoCodigo)}</code></pre>
          </div>
        </details>`;

      return `
        <details class="sol-bloque" data-nombre="${escapar(nombre)}" ${abierta ? 'open' : ''}>
          <summary class="sol-header">
            <span class="sol-chevron"></span>
            <h4 class="sol-nombre">${escapar(nombre)}</h4>
            <div class="sol-meta">
              ${insignia}
              <span class="sol-badge ${claseEstado}">${pasados}/${casos.length}</span>
              <span class="sol-tiempo" title="Promedio de ejecutar todos los casos">⏱ ${formatearTiempo(promedio)}</span>
              ${botonSolo}
            </div>
          </summary>
          <div class="sol-cuerpo">
            <div class="sol-tabla-wrap">
              <table class="sol-tabla">
                <thead>
                  <tr><th class="col-estado"></th><th>Entrada</th><th>Esperado</th><th>Obtenido</th></tr>
                </thead>
                <tbody>${filas}</tbody>
              </table>
            </div>
            ${bloqueDemo}
            ${bloqueCodigo}
          </div>
        </details>`;
    });

    const barra =
      filtro === 'prefijo'
        ? `<div class="sol-filtro">Filtrado por el prefijo <code>${PREFIJO_SOLO}</code>: ${lista.length} de ${todas.length} soluciones. Quita el prefijo para verlas todas.</div>`
        : filtro === 'manual'
          ? `<div class="sol-filtro">Mostrando solo <code>${escapar(solo)}</code> · ${todas.length - 1} ocultas</div>`
          : '';

    return barra + bloques.join('');
  };
}