import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '33';
export const dificultad = 'Fácil'; // Fácil | Medio | Difícil
export const tags = ['arreglos'];

export const enunciado = `Dado un listado de números, encuentra el SEGUNDO más grande`;

// entrada = lista de números (sin repetidos); retorna el segundo más grande.
export const casos = [
  { entrada: [[1, 2, 3, 4]], esperado: 3 },
  { entrada: [[10, 5, 20, 8]], esperado: 10 },
  { entrada: [[100, 42, 7, 55, 13]], esperado: 55 },
  { entrada: [[-5, -1, -10]], esperado: -5 },
  { entrada: [[2, 1]], esperado: 1 },
];

// Reto principal: el segundo más grande de una lista variada
export const demo = (segundo) => segundo([4, 2, 9, 1, 22, 5, 17]);

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
