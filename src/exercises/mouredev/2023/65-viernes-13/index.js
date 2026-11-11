import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '65';
export const dificultad = 'Fácil'; // Fácil | Medio | Difícil
export const tags = ['fechas'];

export const enunciado = `Crea una función que sea capaz de detectar si existe un viernes 13
en el mes y el año indicados.
- La función recibirá el mes y el año y retornará verdadero o falso.`;

// El enunciado indica que la función recibe PRIMERO el mes (1-12) y después
// el año, y retorna "true" solo si cae viernes 13 en ese mes.
export const casos = [
  { entrada: [1, 2023], esperado: true },
  { entrada: [2, 2026], esperado: true },
  { entrada: [11, 2026], esperado: true },
  { entrada: [2, 2024], esperado: false },
  { entrada: [5, 2024], esperado: false },
];

// Reto principal: ¿hay viernes 13 este mes?
export const demo = (viernes13) => viernes13(11, 2026);

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
