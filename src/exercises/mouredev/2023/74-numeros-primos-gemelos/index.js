import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '74';
export const dificultad = 'Medio'; // Fácil | Medio | Difícil
export const tags = ['matemáticas'];

export const enunciado = `Crea un programa que encuentre y muestre todos los pares de números primos
gemelos en un rango concreto.
El programa recibirá el rango máximo como número entero positivo.

- Un par de números primos se considera gemelo si la diferencia entre
  ellos es exactamente 2. Por ejemplo (3, 5), (11, 13)

- Ejemplo: Rango 14
  (3, 5), (5, 7), (11, 13)`;

// Cada par se devuelve como array [menor, mayor], en orden ascendente y con
// ambos primos dentro del rango máximo recibido.
export const casos = [
  { entrada: [1], esperado: [] },
  { entrada: [5], esperado: [[3, 5]] },
  { entrada: [14], esperado: [[3, 5], [5, 7], [11, 13]] },
  { entrada: [20], esperado: [[3, 5], [5, 7], [11, 13], [17, 19]] },
];

// Reto principal: todos los primos gemelos hasta 50
export const demo = (gemelos) => gemelos(50);

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
