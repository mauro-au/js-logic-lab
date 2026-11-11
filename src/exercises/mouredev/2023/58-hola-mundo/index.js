import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '58';
export const dificultad = 'Fácil'; // Fácil | Medio | Difícil
export const tags = ['entrada-salida'];

export const enunciado = `Escribe un !Hola Mundo! en todos los lenguajes de programación que puedas.
Seguro que hay algún lenguaje que te llama la atención y nunca has utilizado,
o quizás quieres dar tus primeros pasos... ¡Pues este es el momento!

A ver quién se atreve con uno de esos lenguajes que no solemos ver por ahí...`;

// EXCEPCIÓN: reto creativo/showcase ("¡Hola Mundo!" en tantos lenguajes como
// quieras), sin una salida fija que comparar.
export const casos = [];

// Reto principal: muestra el saludo en todos los lenguajes que puedas.
export const demo = (holaMundo) => holaMundo() ?? '¡Hola Mundo! (ver terminal)';

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
