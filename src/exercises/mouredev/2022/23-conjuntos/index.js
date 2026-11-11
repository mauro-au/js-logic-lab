import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '23';
export const dificultad = 'Fácil'; // Fácil | Medio | Difícil
export const tags = ['arreglos'];

export const enunciado = `Crea una función que reciba dos array, un booleano y retorne un array.
- Si el booleano es verdadero buscará y retornará los elementos comunes
  de los dos array.
- Si el booleano es falso buscará y retornará los elementos no comunes
  de los dos array.
- No se pueden utilizar operaciones del lenguaje que
  lo resuelvan directamente.`;

// Contrato: (array1, array2, booleano) → array; true = comunes, false = no comunes.
export const casos = [
  { entrada: [[1, 2, 3], [2, 3, 4], true], esperado: [2, 3] },
  { entrada: [[1, 2], [3, 4], true], esperado: [] },
  { entrada: [['a', 'b'], ['b', 'c'], true], esperado: ['b'] },
  { entrada: [[1, 2], [1, 2, 3], false], esperado: [3] },
  { entrada: [[5, 7], [5, 7, 9], false], esperado: [9] },
  { entrada: [[1, 2], [1, 2], false], esperado: [] },
];

// Reto principal: elementos comunes de dos listas.
export const demo = (conjuntos) => conjuntos([1, 2, 3, 4, 5], [4, 5, 6, 7], true);

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
