import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { argv, exit } from 'node:process';

const RAIZ = process.cwd();
const DIR_EJERCICIOS = join(RAIZ, 'src', 'exercises');
const EJECUTOR = join(RAIZ, 'src', 'lib', 'ejecutor.js');
const URL_PAGINA = 'https://retosdeprogramacion.com/ejercicios/';
const TOTAL_ESPERADO = 101;

const DIFICULTADES = {
  FACIL: { texto: 'Fácil', badge: 'facil-brightgreen' },
  MEDIO: { texto: 'Medio', badge: 'medio-yellow' },
  DIFICIL: { texto: 'Difícil', badge: 'dificil-red' },
};

const REGLAS_TAGS = [
  [/cadena|palabra|letra|texto|string|car[aá]cter/i, 'strings'],
  [/array|lista|matriz|vector/i, 'arreglos'],
  [/primo|fibonacci|factorial|binario|hexadecimal|divisor|armstrong/i, 'matemáticas'],
  [/recursiv/i, 'recursión'],
  [/fecha|calendario|date/i, 'fechas'],
  [/dibuj|asterisco|espiral|escalera|trifuerza/i, 'dibujo'],
  [/ordena|ordenaci|sort/i, 'ordenamiento'],
  [/aleatori|random/i, 'aleatoriedad'],
  [/terminal|interactiv/i, 'interactivo'],
  [/\bapi\b|http|url|scraping|base de datos|fichero|\btxt\b/i, 'entrada-salida'],
];

/* ---------- Utilidades ---------- */
const fallar = (mensaje) => {
  console.error(`\n✖ ${mensaje}\n`);
  exit(1);
};

const normalizar = (t) =>
  String(t ?? '').normalize('NFD').replace(/\p{Diacritic}/gu, '').toUpperCase().trim();

function slug(texto, max = 40) {
  const s = normalizar(texto).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  if (s.length <= max) return s;
  const corte = s.slice(0, max);
  const ultimo = corte.lastIndexOf('-');
  return (ultimo > 10 ? corte.slice(0, ultimo) : corte).replace(/-+$/, '');
}

const jsString = (t) => `'${String(t).replaceAll('\\', '\\\\').replaceAll("'", "\\'")}'`;
const escaparPlantilla = (t) =>
  String(t).replaceAll('\\', '\\\\').replaceAll('`', '\\`').replaceAll('${', '\\${');
const shield = (t) => encodeURIComponent(String(t).replaceAll('-', '--').replaceAll('_', '__'));
const frase = (t) => t.toLowerCase().replace(/\p{L}/u, (c) => c.toUpperCase());

/* ---------- Argumentos ---------- */
function leerArgs(lista) {
  const op = {
    origen: 'mouredev', url: URL_PAGINA, archivo: null,
    desde: 1, hasta: Infinity, anio: null, dry: false, debug: false,
  };
  for (let i = 0; i < lista.length; i++) {
    const a = lista[i];
    const valor = () => {
      const v = lista[++i];
      if (v === undefined) fallar(`Falta el valor de ${a}`);
      return v;
    };
    if (a === '--origen') op.origen = valor();
    else if (a === '--archivo') op.archivo = valor();
    else if (a === '--url') op.url = valor();
    else if (a === '--desde') op.desde = Number(valor());
    else if (a === '--hasta') op.hasta = Number(valor());
    else if (a === '--anio') op.anio = Number(valor());
    else if (a === '--dry') op.dry = true;
    else if (a === '--debug') op.debug = true;
    else fallar(`Opción desconocida: ${a}`);
  }
  for (const k of ['desde', 'hasta']) {
    if (Number.isNaN(op[k])) fallar(`--${k} debe ser un número`);
  }
  if (op.anio !== null && Number.isNaN(op.anio)) fallar('--anio debe ser un número');
  op.origen = slug(op.origen);
  if (!op.origen) fallar('--origen no puede estar vacío');
  return op;
}

/* ---------- Descarga y lectura de la página ---------- */
async function obtenerHtml({ archivo, url }) {
  if (archivo) {
    if (!existsSync(archivo)) fallar(`No existe el archivo: ${archivo}`);
    return readFileSync(archivo, 'utf8');
  }
  if (typeof fetch !== 'function') fallar('Necesitas Node 18 o superior (o usa --archivo pagina.html).');
  try {
    const r = await fetch(url, {
      headers: { 'user-agent': 'js-logic-lab-importador' },
      signal: AbortSignal.timeout(20000),
    });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return await r.text();
  } catch (e) {
    fallar(
      `No pude descargar la página (${e?.message ?? e}).\n` +
      '  Si estás en StackBlitz, el navegador puede bloquear la petición.\n' +
      '  Descarga la página y usa:  npm run importar -- --archivo ejercicios.html'
    );
  }
}

