import { extraerSoluciones } from './codigo.js';
import { resaltar } from './resaltado.js';

const ICONOS = { ok: '✅', fallo: '❌', error: '💥', pendiente: '⏳', libre: '▶' };
const NIVELES = ['log', 'info', 'debug', 'warn', 'error'];
const PREFIJO_SOLO = 'solo_';
const NOMBRE_USUARIO = 'TU CÓDIGO';
const MAX_LOG_TEXTO = 400;
const MAX_LOGS_CAPTURA = 500;
const MAX_LOGS_MOSTRADOS = 500;

const esObjeto = (valor) => valor !== null && typeof valor === 'object';

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

/* ---------- Copia profunda de entradas ---------- */

export function clonar(valor, vistos = new Map()) {
  if (!esObjeto(valor)) return valor;
  if (vistos.has(valor)) return vistos.get(valor);

  if (valor instanceof Date) return new Date(valor.getTime());
  if (valor instanceof RegExp) return new RegExp(valor.source, valor.flags);

  if (valor instanceof Map) {
    const copia = new Map();
    vistos.set(valor, copia);
    for (const [clave, item] of valor) {
      copia.set(clonar(clave, vistos), clonar(item, vistos));
    }
    return copia;
  }

  if (valor instanceof Set) {
    const copia = new Set();
    vistos.set(valor, copia);
    for (const item of valor) copia.add(clonar(item, vistos));
    return copia;
  }

  if (valor instanceof ArrayBuffer) return valor.slice(0);
  if (ArrayBuffer.isView(valor)) {
    if (valor instanceof DataView) {
      return new DataView(valor.buffer.slice(0), valor.byteOffset, valor.byteLength);
    }
    return valor.slice();
  }

  const copia = Array.isArray(valor) ? [] : Object.create(Object.getPrototypeOf(valor));
  vistos.set(valor, copia);

  for (const clave of Reflect.ownKeys(valor)) {
    const descriptor = Object.getOwnPropertyDescriptor(valor, clave);
    if (!descriptor?.enumerable) continue;
    copia[clave] = clonar(valor[clave], vistos);
  }

  return copia;
}

/* ---------- Igualdad profunda ---------- */

const clavesEnumerables = (objeto) =>
  Reflect.ownKeys(objeto).filter(
    (clave) => Object.getOwnPropertyDescriptor(objeto, clave)?.enumerable
  );

