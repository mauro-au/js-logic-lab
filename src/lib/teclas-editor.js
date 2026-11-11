/* ============================================================
   LÓGICA PURA DEL EDITOR "TU CÓDIGO"
   Todas las funciones reciben (texto, inicio, fin) —fin incluido—
   y devuelven { texto, inicio, fin } o `null` si no hay nada
   que hacer. Sin DOM: se prueban con `node --test`.
   ============================================================ */

/** Sangría de 2 espacios (nunca tabuladores reales). */
export const INDENT = '  ';

const PARES = { '(': ')', '[': ']', '{': '}', '"': '"', "'": "'", '`': '`' };
const CIERRES = new Set(Object.values(PARES));

/** Índice del primer carácter de la línea que contiene a `pos`. */
const inicioDeLinea = (texto, pos) => texto.lastIndexOf('\n', pos - 1) + 1;

/** Índice del salto de línea que termina la línea que contiene a `desde`. */
const finDeLinea = (texto, desde) => {
  const salto = texto.indexOf('\n', desde);
  return salto === -1 ? texto.length : salto;
};

/** Rango [ls, le) de las líneas completas que abarca la selección. */
function rangoLineas(texto, inicio, fin) {
  const ls = inicioDeLinea(texto, inicio);
  let hasta = fin;
  // Si la selección termina justo al inicio de una línea, esa línea queda fuera
  if (hasta > ls && texto[hasta - 1] === '\n') hasta -= 1;
  return [ls, finDeLinea(texto, hasta)];
}

/** Posición de cada inicio de línea de `lineas` dentro del texto original. */
function iniciosDeLinea(ls, lineas) {
  const inicios = [];
  let pos = ls;
  for (const linea of lineas) {
    inicios.push(pos);
    pos += linea.length + 1;
  }
  return inicios;
}

/** Desplazamiento acumulado en `pos` por cambios que arrancan en `punto`. */
function acumular(datos, pos) {
  let delta = 0;
  for (const dato of datos) {
    if (!dato) continue;
    const { punto, delta: d } = dato;
    if (d > 0) {
      if (punto <= pos) delta += d; // la inserción empuja hacia la derecha
    } else if (punto < pos) {
      delta -= Math.min(-d, pos - punto); // la supresión nunca rebasa el punto de cambio
    }
  }
  return delta;
}

/* ============================================================
   INDENTACIÓN
   ============================================================ */

/** Tab: sangría de 2 espacios (o sangrado en bloque si hay selección multilinea). */
export function insertarTab(texto, inicio, fin) {
  if (inicio !== fin && texto.slice(inicio, fin).includes('\n')) {
    const [ls, le] = rangoLineas(texto, inicio, fin);
    const lineas = texto.slice(ls, le).split('\n');
    const bloque = lineas.map((linea) => INDENT + linea).join('\n');
    return {
      texto: texto.slice(0, ls) + bloque + texto.slice(le),
      inicio: inicio + INDENT.length,
      fin: fin + lineas.length * INDENT.length,
    };
  }

  const pos = inicio + INDENT.length;
  return { texto: texto.slice(0, inicio) + INDENT + texto.slice(fin), inicio: pos, fin: pos };
}

/** Shift+Tab: quita hasta 2 espacios (o un tab) del inicio de cada línea afectada. */
export function quitarTab(texto, inicio, fin) {
  const [ls, le] = rangoLineas(texto, inicio, fin);
  const lineas = texto.slice(ls, le).split('\n');
  const quitados = lineas.map((linea) => /^(\s{1,2}|\t)/.exec(linea)?.[0].length ?? 0);
  if (quitados.every((cantidad) => cantidad === 0)) return null;

  const inicios = iniciosDeLinea(ls, lineas);
  const deltaEn = (pos) =>
    inicios.reduce(
      (delta, inicioLinea, i) =>
        inicioLinea < pos ? delta - Math.min(quitados[i], pos - inicioLinea) : delta,
      0
    );

  return {
    texto:
      texto.slice(0, ls) + lineas.map((linea, i) => linea.slice(quitados[i])).join('\n') + texto.slice(le),
    inicio: inicio + deltaEn(inicio),
    fin: fin + deltaEn(fin),
  };
}

/** Enter: conserva la sangría de la línea y añade 2 espacios tras `{`, `(` o `[`. */
export function autoIndentar(texto, inicio, fin) {
  const ls = inicioDeLinea(texto, inicio);
  const antes = texto.slice(ls, inicio);
  const sangria = /^[\t ]*/.exec(antes)[0];
  const ultimo = antes.trimEnd().slice(-1);
  const extra = '{(['.includes(ultimo) ? INDENT : '';
  const pos = inicio + 1 + sangria.length + extra.length;
  return {
    texto: texto.slice(0, inicio) + '\n' + sangria + extra + texto.slice(fin),
    inicio: pos,
    fin: pos,
  };
}

/* ============================================================
   COMENTARIOS Y LÍNEAS
   ============================================================ */

