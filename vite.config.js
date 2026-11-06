import { readFileSync } from 'node:fs';
import { readdir } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { defineConfig } from 'vite';

const pkg = JSON.parse(
  readFileSync(new URL('./package.json', import.meta.url), 'utf8')
);

const RAIZ = fileURLToPath(new URL('.', import.meta.url));
const DIR_SRC = join(RAIZ, 'src');
const DIR_EJERCICIOS = join(DIR_SRC, 'exercises');
const ID_CATALOGO = 'virtual:catalogo-ejercicios';
const ID_CATALOGO_RESUELTO = `\0${ID_CATALOGO}`;

async function listarIndex(dir) {
  const entradas = await readdir(dir, { withFileTypes: true });
  const archivos = [];

  for (const entrada of entradas) {
    const ruta = join(dir, entrada.name);
    if (entrada.isDirectory()) archivos.push(...(await listarIndex(ruta)));
    else if (entrada.name === 'index.js') archivos.push(ruta);
  }

  return archivos;
}

/**
 * Genera un módulo virtual con los metadatos de todos los ejercicios.
 * Así main.js puede cargar cada ejercicio con import() dinámico sin
 * mantener un catálogo duplicado a mano.
 */
function catalogoEjercicios() {
  async function leerCatalogo() {
    const archivos = await listarIndex(DIR_EJERCICIOS);
    const sello = Date.now();

    return Promise.all(
      archivos.map(async (archivo) => {
        // El sello evita reutilizar el módulo cacheado tras editar un index.js.
        const modulo = await import(`${pathToFileURL(archivo).href}?v=${sello}`);
        return {
          ruta: `./${relative(DIR_SRC, archivo).split(sep).join('/')}`,
          numero: modulo.numero ?? null,
          dificultad: modulo.dificultad ?? null,
          tags: Array.isArray(modulo.tags) ? modulo.tags : [],
          enunciado: modulo.enunciado ?? '',
        };
      })
    );
  }

  return {
    name: 'js-logic-lab:catalogo',
    resolveId(id) {
      if (id === ID_CATALOGO) return ID_CATALOGO_RESUELTO;
    },
    async load(id) {
      if (id !== ID_CATALOGO_RESUELTO) return null;
      const catalogo = await leerCatalogo();
      return `export default ${JSON.stringify(catalogo)};`;
    },
    configureServer(servidor) {
      const recargar = (archivo) => {
        if (!archivo.startsWith(DIR_EJERCICIOS) || !archivo.endsWith('index.js')) return;
        const modulo = servidor.moduleGraph.getModuleById(ID_CATALOGO_RESUELTO);
        if (modulo) servidor.moduleGraph.invalidateModule(modulo);
        servidor.ws.send({ type: 'full-reload' });
      };

      servidor.watcher.on('add', recargar);
      servidor.watcher.on('change', recargar);
      servidor.watcher.on('unlink', recargar);
    },
  };
}

export default defineConfig({
  // Rutas relativas: funciona igual en local, StackBlitz o GitHub Pages.
  base: './',
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
  plugins: [catalogoEjercicios()],
});