const ENTIDADES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
const desdeCodigo = (n) => {
  try { return n >= 0 && n <= 0x10ffff ? String.fromCodePoint(n) : ''; } catch { return ''; }
};

function htmlATexto(html) {
  return html
    .replace(/<(script|style|noscript)\b[\s\S]*?<\/\1>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(?:p|div|h[1-6]|li|ul|ol|pre|section|article|header|footer|tr|table)>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&(?:#(\d+)|#x([0-9a-f]+)|([a-z]+));/gi, (m, d, h, n) => {
      if (d) return desdeCodigo(Number(d));
      if (h) return desdeCodigo(parseInt(h, 16));
      return ENTIDADES[n.toLowerCase()] ?? m;
    })
    .replace(/\r/g, '');
}

// "/* ... */" -> texto limpio, conservando la sangría de cada línea
function limpiarEnunciado(bloque) {
  const lineas = bloque.split('\n').map((l) => l.replace(/^\s*\*(?: |$)/, '').replace(/\s+$/, ''));
  return lineas.join('\n').replace(/^\s*\n/, '').replace(/\s+$/, '');
}

function extraerRetos(texto) {
  // Dificultad  #idx año  #número  Título  /* enunciado */
  const re =
    /(F[áa]cil|Medio|Dif[íi]cil)\s*#\s*\d+\s*(20\d{2})[#\s]*#\s*(\d+)[ \t]*\n+\s*[#\s]*([^\n]+?)\s*\n\s*\/\*([\s\S]*?)\*\//gi;

  const retos = new Map();
  let m;
  while ((m = re.exec(texto))) {
    const numero = Number(m[3]);
    if (retos.has(numero)) continue;
    const titulo = m[4].replace(/\s+/g, ' ').replace(/^[#\s]+/, '').trim();
    retos.set(numero, {
      numero,
      anio: Number(m[2]),
      dificultad: DIFICULTADES[normalizar(m[1])] ?? DIFICULTADES.MEDIO,
      titulo: frase(titulo),
      enunciado: limpiarEnunciado(m[5]),
    });
  }
  return [...retos.values()].sort((a, b) => a.numero - b.numero);
}

function inferirTags(reto) {
  const base = `${reto.titulo} ${reto.enunciado}`;
  return REGLAS_TAGS.filter(([re]) => re.test(base)).map(([, tag]) => tag).slice(0, 4);
}

/* ---------- Plantillas ---------- */
function plantillaIndex({ numero, dificultad, tags, enunciado, importEjecutor }) {
  return [
    "import * as soluciones from './soluciones.js';",
    `import { crearEjecutor } from '${importEjecutor}';`,
    '',
    `export const numero = '${numero}';`,
    `export const dificultad = ${jsString(dificultad.texto)}; // Fácil | Medio | Difícil`,
    `export const tags = [${tags.map(jsString).join(', ')}];`,
    '',
    `export const enunciado = \`${escaparPlantilla(enunciado)}\`;`,
    '',
    '// Casos de prueba (opcional). Con la lista vacía el ejercicio corre en "modo libre":',
    '// cada solución se ejecuta sin argumentos y se muestran su retorno y sus console.log.',
    '// entrada = lista de argumentos; esperado = valor que debe retornar.',
    'const casos = [',
    "  // { entrada: [15], esperado: 'fizzbuzz' },",
    '];',
    '',
    '// Opcional: reto principal. Descomenta y agrega demo a crearEjecutor({ ... }).',
    '// const demo = (solucion) => solucion(100);',
    '',
    'export const ejecutar = crearEjecutor({ soluciones, casos });',
    '',
  ].join('\n');
}

function plantillaSoluciones({ numero, titulo }) {
  return [
    `// Ejercicio ${numero} · ${titulo}`,
    '// Cada función exportada es una solución distinta. Agrega todas las que quieras.',
    '// Modo libre (sin casos en index.js): se ejecuta sin argumentos; usa console.log para ver resultados.',
    '// Con casos en index.js: la función recibe los argumentos de cada caso y debe retornar el resultado.',
    '// Tip: con el prefijo solo_ (ej. solo_miSolucion) se ejecuta únicamente esa.',
    '// Tip: define las funciones auxiliares DENTRO de la solución (no las exportes).',
    '',
    '/** Idea: describe aquí tu estrategia. Tiempo: O(?)  Espacio: O(?) */',
    'export function solucion1() {',
    '  // TODO',
    '}',
    '',
  ].join('\n');
}

function plantillaReadme({ numero, titulo, dificultad, tags, origen, anio, enunciado, url }) {
  const fence = enunciado.includes('```') ? '````' : '```';
  return [
    `# ${numero} · ${titulo}`,
    '',
    `![Dificultad](https://img.shields.io/badge/dificultad-${dificultad.badge})`,
    `![Origen](https://img.shields.io/badge/origen-${shield(`${origen} ${anio}`)}-blue)`,
    '',
    '| Origen | Año | Tags |',
    '| ------ | --- | ---- |',
    `| ${origen} | ${anio} | ${tags.length ? tags.map((t) => `\`${t}\``).join(', ') : '—'} |`,
    '',
    '## 📝 Enunciado',
    '',
    `${fence}text`,
    enunciado,
    fence,
    '',
    `Fuente: [retosdeprogramacion.com](${url})`,
    '',
    '## 🔀 Diagrama de flujo',
    '',
    '![Diagrama de flujo](./diagrama.png)',
    '',
    '> Fuente editable: [`diagrama.drawio`](./diagrama.drawio)',
    '',
    '## 🧠 Explicación del algoritmo',
    '',
    '> _Pendiente: completar al resolver el ejercicio._',
    '',
    '1. Paso uno…',
    '2. Paso dos…',
    '3. Paso tres…',
    '',
    '## ✅ Casos de prueba',
    '',
    '| Entrada | Salida esperada | Motivo |',
    '| ------- | --------------- | ------ |',
    '| …       | …               | …      |',
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
function yaExiste(dirGrupo, numero) {
  if (!existsSync(dirGrupo)) return false;
  return readdirSync(dirGrupo, { withFileTypes: true }).some(
    (d) => d.isDirectory() && Number(d.name.match(/^(\d+)-/)?.[1]) === numero
  );
}

async function main() {
  const op = leerArgs(argv.slice(2));

  console.log(op.archivo ? `Leyendo ${op.archivo}…` : `Descargando ${op.url}…`);
  const texto = htmlATexto(await obtenerHtml(op));

  if (op.debug) {
    writeFileSync(join(RAIZ, 'importar-debug.txt'), texto);
    console.log('Texto extraído guardado en importar-debug.txt');
  }

  const todos = extraerRetos(texto);
  if (!todos.length) {
    fallar(
      'No encontré ningún ejercicio. Ejecuta con --debug y revisa importar-debug.txt\n' +
      '  (si me pasas las primeras líneas, ajusto el lector).'
    );
  }
  if (todos.length !== TOTAL_ESPERADO) {
    console.warn(`⚠ Encontré ${todos.length} ejercicios y esperaba ${TOTAL_ESPERADO}. Revisa con --debug.`);
  }

  const retos = todos.filter(
    (r) => r.numero >= op.desde && r.numero <= op.hasta && (op.anio === null || r.anio === op.anio)
  );

  const rel = relative(join(DIR_EJERCICIOS, 'x', 'x', 'x'), EJECUTOR).split(sep).join('/');
  void rel; // el import real se calcula por ejercicio, más abajo

  let creados = 0;
  let omitidos = 0;
  let errores = 0;

  for (const reto of retos) {
    const numero = String(reto.numero).padStart(2, '0');
    const dirGrupo = join(DIR_EJERCICIOS, op.origen, String(reto.anio));

    if (yaExiste(dirGrupo, reto.numero)) {
      omitidos++;
      continue;
    }

    const nombreCarpeta = `${numero}-${slug(reto.titulo) || 'ejercicio'}`;
    const dirEjercicio = join(dirGrupo, nombreCarpeta);
    const base = relative(RAIZ, dirEjercicio).split(sep).join('/');

    if (op.dry) {
      console.log(`  [simulación] ${base}/   (${reto.dificultad.texto})`);
      creados++;
      continue;
    }

    try {
      const tags = inferirTags(reto);
      const relImport = relative(dirEjercicio, EJECUTOR).split(sep).join('/');
      const importEjecutor = relImport.startsWith('.') ? relImport : `./${relImport}`;

      mkdirSync(dirEjercicio, { recursive: true });
      const archivos = {
        'index.js': plantillaIndex({ numero, dificultad: reto.dificultad, tags, enunciado: reto.enunciado, importEjecutor }),
        'soluciones.js': plantillaSoluciones({ numero, titulo: reto.titulo }),
        'README.md': plantillaReadme({
          numero, titulo: reto.titulo, dificultad: reto.dificultad, tags,
          origen: op.origen, anio: reto.anio, enunciado: reto.enunciado, url: URL_PAGINA,
        }),
      };
      for (const [archivo, contenido] of Object.entries(archivos)) {
        writeFileSync(join(dirEjercicio, archivo), contenido, { flag: 'wx' });
      }
      console.log(`  ✔ ${base}/`);
      creados++;
    } catch (e) {
      console.error(`  ✖ ${nombreCarpeta}: ${e?.message ?? e}`);
      errores++;
    }
  }

  console.log(
    `\n${op.dry ? 'Simulación: ' : ''}${creados} creados · ${omitidos} ya existían (no se tocan) · ${errores} con error`
  );
  if (!op.dry && creados) {
    console.log('\nSiguiente: npm run generar-readme   (actualiza las tablas del README principal)\n');
  }
}

main().catch((e) => fallar(e?.message ?? String(e)));