import { test } from 'node:test';
import assert from 'node:assert/strict';
import { codigoResuelto } from '../src/lib/progreso.js';

const solucion = (nombre, estado) => ({ meta: { tipo: 'solucion', nombre, estado } });

test('marca cuando el código del usuario pasa todos los casos', () => {
  assert.equal(codigoResuelto([solucion('TU CÓDIGO', 'ok')]), true);
  assert.equal(codigoResuelto([solucion('TU CÓDIGO · doble', 'ok')]), true);
});

test('marca cuando una función propia de soluciones.js pasa', () => {
  assert.equal(codigoResuelto([solucion('miSolucion', 'ok')]), true);
  assert.equal(codigoResuelto([solucion('miSolucion', 'ok')], ['otraDeFabrica']), true);
});

test('las soluciones de referencia no marcan el ejercicio', () => {
  const registro = [solucion('fizzBuzzIf', 'ok')];

  assert.equal(codigoResuelto(registro, ['fizzBuzzIf']), false);
  assert.equal(codigoResuelto(registro, []), true);
  assert.equal(codigoResuelto(registro), true);
  assert.equal(
    codigoResuelto([solucion('fizzBuzzIf', 'ok'), solucion('fizzBuzzConcatenando', 'ok')], [
      'fizzBuzzIf',
      'fizzBuzzConcatenando',
    ]),
    false
  );
});

test('una referencia que falla no impide marcar con una propia que pasa', () => {
  const registro = [solucion('fizzBuzzIf', 'fallo'), solucion('laMia', 'ok')];
  assert.equal(codigoResuelto(registro, ['fizzBuzzIf']), true);
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
    { texto: 'línea sin meta' },
    {},
  ];
  assert.equal(codigoResuelto(registro), false);
});

test('acepta una lista de referencias mal formada sin lanzar', () => {
  assert.equal(codigoResuelto([solucion('x', 'ok')], null), true);
  assert.equal(codigoResuelto([solucion('x', 'ok')], ['x', 42, null]), false);
});
