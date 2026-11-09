/* ============================================================
   Análisis del código fuente: extracción de las funciones
   exportadas y compilación del código del usuario.
   Sin dependencias: lo importa también el arranque de la app.
   ============================================================ */

const esComentario = (src, i) => src[i] === '/' && (src[i + 1] === '/' || src[i + 1] === '*');

// Si en i empieza un string, comentario, plantilla o regex, retorna dónde termina; si no, retorna i
function saltar(src, i, previo) {
  const c = src[i];
  const d = src[i + 1];

  if (c === '/' && d === '/') {
    const f = src.indexOf('\n', i);
    return f === -1 ? src.length : f;
  }
  if (c === '/' && d === '*') {
    const f = src.indexOf('*/', i + 2);
    return f === -1 ? src.length : f + 2;
  }
  if (c === '"' || c === "'") {
    let j = i + 1;
    while (j < src.length && src[j] !== c && src[j] !== '\n') j += src[j] === '\\' ? 2 : 1;
    return j + 1;
  }
  if (c === '`') {
    let j = i + 1;
    while (j < src.length && src[j] !== '`') {
      if (src[j] === '\\') j += 2;
      else if (src[j] === '$' && src[j + 1] === '{') j = cerrarLlave(src, j + 2);
      else j++;
    }
    return j + 1;
  }
  if (c === '/' && (previo === '' || '(,=:[!&|?{};+-*%<>~^'.includes(previo))) {
    let j = i + 1;
    let clase = false;
    while (j < src.length && src[j] !== '\n') {
      if (src[j] === '\\') { j += 2; continue; }
      if (src[j] === '[') clase = true;
      else if (src[j] === ']') clase = false;
      else if (src[j] === '/' && !clase) return j + 1;
      j++;
    }
  }
  return i;
}

// Recorre hasta la llave que cierra una interpolación ${ ... }
function cerrarLlave(src, i) {
  let prof = 1;
  let previo = '';
  while (i < src.length) {
    const salto = saltar(src, i, previo);
    if (salto !== i) {
      if (!esComentario(src, i)) previo = ')';
      i = salto;
      continue;
    }
    const c = src[i];
    if (c === '{') prof++;
    else if (c === '}' && --prof === 0) return i + 1;
    if (!/\s/.test(c)) previo = c;
    i++;
  }
  return src.length;
}

// ¿La expresión sigue después de un cierre? (=> , .método , operadores)
function continua(src, i) {
  let j = i;
  while (j < src.length && /\s/.test(src[j])) j++;
  if (src.startsWith('=>', j)) return true;
  return '.?(+*%&|<>'.includes(src[j] ?? '') && !esComentario(src, j);
}

// Retorna el índice donde termina la declaración, o -1 si no logra determinarlo
function finDeclaracion(src, i, esFuncion) {
  let prof = 0;
  let previo = '';

  while (i < src.length) {
    const salto = saltar(src, i, previo);
    if (salto !== i) {
      if (!esComentario(src, i)) previo = ')';
      i = salto;
      continue;
    }

    const c = src[i];
    if ('([{'.includes(c)) {
      prof++;
    } else if (')]}'.includes(c)) {
      prof--;
      if (prof < 0) return -1;
      if (prof === 0) {
        if (esFuncion && c === '}') return i + 1;
        if (!esFuncion && !continua(src, i + 1)) return src[i + 1] === ';' ? i + 2 : i + 1;
      }
    } else if (c === ';' && prof === 0 && !esFuncion) {
      return i + 1;
    } else if (c === '\n' && prof === 0 && !esFuncion && previo && !'=,+-*/%&|?:<>.('.includes(previo)) {
      return i;
    }

    if (!/\s/.test(c)) previo = c;
    i++;
  }
  return -1;
}

// Incluye los comentarios que están pegados encima de la declaración (sin línea en blanco)
function inicioConComentarios(src, inicio) {
  let pos = inicio;
  while (pos > 0) {
    const finLinea = pos - 1;
    const inicioLinea = src.lastIndexOf('\n', finLinea - 1) + 1;
    const linea = src.slice(inicioLinea, finLinea).trim();

    if (linea.startsWith('//')) {
      pos = inicioLinea;
    } else if (linea.endsWith('*/')) {
      const ini = src.lastIndexOf('/*', finLinea);
      if (ini === -1) break;
      pos = src.lastIndexOf('\n', ini - 1) + 1;
    } else {
      break;
    }
  }
  return pos;
}

