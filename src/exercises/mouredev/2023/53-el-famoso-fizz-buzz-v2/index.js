import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '53';
export const dificultad = 'Fácil'; // Fácil | Medio | Difícil
export const tags = ['strings'];

export const enunciado = `Escribe un programa que muestre por consola (con un print) los
números de 1 a 100 (ambos incluidos y con un salto de línea entre
cada impresión), sustituyendo los siguientes:
- Múltiplos de 3 por la palabra "fizz".
- Múltiplos de 5 por la palabra "buzz".
- Múltiplos de 3 y de 5 a la vez por la palabra "fizzbuzz".`;

// "Mostrar por consola con saltos de línea" lo modelamos retornando la lista
// de 1 a n (mismo contrato que el reto 01); los números van como números.
export const casos = [
  { entrada: [0], esperado: [] },
  { entrada: [1], esperado: [1] },
  { entrada: [5], esperado: [1, 2, 'fizz', 4, 'buzz'] },
  { entrada: [15], esperado: [1, 2, 'fizz', 4, 'buzz', 'fizz', 7, 8, 'fizz', 'buzz', 11, 'fizz', 13, 14, 'fizzbuzz'] },
];

// Reto principal: los 100 números del reto.
export const demo = (fizzBuzz) => fizzBuzz(100);

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
