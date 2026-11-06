import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '02';
export const dificultad = 'Fácil';
export const tags = ['strings', 'arreglos', 'ordenamiento'];

export const enunciado = `Escribe una función que reciba dos palabras (String) y retorne verdadero o falso (Boolean) según sean o no anagramas.
- Un anagrama consiste en formar una palabra reordenando TODAS las letras de otra palabra inicial.
- NO hace falta comprobar que ambas palabras existan.
- Dos palabras exactamente iguales no son anagramas.`;

const casos = [
  { entrada: ['amor', 'roma'], esperado: true },
  { entrada: ['listen', 'silent'], esperado: true },
  { entrada: ['hola', 'hola'], esperado: false }, // iguales: no cuentan
  { entrada: ['casa', 'cosa'], esperado: false }, // letras distintas
  { entrada: ['abc', 'ab'], esperado: false }, // distinta longitud
];

export const ejecutar = crearEjecutor({ soluciones, casos });