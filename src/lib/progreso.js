/* ============================================================
   Progreso: a partir del registro de la última ejecución, decide
   si el ejercicio ya quedó resuelto por el código presente.
   ============================================================ */

/**
 * ¿Pasó alguna solución todos los casos?
 * Cuenta cualquier función con estado "ok" (todos los casos correctos
 * o, en modo libre, un retorno o logs): la del editor, la que escribas
 * en soluciones.js y las de fábrica.
 *
 * @param {Array<{meta?: {tipo?: string, nombre?: string, estado?: string}}>} registro
 *   Líneas que emitió crearEjecutor a la terminal.
 * @returns {boolean}
 */
export function codigoResuelto(registro) {
  if (!Array.isArray(registro)) return false;

  return registro.some((linea) => {
    const meta = linea?.meta;
    if (meta?.tipo !== 'solucion' || meta.estado !== 'ok') return false;
    return typeof meta.nombre === 'string' && !!meta.nombre;
  });
}

/**
 * ¿Se permite el marcaje automático para una ruta?
 * - 'marcar': no hay desmarca manual pendiente.
 * - 'bloquear': el usuario lo desmarcó y el código sigue igual.
 * - 'reanudar': él lo desmarcó, pero el código cambió: se limpia la pausa.
 *
 * @param {Record<string, string|null>} desmarcados { ruta: huella } (`null` = pendiente)
 * @param {string} ruta
 * @param {string} huella huella del código actual
 * @returns {'marcar' | 'bloquear' | 'reanudar'}
 */
export function estadoAutoMarca(desmarcados, ruta, huella) {
  if (!desmarcados || typeof desmarcados !== 'object' || !(ruta in desmarcados)) return 'marcar';
  const guardada = desmarcados[ruta];
  return guardada === null || guardada === huella ? 'bloquear' : 'reanudar';
}

/**
 * Huella corta del código de un ejercicio (editor + soluciones.js).
 * Sirve para detectar "el código cambió": mientras sea igual, una
 * desmarca manual sigue bloqueando el marcaje automático.
 *
 * @param {string} texto
 * @returns {string}
 */
export function huellaCodigo(texto) {
  const cadena = String(texto ?? '');
  // djb2: barato y suficiente para comparar versiones del mismo código
  let hash = 5381;
  for (let i = 0; i < cadena.length; i++) {
    hash = ((hash << 5) + hash + cadena.charCodeAt(i)) >>> 0;
  }
  return `${hash.toString(36)}-${cadena.length.toString(36)}`;
}
