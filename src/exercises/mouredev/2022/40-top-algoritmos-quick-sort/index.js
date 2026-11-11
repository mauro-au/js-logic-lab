import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '40';
export const dificultad = 'Medio'; // Fácil | Medio | Difícil
export const tags = ['ordenamiento'];

export const enunciado = `Implementa uno de los algoritmos de ordenación más famosos:
el "Quick Sort", creado por C.A.R. Hoare.
- Entender el funcionamiento de los algoritmos más utilizados de la historia
  Nos ayuda a mejorar nuestro conocimiento sobre ingeniería de software.
  Dedícale tiempo a entenderlo, no únicamente a copiar su implementación.
- Esta es una nueva serie de retos llamada "TOP ALGORITMOS",
  donde trabajaremos y entenderemos los más famosos de la historia.`;

// entrada = lista de números; retorna la lista ordenada de menor a mayor.
export const casos = [
  { entrada: [[3, 1, 4, 1, 5]], esperado: [1, 1, 3, 4, 5] },
  { entrada: [[2, 4, 6, 8, 9]], esperado: [2, 4, 6, 8, 9] },
  { entrada: [[9, 7, -2, 0, 12]], esperado: [-2, 0, 7, 9, 12] },
  { entrada: [[1, 2, 3, 4, 5]], esperado: [1, 2, 3, 4, 5] },
  { entrada: [[5]], esperado: [5] },
  { entrada: [[]], esperado: [] },
];

// Reto principal: quick sort de una lista desordenada
export const demo = (quickSort) => quickSort([9, 3, 7, 1, 8, 2, 5, 4, 6, 0]);

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