/* ============================================================
   Compilación del código que escribe el usuario en el editor
   ============================================================ */

// Declaraciones de nivel superior (con o sin "export" / "default")
const RE_DECLARACION_TOPLEVEL =
  /^[ \t]*(?:export\s+)?(?:default\s+)?(?:(?:async\s+)?function\s*\*?\s*([\w$]+)|(?:const|let|var)\s+([\w$]+))/gm;

// "export"/"export default" previos a una declaración: se eliminan para poder compilar con new Function
const RE_EXPORT =
  /\bexport\s+(?:default\s+)?(?=(?:async\s+)?(?:function|const|let|var|class)\b)/g;

/**
 * Compila el código del editor del usuario y devuelve sus funciones de
 * nivel superior como soluciones ejecutables.
 * - Si el código exporta funciones (`export function ...`), solo esas cuentan.
 * - Si no exporta nada, todas las funciones declaradas son candidatas.
 * @returns {{ soluciones: Array<{nombre: string, fn: Function}>, error: string|null, vacio: boolean }}
 */
export function compilarCodigoUsuario(fuente) {
  const src = String(fuente ?? '').replace(/\r\n/g, '\n');
  if (!src.trim()) return { soluciones: [], error: null, vacio: true };

  const exportadas = extraerSoluciones(src);
  const nombres = exportadas.size
    ? [...exportadas.keys()]
    : [...new Set([...src.matchAll(RE_DECLARACION_TOPLEVEL)].map((m) => m[1] ?? m[2]).filter(Boolean))];

  if (!nombres.length) {
    return {
      soluciones: [],
      error:
        'No se detectó ninguna función. Escribe tu solución como "function miSolucion() { ... }" o usa "export function ...".',
      vacio: false,
    };
  }

  const cuerpo = src
    .replace(RE_EXPORT, '')
    .replace(/^[ \t]*export\s*\{[^}]*\};?[ \t]*$/gm, '')
    .replace(/\bexport\s+default\s+/g, '');

  let fabrica;
  try {
    fabrica = new Function(
      `${cuerpo}\n;return { ${nombres
        .map((n) => `${n}: typeof ${n} !== 'undefined' ? ${n} : undefined`)
        .join(', ')} };`
    );
  } catch (e) {
    return { soluciones: [], error: `Error de sintaxis: ${e?.message ?? e}`, vacio: false };
  }

  let registro;
  try {
    registro = fabrica();
  } catch (e) {
    return { soluciones: [], error: `Error al ejecutar tu código: ${e?.message ?? e}`, vacio: false };
  }

  const soluciones = nombres
    .filter((n) => typeof registro?.[n] === 'function')
    .map((n) => ({ nombre: n, fn: registro[n] }));

  if (!soluciones.length) {
    return { soluciones: [], error: 'El código no definió ninguna función utilizable.', vacio: false };
  }

  return { soluciones, error: null, vacio: false };
}

/**
 * Retorna un Map nombre -> código fuente de cada export de la fuente.
 * Reconoce: export function x, export async function x, export const x = ...
 */
export function extraerSoluciones(fuente) {
  const mapa = new Map();
  if (typeof fuente !== 'string' || !fuente) return mapa;

  const src = fuente.replaceAll('\r\n', '\n');
  const re = /^export\s+(?:(?:async\s+)?function\s*\*?\s*([\w$]+)|(?:const|let|var)\s+([\w$]+))/gm;

  let m;
  while ((m = re.exec(src))) {
    const nombre = m[1] ?? m[2];
    const esFuncion = m[1] !== undefined;
    const fin = finDeclaracion(src, m.index + m[0].length, esFuncion);
    if (fin === -1) continue; // sin resultado: el ejecutor usará fn.toString()

    const ini = inicioConComentarios(src, m.index);
    mapa.set(nombre, src.slice(ini, fin).trimEnd());
    re.lastIndex = fin;
  }
  return mapa;
}