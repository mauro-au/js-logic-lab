import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '35';
export const dificultad = 'Medio'; // Fácil | Medio | Difícil
export const tags = ['arreglos', 'ordenamiento'];

export const enunciado = `Dado un array de enteros ordenado y sin repetidos,
crea una función que calcule y retorne todos los que faltan entre
el mayor y el menor.
- Lanza un error si el array de entrada no es correcto.`;

// entrada = array ordenado y sin repetidos; retorna los que faltan entre
// el mayor y el menor. (La validación que lanza error no se puede expresar
// como esperado, así que no se incluye entre los casos.)
export const casos = [
  { entrada: [[1, 2, 3, 6, 7]], esperado: [4, 5] },
  { entrada: [[1, 3, 5, 7]], esperado: [2, 4, 6] },
  { entrada: [[2, 4, 8]], esperado: [3, 5, 6, 7] },
  { entrada: [[10, 11, 12]], esperado: [] },
  { entrada: [[1, 2]], esperado: [] },
];

// Reto principal: los números que faltan en una lista con huecos
export const demo = (faltantes) => faltantes([1, 2, 3, 6, 7, 10, 11, 15]);

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
