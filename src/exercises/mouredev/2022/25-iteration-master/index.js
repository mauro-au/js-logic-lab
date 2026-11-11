import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '25';
export const dificultad = 'Fácil'; // Fácil | Medio | Difícil
export const tags = ['bucles','entrada-salida'];

export const enunciado = `Quiero contar del 1 al 100 de uno en uno (imprimiendo cada uno).
¿De cuántas maneras eres capaz de hacerlo?
Crea el código para cada una de ellas.`;

// EXCEPCIÓN: reto creativo ("¿de cuántas maneras?") que solo imprime por consola,
// sin una salida fija que comparar.
export const casos = [];

// Reto principal: contar del 1 al 100 (la numeración sale en los logs de la terminal).
export const demo = (iterationMaster) =>
  iterationMaster() ?? 'del 1 al 100 (ver logs de la terminal)';

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
