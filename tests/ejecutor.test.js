import { test } from 'node:test';
import assert from 'node:assert/strict';
import { crearEjecutor, clonar, sonIguales } from '../src/lib/ejecutor.js';
import { extraerSoluciones } from '../src/lib/codigo.js';

const NIVELES = ['log', 'info', 'debug', 'warn', 'error'];

function ejecutarCapturando(ejecutar, opciones) {
  const registro = [];
  const originales = {};

  for (const nivel of NIVELES) {
    originales[nivel] = console[nivel];
    console[nivel] = (...args) => registro.push({ nivel, texto: args.join(' ') });
  }

  try {
    return { salida: ejecutar(opciones), registro };
  } finally {
    Object.assign(console, originales);
  }
}

test('sonIguales compara objetos sin importar el orden de las claves', () => {
  assert.equal(sonIguales({ a: 1, b: [2, { c: 3 }] }, { b: [2, { c: 3 }], a: 1 }), true);
});

test('sonIguales distingue valores, tipos y estructuras', () => {
  assert.equal(sonIguales([1, 2], [1, 3]), false);
  assert.equal(sonIguales(1, '1'), false);
  assert.equal(sonIguales({ a: 1 }, { a: 1, b: 2 }), false);
  assert.equal(sonIguales(NaN, NaN), true);
  assert.equal(sonIguales(new Date(0), new Date(0)), true);
  assert.equal(sonIguales(new Set([1, 2]), new Set([2, 1])), true);
  assert.equal(sonIguales(new Map([['a', 1]]), new Map([['a', 1]])), true);
});

test('sonIguales soporta referencias circulares', () => {
  const a = { nombre: 'a' };
  const b = { nombre: 'a' };
  a.self = a;
  b.self = b;
  assert.equal(sonIguales(a, b), true);

  const setA = new Set();
  const setB = new Set();
  setA.add(setA);
  setB.add(setB);
  assert.equal(sonIguales(setA, setB), true);

  const mapA = new Map([['self', null]]);
  const mapB = new Map([['self', null]]);
  mapA.set('self', mapA);
  mapB.set('self', mapB);
  assert.equal(sonIguales(mapA, mapB), true);
});

test('clonar crea copias profundas independientes', () => {
  const original = { lista: [1, { x: 2 }], fecha: new Date(0) };
  const copia = clonar(original);

  assert.notEqual(copia, original);
  assert.notEqual(copia.lista, original.lista);
  assert.notEqual(copia.lista[1], original.lista[1]);

  copia.lista[1].x = 99;
  assert.equal(original.lista[1].x, 2);
});

test('las soluciones no pueden mutar los casos entre ejecuciones', () => {
  const casos = [{ entrada: [[1, 2, 3]], esperado: 6 }];
  const ejecutar = crearEjecutor({
    soluciones: {
      sumaConEfecto(lista) {
        const total = lista.reduce((suma, n) => suma + n, 0);
        lista.push(99);
        return total;
      },
    },
    casos,
  });

  assert.match(ejecutarCapturando(ejecutar).salida, /✅/);
  assert.match(ejecutarCapturando(ejecutar).salida, /✅/);
  assert.deepEqual(casos[0].entrada[0], [1, 2, 3]);
});

test('el resultado se compara por igualdad profunda', () => {
  const ejecutar = crearEjecutor({
    soluciones: { obtener: () => ({ b: 2, a: 1 }) },
    casos: [{ entrada: [], esperado: { a: 1, b: 2 } }],
  });

  assert.match(ejecutarCapturando(ejecutar).salida, /✅/);
});

test('console.debug también se captura', () => {
  const ejecutar = crearEjecutor({
    soluciones: {
      depurar() {
        console.debug('traza interna');
        return 1;
      },
    },
    casos: [{ entrada: [], esperado: 1 }],
  });

  const { registro } = ejecutarCapturando(ejecutar);
  assert.ok(registro.some((linea) => linea.nivel === 'debug' && linea.texto.includes('traza interna')));
});

test('limita la cantidad de logs para no saturar la terminal', () => {
  const ejecutar = crearEjecutor({
    soluciones: {
      ruidosa() {
        for (let i = 0; i < 2000; i++) console.log('línea', i);
        return 1;
      },
    },
    casos: [{ entrada: [], esperado: 1 }],
  });

  const { registro } = ejecutarCapturando(ejecutar);
  const logsUsuario = registro.filter((linea) => linea.texto.startsWith('línea'));
  assert.ok(logsUsuario.length <= 500);
  assert.ok(registro.some((linea) => linea.texto.includes('omitido')));
});

test('avisa de casos inválidos y ejecuta los válidos', () => {
  const ejecutar = crearEjecutor({
    soluciones: { uno: () => 1 },
    casos: [{ esperado: 1 }, { entrada: [], esperado: 1 }],
  });

  const { registro, salida } = ejecutarCapturando(ejecutar);
  assert.ok(registro.some((linea) => linea.texto.includes('inválido')));
  assert.match(salida, /✅/);
});

test('modo libre: ejecuta sin casos y muestra el retorno', () => {
  const ejecutar = crearEjecutor({ soluciones: { saludo: () => 'hola' } });

  const { salida, registro } = ejecutarCapturando(ejecutar);
  assert.match(salida, /hola/);
  assert.ok(registro.some((linea) => linea.texto.includes('▶')));
});

test('extraerSoluciones reconoce funciones y constantes exportadas', () => {
  const mapa = extraerSoluciones(`
// Suma dos números
export function suma(a, b) {
  return a + b;
}

export const resta = (a, b) => a - b;
`);

  assert.equal(mapa.get('suma'), '// Suma dos números\nexport function suma(a, b) {\n  return a + b;\n}');
  assert.equal(mapa.get('resta'), 'export const resta = (a, b) => a - b;');
});
