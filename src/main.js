import './style.css';
import catalogoMetadatos from 'virtual:catalogo-ejercicios';
import { compilarCodigoUsuario } from './lib/codigo.js';
import { codigoResuelto } from './lib/progreso.js';
import { hachARuta, rutaAHach } from './lib/ruta.js';

/* ============================================================
   REFERENCIAS DOM
   ============================================================ */
const selectorCategoria = document.getElementById('selector-categoria');
const selectorDificultad = document.getElementById('selector-dificultad');
const buscador = document.getElementById('buscador-ejercicios');
const selectorEjercicios = document.getElementById('selector-ejercicios');
const contenedorResultado = document.getElementById('resultado');
const contadorProgreso = document.getElementById('contador-progreso');
const totalEjerciciosEl = document.getElementById('total-ejercicios');
const seccionProgreso = document.getElementById('resumen-progreso');

/* ============================================================
   MÓDULOS
   Estructura: ./exercises/<origen>/<año>/NN-nombre/index.js
   Los ejercicios y su código se cargan solo al abrirlos.
   ============================================================ */
const cargadoresEjercicios = import.meta.glob('./exercises/**/index.js');
const cargadoresCodigo = import.meta.glob('./exercises/**/soluciones.js', {
  query: '?raw',
  import: 'default',
});

const cacheEjercicios = new Map();
const cacheCodigo = new Map();

function cargarEjercicio(ruta) {
  if (!cargadoresEjercicios[ruta]) return Promise.resolve(null);
  if (!cacheEjercicios.has(ruta)) {
    cacheEjercicios.set(ruta, cargadoresEjercicios[ruta]());
  }
  return cacheEjercicios.get(ruta);
}

function cargarCodigo(ruta) {
  const rutaCodigo = ruta.replace(/index\.js$/, 'soluciones.js');
  const cargador = cargadoresCodigo[rutaCodigo];
  if (!cargador) return Promise.resolve('');
  if (!cacheCodigo.has(rutaCodigo)) {
    cacheCodigo.set(rutaCodigo, cargador());
  }
  return cacheCodigo.get(rutaCodigo);
}

/* ============================================================
   LISTENERS CON LIMPIEZA (necesario para la recarga en caliente)
   ============================================================ */
const controlador = new AbortController();
const { signal } = controlador;

/* ============================================================
   UTILIDADES
   ============================================================ */
