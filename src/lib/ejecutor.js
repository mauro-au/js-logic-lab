const ICONOS = { ok: '✅', fallo: '❌', error: '💥', pendiente: '⏳' };

const escapar = (valor) =>
  String(valor ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');

// Convierte cualquier valor a texto legible (arrays, strings, BigInt, objetos)
function mostrar(v) {
  if (typeof v === 'bigint') return `${v}n`;
  if (Array.isArray(v)) return `[${v.map(mostrar).join(', ')}]`;
  if (typeof v === 'string') return JSON.stringify(v);
  if (v && typeof v === 'object') {
    try { return JSON.stringify(v); } catch { return String(v); }
  }
  return String(v);
}

/**
 * Versión corta para la terminal.
 * Arreglos grandes: Array(100) [1, 2, "fizz", 4, … "buzz"]
 * Otros textos largos: se cortan con "…"
 */
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

function evaluar(fn, caso) {
  try {
    const obtenido = fn(...caso.entrada);
    if (obtenido === undefined || obtenido === null) {
      return { estado: 'pendiente', texto: '—', valor: undefined };
    }
    const ok = mostrar(obtenido) === mostrar(caso.esperado);
    return { estado: ok ? 'ok' : 'fallo', texto: mostrar(obtenido), valor: obtenido };
  } catch (e) {
    return { estado: 'error', texto: `Error: ${e?.message ?? e}`, valor: undefined };
  }
}

/**
 * Crea la función ejecutar() de un ejercicio.
 * @param {object}   config
 * @param {object}   config.soluciones  import * as soluciones from './soluciones.js'
 * @param {Array}    config.casos       [{ entrada: [args], esperado }]
 * @param {Function} [config.demo]      (solucion) => resultado a mostrar (opcional)
 */
export function crearEjecutor({ soluciones, casos, demo }) {
  return function ejecutar() {
    const lista = Object.entries(soluciones).filter(([, f]) => typeof f === 'function');

    if (!lista.length) {
      console.warn('No hay soluciones. Exporta una función en soluciones.js');
      return '<p class="sol-vacio">⚠️ No hay soluciones. Exporta una función en <code>soluciones.js</code>.</p>';
    }

    return lista
      .map(([nombre, fn], indice) => {
        const t0 = performance.now();
        const resultados = casos.map((caso) => ({ caso, ...evaluar(fn, caso) }));
        const ms = (performance.now() - t0).toFixed(2);
        const pasados = resultados.filter((r) => r.estado === 'ok').length;
        const pendientes = resultados.some((r) => r.estado === 'pendiente');

        const claseEstado =
          pasados === casos.length ? 'ok' : pendientes ? 'pendiente' : 'fallo';

        /* ---------- TERMINAL: una línea por caso, detalle solo si falla ---------- */
        if (indice > 0) console.log(''); // separador entre soluciones
        console.log(`▸ ${nombre}  ${pasados}/${casos.length} · ${ms} ms`);

        resultados.forEach(({ caso, estado, valor, texto }) => {
          const llamada = `${nombre}(${entradaCorta(caso.entrada)})`;

          if (estado === 'ok') {
            console.log(`  ${ICONOS.ok} ${llamada} → ${resumir(valor)}`);
          } else if (estado === 'pendiente') {
            console.log(`  ${ICONOS.pendiente} ${llamada} → pendiente`);
          } else if (estado === 'error') {
            console.error(`  ${ICONOS.error} ${llamada} → ${texto}`);
          } else {
            console.warn(`  ${ICONOS.fallo} ${llamada}`);
            console.warn(`      esperado: ${resumir(caso.esperado, 120)}`);
            console.warn(`      obtenido: ${resumir(valor, 120)}`);
          }
        });

        /* ---------- DEMO (reto principal) ---------- */
        let bloqueDemo = '';
        if (demo && !pendientes) {
          try {
            const resultadoDemo = demo(fn);
            const salida = mostrar(resultadoDemo);
            console.log(`  ★ Demo → ${resumir(resultadoDemo, 90)}`);
            bloqueDemo = `
              <details class="sol-demo">
                <summary>Ver demo (reto principal)</summary>
                <pre>${escapar(salida)}</pre>
              </details>`;
          } catch (e) {
            console.error(`  ${ICONOS.error} Demo falló: ${e?.message ?? e}`);
            bloqueDemo = `<p class="sol-vacio">💥 Demo falló: ${escapar(e?.message ?? e)}</p>`;
          }
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

        return `
          <section class="sol-bloque">
            <header class="sol-header">
              <h4 class="sol-nombre">${escapar(nombre)}</h4>
              <div class="sol-meta">
                <span class="sol-badge ${claseEstado}">${pasados}/${casos.length}</span>
                <span class="sol-tiempo">${ms} ms</span>
              </div>
            </header>
            <div class="sol-tabla-wrap">
              <table class="sol-tabla">
                <thead>
                  <tr><th class="col-estado"></th><th>Entrada</th><th>Esperado</th><th>Obtenido</th></tr>
                </thead>
                <tbody>${filas}</tbody>
              </table>
            </div>
            ${bloqueDemo}
          </section>`;
      })
      .join('');
  };
}