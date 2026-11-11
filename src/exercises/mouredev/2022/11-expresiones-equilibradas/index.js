import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '11';
export const dificultad = 'Medio'; // Fácil | Medio | Difícil
export const tags = ['strings','arreglos'];

export const enunciado = `Crea un programa que comprueba si los paréntesis, llaves y corchetes
de una expresión están equilibrados.
- Equilibrado significa que estos delimitadores se abren y cieran
  en orden y de forma correcta.
- Paréntesis, llaves y corchetes son igual de prioritarios.
  No hay uno más importante que otro.
- Expresión balanceada: { [ a * ( c + d ) ] - 5 }
- Expresión no balanceada: { a * ( c + d ) ] - 5 }`;

export const casos = [
  { entrada: ['{ [ a * ( c + d ) ] - 5 }'], esperado: true }, // balanceada (enunciado)
  { entrada: ['{ a * ( c + d ) ] - 5 }'], esperado: false }, // no balanceada (enunciado)
  { entrada: [''], esperado: true },
  { entrada: ['([{}])'], esperado: true },
  { entrada: ['([)]'], esperado: false },
  { entrada: ['{'], esperado: false },
];

// Reto principal: comprobar las dos expresiones del enunciado
export const demo = (equilibrada) => [
  equilibrada('{ [ a * ( c + d ) ] - 5 }'),
  equilibrada('{ a * ( c + d ) ] - 5 }'),
];

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