export function sonIguales(a, b, vistos = new Map()) {
  if (a === b) return true;
  if (typeof a === 'number' && typeof b === 'number') {
    if (Number.isNaN(a) && Number.isNaN(b)) return true;
  }
  if (!esObjeto(a) || !esObjeto(b)) return false;
  if (Object.getPrototypeOf(a) !== Object.getPrototypeOf(b)) return false;

  if (a instanceof Date) return a.getTime() === b.getTime();
  if (a instanceof RegExp) return a.source === b.source && a.flags === b.flags;

  // Referencias circulares: ya estamos comparando este mismo par en la ruta actual.
  if (vistos.get(a) === b) return true;
  vistos.set(a, b);

  try {
    if (a instanceof Map) {
      if (a.size !== b.size) return false;
      for (const [clave, valor] of a) {
        if (!b.has(clave) || !sonIguales(valor, b.get(clave), vistos)) return false;
      }
      return true;
    }

    if (a instanceof Set) {
      if (a.size !== b.size) return false;
      for (const valor of a) {
        let encontrado = false;
        for (const otro of b) {
          if (sonIguales(valor, otro, vistos)) {
            encontrado = true;
            break;
          }
        }
        if (!encontrado) return false;
      }
      return true;
    }

    if (a instanceof ArrayBuffer || ArrayBuffer.isView(a)) {
      const bytesA =
        a instanceof ArrayBuffer
          ? new Uint8Array(a)
          : new Uint8Array(a.buffer, a.byteOffset, a.byteLength);
      const bytesB =
        b instanceof ArrayBuffer
          ? new Uint8Array(b)
          : new Uint8Array(b.buffer, b.byteOffset, b.byteLength);
      if (bytesA.length !== bytesB.length) return false;
      return bytesA.every((byte, i) => byte === bytesB[i]);
    }

    const clavesA = clavesEnumerables(a);
    const clavesB = clavesEnumerables(b);
    if (clavesA.length !== clavesB.length) return false;

    for (const clave of clavesA) {
      if (!Object.prototype.propertyIsEnumerable.call(b, clave)) return false;
      if (!sonIguales(a[clave], b[clave], vistos)) return false;
    }

    return true;
  } finally {
    vistos.delete(a);
  }
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

const entradaCorta = (entrada) => entrada.map((a) => resumir(a, 30)).join(', ');

const formatearTiempo = (ms) =>
  ms == null ? '—' : ms < 1 ? `${(ms * 1000).toFixed(1)} µs` : `${ms.toFixed(2)} ms`;

const cuentaComoAcierto = (r) => r.estado === 'ok' || r.estado === 'libre';

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

function conCaptura(accion) {
  const logs = [];
  logs.omitidos = 0;

  const originales = {};
  for (const nivel of NIVELES) {
    originales[nivel] = console[nivel];
    console[nivel] = (...args) => {
      if (logs.length >= MAX_LOGS_CAPTURA) {
        logs.omitidos++;
        return;
      }
      logs.push({ nivel, args });
    };
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
  return t.length > MAX_LOG_TEXTO ? `${t.slice(0, MAX_LOG_TEXTO)}… (+${t.length - MAX_LOG_TEXTO} car.)` : t;
};

function imprimirLogsUsuario(logs, estado) {
  for (const { nivel, args } of logs) {
    if (estado.mostrados >= MAX_LOGS_MOSTRADOS) {
      estado.omitidos++;
      continue;
    }
    emitir('usuario', nivel, textoLog(args), { tipo: 'log' });
    estado.mostrados++;
  }
  estado.omitidos += logs.omitidos ?? 0;
}

/* ---------- Evaluación (una vez, con logs) ---------- */

function evaluar(fn, caso) {
  const entrada = caso.entrada.map((valor) => clonar(valor));
  const { valor, error, logs } = conCaptura(() => fn(...entrada));

  if (error) {
    return { estado: 'error', texto: `Error: ${error?.message ?? error}`, valor: undefined, logs };
  }

  // Modo libre: sin casos de prueba, solo se ejecuta y se muestra lo que ocurre
  if (caso.libre) {
    if (valor === undefined && !logs.length) {
      return { estado: 'pendiente', texto: '—', valor: undefined, logs };
    }
    return {
      estado: 'libre',
      texto: valor === undefined ? '(sin retorno)' : mostrar(valor),
      valor,
      logs,
    };
  }

  if (valor === undefined || valor === null) {
    return { estado: 'pendiente', texto: '—', valor: undefined, logs };
  }
  const ok = sonIguales(valor, caso.esperado);
  return { estado: ok ? 'ok' : 'fallo', texto: mostrar(valor), valor, logs };
}

/* ---------- Benchmark: promedio de muchas repeticiones ---------- */

let sumidero;

function medir(fn, casos) {
  let promedio = null;

  conCaptura(() => {
    const correr = () => {
      for (const c of casos) {
        sumidero = fn(...c.entrada.map((valor) => clonar(valor)));
      }
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
 * @param {Array}    [config.casos]     [{ entrada: [args], esperado }]. Vacío = modo libre
 * @param {Function} [config.demo]      (solucion) => resultado a mostrar (opcional)
 */
export function crearEjecutor({ soluciones = {}, casos: casosIniciales, demo }) {
  const listaCasos = Array.isArray(casosIniciales) ? casosIniciales : [];
  const casosValidos = listaCasos.filter(
    (caso) => esObjeto(caso) && Array.isArray(caso.entrada)
  );
  const descartados = listaCasos.length - casosValidos.length;
  const libre = casosValidos.length === 0;
  const casos = libre ? [{ entrada: [], libre: true }] : casosValidos;

  /**
   * Ejecuta todas las soluciones contra los casos y devuelve el HTML de resultados.
   * @param {object} [opciones]
   * @param {string|null} [opciones.solo]           muestra solo esa solución
   * @param {string[]} [opciones.colapsadas]        bloques plegados
   * @param {string[]} [opciones.codigoAbierto]     bloques de código abiertos
   * @param {string} [opciones.codigo]              fuente de soluciones.js (para mostrarla)
   * @param {{fuente?: string, soluciones?: Array<{nombre: string, fn: Function}>, error?: string|null}} [opciones.codigoUsuario]
   *                                               código escrito en el editor, compilado por compilarCodigoUsuario
   */
  return function ejecutar(opciones = {}) {
    const {
      solo = null,
      colapsadas = [],
      codigoAbierto = [],
      codigo = '',
      codigoUsuario = null,
    } = opciones ?? {};
    const funcionesFuente = extraerSoluciones(codigo);
    const fuentesUsuario = new Map();
    const estadoLogs = { mostrados: 0, omitidos: 0 };

    if (descartados > 0) {
      sistema('warn', `${descartados} caso(s) inválido(s) ignorado(s): falta "entrada" como array`, {
        tipo: 'info',
      });
    }

    const propias = Object.entries(soluciones).filter(([, f]) => typeof f === 'function');

    /* ---------- El código del usuario es una solución más: "TU CÓDIGO" ---------- */
    const escritas = Array.isArray(codigoUsuario?.soluciones)
      ? codigoUsuario.soluciones.filter((s) => s && typeof s.fn === 'function')
      : [];
    const nuestras = escritas.length
      ? escritas.length === 1
        ? [[NOMBRE_USUARIO, escritas[0].fn]]
        : escritas.map(({ nombre, fn }) => [`${NOMBRE_USUARIO} · ${nombre || 'anónima'}`, fn])
      : [];
    for (const [nombre] of nuestras) {
      if (codigoUsuario?.fuente) fuentesUsuario.set(nombre, codigoUsuario.fuente);
    }

    const todas = [...nuestras, ...propias];

    if (codigoUsuario?.error) {
      sistema('warn', `Editor: ${codigoUsuario.error}`, { tipo: 'info' });
    }

    if (!todas.length) {
      const aviso = 'No hay soluciones. Escribe la tuya en el editor o exporta una función en soluciones.js';
      sistema('warn', aviso, { tipo: 'info' });
      return '<p class="sol-vacio">⚠️ No hay soluciones. Escribe la tuya en el editor o exporta una función en <code>soluciones.js</code>.</p>';
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
      const t0 = performance.now();
      const resultados = casos.map((caso) => ({ caso, ...evaluar(fn, caso) }));
      const unaVez = performance.now() - t0;
      const pasados = resultados.filter(cuentaComoAcierto).length;
      const pendientes = resultados.some((r) => r.estado === 'pendiente');
      const completa = pasados === casos.length;
      // Modo libre: una sola ejecución (no se repite, puede tener efectos o ser lenta)
      const promedio = !completa ? null : libre ? unaVez : medir(fn, casos);
      return { nombre, fn, resultados, pasados, pendientes, promedio };
    });

    const medidos = libre ? [] : datos.filter((d) => d.promedio != null);
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
      const marcador = libre ? 'libre' : `${pasados}/${casos.length}`;

      const esMejor = mejor != null && promedio === mejor;
      const razon = mejor != null && promedio != null ? promedio / mejor : 1;
      const esLenta = mejor != null && !esMejor && razon >= 1.1;
      const nota = esMejor ? '🏆 más rápida' : esLenta ? `×${razon.toFixed(1)} más lenta` : '';

      /* ---------- TERMINAL ---------- */
      sistema(
        'log',
        `▸ ${nombre}  ${marcador} · ${formatearTiempo(promedio)} ${nota}`.trim(),
        {
          tipo: 'solucion',
          nombre,
          aciertos: marcador,
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
          : estado === 'libre' ? (valor === undefined ? '(sin retorno)' : resumir(valor))
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

        imprimirLogsUsuario(logs, estadoLogs);
      });

      /* ---------- DEMO (solo en la terminal; la tarjeta queda para el código) ---------- */
      if (demo && !pendientes) {
        const r = conCaptura(() => demo(fn));
        if (r.error) {
          sistema('error', `Demo falló: ${r.error?.message ?? r.error}`, {
            tipo: 'caso', estado: 'error', icono: ICONOS.error, llamada: 'Demo', resultado: String(r.error?.message ?? r.error),
          });
        } else {
          sistema('log', `★ Demo → ${resumir(r.valor, 90)}`, {
            tipo: 'caso', estado: 'demo', icono: '★', llamada: 'Demo (reto principal)', resultado: resumir(r.valor, 90),
          });
        }
        imprimirLogsUsuario(r.logs, estadoLogs);
      }

      const botonSolo =
        filtro !== 'prefijo' && todas.length > 1
          ? `<button type="button" class="btn-solo" data-accion="solo" data-solucion="${escapar(nombre)}">${
              filtro === 'manual' ? 'Ver todas' : 'Solo esta'
            }</button>`
          : '';

      const abierta = !colapsadas.includes(nombre);

      const textoCodigo =
        fuentesUsuario.get(nombre) ?? funcionesFuente.get(nombre) ?? fn.toString();
      const bloqueCodigo = `
        <details class="sol-codigo" data-nombre="${escapar(nombre)}" ${codigoAbierto.includes(nombre) ? 'open' : ''}>
          <summary>Ver código</summary>
          <div class="codigo-caja">
            <button type="button" class="btn-copiar" data-accion="copiar">Copiar</button>
            <pre><code class="hljs">${resaltar(textoCodigo)}</code></pre>
          </div>
        </details>`;

      // La tarjeta solo muestra el código: aciertos, tiempos, tabla y demo van en la terminal
      return `
        <details class="sol-bloque" data-nombre="${escapar(nombre)}" ${abierta ? 'open' : ''}>
          <summary class="sol-header">
            <span class="sol-chevron"></span>
            <h4 class="sol-nombre">${escapar(nombre)}</h4>
            <div class="sol-meta">${botonSolo}</div>
          </summary>
          <div class="sol-cuerpo">${bloqueCodigo}</div>
        </details>`;
    });

    const barra =
      filtro === 'prefijo'
        ? `<div class="sol-filtro">Filtrado por el prefijo <code>${PREFIJO_SOLO}</code>: ${lista.length} de ${todas.length} soluciones. Quita el prefijo para verlas todas.</div>`
        : filtro === 'manual'
          ? `<div class="sol-filtro">Mostrando solo <code>${escapar(solo)}</code> · ${todas.length - 1} ocultas</div>`
          : '';

    if (estadoLogs.omitidos > 0) {
      sistema(
        'warn',
        `… ${estadoLogs.omitidos} log(s) omitido(s) para no saturar la terminal`,
        { tipo: 'info' }
      );
    }

    return barra + bloques.join('');
  };
}