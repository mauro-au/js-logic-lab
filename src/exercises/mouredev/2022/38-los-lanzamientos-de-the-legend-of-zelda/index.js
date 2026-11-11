import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '38';
export const dificultad = 'Medio'; // Fácil | Medio | Difícil
export const tags = ['fechas','matemáticas'];

export const enunciado = `¡Han anunciado un nuevo "The Legend of Zelda"!
Se llamará "Tears of the Kingdom" y se lanzará el 12 de mayo de 2023.
Pero, ¿recuerdas cuánto tiempo ha pasado entre los distintos
"The Legend of Zelda" de la historia?
Crea un programa que calcule cuántos años y días hay entre 2 juegos de Zelda
que tú selecciones.
- Debes buscar cada uno de los títulos y su día de lanzamiento
  (si no encuentras el día exacto puedes usar el mes, o incluso inventártelo)`;

// EXCEPCIÓN: el enunciado pide buscar (o incluso inventar) el día de
// lanzamiento de cada título, así que no hay un esperado fijo posible.
export const casos = [];

// Reto principal: cuánto tiempo hay entre dos juegos de la saga
export const demo = (entreJuegos) =>
  entreJuegos('The Legend of Zelda', 'Tears of the Kingdom');

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
