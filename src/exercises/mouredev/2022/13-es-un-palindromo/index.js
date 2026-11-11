import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '13';
export const dificultad = 'Medio'; // Fácil | Medio | Difícil
export const tags = ['strings'];

export const enunciado = `Escribe una función que reciba un texto y retorne verdadero o
falso (Boolean) según sean o no palíndromos.
Un Palíndromo es una palabra o expresión que es igual si se lee
de izquierda a derecha que de derecha a izquierda.
NO se tienen en cuenta los espacios, signos de puntuación y tildes.
Ejemplo: Ana lleva al oso la avellana.`;

// Se ignoran espacios, signos y tildes, y no distingue mayúsculas/minúsculas.
export const casos = [
  { entrada: ['Ana lleva al oso la avellana.'], esperado: true }, // ejemplo del enunciado
  { entrada: ['Somos o no somos'], esperado: true },
  { entrada: ['Dábale arroz a la zorra el abad'], esperado: true },
  { entrada: ['Anita lava la tina'], esperado: true },
  { entrada: ['hola'], esperado: false },
  { entrada: ['¿Qué tal?'], esperado: false },
];

// Reto principal: comprobar la frase del enunciado
export const demo = (esPalindromo) => esPalindromo('Ana lleva al oso la avellana.');

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
