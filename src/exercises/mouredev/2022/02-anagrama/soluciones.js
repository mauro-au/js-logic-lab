// Cada función exportada es una solución. Agrega más cuando se te ocurra otra forma.
// Solución 1: ordenar las letras de ambas palabras y comparar
export function anagramaOrdenando(palabra1, palabra2) {
  const a = palabra1.toLowerCase();
  const b = palabra2.toLowerCase();

  if (a === b) return false; // palabras iguales no cuentan
  if (a.length !== b.length) return false;

  const ordenar = (texto) => [...texto].sort().join('');
  return ordenar(a) === ordenar(b);
}

// Solución 2: contar cuántas veces aparece cada letra
export function anagramaContando(palabra1, palabra2) {
  const a = palabra1.toLowerCase();
  const b = palabra2.toLowerCase();

  if (a === b) return false;
  if (a.length !== b.length) return false;

  const conteo = {};
  for (const letra of a) conteo[letra] = (conteo[letra] ?? 0) + 1;

  for (const letra of b) {
    if (!conteo[letra]) return false; // no existe o ya se agotó
    conteo[letra]--;
  }
  return true;
}
