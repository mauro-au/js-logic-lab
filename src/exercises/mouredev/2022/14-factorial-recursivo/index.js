import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '14';
export const dificultad = 'Fácil'; // Fácil | Medio | Difícil
export const tags = ['matemáticas', 'recursión'];

export const enunciado = `Escribe una función que calcule y retorne el factorial de un número dado
de forma recursiva.`;

export const casos = [
  { entrada: [0], esperado: 1 },
  { entrada: [1], esperado: 1 },
  { entrada: [3], esperado: 6 },
  { entrada: [5], esperado: 120 },
  { entrada: [10], esperado: 3628800 },
];

// Reto principal: factorial de 10
export const demo = (factorial) => factorial(10);

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
