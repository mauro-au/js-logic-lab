import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const RAIZ = process.cwd();
const DIR_EJERCICIOS = join(RAIZ, 'src', 'exercises');
const ARCHIVO_README = join(RAIZ, 'README.md');
const INICIO = '<!-- EJERCICIOS:START -->';
const FIN = '<!-- EJERCICIOS:END -->';

const ETIQUETAS = { FACIL: '🟢 Fácil', MEDIO: '🟡 Medio', DIFICIL: '🔴 Difícil' };
const DIAGRAMAS = ['diagrama.png', 'diagrama.svg', 'diagrama.jpg', 'diagrama.webp'];

const normalizar = (t) =>
  String(t ?? '').normalize('NFD').replace(/\p{Diacritic}/gu, '').toUpperCase().trim();
const celda = (t) => String(t).replaceAll('|', '\\|');
const aUrl = (ruta) => encodeURI(relative(RAIZ, ruta).split(sep).join('/'));

// Una carpeta con index.js es un ejercicio; las demás se recorren hacia dentro
function* buscarEjercicios(dir) {
  for (const entrada of readdirSync(dir, { withFileTypes: true })) {
    if (!entrada.isDirectory()) continue;
    const ruta = join(dir, entrada.name);
    if (existsSync(join(ruta, 'index.js'))) yield ruta;
    else yield* buscarEjercicios(ruta);
  }
}

function leerDificultad(rutaIndex) {
  const codigo = readFileSync(rutaIndex, 'utf8');
  const m = codigo.match(/export\s+const\s+dificultad\s*=\s*['"`]([^'"`]+)['"`]/);
  const clave = normalizar(m?.[1]);
  if (!ETIQUETAS[clave]) {
    console.warn(`⚠ Dificultad no reconocida en ${relative(RAIZ, rutaIndex)}; usando MEDIO.`);
    return 'MEDIO';
  }
  return clave;
}

if (!existsSync(DIR_EJERCICIOS)) throw new Error(`No existe ${DIR_EJERCICIOS}`);

const ejercicios = [...buscarEjercicios(DIR_EJERCICIOS)]
  .map((ruta) => {
    const partes = relative(DIR_EJERCICIOS, ruta).split(sep);
    const nombre = partes.pop();
    return {
      origen: partes.join(' / ') || 'general',
      nombre,
      dificultad: leerDificultad(join(ruta, 'index.js')),
      tieneDiagrama: DIAGRAMAS.some((f) => existsSync(join(ruta, f))),
      tieneReadme: existsSync(join(ruta, 'README.md')),
      url: aUrl(ruta),
    };
  })
  .sort(
    (a, b) =>
      a.origen.localeCompare(b.origen, 'es') ||
      a.nombre.localeCompare(b.nombre, 'es', { numeric: true })
  );

/* ---------- Resumen por origen ---------- */
const porOrigen = new Map();
for (const e of ejercicios) {
  const r = porOrigen.get(e.origen) ?? { total: 0, FACIL: 0, MEDIO: 0, DIFICIL: 0, diagramas: 0 };
  r.total++;
  r[e.dificultad]++;
  if (e.tieneDiagrama) r.diagramas++;
  porOrigen.set(e.origen, r);
}

const totalDiagramas = ejercicios.filter((e) => e.tieneDiagrama).length;
const porcentaje = ejercicios.length ? Math.round((totalDiagramas / ejercicios.length) * 100) : 0;

let md = `**Total:** ${ejercicios.length} ejercicios · **Con diagrama:** ${totalDiagramas}/${ejercicios.length} (${porcentaje}%)\n\n`;
md += '| Origen | Total | 🟢 Fácil | 🟡 Medio | 🔴 Difícil | Diagramas |\n';
md += '| ------ | ----: | -------: | -------: | ---------: | --------: |\n';
for (const [origen, r] of porOrigen) {
  md += `| ${celda(origen)} | ${r.total} | ${r.FACIL} | ${r.MEDIO} | ${r.DIFICIL} | ${r.diagramas}/${r.total} |\n`;
}

/* ---------- Lista de ejercicios ---------- */
md += '\n## 📚 Ejercicios\n\n';
md += '| Origen | Ejercicio | Dificultad | Diagrama | Detalle |\n';
md += '| ------ | --------- | ---------- | :------: | ------- |\n';
for (const e of ejercicios) {
  const detalle = e.tieneReadme ? `[README](${e.url}/README.md)` : '—';
  md += `| ${celda(e.origen)} | [${celda(e.nombre)}](${e.url}/index.js) | ${ETIQUETAS[e.dificultad]} | ${e.tieneDiagrama ? '✅' : '❌'} | ${detalle} |\n`;
}

/* ---------- Inserta entre los marcadores ---------- */
const readme = readFileSync(ARCHIVO_README, 'utf8');
const i = readme.indexOf(INICIO);
const f = readme.indexOf(FIN);
if (i === -1 || f === -1 || f < i) {
  throw new Error(`Faltan los marcadores ${INICIO} y ${FIN} en README.md`);
}

writeFileSync(
  ARCHIVO_README,
  `${readme.slice(0, i + INICIO.length)}\n\n${md}\n${readme.slice(f)}`
);
console.log(`README actualizado: ${ejercicios.length} ejercicios.`);