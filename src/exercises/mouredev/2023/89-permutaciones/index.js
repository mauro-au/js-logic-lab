import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '89';
export const dificultad = 'Medio'; // Fácil | Medio | Difícil
export const tags = ['strings'];

export const enunciado = `Crea un programa que sea capaz de generar e imprimir todas las
permutaciones disponibles formadas por las letras de una palabra.
- Las palabras generadas no tienen por qué existir.
- Deben usarse todas las letras en cada permutación.
- Ejemplo: sol, slo, ols, osl, los, lso`;

// Contrato: recibe la palabra y retorna todas las permutaciones en un array.
// El enunciado pide imprimirlas; las retornamos para poder compararlas.
// Orden: el del ejemplo ("sol, slo, ols, osl, los, lso"), letra a letra.
export const casos = [
  { entrada: ['sol'], esperado: ['sol', 'slo', 'ols', 'osl', 'los', 'lso'] }, // ejemplo
  { entrada: ['a'], esperado: ['a'] },
  { entrada: ['ab'], esperado: ['ab', 'ba'] },
  { entrada: ['abc'], esperado: ['abc', 'acb', 'bac', 'bca', 'cab', 'cba'] },
];

// Reto principal: todas las permutaciones de "sol".
export const demo = (permutaciones) => permutaciones('sol');

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
