/**
 * ====================================================================
 * 📋 RETO A RESOLVER (Consigna, Ejemplos y Restricciones)
 * ====================================================================
/*
 * Escribe un programa que muestre por consola (con un print) los
 * números de 1 a 100 (ambos incluidos y con un salto de línea entre
 * cada impresión), sustituyendo los siguientes:
 * - Múltiplos de 3 por la palabra "fizz".
 * - Múltiplos de 5 por la palabra "buzz".
 * - Múltiplos de 3 y de 5 a la vez por la palabra "fizzbuzz".
 * 
 * ====================================================================
 * 📝 ANÁLISIS PERSONAL Y PSEUDOCÓDIGO (Notas Privadas)
 * ====================================================================
 * - Espacio para tu análisis antes de escribir JavaScript.
 */

// ⚙️ METADATOS DE CONFIGURACIÓN AUTOMÁTICA (Para los filtros de la interfaz)
export const numero = "01"; 
export const dificultad = "Fácil"; // Opciones: "Fácil", "Medio", "Difícil"
export const tags = "cambiar, etiquetas, aqui"; 
export const enunciado = "Resumen corto de una línea para el Dashboard.";

// 🚀 FUNCIÓN CEREBRO: Tu código de lógica se desarrolla aquí dentro
export function ejecutar() {
  console.clear();  
  console.log("ℹ [INFO]", "Inicializando entorno del ejercicio...");

  // ------------------------------------------------------------------
  // 💻 TU CÓDIGO INICIA AQUÍ
  // ------------------------------------------------------------------
  
  for (let i = 1; i <= 15; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      console.log(`✨ Número ${i} ➔ FIZZBUZZ`);
    } else if (i % 3 === 0) {
      console.log(`🔹 Número ${i} ➔ FIZZ`);
    } else if (i % 5 === 0) {
      console.log(`🔸 Número ${i} ➔ BUZZ`);
    } else {
      console.log(`› Número ${i}`);
    }
  }


  // ------------------------------------------------------------------
  // 💻 TU CÓDIGO TERMINA AQUÍ
  // ------------------------------------------------------------------

  console.log("✔ [DONE]", "Algoritmo finalizado con éxito.");

  // 🖥️ RETORNO EN PANTALLA: Lo que pongas aquí se pintará en la tarjeta "VISTA EN PANTALLA"
  return `
    El algoritmo se procesó correctamente en la terminal.<br>
    Se evaluaron <strong>15 elementos</strong> de forma secuencial.<br><br>
    <span style="color: var(--one-blue)">Tip: Cambia el rango en tu código de 15 a 100 para completar el reto original de MoureDev!</span>
  `;
}
