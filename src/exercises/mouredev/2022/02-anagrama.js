/**
 * ====================================================================
 * 📋 RETO A RESOLVER (Consigna, Ejemplos y Restricciones)
 * ====================================================================
 * 
 * Escribe una función que reciba dos palabras (String) y retorne
 * verdadero o falso (Bool) según sean o no anagramas.
 * - Un Anagrama consiste en formar una palabra reordenando TODAS
 *   las letras de otra palabra inicial.
 * - NO hace falta comprobar que ambas palabras existan.
 * - Dos palabras exactamente iguales no son anagrama.
 *  
 * ====================================================================
 * 📝 ANÁLISIS PERSONAL Y PSEUDOCÓDIGO (Notas Privadas)
 * ====================================================================
 * - Espacio para tu análisis antes de escribir JavaScript.
 */

// ⚙️ METADATOS DE CONFIGURACIÓN AUTOMÁTICA (Para los filtros de la interfaz)
export const numero = "02"; 
export const dificultad = "Medio"; // Opciones: "Fácil", "Medio", "Difícil"
export const tags = "cambiar, etiquetas, aqui"; 
export const enunciado = "Resumen corto de una línea para el Dashboard.";

// 🚀 FUNCIÓN CEREBRO: Tu código de lógica se desarrolla aquí dentro
export function ejecutar() {
  console.clear();  
  console.log("ℹ [INFO]", "Inicializando entorno del ejercicio...");

  // ------------------------------------------------------------------
  // 💻 TU CÓDIGO INICIA AQUÍ
  // ------------------------------------------------------------------
  
  let first_word = "Riesgo";
  let second_word = "Sergio";

  // if (first_word.length !== second_word.length) {
  //   let text = 'no es un anagrama'
  //   console.log( text);
  //   return;
  // }

  // first_word = first_word.toLowerCase()
  // second_word = second_word.toLowerCase()

  // console.log(first_word)
  // console.log(second_word)
  
  // if (first_word !== second_word) {

  //   let first_order_word = first_word.split("").sort().join()
  //   let second_order_word = second_word.split("").sort().join()

  //   if (first_order_word === second_order_word ) {
  //     console.log("Es un anagrama");
  //   }  else {
  //     console.log("No es anagrama");
  //   }
    
  // } else {
  //   console.log("No es anagrama");
  // }


  if (first_word.length !== second_word.length) {
    let text = 'no es un anagrama, cada palabra tiene diferente cantidad de letras'
    console.log( text);
    return;
  }

  first_word = first_word.toLowerCase()
  second_word = second_word.toLowerCase()

  console.log(first_word)
  console.log(second_word)
  
  if (first_word === second_word) {
    console.log("No es anagrama, las dos son la misma palabra");
    return
  }

  let first_order_word = first_word.split("").sort().join()
  let second_order_word = second_word.split("").sort().join()

  if (first_order_word === second_order_word ) {
    console.log("Es un anagrama");
  }  else {
    console.log("No es anagrama");
  }    



  // ------------------------------------------------------------------
  // 💻 TU CÓDIGO TERMINA AQUÍ
  // ------------------------------------------------------------------

  console.log("✔ [DONE]", "Algoritmo finalizado con éxito.");

  // 🖥️ RETORNO EN PANTALLA: Lo que pongas aquí se pintará en la tarjeta "VISTA EN PANTALLA"
  return `El algoritmo se ejecutó correctamente. Resultado final: <strong></strong>`;
}
