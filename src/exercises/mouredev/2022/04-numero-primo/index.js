import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '04';
export const dificultad = 'Medio';
export const tags = ['números', 'bucles', 'divisibilidad', 'optimización'];

export const enunciado = `Escribe un programa que se encargue de comprobar si un número es o no primo.
Hecho esto, imprime los números primos entre 1 y 100.
- Un número primo es un número natural mayor que 1 que solo es divisible por 1 y por sí mismo.`;

export const casos = [
  { entrada: [-7], esperado: false },
  { entrada: [0], esperado: false },
  { entrada: [1], esperado: false },
  { entrada: [2], esperado: true },
  { entrada: [4], esperado: false },
  { entrada: [2.5], esperado: false },
  { entrada: [17], esperado: true },
  { entrada: [49], esperado: false },
  { entrada: [97], esperado: true },
  { entrada: [100], esperado: false },
];

// Reto principal: primos entre 1 y 100 usando cada solución
export const demo = (esPrimo) =>
  Array.from({ length: 100 }, (_, i) => i + 1).filter((n) => esPrimo(n));

export const ejecutar = crearEjecutor({ soluciones, casos, demo });