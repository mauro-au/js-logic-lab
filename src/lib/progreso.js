import { NOMBRE_USUARIO } from './codigo.js';

/* ============================================================
   Progreso: a partir del registro de la última ejecución, decide
   si el código propio del usuario ya resolvió el ejercicio.
   ============================================================ */

/**
 * ¿Pasó el código propio del usuario todos los casos?
 * Cuenta las soluciones con estado "ok" (todos los casos correctos o,
 * en modo libre, un retorno o logs), excepto las marcadas como
 * referencia de fábrica con `solucionesReferencia` en el index.js.
 *
 * @param {Array<{meta?: {tipo?: string, nombre?: string, estado?: string}}>} registro
 *   Líneas que emitió crearEjecutor a la terminal.
 * @param {string[]} [solucionesReferencia] nombres que no cuentan como propios.
 * @returns {boolean}
 */
export function codigoResuelto(registro, solucionesReferencia = []) {
  if (!Array.isArray(registro)) return false;

  const referencias = new Set(
    Array.isArray(solucionesReferencia)
      ? solucionesReferencia.filter((nombre) => typeof nombre === 'string' && nombre)
      : []
  );

  return registro.some((linea) => {
    const meta = linea?.meta;
    if (meta?.tipo !== 'solucion' || meta.estado !== 'ok') return false;
    if (typeof meta.nombre !== 'string' || !meta.nombre) return false;
    // El código del usuario siempre cuenta; el resto, salvo que sea de referencia
    return meta.nombre.startsWith(NOMBRE_USUARIO) || !referencias.has(meta.nombre);
  });
}
