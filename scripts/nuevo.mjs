import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { createInterface } from 'node:readline/promises';
import { argv, exit, stdin, stdout } from 'node:process';

const RAIZ = process.cwd();
const DIR_EJERCICIOS = join(RAIZ, 'src', 'exercises');
const EJECUTOR = join(RAIZ, 'src', 'lib', 'ejecutor.js');

const DIFICULTADES = {
  FACIL: { texto: 'Fácil', badge: 'facil-brightgreen' },
  MEDIO: { texto: 'Medio', badge: 'medio-yellow' },
  DIFICIL: { texto: 'Difícil', badge: 'dificil-red' },
};

/* ---------- Utilidades ---------- */
const normalizar = (t) =>
  String(t ?? '').normalize('NFD').replace(/\p{Diacritic}/gu, '').toUpperCase().trim();

// "Palíndromo Simple" -> "palindromo-simple"
const slug = (t) =>
  normalizar(t).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

// Quita caracteres que romperían el código o el Markdown generado
const limpiarTexto = (t) =>
  String(t ?? '').replace(/[`\\$<>\r\n]/g, '').replace(/\s+/g, ' ').trim();

const jsString = (t) => `'${String(t).replaceAll('\\', '\\\\').replaceAll("'", "\\'")}'`;
const shield = (t) => encodeURIComponent(String(t).replaceAll('-', '--').replaceAll('_', '__'));

const fallar = (mensaje) => {
  console.error(`\n✖ ${mensaje}\n`);
  exit(1);
};

function parsearDificultad(valor) {
  const v = normalizar(valor);
  if (v === '1') return DIFICULTADES.FACIL;
  if (v === '2') return DIFICULTADES.MEDIO;
  if (v === '3') return DIFICULTADES.DIFICIL;
  return DIFICULTADES[v] ?? null;
}

// Carpetas que ya contienen ejercicios (ej. "mouredev/2022")
function buscarGrupos(dir, base = []) {
  if (!existsSync(dir)) return [];
  const hijos = readdirSync(dir, { withFileTypes: true }).filter((d) => d.isDirectory());
  if (hijos.some((d) => /^\d+-/.test(d.name))) return base.length ? [base.join('/')] : [];
  return hijos.flatMap((d) => buscarGrupos(join(dir, d.name), [...base, d.name]));
}

function siguienteNumero(dirGrupo) {
  if (!existsSync(dirGrupo)) return 1;
  const numeros = readdirSync(dirGrupo, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name.match(/^(\d+)-/)?.[1])
    .filter(Boolean)
    .map(Number);
  return Math.max(0, ...numeros) + 1;
}

async function preguntar(rl, texto, porDefecto = '') {
  const respuesta = (await rl.question(porDefecto ? `${texto} [${porDefecto}]: ` : `${texto}: `)).trim();
  return respuesta || porDefecto;
}

/* ---------- Plantillas ---------- */
function plantillaIndex({ numero, dificultad, tags, nombre, importEjecutor }) {
  return [
    "import * as soluciones from './soluciones.js';",
    `import { crearEjecutor } from '${importEjecutor}';`,
    '',
    `export const numero = '${numero}';`,
    `export const dificultad = '${dificultad.texto}'; // Fácil | Medio | Difícil`,
    `export const tags = [${tags.map(jsString).join(', ')}];`,
    '',
    `export const enunciado = \`Describe aquí el enunciado de "${nombre}".\`;`,
    '',
    '// entrada = lista de argumentos con los que se llama a cada solución',
    'const casos = [',
    '  { entrada: [1], esperado: 1 },',
    '];',
    '',
    '// Opcional: reto principal. Descomenta y agrega demo a crearEjecutor({ ... }).',
    '// const demo = (solucion) => solucion(10);',
    '',
    'export const ejecutar = crearEjecutor({ soluciones, casos });',
    '',
  ].join('\n');
}

function plantillaSoluciones() {
  return [
    '// Cada función exportada es una solución distinta. Agrega todas las que quieras.',
    '// Tip: un comentario justo encima de cada función se muestra en "Ver código".',
    '// Tip: con el prefijo solo_ (ej. solo_miSolucion) se ejecuta únicamente esa.',
    '// Tip: si necesitas funciones auxiliares, defínelas DENTRO de la solución.',
    '',
    '/** Idea: describe aquí tu estrategia. Tiempo: O(?)  Espacio: O(?) */',
    'export function solucion1(entrada) {',
    '  // TODO',
    '}',
    '',
  ].join('\n');
}

