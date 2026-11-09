import { test } from 'node:test';
import assert from 'node:assert/strict';
import { codigoResuelto, estadoAutoMarca, huellaCodigo } from '../src/lib/progreso.js';

const solucion = (nombre, estado) => ({ meta: { tipo: 'solucion', nombre, estado } });

test('marca cuando el código del usuario pasa todos los casos', () => {
  assert.equal(codigoResuelto([solucion('TU CÓDIGO', 'ok')]), true);
  assert.equal(codigoResuelto([solucion('TU CÓDIGO · doble', 'ok')]), true);
});

test('marca cuando una función propia de soluciones.js pasa', () => {
  assert.equal(codigoResuelto([solucion('miSolucion', 'ok')]), true);
});

test('las soluciones de fábrica también marcan el ejercicio', () => {
  assert.equal(codigoResuelto([solucion('fizzBuzzIf', 'ok')]), true);
  assert.equal(
    codigoResuelto([solucion('fizzBuzzIf', 'ok'), solucion('fizzBuzzConcatenando', 'ok')]),
    true
  );
});

test('si el código falla o está pendiente no se marca', () => {
  assert.equal(codigoResuelto([solucion('TU CÓDIGO', 'fallo')]), false);
  assert.equal(codigoResuelto([solucion('TU CÓDIGO', 'pendiente')]), false);
  assert.equal(codigoResuelto([solucion('TU CÓDIGO', 'libre')]), false);
  assert.equal(codigoResuelto([]), false);
  assert.equal(codigoResuelto(null), false);
  assert.equal(codigoResuelto(undefined), false);
});

test('ignora las líneas que no son el resumen de una solución', () => {
  const registro = [
    { meta: { tipo: 'caso', estado: 'ok', llamada: 'TU CÓDIGO(1)' } },
    { meta: { tipo: 'info' } },
    { meta: { tipo: 'solucion', nombre: '', estado: 'ok' } },
    { texto: 'línea sin meta' },
    {},
  ];
  assert.equal(codigoResuelto(registro), false);
});

test('una solución que falla no impide marcar con otra que pasa', () => {
  assert.equal(
    codigoResuelto([solucion('laMia', 'fallo'), solucion('laOtra', 'ok')]),
    true
  );
});

/* ---------- Huella del código (bloqueo de re-marcaje) ---------- */

test('huellaCodigo es estable para el mismo código', () => {
  assert.equal(huellaCodigo('export function f() {}'), huellaCodigo('export function f() {}'));
  assert.equal(huellaCodigo(''), huellaCodigo(''));
  assert.equal(huellaCodigo(null), huellaCodigo(undefined));
});

test('huellaCodigo cambia cuando cambia el código', () => {
  const original = huellaCodigo('export function f() { return 1; }');
  assert.notEqual(original, huellaCodigo('export function f() { return 2; }'));
  assert.notEqual(original, huellaCodigo(''));
  assert.notEqual(original, huellaCodigo(`${original}x`));
});

test('huellaCodigo devuelve texto corto', () => {
  const huella = huellaCodigo('cualquier código');
  assert.equal(typeof huella, 'string');
  assert.ok(huella.length < 24);
});

/* ---------- Pausa del marcaje automático (desmarca manual) ---------- */

test('sin desmarca manual se marca', () => {
  assert.equal(estadoAutoMarca({}, './e.js', 'abc'), 'marcar');
  assert.equal(estadoAutoMarca(null, './e.js', 'abc'), 'marcar');
  assert.equal(estadoAutoMarca(undefined, './e.js', 'abc'), 'marcar');
});

test('la desmarca manual bloquea mientras el código no cambie', () => {
  const desmarcados = { './e.js': 'abc' };
  assert.equal(estadoAutoMarca(desmarcados, './e.js', 'abc'), 'bloquear');
  assert.equal(estadoAutoMarca(desmarcados, './otro.js', 'otra'), 'marcar');
});

test('huella pendiente (null) bloquea ya mismo', () => {
  assert.equal(estadoAutoMarca({ './e.js': null }, './e.js', 'cualquiera'), 'bloquear');
});

test('si el código cambió se reanuda el marcaje automático', () => {
  assert.equal(estadoAutoMarca({ './e.js': 'abc' }, './e.js', 'xyz'), 'reanudar');
});
