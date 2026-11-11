import test from 'node:test';
import assert from 'node:assert/strict';
import {
  INDENT,
  insertarTab,
  quitarTab,
  autoIndentar,
  alternarComentario,
  moverLinea,
  duplicarLinea,
  autocerrar,
  saltarPar,
  borrarPar,
  lineaColumna,
  numeracionLineas,
} from '../src/lib/teclas-editor.js';

test('INDENT son 2 espacios, nunca tabuladores', () => {
  assert.equal(INDENT, '  ');
});

test('insertarTab: sangría simple con cursor colapsado', () => {
  const r = insertarTab('hola', 4, 4);
  assert.equal(r.texto, 'hola  ');
  assert.equal(r.inicio, 6);
  assert.equal(r.fin, 6);
});

test('insertarTab: reemplaza la selección simple', () => {
  const r = insertarTab('abcdef', 2, 4);
  assert.equal(r.texto, 'ab  ef');
  assert.equal(r.inicio, 4);
  assert.equal(r.fin, 4);
});

test('insertarTab: sangrado en bloque sobre varias líneas', () => {
  const r = insertarTab('uno\ndos', 0, 6);
  assert.equal(r.texto, '  uno\n  dos');
  assert.equal(r.inicio, 2);
  assert.equal(r.fin, 10);
});

test('quitarTab: fuera la sangría de la línea actual', () => {
  const r = quitarTab('    código', 6, 6);
  assert.equal(r.texto, '  código');
  assert.equal(r.inicio, 4);
  assert.equal(r.fin, 4);
});

test('quitarTab: devuelve null cuando no hay sangría', () => {
  assert.equal(quitarTab('código', 0, 6), null);
});

test('autoIndentar: conserva la sangría de la línea', () => {
  const r = autoIndentar('  uno', 5, 5);
  assert.equal(r.texto, '  uno\n  ');
  assert.equal(r.inicio, 8);
  assert.equal(r.fin, 8);
});

test('autoIndentar: añade 2 espacios extra tras una llave abierta', () => {
  const r = autoIndentar('  if (x) {', 10, 10);
  assert.equal(r.texto, '  if (x) {\n    ');
  assert.equal(r.inicio, 15);
});

test('alternarComentario: comenta las líneas de la selección', () => {
  const r = alternarComentario('uno\ndos', 0, 6);
  assert.equal(r.texto, '// uno\n// dos');
  assert.equal(r.inicio, 3);
  assert.equal(r.fin, 12);
});

test('alternarComentario: quita el comentario sin tocar la sangría', () => {
  const r = alternarComentario('  // uno\n  // dos', 0, 16);
  assert.equal(r.texto, '  uno\n  dos');
  assert.equal(r.inicio, 0);
  assert.equal(r.fin, 10);
});

test('alternarComentario: no comenta líneas vacías', () => {
  const r = alternarComentario('uno\n\ndos', 0, 7);
  assert.equal(r.texto, '// uno\n\n// dos');
});

test('moverLinea: mueve la línea hacia arriba', () => {
  const r = moverLinea('uno\ndos', 4, 4, -1);
  assert.equal(r.texto, 'dos\nuno');
  assert.equal(r.inicio, 0);
});

test('moverLinea: no sube por encima de la primera línea', () => {
  assert.equal(moverLinea('uno\ndos', 0, 0, -1), null);
});

test('moverLinea: mueve la línea hacia abajo', () => {
  const r = moverLinea('uno\ndos', 0, 3, 1);
  assert.equal(r.texto, 'dos\nuno');
  assert.equal(r.inicio, 4);
});

test('moverLinea: no baja más allá de la última línea', () => {
  assert.equal(moverLinea('uno\ndos', 5, 5, 1), null);
});

test('duplicarLinea: copia las líneas seleccionadas por debajo', () => {
  const r = duplicarLinea('uno\ndos', 0, 6);
  assert.equal(r.texto, 'uno\ndos\nuno\ndos');
  assert.equal(r.inicio, 0);
  assert.equal(r.fin, 6);
});

test('autocerrar: cierra el par con el cursor en medio', () => {
  const r = autocerrar('', 0, 0, '(');
  assert.equal(r.texto, '()');
  assert.equal(r.inicio, 1);
  assert.equal(r.fin, 1);
});

test('autocerrar: envuelve la selección con el par', () => {
  const r = autocerrar('abc', 1, 2, '"');
  assert.equal(r.texto, 'a"b"c');
  assert.equal(r.inicio, 2);
  assert.equal(r.fin, 3);
});

test('autocerrar: devuelve null para caracteres que no abren par', () => {
  assert.equal(autocerrar('abc', 1, 1, 'x'), null);
});

test('saltarPar: salta el cierre que ya está delante', () => {
  const r = saltarPar('()', 1, 1, ')');
  assert.equal(r.texto, '()');
  assert.equal(r.inicio, 2);
  assert.equal(r.fin, 2);
});

test('saltarPar: devuelve null si delante no está ese cierre', () => {
  assert.equal(saltarPar('(x)', 1, 1, ')'), null);
});

test('borrarPar: el retroceso entre un par vacío borra los dos', () => {
  const r = borrarPar('()', 1, 1);
  assert.equal(r.texto, '');
  assert.equal(r.inicio, 0);
  assert.equal(r.fin, 0);
});

test('borrarPar: devuelve null si no se está entre un par', () => {
  assert.equal(borrarPar('(a)', 2, 2), null);
  assert.equal(borrarPar('(', 1, 1), null);
});

test('lineaColumna: posiciones 1-based', () => {
  assert.deepEqual(lineaColumna('uno\ndos', 0), { linea: 1, columna: 1 });
  assert.deepEqual(lineaColumna('uno\ndos', 5), { linea: 2, columna: 2 });
  assert.deepEqual(lineaColumna('', 0), { linea: 1, columna: 1 });
});

test('numeracionLineas: tantos números como líneas', () => {
  assert.deepEqual(numeracionLineas(''), [1]);
  assert.deepEqual(numeracionLineas('a\nb\nc'), [1, 2, 3]);
  assert.deepEqual(numeracionLineas('a\n'), [1, 2]);
});
