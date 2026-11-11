import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '41';
export const dificultad = 'Medio'; // Fácil | Medio | Difícil
export const tags = ['dibujo', 'entrada-salida'];

export const enunciado = `Crea una función que sea capaz de dibujar el "Triángulo de Pascal"
indicándole únicamente el tamaño del lado.

- Aquí puedes ver rápidamente cómo se calcula el triángulo:
  https://commons.wikimedia.org/wiki/File:PascalTriangleAnimated2.gif`;

// El enunciado pide "dibujar" el triángulo: lo devolvemos como array de líneas
// (una por fila, números separados por un espacio y sin centrar) porque se
// lee mejor en la terminal que un string multilínea con \n.
export const casos = [
  { entrada: [1], esperado: ['1'] },
  { entrada: [2], esperado: ['1', '1 1'] },
  { entrada: [3], esperado: ['1', '1 1', '1 2 1'] },
  { entrada: [5], esperado: ['1', '1 1', '1 2 1', '1 3 3 1', '1 4 6 4 1'] },
];

// Reto principal: triángulo de Pascal de lado 8
export const demo = (pascal) => pascal(8);

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
