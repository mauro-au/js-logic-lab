import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '01';
export const dificultad = 'Fácil';
export const tags = ['bucles', 'condicionales', 'módulo'];

// Solución de fábrica: el ejercicio aparece resuelto en cualquier navegador
export const autoResuelto = true;

export const enunciado = `Escribe un programa que muestre por consola los números del 1 al 100.
- Si el número es múltiplo de 3, muestra "fizz" en lugar del número.
- Si es múltiplo de 5, muestra "buzz".
- Si es múltiplo de 3 y de 5, muestra "fizzbuzz".`;

const casos = [
  { entrada: [0], esperado: [] },
  { entrada: [5], esperado: [1, 2, 'fizz', 4, 'buzz'] },
  { entrada: [15], esperado: [1, 2, 'fizz', 4, 'buzz', 'fizz', 7, 8, 'fizz', 'buzz', 11, 'fizz', 13, 14, 'fizzbuzz'] },
];

const demo = (fizzBuzz) => fizzBuzz(100);

export const ejecutar = crearEjecutor({ soluciones, casos, demo });