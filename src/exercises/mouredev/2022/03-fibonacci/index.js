export const numero = '03';
export const dificultad = 'Medio';
export const tags = ['recursión', 'bucles', 'secuencias', 'números'];

export const enunciado = `Escribe un programa que imprima los 50 primeros números de la sucesión de Fibonacci empezando en 0.
- La serie Fibonacci se compone por una sucesión de números en la que el siguiente siempre es la suma de los dos anteriores.
  0, 1, 1, 2, 3, 5, 8, 13...`;

const CANTIDAD = 50;

/**
 * Retorna los primeros "cantidad" números de la sucesión de Fibonacci, empezando en 0.
 * @param {number} cantidad
 * @returns {Array<number|bigint>}
 */
function fibonacci(cantidad) {
  // TODO: implementa aquí tu solución.
  // Mientras no la implementes, retorna null y los casos se marcan como "pendiente".
  // Pista: a partir del término 79 los Number pierden precisión (límite de 2^53).
  // Para 50 términos no hay problema, pero tenlo presente si amplías la cantidad.
  return null;
}

// Casos de prueba: agrega todos los que quieras
const casos = [
  { entrada: 1, esperado: [0] },
  { entrada: 2, esperado: [0, 1] },
  { entrada: 8, esperado: [0, 1, 1, 2, 3, 5, 8, 13] },
  { entrada: 0, esperado: [] },
];

const escapar = (valor) =>
  String(valor).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

const formatear = (lista) =>
  Array.isArray(lista) ? `[${lista.map(String).join(', ')}]` : String(lista);

function evaluar(caso) {
  const obtenido = fibonacci(caso.entrada);

  let estado = 'ok';
  if (obtenido === null || obtenido === undefined) estado = 'pendiente';
  else if (formatear(obtenido) !== formatear(caso.esperado)) estado = 'fallo';

  return { entrada: caso.entrada, esperado: caso.esperado, obtenido, estado };
}

const ICONOS = { ok: '✅', fallo: '❌', pendiente: '⏳' };

export function ejecutar() {
  const resultados = casos.map(evaluar);

  resultados.forEach(({ entrada, esperado, obtenido, estado }) => {
    console.log(
      `${ICONOS[estado]} fibonacci(${entrada}) → obtenido: ${formatear(obtenido)} | esperado: ${formatear(esperado)}`
    );
  });

  const pasados = resultados.filter((r) => r.estado === 'ok').length;
  console.log(`Resultado: ${pasados}/${resultados.length} casos correctos`);

  // Reto principal: los primeros 50 números
  const serie = fibonacci(CANTIDAD);
  console.log(`Serie (${CANTIDAD} términos):`, Array.isArray(serie) ? serie.map(String).join(', ') : 'pendiente');

  // Lo que se retorna se inserta como HTML en "Vista en pantalla"
  const filas = resultados
    .map(
      ({ entrada, esperado, obtenido, estado }) => `
      <tr>
        <td>${ICONOS[estado]}</td>
        <td>${escapar(entrada)}</td>
        <td>${escapar(formatear(esperado))}</td>
        <td>${escapar(formatear(obtenido))}</td>
      </tr>`
    )
    .join('');

  const bloqueSerie = Array.isArray(serie)
    ? `<p style="word-break:break-word">${escapar(serie.map(String).join(', '))}</p>`
    : '<p>⏳ Pendiente de implementar.</p>';

  return `
    <p><strong>${pasados}/${resultados.length}</strong> casos correctos</p>
    <table style="width:100%;border-collapse:collapse;text-align:left">
      <thead>
        <tr><th></th><th>Cantidad</th><th>Esperado</th><th>Obtenido</th></tr>
      </thead>
      <tbody>${filas}</tbody>
    </table>
    <h4>Primeros ${CANTIDAD} números</h4>
    ${bloqueSerie}`;
}