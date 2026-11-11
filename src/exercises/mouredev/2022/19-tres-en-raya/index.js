import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '19';
export const dificultad = 'Difícil'; // Fácil | Medio | Difícil
export const tags = ['arreglos'];

export const enunciado = `Crea una función que analice una matriz 3x3 compuesta por "X" y "O"
y retorne lo siguiente:
- "X" si han ganado las "X"
- "O" si han ganado los "O"
- "Empate" si ha habido un empate
- "Nulo" si la proporción de "X", de "O", o de la matriz no es correcta.
  O si han ganado los 2.
Nota: La matriz puede no estar totalmente cubierta.
Se podría representar con un vacío "", por ejemplo.`;

// Contrato: recibe la matriz 3x3 y retorna "X", "O", "Empate" o "Nulo".
export const casos = [
  { entrada: [[['X', 'X', 'X'], ['O', 'O', ''], ['O', '', 'X']]], esperado: 'X' },
  { entrada: [[['X', 'X', 'O'], ['X', 'O', ''], ['O', '', '']]], esperado: 'O' },
  { entrada: [[['X', 'O', 'X'], ['X', 'O', 'O'], ['O', 'X', 'X']]], esperado: 'Empate' },
  { entrada: [[['X', '', ''], ['O', '', ''], ['O', '', '']]], esperado: 'Nulo' }, // proporción incorrecta: hay más "O" que "X"
  { entrada: [[['X', 'O', 'X'], ['O', 'X']]], esperado: 'Nulo' }, // la matriz no es 3x3
  { entrada: [[['X', 'X', 'X'], ['O', 'O', 'O'], ['X', '', '']]], esperado: 'Nulo' }, // han ganado los dos
];

// Reto principal: analizar un tablero donde las "X" completan la primera fila.
export const demo = (tresEnRaya) =>
  tresEnRaya([['X', 'X', 'X'], ['O', 'O', ''], ['O', '', 'X']]);

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
