import './style.css';

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

/* ============================================================
   MÓDULOS (carga inmediata: metadatos y ejecución sin async)
   Estructura esperada: ./exercises/<origen>/<año>/NN-nombre/index.js
   ============================================================ */
const modulosEjercicios = import.meta.glob('./exercises/**/index.js', { eager: true });

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

// Quita tildes, pasa a mayúsculas y recorta: "Fácil " -> "FACIL"
const normalizar = (texto) =>
  String(texto ?? '')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toUpperCase()
    .trim();

const DIFICULTADES = { FACIL: 'FÁCIL', MEDIO: 'MEDIO', DIFICIL: 'DIFÍCIL' };

const formatearTags = (tags) => {
  if (Array.isArray(tags)) return tags.join(', ');
  return tags ? String(tags) : 'General';
};

// Convierte cualquier valor en texto sin romperse (circulares, Map, Set, BigInt...)
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
  return String(arg); // number, boolean, undefined, null, symbol
}

/* ============================================================
   ALMACENAMIENTO SEGURO (localStorage puede fallar o estar corrupto)
   ============================================================ */
const CLAVE_COMPLETADOS = 'retosCompletados';
const CLAVE_ACTIVO = 'ejercicioActivo';

const leerTexto = (clave) => {
  try { return localStorage.getItem(clave); } catch { return null; }
};
const guardarTexto = (clave, valor) => {
  try { localStorage.setItem(clave, valor); } catch { /* sin almacenamiento */ }
};
const borrarClave = (clave) => {
  try { localStorage.removeItem(clave); } catch { /* sin almacenamiento */ }
};

// Migra rutas antiguas (./x/01-a.js) a la nueva estructura (./x/01-a/index.js)
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

/* ============================================================
   ESTADO
   ============================================================ */
const completados = cargarCompletados();
let catalogo = [];
let catalogoPorRuta = new Map();
let rutaActivaGlobal = '';
let ultimaEjecucion = 0; // evita que una ejecución antigua pise a una nueva

/* ============================================================
   CAPTURA DE CONSOLA (siempre se restaura)
   ============================================================ */
const consolaOriginal = {
  log: console.log,
  info: console.info,
  warn: console.warn,
  error: console.error,
};