/** Ctrl/Cmd + /: comenta o quita `//` a las líneas completas de la selección. */
export function alternarComentario(texto, inicio, fin) {
  const [ls, le] = rangoLineas(texto, inicio, fin);
  const lineas = texto.slice(ls, le).split('\n');
  const inicios = iniciosDeLinea(ls, lineas);
  const conContenido = lineas.filter((linea) => linea.trim() !== '');
  const comentadas = conContenido.length > 0 && conContenido.every((linea) => /^\s*\/\//.test(linea));

  const quitar = /^([\t ]*)\/\/ ?/;
  const datos = lineas.map((linea, i) => {
    if (comentadas) {
      const m = quitar.exec(linea);
      return m ? { punto: inicios[i] + m[1].length, delta: -(m[0].length - m[1].length) } : null;
    }
    if (linea.trim() === '') return null; // las líneas vacías se quedan como están
    const sangria = /^[\t ]*/.exec(linea)[0];
    return { punto: inicios[i] + sangria.length, delta: 3 }; // inserta "// "
  });
  if (datos.every((dato) => dato === null)) return null;

  const nuevas = lineas.map((linea, i) => {
    const dato = datos[i];
    if (!dato) return linea;
    if (comentadas) {
      const m = quitar.exec(linea);
      return m[1] + linea.slice(m[0].length);
    }
    const sangria = /^[\t ]*/.exec(linea)[0];
    return `${sangria}// ${linea.slice(sangria.length)}`;
  });

  return {
    texto: texto.slice(0, ls) + nuevas.join('\n') + texto.slice(le),
    inicio: inicio + acumular(datos, inicio),
    fin: fin + acumular(datos, fin),
  };
}

/** Alt + ↑/↓ (desplazamiento −1/+1): mueve las líneas seleccionadas. */
export function moverLinea(texto, inicio, fin, desplazamiento) {
  const [ls, le] = rangoLineas(texto, inicio, fin);

  if (desplazamiento < 0) {
    if (ls === 0) return null; // ya es la primera línea
    const ps = inicioDeLinea(texto, ls - 1); // línea anterior
    const delta = ls - ps;
    return {
      texto: texto.slice(0, ps) + texto.slice(ls, le) + '\n' + texto.slice(ps, ls - 1) + texto.slice(le),
      inicio: inicio - delta,
      fin: fin - delta,
    };
  }

  if (le >= texto.length) return null; // ya es la última línea
  const ns = le + 1; // inicio de la línea siguiente
  const ne = finDeLinea(texto, ns);
  const delta = ne - ns + 1;
  return {
    texto: texto.slice(0, ls) + texto.slice(ns, ne) + '\n' + texto.slice(ls, le) + texto.slice(ne),
    inicio: inicio + delta,
    fin: fin + delta,
  };
}

/** Shift + Alt + ↑/↓: duplica las líneas seleccionadas por debajo. */
export function duplicarLinea(texto, inicio, fin) {
  const [ls, le] = rangoLineas(texto, inicio, fin);
  const bloque = texto.slice(ls, le);
  return { texto: texto.slice(0, le) + '\n' + bloque + texto.slice(le), inicio, fin };
}

/* ============================================================
   AUTO-CIERRE DE PARES
   ============================================================ */

/**
 * Escribe un delimitador y cierra el par: `(` → `()` con el cursor
 * en medio; si hay selección, la envuelve con el par.
 */
export function autocerrar(texto, inicio, fin, caracter) {
  const cierre = PARES[caracter];
  if (!cierre) return null;
  const seleccion = texto.slice(inicio, fin);
  return {
    texto: texto.slice(0, inicio) + caracter + seleccion + cierre + texto.slice(fin),
    inicio: inicio + 1,
    fin: fin + 1,
  };
}

/** Teclear un cierre justo delante de ese mismo cierre lo salta. */
export function saltarPar(texto, inicio, fin, caracter) {
  if (!CIERRES.has(caracter) || inicio !== fin || texto[fin] !== caracter) return null;
  return { texto, inicio: fin + 1, fin: fin + 1 };
}

/** Retroceso entre un par vacío (`|` en `(|)`) borra los dos. */
export function borrarPar(texto, inicio, fin) {
  if (inicio !== fin || inicio === 0) return null;
  const anterior = texto[inicio - 1];
  const cierre = PARES[anterior];
  if (!cierre || texto[inicio] !== cierre) return null;
  return {
    texto: texto.slice(0, inicio - 1) + texto.slice(inicio + 1),
    inicio: inicio - 1,
    fin: inicio - 1,
  };
}

/* ============================================================
   INDICADORES
   ============================================================ */

/** Posición 1-based del cursor: { linea, columna }. */
export function lineaColumna(texto, posicion) {
  const hasta = texto.slice(0, posicion);
  const saltos = (hasta.match(/\n/g) ?? []).length;
  return { linea: saltos + 1, columna: posicion - (hasta.lastIndexOf('\n') + 1) + 1 };
}

/** Numeración del gutter: [1, 2, …] tantas líneas como haya. */
export function numeracionLineas(texto) {
  return Array.from({ length: texto.split('\n').length }, (_, i) => i + 1);
}
