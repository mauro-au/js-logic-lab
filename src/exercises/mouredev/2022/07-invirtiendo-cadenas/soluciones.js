// Ejercicio 07 · Invirtiendo cadenas
// Cada función exportada es una solución distinta. Agrega todas las que quieras.
// Con casos en index.js: la función recibe los argumentos de cada caso y debe retornar el resultado.
// Tip: con el prefijo solo_ (ej. solo_miSolucion) se ejecuta únicamente esa.
// Tip: define las funciones auxiliares DENTRO de la solución (no las exportes).

/** Idea: describe aquí tu estrategia. Tiempo: O(?)  Espacio: O(?) */
export function solution1(texto) {
  let texto_final = ""
  for(let i = texto.length - 1; i >= 0; i--) {
    texto_final = texto_final + texto[i]
  }
  console.log(texto_final)
  return texto_final
}



export function solution2(texto) {
  let texto_final = []
  for(let i = 0; i < texto.length; i++) {
    texto_final.unshift(texto[i]);
  }
  console.log(texto_final.join(""))
  return texto_final.join("")
}

export function solution3(texto) {
  return [...texto].reverse().join("")
}
