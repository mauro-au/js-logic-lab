import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '45';
export const dificultad = 'Fácil'; // Fácil | Medio | Difícil
export const tags = ['arreglos'];

export const enunciado = `Crea una función que retorne el número total de bumeranes de
un array de números enteros e imprima cada uno de ellos.
- Un bumerán (búmeran, boomerang) es una secuencia formada por 3 números
  seguidos, en el que el primero y el último son iguales, y el segundo
  es diferente. Por ejemplo [2, 1, 2].
- En el array [2, 1, 2, 3, 3, 4, 2, 4] hay 2 bumeranes ([2, 1, 2]
  y [4, 2, 4]).`;

// El enunciado también pide imprimir cada bumerán, pero el retorno es solo el total.
export const casos = [
  { entrada: [[2, 1, 2]], esperado: 1 },
  { entrada: [[2, 1, 2, 3, 3, 4, 2, 4]], esperado: 2 },
  { entrada: [[1, 2, 3]], esperado: 0 },
  { entrada: [[1, 1, 1]], esperado: 0 },
  { entrada: [[1, 2, 1, 2, 1]], esperado: 3 },
];

// Reto principal: contar los bumeranes del array del enunciado.
export const demo = (bumeranes) => bumeranes([2, 1, 2, 3, 3, 4, 2, 4]);

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
