import { test } from 'node:test';
import assert from 'node:assert/strict';
import { crearEjecutor, clonar, sonIguales } from '../src/lib/ejecutor.js';
import { compilarCodigoUsuario, extraerSoluciones } from '../src/lib/codigo.js';

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

  const primera = ejecutarCapturando(ejecutar);
  const segunda = ejecutarCapturando(ejecutar);
  assert.ok(primera.registro.some((linea) => linea.texto.includes('✅')));
  assert.ok(segunda.registro.some((linea) => linea.texto.includes('✅')));
  assert.deepEqual(casos[0].entrada[0], [1, 2, 3]);
});

test('el resultado se compara por igualdad profunda', () => {
  const ejecutar = crearEjecutor({
    soluciones: { obtener: () => ({ b: 2, a: 1 }) },
    casos: [{ entrada: [], esperado: { a: 1, b: 2 } }],
  });

  const { registro } = ejecutarCapturando(ejecutar);
  assert.ok(registro.some((linea) => linea.texto.includes('✅')));
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

  const { registro } = ejecutarCapturando(ejecutar);
  assert.ok(registro.some((linea) => linea.texto.includes('inválido')));
  assert.ok(registro.some((linea) => linea.texto.includes('✅')));
});

test('modo libre: ejecuta sin casos y muestra el retorno', () => {
  const ejecutar = crearEjecutor({ soluciones: { saludo: () => 'hola' } });

  const { salida, registro } = ejecutarCapturando(ejecutar);
  assert.ok(registro.some((linea) => linea.texto.includes('▶ saludo()')));
  assert.match(salida, /class="codigo-caja"/); // el código va directo en el acordeón
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

/* ============================================================
   Código del usuario (editor "TU CÓDIGO")
   ============================================================ */

const FUENTE_USUARIO = 'export function doble(n) { return n * 2; }';

function comoCodigoUsuario(fuente) {
  return { fuente, ...compilarCodigoUsuario(fuente) };
}

test('el código del usuario corre junto a las soluciones del ejercicio', () => {
  const ejecutar = crearEjecutor({
    soluciones: { dobleOficial: (n) => n * 2 },
    casos: [{ entrada: [3], esperado: 6 }],
  });

  const { salida, registro } = ejecutarCapturando(ejecutar, {
    codigoUsuario: comoCodigoUsuario(FUENTE_USUARIO),
  });

  assert.match(salida, /TU CÓDIGO/);
  assert.match(salida, /dobleOficial/);
  assert.match(salida, /class="codigo-caja"/);
  assert.ok(registro.some((linea) => linea.texto.includes('✅ TU CÓDIGO(3) → 6')));
  assert.ok(registro.some((linea) => linea.texto.includes('✅ dobleOficial(3) → 6')));
});

test('si solo hay código de usuario, también se ejecuta', () => {
  const ejecutar = crearEjecutor({ soluciones: {}, casos: [{ entrada: [4], esperado: 8 }] });

  const { salida, registro } = ejecutarCapturando(ejecutar, {
    codigoUsuario: comoCodigoUsuario(FUENTE_USUARIO),
  });

  assert.match(salida, /TU CÓDIGO/);
  assert.ok(registro.some((linea) => linea.texto.includes('✅ TU CÓDIGO(4) → 8')));
});

test('la tarjeta de resultados solo deja el código, sin tablas ni demos', () => {
  const ejecutar = crearEjecutor({
    soluciones: { doble: (n) => n * 2 },
    casos: [{ entrada: [2], esperado: 4 }],
    demo: (fn) => fn(10),
  });

  const { salida, registro } = ejecutarCapturando(ejecutar);

  assert.match(salida, /sol-bloque/);
  assert.match(salida, /class="codigo-caja"/);
  assert.doesNotMatch(salida, /Ver código/); // un solo acordeón: el de la función
  assert.doesNotMatch(salida, /<details class="sol-codigo"/);
  assert.doesNotMatch(salida, /sol-tabla/); // los casos se ven en la terminal
  assert.doesNotMatch(salida, /sol-badge/); // aciertos y tiempos también
  assert.doesNotMatch(salida, /sol-demo/); // la demo solo en la terminal
  assert.ok(registro.some((linea) => linea.texto.includes('★ Demo → 20')));
});

test('un error de compilación en el editor se avisa en la terminal', () => {
  const ejecutar = crearEjecutor({ soluciones: { ok: () => 1 }, casos: [] });
  const fuente = 'function rota( { return 1 }';

  const { registro } = ejecutarCapturando(ejecutar, { codigoUsuario: comoCodigoUsuario(fuente) });

  assert.ok(registro.some((linea) => linea.texto.includes('Editor:')));
  assert.match(registro.find((linea) => linea.texto.includes('Editor:')).texto, /sintaxis/i);
});
