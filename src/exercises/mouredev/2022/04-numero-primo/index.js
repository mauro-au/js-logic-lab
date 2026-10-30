export const numero = '04';
export const dificultad = 'Medio';
export const tags = ['números', 'bucles', 'divisibilidad', 'optimización'];

export const enunciado = `Escribe un programa que se encargue de comprobar si un número es o no primo.
Hecho esto, imprime los números primos entre 1 y 100.
- Un número primo es un número natural mayor que 1 que solo es divisible por 1 y por sí mismo.`;

const LIMITE = 100;

// Los 25 primos entre 1 y 100, usados para verificar tu solución
const PRIMOS_HASTA_100 = [
  2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47,
  53, 59, 61, 67, 71, 73, 79, 83, 89, 97,
];

/**
 * Indica si un número es primo.
 * @param {number} n
 * @returns {boolean}
 */
function esPrimo(n) {
  // TODO: implementa aquí tu solución.
  // Mientras no la implementes, retorna null y los casos se marcan como "pendiente".
  // Piensa en: números menores que 2, negativos, decimales (2.5) y hasta dónde
  // hace falta probar divisores.
  return null;
}

/**
 * Retorna los primos entre 1 y "limite" (inclusive).
 * Usa tu función esPrimo; si aún no está implementada retorna null.
 */
function primosHasta(limite) {
  const primos = [];
  for (let i = 1; i <= limite; i++) {
    const resultado = esPrimo(i);
    if (resultado === null || resultado === undefined) return null;
    if (resultado) primos.push(i);
  }
  return primos;
}

// Casos de prueba: agrega todos los que quieras
const casos = [
  { entrada: -7, esperado: false }, // negativo
  { entrada: 0, esperado: false },
  { entrada: 1, esperado: false }, // el 1 no es primo
  { entrada: 2, esperado: true }, // único primo par
  { entrada: 3, esperado: true },
  { entrada: 4, esperado: false },
  { entrada: 2.5, esperado: false }, // no es natural
  { entrada: 17, esperado: true },
  { entrada: 49, esperado: false }, // 7 x 7
  { entrada: 97, esperado: true },
  { entrada: 100, esperado: false },
];

const escapar = (valor) =>
  String(valor).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

function evaluar(caso) {
  const obtenido = esPrimo(caso.entrada);

  let estado = 'ok';
  if (obtenido === null || obtenido === undefined) estado = 'pendiente';
  else if (obtenido !== caso.esperado) estado = 'fallo';

  return { entrada: caso.entrada, esperado: caso.esperado, obtenido, estado };
}

const ICONOS = { ok: '✅', fallo: '❌', pendiente: '⏳' };

export function ejecutar() {
  const resultados = casos.map(evaluar);

  resultados.forEach(({ entrada, esperado, obtenido, estado }) => {
    console.log(
      `${ICONOS[estado]} esPrimo(${entrada}) → obtenido: ${obtenido} | esperado: ${esperado}`
    );
  });

  const pasados = resultados.filter((r) => r.estado === 'ok').length;
  console.log(`Resultado: ${pasados}/${resultados.length} casos correctos`);

  // Reto principal: primos entre 1 y 100
  const primos = primosHasta(LIMITE);
  const rangoCorrecto =
    Array.isArray(primos) && primos.join(',') === PRIMOS_HASTA_100.join(',');

  console.log(
    `Primos entre 1 y ${LIMITE}:`,
    Array.isArray(primos) ? primos.join(', ') : 'pendiente'
  );
  if (Array.isArray(primos)) {
    console.log(rangoCorrecto ? '✅ Lista de primos correcta' : '❌ La lista no coincide con la esperada');
  }

  // Lo que se retorna se inserta como HTML en "Vista en pantalla"
  const filas = resultados
    .map(
      ({ entrada, esperado, obtenido, estado }) => `
      <tr>
        <td>${ICONOS[estado]}</td>
        <td>${escapar(entrada)}</td>
        <td>${escapar(esperado)}</td>
        <td>${escapar(obtenido)}</td>
      </tr>`
    )
    .join('');

  const bloquePrimos = Array.isArray(primos)
    ? `<p style="word-break:break-word">${rangoCorrecto ? '✅' : '❌'} ${escapar(primos.join(', '))}</p>
       <p>Total: <strong>${primos.length}</strong> (esperado: ${PRIMOS_HASTA_100.length})</p>`
    : '<p>⏳ Pendiente de implementar.</p>';

  return `
    <p><strong>${pasados}/${resultados.length}</strong> casos correctos</p>
    <table style="width:100%;border-collapse:collapse;text-align:left">
      <thead>
        <tr><th></th><th>Número</th><th>Esperado</th><th>Obtenido</th></tr>
      </thead>
      <tbody>${filas}</tbody>
    </table>
    <h4>Primos entre 1 y ${LIMITE}</h4>
    ${bloquePrimos}`;
}