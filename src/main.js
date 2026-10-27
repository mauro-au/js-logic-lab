import './style.css';

const selectorCategoria = document.getElementById('selector-categoria');
const selectorDificultad = document.getElementById('selector-dificultad');
const buscador = document.getElementById('buscador-ejercicios');
const selectorEjercicios = document.getElementById('selector-ejercicios');
const contenedorResultado = document.getElementById('resultado');
const contadorProgreso = document.getElementById('contador-progreso');

const modulosEjercicios = import.meta.glob('./exercises/**/*.js');

// Estado de memoria global intacto
let mapaEjercicios = []; 
let retosCompletados = JSON.parse(localStorage.getItem('retosCompletados')) || [];
let rutaActivaGlobal = ""; 

async function inicializarLaboratorio() {
  const rutas = Object.keys(modulosEjercicios);
  const categoriasSet = new Set();

  contenedorResultado.innerHTML = `<div class="placeholder-box"><p>⚙️ Indexando metadatos...</p></div>`;

  mapaEjercicios = await Promise.all(rutas.map(async (ruta) => {
    const segmentos = ruta.replace('./exercises/', '').replace('.js', '').split('/');
    const categoria = segmentos.length > 2 ? `${segmentos[0]} ➔ ${segmentos[1]}` : segmentos[0];
    const nombreReto = segmentos[segmentos.length - 1];

    let dlcArchivo = "MEDIO"; 
    const nombreEjercicioPlantilla = nombreReto.replaceAll('-', ' ').toUpperCase();

    try {
      const moduloInmediato = await modulosEjercicios[ruta]();
      if (moduloInmediato && moduloInmediato.dificultad) {
        dlcArchivo = moduloInmediato.dificultad.toUpperCase().trim();
      }
    } catch (e) {
      console.warn(`No se pudo leer la metadata de: ${ruta}`, e);
    }

    categoriasSet.add(categoria.toUpperCase());

    return {
      rutaReal: ruta,
      categoria: categoria.toUpperCase(),
      dificultad: dlcArchivo,
      nombreFormateado: nombreEjercicioPlantilla
    };
  }));

  selectorCategoria.innerHTML = '<option value="TODOS">⚡ Todas las fuentes</option>';
  categoriasSet.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    selectorCategoria.appendChild(option);
  });

  actualizarContadorInterfaz();
  actualizarListaEjercicios();

  const ejercicioGuardado = localStorage.getItem('ejercicioActivo');
  if (ejercicioGuardado && modulosEjercicios[ejercicioGuardado]) {
    const encontrado = mapaEjercicios.find(e => e.rutaReal === ejercicioGuardado);
    if (encontrado) {
      selectorCategoria.value = encontrado.categoria;
      actualizarListaEjercicios();
      selectorEjercicios.value = ejercicioGuardado;
      rutaActivaGlobal = ejercicioGuardado;
      ejecutarEjercicio(ejercicioGuardado);
    } else {
      restaurarVistaVacia();
    }
  } else {
    restaurarVistaVacia();
  }
}

function restaurarVistaVacia() {
  contenedorResultado.innerHTML = `
    <div class="placeholder-box">
      <p>Selecciona un ejercicio del panel superior para inicializar el entorno de pruebas.</p>
    </div>`;
}

function actualizarContadorInterfaz() {
  const totalRetos = mapaEjercicios.length;
  const completadosValidos = retosCompletados.filter(ruta => mapaEjercicios.some(e => e.rutaReal === ruta)).length;
  contadorProgreso.innerHTML = `<span class="dot-green">●</span> Completados: <strong>${completadosValidos}/${totalRetos}</strong>`;
}

function actualizarListaEjercicios() {
  const catSeleccionada = selectorCategoria.value;
  const difSeleccionada = selectorDificultad.value;
  const textoBusqueda = buscador.value.toLowerCase().trim();

  selectorEjercicios.innerHTML = '<option value="">-- Elige un reto de la lista --</option>';

  const filtrados = mapaEjercicios.filter((ejercicio) => {
    const coincideCategoria = catSeleccionada === 'TODOS' || ejercicio.categoria === catSeleccionada;
    const coincideDificultad = difSeleccionada === 'TODOS' || ejercicio.dificultad === difSeleccionada;
    const coincideBusqueda = ejercicio.nombreFormateado.toLowerCase().includes(textoBusqueda);
    return coincideCategoria && coincideDificultad && coincideBusqueda;
  });

  filtrados.forEach((ej) => {
    const option = document.createElement('option');
    option.value = ej.rutaReal;
    const prefijoCheck = retosCompletados.includes(ej.rutaReal) ? '✅ ' : '⬜ ';
    option.textContent = `${prefijoCheck} ${ej.nombreFormateado} (${ej.dificultad})`;
    selectorEjercicios.appendChild(option);
  });
}

