import { test } from 'node:test';
import assert from 'node:assert/strict';
import { compilarCodigoUsuario } from '../src/lib/codigo.js';

test('una fuente vacía se considera vacía, no un error', () => {
  const resultado = compilarCodigoUsuario('   \n\t  ');
  assert.equal(resultado.vacio, true);
  assert.equal(resultado.error, null);
  assert.deepEqual(resultado.soluciones, []);
});

test('si el código exporta funciones, solo esas cuentan', () => {
  const resultado = compilarCodigoUsuario(
    'export function visible(n) { return n * 2; }\nfunction oculta() { return 1; }'
  );
  assert.equal(resultado.error, null);
  assert.deepEqual(
    resultado.soluciones.map((s) => s.nombre),
    ['visible']
  );
  assert.equal(resultado.soluciones[0].fn(4), 8);
});

test('sin exportaciones, todas las funciones de nivel superior sirven', () => {
  const resultado = compilarCodigoUsuario(
    'function primero() { return 1; }\nconst segundo = function () { return 2; };\nconst tercero = (n) => n + 1;'
  );
  assert.equal(resultado.error, null);
  assert.deepEqual(
    resultado.soluciones.map((s) => s.nombre),
    ['primero', 'segundo', 'tercero']
  );
  assert.equal(resultado.soluciones[2].fn(41), 42);
});

test('reconoce "export default function"', () => {
  const resultado = compilarCodigoUsuario('export default function hola() { return "hi"; }');
  assert.equal(resultado.error, null);
  assert.deepEqual(
    resultado.soluciones.map((s) => s.nombre),
    ['hola']
  );
  assert.equal(resultado.soluciones[0].fn(), 'hi');
});

test('las funciones exportadas pueden llamarse a sí mismas', () => {
  const resultado = compilarCodigoUsuario(
    'export function factorial(n) {\n  return n <= 1 ? 1 : n * factorial(n - 1);\n}'
  );
  assert.equal(resultado.error, null);
  assert.equal(resultado.soluciones[0].fn(5), 120);
});

test('un error de sintaxis se devuelve como texto, sin lanzar', () => {
  const resultado = compilarCodigoUsuario('function rota( { return 1 }');
  assert.equal(resultado.soluciones.length, 0);
  assert.match(resultado.error, /sintaxis/i);
  assert.equal(resultado.vacio, false);
});

test('un error en tiempo de definición también se captura', () => {
  const resultado = compilarCodigoUsuario(
    'const boom = (() => { throw new Error("naranjas"); })();\nfunction ok() { return 1; }'
  );
  assert.equal(resultado.soluciones.length, 0);
  assert.match(resultado.error, /naranjas/);
});

test('sin funciones detectadas se explica cómo escribirlas', () => {
  const sinFunciones = compilarCodigoUsuario('hola mundo');
  assert.equal(sinFunciones.soluciones.length, 0);
  assert.match(sinFunciones.error, /ninguna función/i);

  const soloConstantes = compilarCodigoUsuario('const respuesta = 42;');
  assert.equal(soloConstantes.soluciones.length, 0);
  assert.match(soloConstantes.error, /ninguna función/i);
});
