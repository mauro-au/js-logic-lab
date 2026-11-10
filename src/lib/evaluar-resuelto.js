import { codigoResuelto } from './progreso.js';

/* ============================================================
   Evaluación de soluciones de fábrica (compile time).
   La usan vite.config.js (para horneer `resuelto` en el catálogo)
   y los tests. No entra en el bundle del navegador.
   ============================================================ */

const NIVELES = ['log', 'info', 'debug', 'warn', 'error'];
const MAX_ENTRADAS = 1000;

/**
 * Ejecuta un ejercicio con el código de fábrica (editor vacío) y decide
 * si pasa todos sus casos.
 *
 * Silencia la consola durante la ejecución y la restaura siempre;
 * nunca lanza: si algo falla, devuelve false.
 *
 * Nota: usa console global, así que las llamadas deben ser secuenciales.
 *
 * @param {(opciones?: object) => unknown} ejecutar export `ejecutar` del ejercicio
 * @returns {Promise<boolean>}
 */
export async function evaluarResuelto(ejecutar) {
  if (typeof ejecutar !== 'function') return false;

  const originales = Object.fromEntries(NIVELES.map((nivel) => [nivel, console[nivel]]));
  const registro = [];

  for (const nivel of NIVELES) {
    console[nivel] = (...args) => {
      if (registro.length < MAX_ENTRADAS) {
        registro.push({
          nivel,
          meta: globalThis.__metaLog ?? null,
          texto: args.map((a) => (typeof a === 'string' ? a : String(a))).join(' '),
        });
      }
    };
  }

  try {
    await ejecutar({
      codigo: '',
      codigoUsuario: { fuente: '', soluciones: [], error: null },
    });
    return codigoResuelto(registro);
  } catch {
    return false;
  } finally {
    Object.assign(console, originales);
  }
}
