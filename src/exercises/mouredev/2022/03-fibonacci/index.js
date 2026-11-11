import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '03';
export const dificultad = 'Medio';
export const tags = ['recursión', 'bucles', 'secuencias', 'números'];

export const enunciado = `Escribe un programa que imprima los 50 primeros números de la sucesión de Fibonacci empezando en 0.
- La serie Fibonacci se compone por una sucesión de números en la que el siguiente siempre es la suma de los dos anteriores.
  0, 1, 1, 2, 3, 5, 8, 13...`;

export const casos = [
  { entrada: [0], esperado: [] },
  { entrada: [1], esperado: [0] },
  { entrada: [2], esperado: [0, 1] },
  { entrada: [8], esperado: [0, 1, 1, 2, 3, 5, 8, 13] },
];

// Reto principal: los 50 primeros términos
export const demo = (fibonacci) => fibonacci(50);

export const ejecutar = crearEjecutor({ soluciones, casos, demo });