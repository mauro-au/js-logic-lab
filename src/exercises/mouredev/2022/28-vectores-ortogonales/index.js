import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '28';
export const dificultad = 'Fácil'; // Fácil | Medio | Difícil
export const tags = ['arreglos'];

export const enunciado = `Crea un programa que determine si dos vectores son ortogonales.
- Los dos array deben tener la misma longitud.
- Cada vector se podría representar como un array. Ejemplo: [1, -2]`;

// Contrato: (vector1, vector2) → booleano (producto escalar igual a cero).
export const casos = [
  { entrada: [[1, -2], [2, 1]], esperado: true },
  { entrada: [[-1, 3], [3, 1]], esperado: true },
  { entrada: [[1, 1], [1, -1]], esperado: true },
  { entrada: [[1, 2], [3, 4]], esperado: false },
  { entrada: [[2, 3], [2, 3]], esperado: false },
  { entrada: [[1, 2, -2], [4, -1, 1]], esperado: true },
];

// Reto principal: el vector de ejemplo del enunciado.
export const demo = (ortogonales) => ortogonales([1, -2], [2, 1]);

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
