import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '68';
export const dificultad = 'Fácil'; // Fácil | Medio | Difícil
export const tags = ['strings'];

export const enunciado = `Crea una función que sea capaz de transformar Español al lenguaje básico
del universo Star Wars: el "Aurebesh".
- Puedes dejar sin transformar los caracteres que no existan en "Aurebesh".
- También tiene que ser capaz de traducir en sentido contrario.

¿Lo has conseguido? Nómbrame en twitter.com/mouredev y escríbeme algo en Aurebesh.

¡Que la fuerza os acompañe!`;

// EXCEPCIÓN: el alfabeto Aurebesh no tiene representación canónica en texto
// plano (cada solución define su mapa de glifos), no hay un valor esperado fijo.
export const casos = [];

// Reto principal: traduce "hola" de Español a Aurebesh (por defecto).
export const demo = (aurebesh) => aurebesh('hola');

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
