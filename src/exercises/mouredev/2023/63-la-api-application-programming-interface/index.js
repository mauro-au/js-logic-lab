import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '63';
export const dificultad = 'Medio'; // Fácil | Medio | Difícil
export const tags = ['arreglos', 'interactivo', 'entrada-salida'];

export const enunciado = `Llamar a una API es una de las tareas más comunes en programación.

Implementa una llamada HTTP a una API (la que tú quieras) y muestra su
resultado a través de la terminal. Por ejemplo: Pokémon, Marvel...

Aquí tienes un listado de posibles APIs:
https://github.com/public-apis/public-apis`;

// EXCEPCIÓN: la llamada HTTP depende de la red y de la API que elija cada
// solución, no hay un resultado reproducible. Corre en modo libre con solo la demo.
export const casos = [];

// Reto principal: llama a la API elegida y muestra su respuesta.
export const demo = (api) => api() ?? 'respuesta de la API (ver terminal)';

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