function capturarConsola(registro) {
  for (const nivel of Object.keys(consolaOriginal)) {
    console[nivel] = (...args) => {
      registro.push({ nivel, texto: args.map(formatearArgumento).join(' ') });
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
  return Object.entries(modulosEjercicios)
    .map(([ruta, modulo]) => {
      const segmentos = ruta
        .replace('./exercises/', '')
        .replace(/\/index\.js$/, '')
        .split('/');
      const nombreReto = segmentos.pop();
      const categoria = segmentos.length ? segmentos.join(' ➔ ') : 'GENERAL';
      const dificultad = DIFICULTADES[normalizar(modulo?.dificultad)] ?? 'MEDIO';
      const nombreLegible = nombreReto.replaceAll('-', ' ');

      return {
        rutaReal: ruta,
        categoria: categoria.toUpperCase(),
        dificultad,
        dificultadClave: normalizar(dificultad),
        nombreFormateado: nombreLegible.toUpperCase(),
        numeroCarpeta: nombreReto.match(/^\d+/)?.[0] ?? '--',
        textoBusqueda: normalizar(`${nombreLegible} ${formatearTags(modulo?.tags)}`),
      };
    })
    .sort((a, b) => a.rutaReal.localeCompare(b.rutaReal, 'es', { numeric: true }));
}

/* ============================================================
   INTERFAZ
   ============================================================ */
function restaurarVistaVacia() {
  ultimaEjecucion++;
  restaurarConsola();
  contenedorResultado.innerHTML = `
    <div class="placeholder-box">
      <p>Selecciona un ejercicio del panel superior para inicializar el entorno de pruebas.</p>
    </div>`;
}

function mostrarErrorGlobal(titulo, mensaje) {
  contenedorResultado.innerHTML = `
    <div class="error-box">
      <h5>${escapar(titulo)}</h5>
      <code>${escapar(mensaje)}</code>
    </div>`;
}

function actualizarContadorInterfaz() {
  const total = catalogo.length;
  const validos = [...completados].filter((r) => catalogoPorRuta.has(r)).length;
  contadorProgreso.innerHTML = `<span class="dot-green">●</span> Completados: <strong>${validos}/${total}</strong>`;
  if (totalEjerciciosEl) totalEjerciciosEl.textContent = String(total);
}

function poblarCategorias() {
  const categorias = [...new Set(catalogo.map((e) => e.categoria))].sort();
  selectorCategoria.replaceChildren(new Option('⚡ Todas las fuentes', 'TODOS'));
  categorias.forEach((cat) => selectorCategoria.append(new Option(cat, cat)));
}

function actualizarListaEjercicios() {
  const categoria = selectorCategoria.value;
  const dificultad = normalizar(selectorDificultad.value);
  const texto = normalizar(buscador.value);

  const opciones = [new Option('-- Elige un reto de la lista --', '')];

  catalogo
    .filter(
      (e) =>
        (categoria === 'TODOS' || e.categoria === categoria) &&
        (dificultad === 'TODOS' || e.dificultadClave === dificultad) &&
        e.textoBusqueda.includes(texto)
    )
    .forEach((e) => {
      const check = completados.has(e.rutaReal) ? '✅' : '⬜';
      opciones.push(new Option(`${check} ${e.nombreFormateado} (${e.dificultad})`, e.rutaReal));
    });

  selectorEjercicios.replaceChildren(...opciones);

  // Mantiene la selección activa si sigue visible en el filtro
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

function construirVista({ ejercicio, modulo, salidaHTML, error, registro, tiempo }) {
  const resuelto = completados.has(ejercicio.rutaReal);
  const numero = modulo.numero ?? ejercicio.numeroCarpeta;

  const lineasConsola = registro
    .map(
      ({ nivel, texto }) =>
        `<div class="console-line ${nivel}"><span class="prompt">›</span> ${escapar(texto)}</div>`
    )
    .join('');

  const cuerpoSalida = error
    ? `<div class="error-box"><h5>EXECUTION ERROR</h5><code>${escapar(error?.message ?? error)}</code></div>`
    : salidaHTML; // HTML del propio ejercicio (contenido de confianza)

  return `
    <div class="workspace-grid">
      <div class="panel-izquierdo">
        <div class="card-bloque">
          <div class="card-header-internal">
            <h5 class="title-consigna">● CONSIGNA / ENUNCIADO</h5>
            <div class="header-actions-right">
              <button data-accion="completar" class="btn-solved-header ${resuelto ? 'active' : ''}">
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

        <div class="card-bloque">
          <div class="card-header-internal">
            <h5 class="title-html">● VISTA EN PANTALLA (HTML)</h5>
            <span class="badge-dom">DOM Output</span>
          </div>
          <div class="output-content">${cuerpoSalida}</div>
          <div class="card-footer-status">
            <span class="status-lbl ${error ? 'status-error' : ''}">Status: ${error ? 'Error' : 'Completed'}</span>
            <span class="sync-lbl">✓ Sync with console</span>
          </div>
        </div>
      </div>

      <div class="panel-derecho">
        <div class="terminal-box">
          <div class="terminal-header">
            <span class="terminal-title">● TERMINAL</span>
            <div class="terminal-actions-group">
              <button data-accion="ejecutar" class="btn-terminal-run">⚡ Ejecutar código</button>
              <span class="timer-tag">${tiempo}MS</span>
            </div>
          </div>
          <div class="fake-console">
            ${lineasConsola || '<div class="console-line text-muted">No se registraron logs.</div>'}
            <div class="console-line"><span class="prompt">›</span><span class="cursor-terminal"> </span></div>
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
  const modulo = modulosEjercicios[ruta];

  if (!ejercicio || !modulo) {
    restaurarVistaVacia();
    return;
  }
  if (typeof modulo.ejecutar !== 'function') {
    mostrarErrorGlobal('EJERCICIO INVÁLIDO', `"${ejercicio.nombreFormateado}" no exporta una función "ejecutar".`);
    return;
  }

  const idEjecucion = ++ultimaEjecucion;
  const registro = [];
  let salida;
  let error = null;
  let tiempo = '0.00';

  console.clear();
  capturarConsola(registro);
  const t0 = performance.now();

  try {
    salida = await modulo.ejecutar(); // soporta funciones síncronas y async
  } catch (e) {
    error = e;
  } finally {
    tiempo = (performance.now() - t0).toFixed(2);
    // Solo restaura si nadie más tomó el control de la consola
    if (idEjecucion === ultimaEjecucion) restaurarConsola();
  }

  if (idEjecucion !== ultimaEjecucion) return; // el usuario cambió de ejercicio

  const salidaHTML =
    salida === undefined || salida === null
      ? 'El ejercicio no retornó ningún texto específico.'
      : String(salida);

  contenedorResultado.innerHTML = construirVista({
    ejercicio,
    modulo,
    salidaHTML,
    error,
    registro,
    tiempo,
  });
}

function toggleRetoCompletado(ruta) {
  if (completados.has(ruta)) completados.delete(ruta);
  else completados.add(ruta);

  guardarTexto(CLAVE_COMPLETADOS, JSON.stringify([...completados]));
  actualizarContadorInterfaz();
  actualizarListaEjercicios();
  actualizarBotonCompletado(); // sin re-ejecutar el ejercicio
}

/* ============================================================
   EVENTOS (delegación: se registran una sola vez)
   ============================================================ */
contenedorResultado.addEventListener('click', (evento) => {
  const boton = evento.target.closest('[data-accion]');
  if (!boton || !rutaActivaGlobal) return;

  if (boton.dataset.accion === 'completar') toggleRetoCompletado(rutaActivaGlobal);
  if (boton.dataset.accion === 'ejecutar') ejecutarEjercicio(rutaActivaGlobal);
});

selectorCategoria.addEventListener('change', actualizarListaEjercicios);
selectorDificultad.addEventListener('change', actualizarListaEjercicios);
buscador.addEventListener('input', actualizarListaEjercicios);

selectorEjercicios.addEventListener('change', (evento) => {
  const ruta = evento.target.value;
  if (!ruta) {
    borrarClave(CLAVE_ACTIVO);
    rutaActivaGlobal = '';
    restaurarVistaVacia();
    return;
  }
  rutaActivaGlobal = ruta;
  guardarTexto(CLAVE_ACTIVO, ruta);
  ejecutarEjercicio(ruta);
});

/* ============================================================
   INICIO
   ============================================================ */
function inicializarLaboratorio() {
  catalogo = construirCatalogo();
  catalogoPorRuta = new Map(catalogo.map((e) => [e.rutaReal, e]));

  poblarCategorias();
  actualizarContadorInterfaz();
  actualizarListaEjercicios();

  const guardado = migrarRuta(leerTexto(CLAVE_ACTIVO));
  const ejercicio = catalogoPorRuta.get(guardado);

  if (ejercicio) {
    selectorCategoria.value = ejercicio.categoria;
    rutaActivaGlobal = guardado;
    guardarTexto(CLAVE_ACTIVO, guardado);
    actualizarListaEjercicios();
    ejecutarEjercicio(guardado);
  } else {
    restaurarVistaVacia();
  }
}

try {
  inicializarLaboratorio();
} catch (error) {
  console.error('Error al inicializar el laboratorio:', error);
  mostrarErrorGlobal('ERROR DE INICIALIZACIÓN', error.message);
}