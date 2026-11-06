import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';

hljs.registerLanguage('javascript', javascript);

const escapar = (t) =>
  String(t ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

/** Devuelve HTML seguro con el código resaltado. */
export function resaltar(codigo) {
  try {
    return hljs.highlight(String(codigo ?? ''), { language: 'javascript', ignoreIllegals: true }).value;
  } catch {
    return escapar(codigo);
  }
}

/* ============================================================
   Extracción del código de cada función exportada
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