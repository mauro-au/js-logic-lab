import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '60';
export const dificultad = 'Medio'; // Fácil | Medio | Difícil
export const tags = ['interactivo'];

export const enunciado = `Crea un programa que simule el comportamiento del sombrero selccionador del
universo mágico de Harry Potter.
- De ser posible realizará 5 preguntas (como mínimo) a través de la terminal.
- Cada pregunta tendrá 4 respuestas posibles (también a selecciona una a través de terminal).
- En función de las respuestas a las 5 preguntas deberás diseñar un algoritmo que
  coloque al alumno en una de las 4 casas de Hogwarts:
  (Gryffindor, Slytherin , Hufflepuff y Ravenclaw)
- Ten en cuenta los rasgos de cada casa para hacer las preguntas
  y crear el algoritmo seleccionador:
  Por ejemplo, en Slytherin se premia la ambición y la astucia.`;

// EXCEPCIÓN: programa interactivo por terminal (mínimo 5 preguntas de 4
// respuestas) y el algoritmo de casas lo diseña cada solución, así que no hay
// un valor esperado fijo. Corre en modo libre con solo la demo.
export const casos = [];

// Reto principal: el sombrero decide la casa del alumno.
export const demo = (sombrero) => sombrero() ?? 'casa asignada (ver terminal)';

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
