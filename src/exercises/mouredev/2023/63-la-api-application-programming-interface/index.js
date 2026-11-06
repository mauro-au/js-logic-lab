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

// Casos de prueba (opcional). Con la lista vacía el ejercicio corre en "modo libre":
// cada solución se ejecuta sin argumentos y se muestran su retorno y sus console.log.
// entrada = lista de argumentos; esperado = valor que debe retornar.
const casos = [
  // { entrada: [15], esperado: 'fizzbuzz' },
];

// Opcional: reto principal. Descomenta y agrega demo a crearEjecutor({ ... }).
// const demo = (solucion) => solucion(100);

export const ejecutar = crearEjecutor({ soluciones, casos });
