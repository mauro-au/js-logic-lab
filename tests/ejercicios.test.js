import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, existsSync } from 'node:fs';
import { basename, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { codigoResuelto } from '../src/lib/progreso.js';
import { evaluarResuelto } from '../src/lib/evaluar-resuelto.js';

const RAIZ = process.cwd();
const DIR_EJERCICIOS = join(RAIZ, 'src', 'exercises');
const DIFICULTADES = new Set(['FACIL', 'MEDIO', 'DIFICIL']);
const NIVELES = ['log', 'info', 'debug', 'warn', 'error'];

function* recorrer(dir) {
  for (const entrada of readdirSync(dir, { withFileTypes: true })) {
    if (!entrada.isDirectory()) continue;

    const ruta = join(dir, entrada.name);
    if (existsSync(join(ruta, 'index.js'))) yield ruta;
    else yield* recorrer(ruta);
  }
}

const normalizar = (texto) =>
  String(texto ?? '')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toUpperCase();

function ejecutarSinRuido(ejecutar) {
  const originales = {};
  for (const nivel of NIVELES) {
    originales[nivel] = console[nivel];
    console[nivel] = () => {};
  }

  try {
    return ejecutar({ codigo: '' });
  } finally {
    Object.assign(console, originales);
  }
}

test('los 101 ejercicios cargan, tienen metadatos válidos y se ejecutan', async () => {
  const directorios = [...recorrer(DIR_EJERCICIOS)];
  const problemas = [];
  const numeros = new Set();

  assert.equal(directorios.length, 101, 'debería haber 101 ejercicios');

  for (const dir of directorios) {
    const nombre = basename(dir);

    if (!existsSync(join(dir, 'README.md'))) problemas.push(`${nombre}: falta README.md`);
    if (!existsSync(join(dir, 'soluciones.js'))) problemas.push(`${nombre}: falta soluciones.js`);

    try {
      const modulo = await import(pathToFileURL(join(dir, 'index.js')).href);

      if (typeof modulo.numero !== 'string' || !/^\d+$/.test(modulo.numero)) {
        problemas.push(`${nombre}: "numero" inválido`);
      } else if (!nombre.startsWith(`${modulo.numero}-`)) {
        problemas.push(`${nombre}: el número no coincide con la carpeta`);
      } else if (numeros.has(modulo.numero)) {
        problemas.push(`${nombre}: número ${modulo.numero} duplicado`);
      } else {
        numeros.add(modulo.numero);
      }

      if (!DIFICULTADES.has(normalizar(modulo.dificultad))) {
        problemas.push(`${nombre}: dificultad "${modulo.dificultad}" no reconocida`);
      }

      if (!Array.isArray(modulo.tags) || !modulo.tags.length) {
        problemas.push(`${nombre}: sin tags`);
      } else if (modulo.tags.some((tag) => typeof tag !== 'string' || !tag.trim())) {
        problemas.push(`${nombre}: tags inválidos`);
      }

      if (typeof modulo.enunciado !== 'string' || !modulo.enunciado.trim()) {
        problemas.push(`${nombre}: enunciado vacío`);
      }

      if (typeof modulo.ejecutar !== 'function') {
        problemas.push(`${nombre}: no exporta ejecutar()`);
        continue;
      }

      const salida = ejecutarSinRuido(modulo.ejecutar);
      if (typeof salida !== 'string') {
        problemas.push(`${nombre}: ejecutar() no devolvió HTML`);
      }
    } catch (error) {
      problemas.push(`${nombre}: ${error?.message ?? error}`);
    }
  }

  assert.deepEqual(problemas, []);
});

// Ejercicios sin valor esperado fijo (azar, red, ficheros, interactivos…):
// van en "modo libre" (casos = []) pero DEBEN tener demo.
const EXCEPCIONES_SIN_CASOS = new Set([
  '06-aspect-ratio-de-una-imagen',
  '21-parando-el-tiempo',
  '22-calculadora-txt',
  '25-iteration-master',
  '27-cuadrado-y-triangulo-2d',
  '29-maquina-expendedora',
  '38-los-lanzamientos-de-the-legend-of-zelda',
  '44-truco-o-trato',
  '49-el-calendario-de-adeviento-2022',
  '52-el-reto-random',
  '56-el-generador-de-contrasenas',
  '58-hola-mundo',
  '60-el-sombrero-seleccionador',
  '61-el-generador-pseudoaleatorio',
  '63-la-api-application-programming-interface',
  '66-adivina-la-palabra',
  '68-aurebesh',
  '70-git-y-github',
  '71-web-scraping',
  '76-la-base-de-datos',
  '78-el-codigo-konami',
  '79-testing',
  '86-tetris',
  '87-txt',
  '88-primeros-pasos',
  '94-la-casa-encantada',
  '96-simulador-de-clima',
  '97-adivinanzas-matematicas',
  '98-el-calendario-de-adeviento-2023',
  '99-la-carrera-de-coches',
]);

test('cada ejercicio exporta casos (con exceptuados en modo libre) y demo', async () => {
  const directorios = [...recorrer(DIR_EJERCICIOS)];
  const problemas = [];

  for (const dir of directorios) {
    const nombre = basename(dir);
    const modulo = await import(pathToFileURL(join(dir, 'index.js')).href);

    if (!Array.isArray(modulo.casos)) {
      problemas.push(`${nombre}: no exporta un array "casos"`);
      continue;
    }

    const libre = modulo.casos.length === 0;
    if (libre && !EXCEPCIONES_SIN_CASOS.has(nombre)) {
      problemas.push(`${nombre}: sin casos y sin estar en la lista de excepciones`);
    }
    if (!libre && EXCEPCIONES_SIN_CASOS.has(nombre)) {
      problemas.push(`${nombre}: tiene casos pero está en la lista de excepciones`);
    }

    for (const [i, caso] of modulo.casos.entries()) {
      if (!Array.isArray(caso?.entrada)) problemas.push(`${nombre}: caso ${i} sin "entrada" (array)`);
      if (!caso || !Object.hasOwn(caso, 'esperado')) {
        problemas.push(`${nombre}: caso ${i} sin "esperado"`);
      }
    }

    if (typeof modulo.demo !== 'function') problemas.push(`${nombre}: no exporta una "demo"`);
  }

  assert.deepEqual(problemas, []);
});

test('evaluarResuelto (la ruta del build) decide igual que una ejecución libre', async () => {
  const directorios = [...recorrer(DIR_EJERCICIOS)];
  const problemas = [];
  const logOriginal = console.log;
  let resueltos = 0;

  for (const dir of directorios) {
    const nombre = basename(dir);
    const modulo = await import(pathToFileURL(join(dir, 'index.js')).href);

    const resuelto = await evaluarResuelto(modulo.ejecutar);
    if (typeof resuelto !== 'boolean') {
      problemas.push(`${nombre}: evaluarResuelto no devolvió booleano`);
      continue;
    }
    if (resuelto) resueltos++;

    // Ejecución independiente: comprueba que ambas rutas coinciden
    const registro = [];
    const originales = {};
    for (const nivel of NIVELES) {
      originales[nivel] = console[nivel];
      console[nivel] = (...args) => {
        registro.push({ nivel, meta: globalThis.__metaLog ?? null, texto: args.join(' ') });
      };
    }
    try {
      modulo.ejecutar({ codigo: '' });
    } catch (error) {
      problemas.push(`${nombre}: lanza ${error?.message ?? error}`);
    } finally {
      Object.assign(console, originales);
    }

    if (resuelto !== codigoResuelto(registro)) {
      problemas.push(
        `${nombre}: evaluarResuelto=${resuelto} pero la ejecución independiente da ${codigoResuelto(registro)}`
      );
    }
  }

  assert.equal(console.log, logOriginal, 'evaluarResuelto debe restaurar la consola');
  assert.ok(resueltos >= 3, `debería haber al menos 3 ejercicios resueltos de fábrica, hay ${resueltos}`);
  assert.deepEqual(problemas, []);
});
