import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '61';
export const dificultad = 'Medio'; // Fácil | Medio | Difícil
export const tags = ['aleatoriedad'];

export const enunciado = `Crea un generador de números pseudoaleatorios entre 0 y 100.
- No puedes usar ninguna función "random" (o semejante) del
  lenguaje de programación seleccionado.

Es más complicado de lo que parece...`;

// EXCEPCIÓN: la secuencia generada es distinta en cada ejecución (no se puede
// usar random, pero cada solución elige su propio algoritmo), así que no hay
// un número esperado fijo. Corre en modo libre con solo la demo.
export const casos = [];

// Reto principal: genera un número con la semilla 2023.
export const demo = (pseudoaleatorio) =>
  pseudoaleatorio(2023) ?? 'número generado (ver terminal)';

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
