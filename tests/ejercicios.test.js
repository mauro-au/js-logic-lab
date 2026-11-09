import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, existsSync } from 'node:fs';
import { basename, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { codigoResuelto } from '../src/lib/progreso.js';

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

      if (modulo.autoResuelto !== undefined && typeof modulo.autoResuelto !== 'boolean') {
        problemas.push(`${nombre}: "autoResuelto" debe ser true o false`);
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

test('los ejercicios con autoResuelto pasan sus casos sin código del usuario', async () => {
  const directorios = [...recorrer(DIR_EJERCICIOS)];
  const problemas = [];
  let marcados = 0;

  for (const dir of directorios) {
    const nombre = basename(dir);
    const modulo = await import(pathToFileURL(join(dir, 'index.js')).href);
    if (modulo.autoResuelto !== true) continue;
    marcados++;

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
      problemas.push(`${nombre}: autoResuelto pero lanza ${error?.message ?? error}`);
    } finally {
      Object.assign(console, originales);
    }

    if (!codigoResuelto(registro)) {
      problemas.push(`${nombre}: autoResuelto pero ninguna solución pasa los casos`);
    }
  }

  assert.ok(marcados >= 2, 'debería haber al menos 2 ejercicios autoResueltos');
  assert.deepEqual(problemas, []);
});
