export const numero = '02';
export const dificultad = 'Fácil';
export const tags = ['strings', 'arreglos', 'ordenamiento'];

export const enunciado = `Escribe una función que reciba dos palabras (String) y retorne verdadero o falso (Boolean) según sean o no anagramas.
- Un anagrama consiste en formar una palabra reordenando TODAS las letras de otra palabra inicial.
- NO hace falta comprobar que ambas palabras existan.
- Dos palabras exactamente iguales no son anagramas.`;

/**
 * Indica si dos palabras son anagramas.
 * @param {string} palabra1
 * @param {string} palabra2
 * @returns {boolean}
 */
function sonAnagramas(palabra1, palabra2) {
  // TODO: implementa aquí tu solución.
  // Mientras no la implementes, retorna null y el caso se marca como "pendiente".
  return null;
}

// Casos de prueba: agrega todos los que quieras
const casos = [
  { entrada: ['amor', 'roma'], esperado: true },
  { entrada: ['listen', 'silent'], esperado: true },
  { entrada: ['hola', 'hola'], esperado: false }, // iguales: no cuentan
  { entrada: ['casa', 'cosa'], esperado: false }, // letras distintas
  { entrada: ['abc', 'ab'], esperado: false }, // distinta longitud
];

const escapar = (valor) =>
  String(valor).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

function evaluar(caso) {
  const [a, b] = caso.entrada;
  const obtenido = sonAnagramas(a, b);

  let estado = 'ok';
  if (obtenido === null || obtenido === undefined) estado = 'pendiente';
  else if (obtenido !== caso.esperado) estado = 'fallo';

  return { a, b, esperado: caso.esperado, obtenido, estado };
}

const ICONOS = { ok: '✅', fallo: '❌', pendiente: '⏳' };

export function ejecutar() {
  const resultados = casos.map(evaluar);

  resultados.forEach(({ a, b, esperado, obtenido, estado }) => {
    console.log(
      `${ICONOS[estado]} sonAnagramas("${a}", "${b}") → obtenido: ${obtenido} | esperado: ${esperado}`
    );
  });

  const pasados = resultados.filter((r) => r.estado === 'ok').length;
  console.log(`Resultado: ${pasados}/${resultados.length} casos correctos`);

  // Lo que se retorna se inserta como HTML en "Vista en pantalla"
  const filas = resultados
    .map(
      ({ a, b, esperado, obtenido, estado }) => `
      <tr>
        <td>${ICONOS[estado]}</td>
        <td>${escapar(a)} / ${escapar(b)}</td>
        <td>${escapar(esperado)}</td>
        <td>${escapar(obtenido)}</td>
      </tr>`
    )
    .join('');

  return `
    <p><strong>${pasados}/${resultados.length}</strong> casos correctos</p>
    <table style="width:100%;border-collapse:collapse;text-align:left">
      <thead>
        <tr><th></th><th>Entrada</th><th>Esperado</th><th>Obtenido</th></tr>
      </thead>
      <tbody>${filas}</tbody>
    </table>`;
}