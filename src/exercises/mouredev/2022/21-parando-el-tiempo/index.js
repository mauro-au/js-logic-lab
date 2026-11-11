import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '21';
export const dificultad = 'Medio'; // Fácil | Medio | Difícil
export const tags = ['asincronía','funciones'];

export const enunciado = `Crea una función que sume 2 números y retorne su resultado pasados
unos segundos.
- Recibirá por parámetros los 2 números a sumar y los segundos que
  debe tardar en finalizar su ejecución.
- Si el lenguaje lo soporta, deberá retornar el resultado de forma
  asíncrona, es decir, sin detener la ejecución del programa principal.
  Se podría ejecutar varias veces al mismo tiempo.`;

// EXCEPCIÓN: el resultado llega en una promesa (asíncrono) y el ejecutor no hace
// await, así que nunca coincidiría con un número esperado.
export const casos = [];

// Reto principal: sumar 5 + 3 con 1 segundo de espera.
export const demo = (sumar) => sumar(5, 3, 1);

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
