import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '08';
export const dificultad = 'Medio'; // Fácil | Medio | Difícil
export const tags = ['strings'];

export const enunciado = `Crea un programa que cuente cuantas veces se repite cada palabra
y que muestre el recuento final de todas ellas.
- Los signos de puntuación no forman parte de la palabra.
- Una palabra es la misma aunque aparezca en mayúsculas y minúsculas.
- No se pueden utilizar funciones propias del lenguaje que
  lo resuelvan automáticamente.`;

// El enunciado no fija la forma de salida: devolvemos un único objeto con
// palabra (en minúsculas) → número de apariciones.
export const casos = [
  { entrada: ['Hola hola mundo'], esperado: { hola: 2, mundo: 1 } },
  { entrada: ['Hola, mundo! hola.'], esperado: { hola: 2, mundo: 1 } },
  { entrada: ['El perro del perro de Pedro'], esperado: { el: 1, perro: 2, del: 1, de: 1, pedro: 1 } },
  { entrada: ['una vez una'], esperado: { una: 2, vez: 1 } },
  { entrada: [''], esperado: {} },
];

// Reto principal: recuento de la frase de ejemplo
export const demo = (contar) => contar('Hola mundo, hola JavaScript');

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
