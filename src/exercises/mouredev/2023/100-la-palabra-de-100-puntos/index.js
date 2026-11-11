import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '100';
export const dificultad = 'Fácil'; // Fácil | Medio | Difícil
export const tags = ['strings', 'interactivo'];

export const enunciado = `La última semana de 2021 comenzamos la actividad de retos de programación,
con la intención de resolver un ejercicio cada semana para mejorar
nuestra lógica... ¡Hemos llegado al EJERCICIO 100! Gracias 🙌

Crea un programa que calcule los puntos de una palabra.
- Cada letra tiene un valor asignado. Por ejemplo, en el abecedario
  español de 27 letras, la A vale 1 y la Z 27.
- El programa muestra el valor de los puntos de cada palabra introducida.
- El programa finaliza si logras introducir una palabra de 100 puntos.
- Puedes usar la terminal para interactuar con el usuario y solicitarle
  cada palabra.`;

// Puntos por letra según el abecedario español de 27 letras del enunciado:
// A = 1 … N = 14, Ñ = 15, O = 16 … Z = 27 (por eso la O vale 16, no 15).
export const casos = [
  { entrada: ['hola'], esperado: 37 }, // h8 + o16 + l12 + a1
  { entrada: ['adios'], esperado: 50 }, // a1 + d4 + i9 + o16 + s20
  { entrada: ['mañana'], esperado: 45 }, // fija la Ñ = 15: m13 + a1 + ñ15 + a1 + n14 + a1
  { entrada: ['zz'], esperado: 54 }, // fija la Z = 27
];

// Reto principal: los puntos de una palabra.
export const demo = (puntos) => puntos('mouredev');

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
