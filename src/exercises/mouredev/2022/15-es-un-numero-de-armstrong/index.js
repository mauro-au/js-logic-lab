import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '15';
export const dificultad = 'Fácil'; // Fácil | Medio | Difícil
export const tags = ['matemáticas'];

export const enunciado = `Escribe una función que calcule si un número dado es un número de Armstrong
(o también llamado narcisista).
Si no conoces qué es un número de Armstrong, debes buscar información
al respecto.`;

export const casos = [
  { entrada: [153], esperado: true },
  { entrada: [370], esperado: true },
  { entrada: [9474], esperado: true },
  { entrada: [1], esperado: true },
  { entrada: [10], esperado: false },
  { entrada: [123], esperado: false },
];

// Reto principal: filtrar los números de Armstrong de una lista
export const demo = (esArmstrong) => [9474, 153, 123, 370].filter((n) => esArmstrong(n));

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
