import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '24';
export const dificultad = 'Medio'; // Fácil | Medio | Difícil
export const tags = ['matemáticas'];

export const enunciado = `Crea dos funciones, una que calcule el máximo común divisor (MCD) y otra
que calcule el mínimo común múltiplo (mcm) de dos números enteros.
- No se pueden utilizar operaciones del lenguaje que
  lo resuelvan directamente.`;

// El ejercicio pide dos funciones (MCD y mcm): devolvemos ambas en un objeto.
export const casos = [
  { entrada: [12, 18], esperado: { mcd: 6, mcm: 36 } },
  { entrada: [15, 25], esperado: { mcd: 5, mcm: 75 } },
  { entrada: [7, 13], esperado: { mcd: 1, mcm: 91 } },
  { entrada: [8, 12], esperado: { mcd: 4, mcm: 24 } },
  { entrada: [100, 10], esperado: { mcd: 10, mcm: 100 } },
];

// Reto principal: MCD y mcm de 48 y 18.
export const demo = (mcdYmcm) => mcdYmcm(48, 18);

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