const escapar = (valor) =>
  String(valor ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const normalizar = (texto) =>
  String(texto ?? '')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toUpperCase()
    .trim();

const DIFICULTADES = { FACIL: 'FÁCIL', MEDIO: 'MEDIO', DIFICIL: 'DIFÍCIL' };

const formatearTags = (tags) => {
  if (Array.isArray(tags)) return tags.length ? tags.join(', ') : 'General';
  return tags ? String(tags) : 'General';
};

function formatearArgumento(arg) {
  if (typeof arg === 'string') return arg;
  if (arg instanceof Error) return arg.stack || `${arg.name}: ${arg.message}`;
  if (typeof arg === 'function') return `[Function ${arg.name || 'anónima'}]`;
  if (typeof arg === 'bigint') return `${arg}n`;
  if (arg !== null && typeof arg === 'object') {
    const vistos = new WeakSet();
    try {
      return JSON.stringify(
        arg,
        (_clave, valor) => {
          if (typeof valor === 'bigint') return `${valor}n`;
          if (typeof valor === 'function') return '[Function]';
          if (valor instanceof Map) return { Map: [...valor] };
          if (valor instanceof Set) return { Set: [...valor] };
          if (valor !== null && typeof valor === 'object') {
            if (vistos.has(valor)) return '[Circular]';
            vistos.add(valor);
          }
          return valor;
        },
        2
      );
    } catch {
      return String(arg);
    }
  }
  return String(arg);
}

/* ============================================================
   VERSIÓN (única fuente de verdad: package.json vía Vite)
   ============================================================ */
function actualizarVersion() {
  const etiqueta = document.querySelector('.main-header .version');
  if (!etiqueta || typeof __APP_VERSION__ === 'undefined') return;
  etiqueta.textContent = `V${String(__APP_VERSION__).replace(/\.0$/, '')}`;
}

/* ============================================================
   ALMACENAMIENTO SEGURO
   ============================================================ */
const PREFIJO_CLAVE = 'jsLogicLab:';
const CLAVE_COMPLETADOS = `${PREFIJO_CLAVE}retosCompletados`;
const CLAVE_ACTIVO = `${PREFIJO_CLAVE}ejercicioActivo`;
const CLAVE_OPCIONES = `${PREFIJO_CLAVE}opcionesEjercicios`;
const CLAVE_CODIGO = `${PREFIJO_CLAVE}codigo`;

/** Código escrito en el editor, guardado por ejercicio. */
const claveCodigo = (ruta) => `${CLAVE_CODIGO}:${ruta}`;

const leerTexto = (clave) => {
  try { return localStorage.getItem(clave); } catch { return null; }
};
const guardarTexto = (clave, valor) => {
  try { localStorage.setItem(clave, valor); } catch { /* sin almacenamiento */ }
};
const borrarClave = (clave) => {
  try { localStorage.removeItem(clave); } catch { /* sin almacenamiento */ }
};

// Migra los datos de las primeras versiones a las claves con prefijo.
const CLAVES_ANTIGUAS = [
  [CLAVE_COMPLETADOS, 'retosCompletados'],
  [CLAVE_ACTIVO, 'ejercicioActivo'],
  [CLAVE_OPCIONES, 'opcionesEjercicios'],
];

function migrarClaves() {
  for (const [nueva, antigua] of CLAVES_ANTIGUAS) {
    if (leerTexto(nueva) !== null) continue;
    const valor = leerTexto(antigua);
    if (valor === null) continue;
    guardarTexto(nueva, valor);
    borrarClave(antigua);
  }
}

migrarClaves();

const migrarRuta = (ruta) =>
  typeof ruta === 'string' && ruta.endsWith('.js') && !ruta.endsWith('/index.js')
    ? ruta.replace(/\.js$/, '/index.js')
    : ruta;

function cargarCompletados() {
  try {
    const datos = JSON.parse(leerTexto(CLAVE_COMPLETADOS));
    if (!Array.isArray(datos)) return new Set();
    return new Set(datos.filter((r) => typeof r === 'string').map(migrarRuta));
  } catch {
    return new Set();
  }
}

// Opciones por ejercicio: { [ruta]: { solo: string|null, colapsadas: string[] } }
function cargarOpciones() {
  try {
    const datos = JSON.parse(leerTexto(CLAVE_OPCIONES));
    return datos && typeof datos === 'object' && !Array.isArray(datos) ? datos : {};
  } catch {
    return {};
  }
}

const opciones = cargarOpciones();

function opcionesDe(ruta) {
  const actual = opciones[ruta];
  if (!actual || typeof actual !== 'object') {
    opciones[ruta] = { solo: null, colapsadas: [], codigoAbierto: [] };
  } else {
    if (typeof actual.solo !== 'string') actual.solo = null;
    if (!Array.isArray(actual.colapsadas)) actual.colapsadas = [];
    if (!Array.isArray(actual.codigoAbierto)) actual.codigoAbierto = [];
  }
  return opciones[ruta];
}

const guardarOpciones = () => guardarTexto(CLAVE_OPCIONES, JSON.stringify(opciones));

/* ---------- Código del usuario (editor) ---------- */

function guardarCodigoDe(ruta, texto) {
  if (!ruta) return;
  if (texto) guardarTexto(claveCodigo(ruta), texto);
  else borrarClave(claveCodigo(ruta));
}

/**
 * Devuelve el código del editor para un ejercicio.
 * Si la vista actual corresponde a ese ejercicio, lee del textarea (lo más fresco);
 * en caso contrario, de lo guardado en localStorage.
 */
function leerCodigoDe(ruta) {
  if (ruta && ruta === rutaRenderizada) {
    const area = contenedorResultado.querySelector('.editor-codigo');
    if (area instanceof HTMLTextAreaElement) return area.value;
  }
  return leerTexto(claveCodigo(ruta)) ?? '';
}

/* ============================================================
   ESTADO
   ============================================================ */
const completados = cargarCompletados();
let catalogo = [];
let catalogoPorRuta = new Map();
let rutaActivaGlobal = '';
let rutaRenderizada = '';
let ultimaEjecucion = 0;
let temporizadorCodigo = 0;

/* ============================================================
   CAPTURA DE CONSOLA (siempre se restaura)
   ============================================================ */
const consolaOriginal = {
  log: console.log,
  info: console.info,
  debug: console.debug,
  warn: console.warn,
  error: console.error,
};

const MAX_ENTRADAS_TERMINAL = 1000;

function capturarConsola(registro) {
  for (const nivel of Object.keys(consolaOriginal)) {
    console[nivel] = (...args) => {
      if (registro.length < MAX_ENTRADAS_TERMINAL) {
        registro.push({
          nivel,
          origen: globalThis.__origenLog ?? 'usuario', // sin marca = código del usuario
          meta: globalThis.__metaLog ?? null,
          texto: args.map(formatearArgumento).join(' '),
        });
      }
      consolaOriginal[nivel](...args);
    };
  }
}

function restaurarConsola() {
  Object.assign(console, consolaOriginal);
}

/* ============================================================
   CATÁLOGO
   ============================================================ */
function construirCatalogo() {
  const sinCargador = catalogoMetadatos.filter(
    ({ ruta }) => typeof cargadoresEjercicios[ruta] !== 'function'
  );
  if (sinCargador.length) {
    console.warn(
      `[catálogo] ${sinCargador.length} ejercicio(s) sin cargador:`,
      sinCargador.map(({ ruta }) => ruta).join(', ')
    );
  }

  return catalogoMetadatos
    .filter(({ ruta }) => typeof cargadoresEjercicios[ruta] === 'function')
    .map(({ ruta, numero, dificultad: dificultadCruda, tags, enunciado }) => {
      const segmentos = ruta
        .replace('./exercises/', '')
        .replace(/\/index\.js$/, '')
        .split('/');
      const nombreReto = segmentos.pop();
      const categoria = segmentos.length ? segmentos.join(' ➔ ') : 'GENERAL';
      const dificultad = DIFICULTADES[normalizar(dificultadCruda)] ?? 'MEDIO';
      const nombreLegible = nombreReto.replaceAll('-', ' ');

      return {
        rutaReal: ruta,
        categoria: categoria.toUpperCase(),
        dificultad,
        dificultadClave: normalizar(dificultad),
        nombreFormateado: nombreLegible.toUpperCase(),
        numeroCarpeta: nombreReto.match(/^\d+/)?.[0] ?? '--',
        textoBusqueda: normalizar(
          `${nombreLegible} ${numero ?? ''} ${categoria} ${dificultad} ${formatearTags(tags)} ${enunciado}`
        ),
      };
    })
    .sort((a, b) => a.rutaReal.localeCompare(b.rutaReal, 'es', { numeric: true }));
}

/* ============================================================
   INTERFAZ
   ============================================================ */
function restaurarVistaVacia() {
  ultimaEjecucion++;
  rutaRenderizada = '';
  restaurarConsola();
  contenedorResultado.innerHTML = `
    <div class="placeholder-box">
      <p>Selecciona un ejercicio del panel superior para inicializar el entorno de pruebas.</p>
    </div>`;
}

function mostrarErrorGlobal(titulo, mensaje) {
  contenedorResultado.innerHTML = `
    <div class="error-box">
      <h3>${escapar(titulo)}</h3>
      <code>${escapar(mensaje)}</code>
    </div>`;
}

function contarCompletados() {
  let cuenta = 0;
  for (const ruta of completados) if (catalogoPorRuta.has(ruta)) cuenta++;
  return cuenta;
}

const ORDEN_DIFICULTADES = ['FÁCIL', 'MEDIO', 'DIFÍCIL'];
const ICONO_DIFICULTAD = { 'FÁCIL': '🟢', 'MEDIO': '🟡', 'DIFÍCIL': '🔴' };

/** Tarjeta con el repaso del progreso: barra global y desglose por dificultad. */
function actualizarResumenProgreso() {
  if (!seccionProgreso) return;

  const total = catalogo.length;
  const hechos = contarCompletados();
  const porcentaje = total ? Math.round((hechos / total) * 100) : 0;

  const cuenta = new Map(ORDEN_DIFICULTADES.map((d) => [d, { ok: 0, total: 0 }]));
  for (const ejercicio of catalogo) {
    const registro = cuenta.get(ejercicio.dificultad) ?? { ok: 0, total: 0 };
    registro.total++;
    if (completados.has(ejercicio.rutaReal)) registro.ok++;
    cuenta.set(ejercicio.dificultad, registro);
  }

  const chips = ORDEN_DIFICULTADES.filter((d) => cuenta.get(d)?.total)
    .map((dificultad) => {
      const { ok, total: totalDificultad } = cuenta.get(dificultad);
      return `<span class="progreso-chip ${normalizar(dificultad).toLowerCase()}">${
        ICONO_DIFICULTAD[dificultad] ?? '●'
      } ${escapar(dificultad)} <strong>${ok}/${totalDificultad}</strong></span>`;
    })
    .join('');

  const relleno = seccionProgreso.querySelector('.progreso-relleno');
  const etiqueta = seccionProgreso.querySelector('.progreso-porcentaje');
  const barra = seccionProgreso.querySelector('.progreso-barra');
  const contenedorChips = seccionProgreso.querySelector('.progreso-chips');

  if (relleno instanceof HTMLElement) relleno.style.width = `${porcentaje}%`;
  if (etiqueta) etiqueta.textContent = `${porcentaje}%`;
  if (barra) barra.setAttribute('aria-valuenow', String(porcentaje));
  if (contenedorChips instanceof HTMLElement) contenedorChips.innerHTML = chips;
}

function actualizarContadorInterfaz() {
  const total = catalogo.length;
  const validos = contarCompletados();
  contadorProgreso.innerHTML = `<span class="dot-green">●</span> Completados: <strong>${validos}/${total}</strong>`;
  if (totalEjerciciosEl) totalEjerciciosEl.textContent = String(total);
  actualizarResumenProgreso();
}

function poblarCategorias() {
  const previa = selectorCategoria.value;
  const categorias = [...new Set(catalogo.map((e) => e.categoria))].sort();
  selectorCategoria.replaceChildren(new Option('⚡ Todas las fuentes', 'TODOS'));
  categorias.forEach((cat) => selectorCategoria.append(new Option(cat, cat)));
  if (previa === 'TODOS' || categorias.includes(previa)) selectorCategoria.value = previa;
}

function actualizarListaEjercicios() {
  const categoria = selectorCategoria.value;
  const dificultad = normalizar(selectorDificultad.value);
  const texto = normalizar(buscador.value);

  const lista = [new Option('-- Elige un reto de la lista --', '')];

  catalogo
    .filter(
      (e) =>
        (categoria === 'TODOS' || e.categoria === categoria) &&
        (dificultad === 'TODOS' || e.dificultadClave === dificultad) &&
        e.textoBusqueda.includes(texto)
    )
    .forEach((e) => {
      const check = completados.has(e.rutaReal) ? '✅' : '⬜';
      lista.push(new Option(`${check} ${e.nombreFormateado} (${e.dificultad})`, e.rutaReal));
    });

  selectorEjercicios.replaceChildren(...lista);

  selectorEjercicios.value = rutaActivaGlobal;
  if (selectorEjercicios.value !== rutaActivaGlobal) selectorEjercicios.value = '';
}

function actualizarBotonCompletado() {
  const boton = contenedorResultado.querySelector('[data-accion="completar"]');
  if (!boton) return;
  const resuelto = completados.has(rutaActivaGlobal);
  boton.textContent = resuelto ? '✓ Completado' : 'Marcar Resuelto';
  boton.classList.toggle('active', resuelto);
}

function renderLineaTerminal({ nivel, origen, meta, texto }) {
  // Lo que escribes tú en soluciones.js
  if (origen === 'usuario') {
    return `<div class="t-log ${nivel}"><span class="t-log-tag">${escapar(nivel)}</span><span class="t-log-texto">${escapar(texto)}</span></div>`;
  }

  switch (meta?.tipo) {
    case 'solucion':
      return `
        <div class="t-solucion ${escapar(meta.estado)}">
          <span class="t-sol-nombre">${escapar(meta.nombre)}</span>
          <span class="t-sol-meta">
            <span class="t-sol-aciertos">${escapar(meta.aciertos)}</span>
            <span>⏱ ${escapar(meta.tiempo)}</span>
            ${meta.nota ? `<span class="t-sol-nota ${escapar(meta.rendimiento)}">${escapar(meta.nota)}</span>` : ''}
          </span>
        </div>`;
    case 'caso':
      return `
        <div class="t-caso ${escapar(meta.estado)}">
          <span class="t-icono">${escapar(meta.icono)}</span>
          <span class="t-llamada">${escapar(meta.llamada)}</span>
          ${meta.resultado ? `<span class="t-flecha">→</span><span class="t-resultado">${escapar(meta.resultado)}</span>` : ''}
        </div>`;
    case 'detalle':
      return `<div class="t-detalle"><span class="t-etiqueta">${escapar(meta.etiqueta)}</span><span class="t-valor">${escapar(meta.valor)}</span></div>`;
    default:
      return `<div class="t-info">${escapar(texto)}</div>`;
  }
}

function resumirEjecucion(registro, error) {
  if (error) {
    return {
      estado: 'Error',
      claseEstado: 'status-error',
      detalle: 'Ejecución interrumpida',
      claseDetalle: 'error',
    };
  }

  const soluciones = registro.filter((linea) => linea.meta?.tipo === 'solucion');
  const casos = registro.filter(
    (linea) => linea.meta?.tipo === 'caso' && linea.meta.estado !== 'demo'
  );
  const aciertos = casos.filter(
    (linea) => linea.meta.estado === 'ok' || linea.meta.estado === 'libre'
  ).length;
  const fallos = casos.filter(
    (linea) => linea.meta.estado === 'fallo' || linea.meta.estado === 'error'
  ).length;
  const pendientes = casos.filter((linea) => linea.meta.estado === 'pendiente').length;

  let estado;
  let claseEstado;
  if (!soluciones.length) {
    estado = 'Sin soluciones';
    claseEstado = 'status-error';
  } else if (fallos > 0) {
    estado = 'Con fallos';
    claseEstado = 'status-error';
  } else if (pendientes > 0) {
    estado = 'Pendiente';
    claseEstado = 'status-pendiente';
  } else {
    estado = 'Completed';
    claseEstado = 'status-ok';
  }

  const detalle = casos.length
    ? `${aciertos}/${casos.length} casos · ${soluciones.length} ${
        soluciones.length === 1 ? 'solución' : 'soluciones'
      }`
    : `${soluciones.length} ${soluciones.length === 1 ? 'solución' : 'soluciones'} · sin casos`;

  return {
    estado,
    claseEstado,
    detalle,
    claseDetalle:
      !soluciones.length || fallos > 0 ? 'error' : pendientes > 0 ? 'warn' : 'ok',
  };
}

function construirVista({ ejercicio, modulo, salidaHTML, error, registro, tiempo, editor }) {
  const resuelto = completados.has(ejercicio.rutaReal);
  const numero = modulo.numero ?? ejercicio.numeroCarpeta;
  const resumen = resumirEjecucion(registro, error);

  const lineasConsola = registro.map(renderLineaTerminal).join('');

  const cuerpoSalida = error
    ? `<div class="error-box"><h3>EXECUTION ERROR</h3><code>${escapar(error?.message ?? error)}</code></div>`
    : salidaHTML;

  const estadoEditor = editor.error
    ? `<span class="editor-estado-error">⚠️ ${escapar(editor.error)}</span>`
    : editor.vacio
      ? '<span class="editor-estado-vacio">Escribe una función para probarla contra los casos</span>'
      : `<span class="editor-estado-ok">✓ ${editor.funciones} ${
          editor.funciones === 1 ? 'función detectada' : 'funciones detectadas'
        } · guardado en este navegador</span>`;

  return `
    <div class="workspace-grid">
      <div class="panel-izquierdo">
        <div class="card-bloque">
          <div class="card-header-internal">
            <h2 class="title-consigna">● CONSIGNA / ENUNCIADO</h2>
            <div class="header-actions-right">
              <button type="button" data-accion="completar" class="btn-solved-header ${resuelto ? 'active' : ''}">
                ${resuelto ? '✓ Completado' : 'Marcar Resuelto'}
              </button>
              <span class="badge-exercise">Ejercicio ${escapar(numero)}</span>
            </div>
          </div>
          <p class="enunciado-text-style">${escapar(modulo.enunciado || 'Sin descripción proporcionada.')}</p>
          <div class="card-footer-tags">
            <span>● Dificultad: <strong class="diff-style">${escapar(ejercicio.dificultad)}</strong></span>
            <span class="tags-style">Tags: ${escapar(formatearTags(modulo.tags))}</span>
          </div>
        </div>

        <div class="card-bloque card-editor">
          <div class="card-header-internal">
            <h2 class="title-editor">● TU CÓDIGO</h2>
            <div class="header-actions-right">
              <button type="button" data-accion="limpiar-editor" class="btn-solved-header">Limpiar</button>
              <span class="badge-dom">Editor local</span>
            </div>
          </div>
          <label class="sr-only" for="editor-codigo">Escribe tu solución para este ejercicio</label>
          <textarea
            id="editor-codigo"
            class="editor-codigo"
            rows="9"
            spellcheck="false"
            autocomplete="off"
            autocapitalize="off"
            placeholder="// Escribe aquí tu solución, por ejemplo:&#10;// function miSolucion(n) { ... }&#10;//&#10;// Se compila y se ejecuta contra los mismos casos que el resto."
          >${escapar(editor.fuente)}</textarea>
          <div class="editor-pie">
            ${estadoEditor}
            <span class="editor-atajo">Ctrl/Cmd + Enter → ejecutar</span>
          </div>
        </div>

        <div class="card-bloque">
          <div class="card-header-internal">
            <h2 class="title-html">● RESULTADOS DE EJECUCIÓN</h2>
            <span class="badge-dom">Test Output</span>
          </div>
          <div class="output-content">${cuerpoSalida}</div>
          <div class="card-footer-status">
            <span class="status-lbl ${resumen.claseEstado}">Status: ${escapar(resumen.estado)}</span>
            <span class="sync-lbl ${resumen.claseDetalle}">${escapar(resumen.detalle)}</span>
          </div>
        </div>
      </div>

      <div class="panel-derecho">
        <div class="terminal-box">
          <div class="terminal-header">
            <span class="terminal-title">● TERMINAL</span>
            <div class="terminal-actions-group">
              <button type="button" data-accion="ejecutar" class="btn-terminal-run">⚡ Ejecutar código</button>
              <span class="timer-tag">${tiempo}MS</span>
            </div>
          </div>
          <div
            class="fake-console"
            role="log"
            aria-live="polite"
            aria-atomic="false"
            aria-label="Registro de ejecución"
          >
            ${lineasConsola || '<div class="t-info">No se registraron logs.</div>'}
            <div class="t-cursor"><span class="prompt">›</span><span class="cursor-terminal"> </span></div>
          </div>
        </div>
      </div>
    </div>`;
}

/* ============================================================
   EJECUCIÓN
   ============================================================ */
async function ejecutarEjercicio(ruta) {
  if (!ruta) return;

  const ejercicio = catalogoPorRuta.get(ruta);

  if (!ejercicio) {
    restaurarVistaVacia();
    return;
  }

  const idEjecucion = ++ultimaEjecucion;

  let modulo;
  let codigo = '';
  try {
    [modulo, codigo] = await Promise.all([
      cargarEjercicio(ruta),
      cargarCodigo(ruta).catch(() => ''),
    ]);
  } catch (e) {
    if (idEjecucion !== ultimaEjecucion) return;
    mostrarErrorGlobal(
      'ERROR AL CARGAR',
      `No se pudo cargar "${ejercicio.nombreFormateado}": ${e?.message ?? e}`
    );
    return;
  }

  if (idEjecucion !== ultimaEjecucion) return;

  if (!modulo || typeof modulo.ejecutar !== 'function') {
    mostrarErrorGlobal('EJERCICIO INVÁLIDO', `"${ejercicio.nombreFormateado}" no exporta una función "ejecutar".`);
    return;
  }

  const registro = [];
  const opcionesEjercicio = opcionesDe(ruta);
  const fuenteUsuario = leerCodigoDe(ruta);
  const codigoUsuario = compilarCodigoUsuario(fuenteUsuario);
  if (fuenteUsuario !== (leerTexto(claveCodigo(ruta)) ?? '')) guardarCodigoDe(ruta, fuenteUsuario);
  let salida;
  let error = null;
  let tiempo = '0.00';

  console.clear();
  capturarConsola(registro);
  const t0 = performance.now();

  try {
    salida = await modulo.ejecutar({
      solo: opcionesEjercicio.solo,
      colapsadas: opcionesEjercicio.colapsadas,
      codigoAbierto: opcionesEjercicio.codigoAbierto,
      codigo,
      codigoUsuario: {
        fuente: fuenteUsuario,
        soluciones: codigoUsuario.soluciones,
        error: codigoUsuario.error,
      },
    });
  } catch (e) {
    error = e;
  } finally {
    tiempo = (performance.now() - t0).toFixed(2);
    if (idEjecucion === ultimaEjecucion) restaurarConsola();
  }

  if (idEjecucion !== ultimaEjecucion) return;

  // Si el código propio pasó los casos, el ejercicio queda resuelto solo.
  if (codigoResuelto(registro, modulo.solucionesReferencia)) marcarResuelto(ruta);

  const salidaHTML =
    salida === undefined || salida === null
      ? 'El ejercicio no retornó ningún texto específico.'
      : String(salida);

  // Si se vuelve a ejecutar el mismo ejercicio, conserva el scroll y el foco.
  const mismoEjercicio = ruta === rutaRenderizada;
  const scrollY = window.scrollY;
  const elementoActivo = document.activeElement;
  const focoPrevio =
    elementoActivo instanceof HTMLElement && elementoActivo.dataset.accion
      ? {
          accion: elementoActivo.dataset.accion,
          solucion: elementoActivo.dataset.solucion ?? null,
        }
      : null;
  const cursorEditor =
    mismoEjercicio &&
    elementoActivo instanceof HTMLTextAreaElement &&
    elementoActivo.classList.contains('editor-codigo')
      ? { inicio: elementoActivo.selectionStart, fin: elementoActivo.selectionEnd }
      : null;

  contenedorResultado.innerHTML = construirVista({
    ejercicio,
    modulo,
    salidaHTML,
    error,
    registro,
    tiempo,
    editor: {
      fuente: fuenteUsuario,
      error: codigoUsuario.error,
      vacio: codigoUsuario.vacio,
      funciones: codigoUsuario.soluciones.length,
    },
  });

  rutaRenderizada = ruta;
  if (mismoEjercicio) window.scrollTo(0, scrollY);

  if (cursorEditor) {
    const area = contenedorResultado.querySelector('.editor-codigo');
    if (area instanceof HTMLTextAreaElement) {
      area.focus({ preventScroll: true });
      try {
        area.setSelectionRange(cursorEditor.inicio, cursorEditor.fin);
      } catch { /* selección no soportada */ }
    }
  } else if (focoPrevio) {
    const destino = [...contenedorResultado.querySelectorAll('[data-accion]')].find(
      (elemento) =>
        elemento.dataset.accion === focoPrevio.accion &&
        (elemento.dataset.solucion ?? null) === focoPrevio.solucion
    );
    destino?.focus({ preventScroll: true });
  }
}

async function copiarCodigo(boton) {
  const texto = boton.closest('.sol-codigo')?.querySelector('code')?.textContent ?? '';
  try {
    await navigator.clipboard.writeText(texto);
    boton.textContent = '✓ Copiado';
  } catch {
    boton.textContent = 'No se pudo copiar';
  }
  setTimeout(() => { boton.textContent = 'Copiar'; }, 1500);
}

function guardarCompletados() {
  guardarTexto(CLAVE_COMPLETADOS, JSON.stringify([...completados]));
  actualizarContadorInterfaz();
  actualizarListaEjercicios();
  actualizarBotonCompletado();
}

function toggleRetoCompletado(ruta) {
  if (completados.has(ruta)) completados.delete(ruta);
  else completados.add(ruta);
  guardarCompletados();
}

/** Marca resuelto solo si aún no lo estaba (usado por el auto-marcaje). */
function marcarResuelto(ruta) {
  if (!ruta || completados.has(ruta)) return false;
  completados.add(ruta);
  guardarCompletados();
  return true;
}

/* ============================================================
   NAVEGACIÓN: selección de ejercicio y enlaces profundos (#/...)
   ============================================================ */

/** Quita los filtros que dejarían fuera el ejercicio elegido. */
function asegurarVisible(ejercicio) {
  if (selectorCategoria.value !== 'TODOS' && selectorCategoria.value !== ejercicio.categoria) {
    selectorCategoria.value = ejercicio.categoria;
  }
  if (
    selectorDificultad.value !== 'TODOS' &&
    normalizar(selectorDificultad.value) !== ejercicio.dificultadClave
  ) {
    selectorDificultad.value = 'TODOS';
  }
  if (!ejercicio.textoBusqueda.includes(normalizar(buscador.value))) buscador.value = '';
}

/** Refleja la ruta activa en la barra de direcciones como #/origen/año/nn-nombre. */
function sincronizarHash(ruta, modo = 'empujar') {
  const hach = rutaAHach(ruta);
  if ((location.hash || '') === hach) return;
  const url = `${location.pathname}${location.search}${hach}`;
  try {
    if (modo === 'reemplazar') history.replaceState(null, '', url);
    else history.pushState(null, '', url);
  } catch { /* sin historial disponible */ }
}

/** Selecciona, guarda y ejecuta un ejercicio, manteniendo el hash al día. */
function seleccionarEjercicio(ruta, { empujar = true } = {}) {
  if (!catalogoPorRuta.has(ruta)) return false;

  asegurarVisible(catalogoPorRuta.get(ruta));
  rutaActivaGlobal = ruta;
  guardarTexto(CLAVE_ACTIVO, ruta);
  actualizarListaEjercicios();
  ejecutarEjercicio(ruta);
  sincronizarHash(ruta, empujar ? 'empujar' : 'reemplazar');
  return true;
}

// Navegación con el botón atrás/adelante del navegador
window.addEventListener(
  'hashchange',
  () => {
    const ruta = hachARuta(location.hash);
    if (!ruta) {
      // Hash vacío o inválido: devolvemos la vista al ejercicio activo
      if (rutaActivaGlobal) sincronizarHash(rutaActivaGlobal, 'reemplazar');
      return;
    }
    if (ruta === rutaActivaGlobal) return;
    if (!seleccionarEjercicio(ruta, { empujar: false })) {
      sincronizarHash(rutaActivaGlobal, 'reemplazar');
    }
  },
  { signal }
);

/* ============================================================
   ATAJOS DE TECLADO
   ============================================================ */
const esEditable = (elemento) =>
  elemento instanceof HTMLElement &&
  (elemento.isContentEditable ||
    ['INPUT', 'TEXTAREA', 'SELECT'].includes(elemento.tagName));

document.addEventListener(
  'keydown',
  (evento) => {
    const combinado = evento.ctrlKey || evento.metaKey;

    // Ctrl/Cmd + Enter → ejecutar el ejercicio activo
    if (combinado && evento.key === 'Enter') {
      if (!rutaActivaGlobal) return;
      evento.preventDefault();
      clearTimeout(temporizadorCodigo);
      const area = contenedorResultado.querySelector('.editor-codigo');
      if (area instanceof HTMLTextAreaElement) guardarCodigoDe(rutaActivaGlobal, area.value);
      ejecutarEjercicio(rutaActivaGlobal);
      return;
    }

    // Ctrl/Cmd + K → enfocar el buscador
    if (combinado && evento.key.toLowerCase() === 'k') {
      evento.preventDefault();
      buscador.focus();
      buscador.select();
      return;
    }

    // "/" → enfocar el buscador (salvo que se esté escribiendo en algún campo)
    if (evento.key === '/' && !combinado && !evento.altKey && !esEditable(evento.target)) {
      evento.preventDefault();
      buscador.focus();
      buscador.select();
    }
  },
  { signal }
);

/* ============================================================
   EVENTOS (delegación; se limpian solos con el AbortController)
   ============================================================ */
contenedorResultado.addEventListener(
  'click',
  (evento) => {
    const boton = evento.target.closest('[data-accion]');
    if (!boton || !rutaActivaGlobal) return;

    const accion = boton.dataset.accion;

    if (accion === 'completar') toggleRetoCompletado(rutaActivaGlobal);
    if (accion === 'ejecutar') ejecutarEjercicio(rutaActivaGlobal);
    if (accion === 'copiar') copiarCodigo(boton);

    if (accion === 'limpiar-editor') {
      const area = contenedorResultado.querySelector('.editor-codigo');
      if (!(area instanceof HTMLTextAreaElement) || !area.value) return;
      if (!window.confirm('¿Borrar el código guardado de este ejercicio?')) return;
      area.value = '';
      guardarCodigoDe(rutaActivaGlobal, '');
      ejecutarEjercicio(rutaActivaGlobal);
    }

    if (accion === 'solo') {
      evento.preventDefault(); // el botón vive dentro de <summary>: no plegar el bloque
      const op = opcionesDe(rutaActivaGlobal);
      const nombre = boton.dataset.solucion || null;
      op.solo = op.solo === nombre ? null : nombre;
      guardarOpciones();
      ejecutarEjercicio(rutaActivaGlobal);
    }
  },
  { signal }
);

// Recuerda qué bloques de solución están plegados
contenedorResultado.addEventListener(
  'toggle',
  (evento) => {
    const detalle = evento.target;
    if (!(detalle instanceof HTMLDetailsElement) || !rutaActivaGlobal) return;

    const campo = detalle.classList.contains('sol-bloque')
      ? 'colapsadas'
      : detalle.classList.contains('sol-codigo')
        ? 'codigoAbierto'
        : null;
    if (!campo) return;

    const op = opcionesDe(rutaActivaGlobal);
    const lista = new Set(op[campo]);
    // "colapsadas" guarda los cerrados; "codigoAbierto" guarda los abiertos
    const guardar = campo === 'colapsadas' ? !detalle.open : detalle.open;
    if (guardar) lista.add(detalle.dataset.nombre);
    else lista.delete(detalle.dataset.nombre);

    op[campo] = [...lista];
    guardarOpciones();
  },
  { capture: true, signal } // "toggle" no burbujea
);

selectorCategoria.addEventListener('change', actualizarListaEjercicios, { signal });
selectorDificultad.addEventListener('change', actualizarListaEjercicios, { signal });
buscador.addEventListener('input', actualizarListaEjercicios, { signal });

// Guarda lo que escribes en el editor (con una pequeña pausa)
contenedorResultado.addEventListener(
  'input',
  (evento) => {
    const area = evento.target;
    if (!(area instanceof HTMLTextAreaElement) || !area.classList.contains('editor-codigo')) return;
    const ruta = rutaActivaGlobal;
    if (!ruta) return;
    clearTimeout(temporizadorCodigo);
    temporizadorCodigo = setTimeout(() => guardarCodigoDe(ruta, area.value), 300);
  },
  { signal }
);

selectorEjercicios.addEventListener(
  'change',
  (evento) => {
    const ruta = evento.target.value;
    if (!ruta) {
      borrarClave(CLAVE_ACTIVO);
      rutaActivaGlobal = '';
      restaurarVistaVacia();
      sincronizarHash('');
      return;
    }
    seleccionarEjercicio(ruta);
  },
  { signal }
);

/* ============================================================
   INICIO
   ============================================================ */
function inicializarLaboratorio() {
  actualizarVersion();
  catalogo = construirCatalogo();
  catalogoPorRuta = new Map(catalogo.map((e) => [e.rutaReal, e]));

  poblarCategorias();
  actualizarContadorInterfaz();
  actualizarListaEjercicios();

  // Prioridad: enlace profundo (#/origen/año/nn-nombre) > último ejercicio guardado
  const rutaDesdeHach = hachARuta(location.hash);
  const rutaGuardada = migrarRuta(leerTexto(CLAVE_ACTIVO));
  const rutaInicial = catalogoPorRuta.has(rutaDesdeHach)
    ? rutaDesdeHach
    : catalogoPorRuta.has(rutaGuardada)
      ? rutaGuardada
      : '';

  if (rutaInicial) {
    seleccionarEjercicio(rutaInicial, { empujar: false });
  } else {
    restaurarVistaVacia();
    if (location.hash) sincronizarHash('', 'reemplazar'); // hash que no corresponde a ningún ejercicio
  }
}

try {
  inicializarLaboratorio();
} catch (error) {
  console.error('Error al inicializar el laboratorio:', error);
  mostrarErrorGlobal('ERROR DE INICIALIZACIÓN', error.message);
}

/* ============================================================
   RECARGA EN CALIENTE: al guardar soluciones.js o index.js se
   vuelve a ejecutar el ejercicio activo sin recargar la página
   ============================================================ */
if (import.meta.hot) {
  import.meta.hot.accept();
  import.meta.hot.dispose(() => {
    controlador.abort(); // quita todos los listeners de esta versión
    clearTimeout(temporizadorCodigo);
    // Guarda lo que quedó pendiente de escribir en el editor
    const area = document.querySelector('.editor-codigo');
    if (area instanceof HTMLTextAreaElement && rutaActivaGlobal) {
      guardarCodigoDe(rutaActivaGlobal, area.value);
    }
    ultimaEjecucion++;
    cacheEjercicios.clear();
    cacheCodigo.clear();
    restaurarConsola();
  });
}