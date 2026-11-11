import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '85';
export const dificultad = 'Medio'; // Fácil | Medio | Difícil
export const tags = ['strings'];

export const enunciado = `Crea una función que calcule el número de la columna de una hoja de Excel
teniendo en cuenta su nombre.
- Las columnas se designan por letras de la "A" a la "Z" de forma infinita.
- Ejemplos: A = 1, Z = 26, AA = 27, CA = 79.`;

// Contrato: recibe el nombre de la columna (letras de la A a la Z) y
// retorna su número.
export const casos = [
  { entrada: ['A'], esperado: 1 },
  { entrada: ['Z'], esperado: 26 },
  { entrada: ['AA'], esperado: 27 },
  { entrada: ['AB'], esperado: 28 },
  { entrada: ['CA'], esperado: 79 },
  { entrada: ['ZZ'], esperado: 702 },
];

// Reto principal: calcular el número de la columna "JS".
export const demo = (columna) => columna('JS');

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
