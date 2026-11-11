import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '54';
export const dificultad = 'Fácil'; // Fácil | Medio | Difícil
export const tags = ['strings', 'entrada-salida'];

export const enunciado = `Escribe un programa que reciba un texto y transforme lenguaje natural a
"lenguaje hacker" (conocido realmente como "leet" o "1337"). Este lenguaje
 se caracteriza por sustituir caracteres alfanuméricos.
- Utiliza esta tabla (https://www.gamehouse.com/blog/leet-speak-cheat-sheet)
  con el alfabeto y los números en "leet".
  (Usa la primera opción de cada transformación. Por ejemplo "4" para la "a")`;

// Traducción "natural → leet" con la PRIMERA opción de cada letra según la
// tabla del enunciado (p. ej. "a" → "4"); espacios y signos se conservan.
export const casos = [
  { entrada: ['a'], esperado: '4' },
  { entrada: ['leet'], esperado: '1337' },
  { entrada: ['hola'], esperado: '#014' },
  { entrada: ['hola, mundo!'], esperado: '#014, /\\/\\(_)^/)0!' },
];

// Reto principal: traduce una frase al lenguaje hacker.
export const demo = (leet) => leet('el lenguaje hacker');

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