async function ejecutarEjercicio(rutaSeleccionada) {
  if (!rutaSeleccionada) return;

  try {
    const modulo = await modulosEjercicios[rutaSeleccionada]();

    if (modulo && typeof modulo.ejecutar === 'function') {
      const logsOriginales = [];
      const consoleLogOriginal = console.log;

      console.log = (...args) => {
        const mensaje = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : arg).join(' ');
        logsOriginales.push(mensaje);
        consoleLogOriginal(...args);
      };

      console.clear();
      const t0 = performance.now();
      const htmlRetorno = modulo.ejecutar() || "El ejercicio no retornó ningún texto específico.";
      const t1 = performance.now();
      const tiempoEjecucion = (t1 - t0).toFixed(2);
      
      console.log = consoleLogOriginal;

      const enunciadoText = modulo.enunciado || "Sin descripción proporcionada.";
      const numeroEjercicio = modulo.numero || "01";
      const dlc = modulo.dificultad || "Medio";
      const tags = modulo.tags || "General";

      const lineasConsolaHTML = logsOriginales
        .map(log => `<div class="console-line"><span class="prompt">›</span> ${log}</div>`)
        .join('');

      const estaResuelto = retosCompletados.includes(rutaSeleccionada);
      const textoBotonResolver = estaResuelto ? '✓ Completado' : 'Marcar Resuelto';
      const claseBotonResolver = estaResuelto ? 'btn-solved-header active' : 'btn-solved-header';

      // Maquetación simétrica de doble columna inyectando los botones en cabeceras
      contenedorResultado.innerHTML = `
        <div class="workspace-grid">
          <div class="panel-izquierdo">
            <div class="card-bloque">
              <div class="card-header-internal">
                <h5 class="title-consigna">● CONSIGNA / ENUNCIADO</h5>
                <div class="header-actions-right">
                  <button id="btn-completar-reto" class="${claseBotonResolver}">${textoBotonResolver}</button>
                  <span class="badge-exercise">Ejercicio ${numeroEjercicio}</span>
                </div>
              </div>
              <p class="enunciado-text-style">${enunciadoText}</p>
              <div class="card-footer-tags">
                <span>● Dificultad: <strong class="diff-style">${dlc.toUpperCase()}</strong></span>
                <span class="tags-style">Tags: ${tags}</span>
              </div>
            </div>
            
            <div class="card-bloque">
              <div class="card-header-internal">
                <h5 class="title-html">● VISTA EN PANTALLA (HTML)</h5>
                <span class="badge-dom">DOM Output</span>
              </div>
              <div class="output-content">${htmlRetorno}</div>
              <div class="card-footer-status">
                <span class="status-lbl">Status: Completed</span>
                <span class="sync-lbl">✓ Sync with console</span>
              </div>
            </div>
          </div>

          <div class="panel-derecho">
            <div class="terminal-box">
              <div class="terminal-header">
                <span class="terminal-title">● TERMINAL</span>
                <div class="terminal-actions-group">
                  <!-- 🎯 Botón estilizado y etiquetas de tiempo remanentes (Iconos eliminados) -->
                  <button id="btn-run-terminal" class="btn-terminal-run">⚡ Ejecutar código</button>
                  <span class="timer-tag">${tiempoEjecucion}MS</span>
                </div>
              </div>
              <div class="fake-console">
                ${lineasConsolaHTML || '<div class="console-line text-muted">No se registraron logs.</div>'}
                <div class="console-line"><span class="prompt">›</span><span class="cursor-terminal"> </span></div>
              </div>
            </div>
          </div>
        </div>
      `;

      // Eventos locales re-vinculados perfectamente
      document.getElementById('btn-completar-reto').addEventListener('click', () => {
        toggleRetoCompletado(rutaSeleccionada);
      });

      document.getElementById('btn-run-terminal').addEventListener('click', () => {
        ejecutarEjercicio(rutaActivaGlobal);
      });
    }
  } catch (error) {
    contenedorResultado.innerHTML = `
      <div class="error-box">
        <h5>EXECUTION ERROR</h5>
        <code>${error.message}</code>
      </div>
    `;
  }
}

function toggleRetoCompletado(ruta) {
  const index = retosCompletados.indexOf(ruta);
  if (index > -1) {
    retosCompletados.splice(index, 1);
  } else {
    retosCompletados.push(ruta);
  }
  localStorage.setItem('retosCompletados', JSON.stringify(retosCompletados));
  actualizarContadorInterfaz();
  actualizarListaEjercicios();
  selectorEjercicios.value = ruta;
  ejecutarEjercicio(ruta);
}

selectorCategoria.addEventListener('change', actualizarListaEjercicios);
selectorDificultad.addEventListener('change', actualizarListaEjercicios);
buscador.addEventListener('input', actualizarListaEjercicios);

selectorEjercicios.addEventListener('change', (event) => {
  const rutaSeleccionada = event.target.value;
  if (!rutaSeleccionada) {
    localStorage.removeItem('ejercicioActivo');
    rutaActivaGlobal = "";
    restaurarVistaVacia();
    return;
  }
  rutaActivaGlobal = rutaSeleccionada;
  localStorage.setItem('ejercicioActivo', rutaSeleccionada);
  ejecutarEjercicio(rutaSeleccionada);
});

inicializarLaboratorio().catch((error) => {
  console.error("Error al inicializar el laboratorio:", error);
  contenedorResultado.innerHTML = `
    <div class="error-box">
      <h5>ERROR DE INICIALIZACIÓN</h5>
      <code>${error.message}</code>
    </div>`;
});
