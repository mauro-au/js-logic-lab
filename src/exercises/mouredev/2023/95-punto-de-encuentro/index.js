import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '95';
export const dificultad = 'Difícil'; // Fácil | Medio | Difícil
export const tags = ['arreglos', 'ordenamiento'];

export const enunciado = `Crea una función que calcule el punto de encuentro de dos objetos en movimiento
en dos dimensiones.
- Cada objeto está compuesto por una coordenada xy y una velocidad de desplazamiento
  (vector de desplazamiento) por unidad de tiempo (también en formato xy).
- La función recibirá las coordenadas de inicio de ambos objetos y sus velocidades.
- La función calculará y mostrará el punto en el que se encuentran y el tiempo que
  tardarn en lograrlo.
- La función debe tener en cuenta que los objetos pueden no llegar a encontrarse.`;

// Argumentos: inicio y velocidad de A, luego inicio y velocidad de B; cada
// posición es [x, y]. Se retorna { punto: [x, y], tiempo } o null si nunca
// se encuentran (mismo instante en x e y).
export const casos = [
  { entrada: [[0, 0], [1, 0], [10, 0], [-1, 0]], esperado: { punto: [5, 0], tiempo: 5 } }, // frontal
  { entrada: [[0, 0], [1, 1], [4, 0], [-1, 1]], esperado: { punto: [2, 2], tiempo: 2 } }, // diagonal
  { entrada: [[3, 4], [0, 0], [3, 4], [0, 0]], esperado: { punto: [3, 4], tiempo: 0 } }, // mismo origen
  { entrada: [[0, 0], [1, 0], [0, 1], [1, 0]], esperado: null }, // paralelos: nunca se cruzan
  { entrada: [[0, 0], [2, 0], [5, 5], [0, -1]], esperado: null }, // se cruzarían en instantes distintos
];

// Reto principal: dos objetos que convergen en la diagonal.
export const demo = (encuentro) => encuentro([0, 0], [1, 1], [10, 10], [-1, -1]);

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
