import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '82';
export const dificultad = 'Fácil'; // Fácil | Medio | Difícil
export const tags = ['strings', 'arreglos'];

export const enunciado = `Crea una función que reciba dos cadenas de texto casi iguales,
a excepción de uno o varios caracteres.
La función debe encontrarlos y retornarlos en formato lista/array.
- Ambas cadenas de texto deben ser iguales en longitud.
- Las cadenas de texto son iguales elemento a elemento.
- No se pueden utilizar operaciones propias del lenguaje
  que lo resuelvan directamente.

Ejemplos:
- Me llamo mouredev / Me llemo mouredov -> ["e", "o"]
- Me llamo.Brais Moure / Me llamo brais moure -> [" ", "b", "m"]`;

// Contrato: recibe las dos cadenas y retorna los caracteres distintos de la
// SEGUNDA (los infiltrados), como muestran los ejemplos del enunciado.
export const casos = [
  { entrada: ['Me llamo mouredev', 'Me llemo mouredov'], esperado: ['e', 'o'] },
  { entrada: ['Me llamo.Brais Moure', 'Me llamo brais moure'], esperado: [' ', 'b', 'm'] },
  { entrada: ['hola', 'hola'], esperado: [] },
  { entrada: ['abc', 'axc'], esperado: ['x'] },
  { entrada: ['perro', 'porro'], esperado: ['o'] },
];

// Reto principal: hallar los caracteres infiltrados del primer ejemplo.
export const demo = (infiltrado) =>
  infiltrado('Me llamo mouredev', 'Me llemo mouredov');

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