function plantillaReadme({ numero, nombre, dificultad, tags, segmentos }) {
  const origen = segmentos[0] ?? 'general';
  const resto = segmentos.slice(1).join(' / ') || '—';
  const etiquetaOrigen = segmentos.join(' ') || 'general';
  const columnaTags = tags.length ? tags.map((t) => `\`${t}\``).join(', ') : '—';

  return [
    `# ${numero} · ${nombre}`,
    '',
    `![Dificultad](https://img.shields.io/badge/dificultad-${dificultad.badge})`,
    `![Origen](https://img.shields.io/badge/origen-${shield(etiquetaOrigen)}-blue)`,
    '',
    '| Origen | Año | Tags |',
    '| ------ | --- | ---- |',
    `| ${origen} | ${resto} | ${columnaTags} |`,
    '',
    '## 📝 Enunciado',
    '',
    'Pega aquí el enunciado original.',
    '',
    '## 🔀 Diagrama de flujo',
    '',
    '> _Pendiente: agregar `diagrama.png` o `diagrama.drawio`._',
    '',
    '## 🧠 Explicación del algoritmo',
    '',
    '1. Paso uno…',
    '2. Paso dos…',
    '3. Paso tres…',
    '',
    '## ✅ Casos de prueba',
    '',
    '| Entrada | Salida esperada | Motivo |',
    '| ------- | --------------- | ------ |',
    '| `1`     | `1`             | Caso base |',
    '',
    '## 💻 Soluciones',
    '',
    'Código en [`soluciones.js`](./soluciones.js).',
    '',
    '| Solución | Idea | Tiempo | Espacio |',
    '| -------- | ---- | ------ | ------- |',
    '| `solucion1` | … | O(?) | O(?) |',
    '',
    '## 📚 Notas / aprendizajes',
    '',
    '- Qué aprendí o qué haría distinto.',
    '',
  ].join('\n');
}

/* ---------- Programa principal ---------- */
async function main() {
  const [argRuta, argNombre, argDif, argNum, argTags] = argv.slice(2);
  const interactivo = !(argRuta && argNombre);
  const rl = interactivo ? createInterface({ input: stdin, output: stdout }) : null;

  try {
    // 1) Carpeta (origen/año)
    let rutaTexto = argRuta;
    if (!rutaTexto) {
      const grupos = buscarGrupos(DIR_EJERCICIOS);
      if (grupos.length) {
        console.log('\nCarpetas existentes:');
        grupos.forEach((g, i) => console.log(`  ${i + 1}) ${g}`));
      }
      const resp = await preguntar(
        rl,
        '\nCarpeta (número de la lista o ruta nueva, ej. mouredev/2022)',
        grupos[0] ?? ''
      );
      rutaTexto = /^\d+$/.test(resp) && grupos[Number(resp) - 1] ? grupos[Number(resp) - 1] : resp;
    }
    const segmentos = String(rutaTexto ?? '').split(/[\\/]+/).map(slug).filter(Boolean);
    if (!segmentos.length) fallar('Debes indicar una carpeta, por ejemplo: mouredev/2022');

    // 2) Nombre
    const nombre = limpiarTexto(argNombre ?? (await preguntar(rl, 'Nombre del ejercicio')));
    const nombreSlug = slug(nombre);
    if (!nombreSlug) fallar('El nombre del ejercicio no puede estar vacío.');

    // 3) Dificultad
    let dificultad;
    if (argDif) {
      dificultad = parsearDificultad(argDif);
    } else if (rl) {
      console.log('\nDificultad: 1) Fácil  2) Medio  3) Difícil');
      dificultad = parsearDificultad(await preguntar(rl, 'Elige', '1'));
    } else {
      dificultad = DIFICULTADES.FACIL;
    }
    if (!dificultad) fallar('Dificultad no válida. Usa Fácil, Medio o Difícil (o 1, 2, 3).');

    // 4) Tags
    const textoTags = argTags ?? (rl ? await preguntar(rl, 'Tags separados por coma (opcional)') : '');
    const tags = textoTags.split(',').map(limpiarTexto).filter(Boolean);

    // 5) Número
    const dirGrupo = join(DIR_EJERCICIOS, ...segmentos);
    let numeroEntero = argNum ? Number(argNum) : siguienteNumero(dirGrupo);
    if (!Number.isInteger(numeroEntero) || numeroEntero < 0) fallar('El número debe ser un entero positivo.');
    const numero = String(numeroEntero).padStart(2, '0');

    // 6) Crear archivos (nunca sobrescribe)
    const dirEjercicio = join(dirGrupo, `${numero}-${nombreSlug}`);
    if (existsSync(dirEjercicio)) fallar(`Ya existe: ${relative(RAIZ, dirEjercicio)}`);
    if (!existsSync(EJECUTOR)) {
      console.warn(`⚠ No encuentro ${relative(RAIZ, EJECUTOR)}; revisa la ruta del import en index.js`);
    }

    const rel = relative(dirEjercicio, EJECUTOR).split(sep).join('/');
    const importEjecutor = rel.startsWith('.') ? rel : `./${rel}`;

    mkdirSync(dirEjercicio, { recursive: true });
    const archivos = {
      'index.js': plantillaIndex({ numero, dificultad, tags, nombre, importEjecutor }),
      'soluciones.js': plantillaSoluciones(),
      'README.md': plantillaReadme({ numero, nombre, dificultad, tags, segmentos }),
    };
    for (const [archivo, contenido] of Object.entries(archivos)) {
      writeFileSync(join(dirEjercicio, archivo), contenido, { flag: 'wx' });
    }

    const base = relative(RAIZ, dirEjercicio).split(sep).join('/');
    console.log(`\n✔ Ejercicio creado en ${base}/`);
    Object.keys(archivos).forEach((a) => console.log(`   ├─ ${a}`));
    console.log('   └─ (falta) diagrama.png  ← expórtalo desde draw.io\n');
    console.log('Siguientes pasos:');
    console.log('  1. Completa el enunciado y los casos en index.js');
    console.log('  2. Programa en soluciones.js');
    console.log('  3. npm run generar-readme   (actualiza las tablas del README principal)\n');
  } finally {
    rl?.close();
  }
}

main().catch((e) => fallar(e?.message ?? String(e)));