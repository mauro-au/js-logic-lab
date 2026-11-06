import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '97';
export const dificultad = 'Medio'; // Fácil | Medio | Difícil
export const tags = ['aleatoriedad', 'interactivo'];

export const enunciado = `Crea un juego interactivo por terminal en el que tendrás que adivinar
el resultado de diferentes operaciones matemáticas aleatorias
(suma, resta, multiplicación o división de dos números enteros).
- Tendrás 3 segundos para responder correctamente.
- El juego finaliza si no se logra responder en ese tiempo.
- Al finalizar el juego debes mostrar cuántos cálculos has acertado.
- Cada 5 aciertos debes aumentar en uno el posible número de cifras
  de la operación (cada vez en un operando):
  - Preguntas 1 a 5: X (entre 0 y 9) operación Y (entre 0 y 9)
  - Preguntas 6 a 10: XX (entre 0 y 99) operación Y (entre 0 y 9)
  - Preguntas 11 a 15: XX operación YY
  - Preguntas 16 a 20: XXX (entre 0 y 999) operación YY
  ..`;

// Casos de prueba (opcional). Con la lista vacía el ejercicio corre en "modo libre":
// cada solución se ejecuta sin argumentos y se muestran su retorno y sus console.log.
// entrada = lista de argumentos; esperado = valor que debe retornar.
const casos = [
  // { entrada: [15], esperado: 'fizzbuzz' },
];

// Opcional: reto principal. Descomenta y agrega demo a crearEjecutor({ ... }).
// const demo = (solucion) => solucion(100);

export const ejecutar = crearEjecutor({ soluciones, casos });
