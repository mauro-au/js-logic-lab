import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '30';
export const dificultad = 'Fácil'; // Fácil | Medio | Difícil
export const tags = ['arreglos', 'ordenamiento'];

export const enunciado = `Crea una función que ordene y retorne una matriz de números.
- La función recibirá un listado (por ejemplo [2, 4, 6, 8, 9]) y un parámetro
  adicional "Asc" o "Desc" para indicar si debe ordenarse de menor a mayor
  o de mayor a menor.
- No se pueden utilizar funciones propias del lenguaje que lo resuelvan
  automáticamente.`;

// entrada = [lista, 'Asc' | 'Desc']; retorna la lista ordenada.
export const casos = [
  { entrada: [[2, 4, 6, 8, 9], 'Asc'], esperado: [2, 4, 6, 8, 9] },
  { entrada: [[2, 4, 6, 8, 9], 'Desc'], esperado: [9, 8, 6, 4, 2] },
  { entrada: [[5, 3, 8, 1], 'Asc'], esperado: [1, 3, 5, 8] },
  { entrada: [[5, 3, 8, 1], 'Desc'], esperado: [8, 5, 3, 1] },
  { entrada: [[7], 'Asc'], esperado: [7] },
  { entrada: [[], 'Desc'], esperado: [] },
];

// Reto principal: ordenar la misma lista en ambos sentidos
export const demo = (ordena) => [
  ordena([4, 2, 9, 1, 5], 'Asc'),
  ordena([4, 2, 9, 1, 5], 'Desc'),
];

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
