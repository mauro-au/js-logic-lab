import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '58';
export const dificultad = 'Fácil'; // Fácil | Medio | Difícil
export const tags = [];

export const enunciado = `Escribe un !Hola Mundo! en todos los lenguajes de programación que puedas.
Seguro que hay algún lenguaje que te llama la atención y nunca has utilizado,
o quizás quieres dar tus primeros pasos... ¡Pues este es el momento!

A ver quién se atreve con uno de esos lenguajes que no solemos ver por ahí...`;

// Casos de prueba (opcional). Con la lista vacía el ejercicio corre en "modo libre":
// cada solución se ejecuta sin argumentos y se muestran su retorno y sus console.log.
// entrada = lista de argumentos; esperado = valor que debe retornar.
const casos = [
  // { entrada: [15], esperado: 'fizzbuzz' },
];

// Opcional: reto principal. Descomenta y agrega demo a crearEjecutor({ ... }).
// const demo = (solucion) => solucion(100);

export const ejecutar = crearEjecutor({ soluciones, casos });
