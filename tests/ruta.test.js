import { test } from 'node:test';
import assert from 'node:assert/strict';
import { hachARuta, rutaAHach } from '../src/lib/ruta.js';

test('rutaAHach convierte la ruta interna en un hash amigable', () => {
  assert.equal(
    rutaAHach('./exercises/mouredev/2022/01-fizzbuzz/index.js'),
    '#/mouredev/2022/01-fizzbuzz'
  );
  assert.equal(
    rutaAHach('exercises/mouredev/2023/75-la-espiral/index.js'),
    '#/mouredev/2023/75-la-espiral'
  );
});

test('hachARuta devuelve la ruta de módulo equivalente', () => {
  assert.equal(
    hachARuta('#/mouredev/2022/01-fizzbuzz'),
    './exercises/mouredev/2022/01-fizzbuzz/index.js'
  );
  assert.equal(hachARuta('#mouredev/2022/01-fizzbuzz'), './exercises/mouredev/2022/01-fizzbuzz/index.js');
  assert.equal(hachARuta('/mouredev/2022/01-fizzbuzz'), './exercises/mouredev/2022/01-fizzbuzz/index.js');
});

test('el hash y la ruta se pueden convertir de ida y vuelta', () => {
  const rutas = [
    './exercises/mouredev/2022/01-fizzbuzz/index.js',
    './exercises/otra-fuente/2024/99-un-ejercicio-con-guiones/index.js',
  ];
  for (const ruta of rutas) {
    assert.equal(hachARuta(rutaAHach(ruta)), ruta);
  }
});

test('se rechazan segmentos peligrosos o vacíos', () => {
  assert.equal(rutaAHach('./exercises/../../etc/index.js'), '');
  assert.equal(rutaAHach('./exercises//index.js'), '');
  assert.equal(hachARuta('#/../secreto'), '');
  assert.equal(hachARuta('#/a/./b'), '');
  assert.equal(hachARuta('#'), '');
  assert.equal(hachARuta(''), '');
  assert.equal(hachARuta(null), '');
  assert.equal(rutaAHach(''), '');
  assert.equal(rutaAHach(undefined), '');
});

test('no se aceptan caracteres fuera de los permitidos', () => {
  assert.equal(rutaAHach('./exercises/origen con espacios/2022/01-x/index.js'), '');
  assert.equal(hachARuta('#/origen con espacios/2022/01-x'), '');
});
