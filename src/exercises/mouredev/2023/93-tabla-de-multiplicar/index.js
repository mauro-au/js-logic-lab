import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '93';
export const dificultad = 'Fácil'; // Fácil | Medio | Difícil
export const tags = ['matemáticas','bucles'];

export const enunciado = `Crea un programa que sea capaz de solicitarte un número y se
encargue de imprimir su tabla de multiplicar entre el 1 y el 10.
- Debe visualizarse qué operación se realiza y su resultado.
  Ej: 1 x 1 = 1
      1 x 2 = 2
      1 x 3 = 3
      ...`;

// "Imprimir la tabla" lo modelamos retornando las 10 líneas, cada una con el
// formato del enunciado: "n x i = resultado" (con espacios alrededor de la x).
export const casos = [
  { entrada: [1], esperado: ['1 x 1 = 1', '1 x 2 = 2', '1 x 3 = 3', '1 x 4 = 4', '1 x 5 = 5', '1 x 6 = 6', '1 x 7 = 7', '1 x 8 = 8', '1 x 9 = 9', '1 x 10 = 10'] },
  { entrada: [5], esperado: ['5 x 1 = 5', '5 x 2 = 10', '5 x 3 = 15', '5 x 4 = 20', '5 x 5 = 25', '5 x 6 = 30', '5 x 7 = 35', '5 x 8 = 40', '5 x 9 = 45', '5 x 10 = 50'] },
  { entrada: [10], esperado: ['10 x 1 = 10', '10 x 2 = 20', '10 x 3 = 30', '10 x 4 = 40', '10 x 5 = 50', '10 x 6 = 60', '10 x 7 = 70', '10 x 8 = 80', '10 x 9 = 90', '10 x 10 = 100'] },
];

// Reto principal: la tabla del 7.
export const demo = (tabla) => tabla(7);

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
