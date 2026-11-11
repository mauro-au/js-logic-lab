import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '17';
export const dificultad = 'Fácil'; // Fácil | Medio | Difícil
export const tags = ['strings'];

export const enunciado = `Crea una función que reciba un String de cualquier tipo y se encargue de
poner en mayúscula la primera letra de cada palabra.
- No se pueden utilizar operaciones del lenguaje que
  lo resuelvan directamente.`;

export const casos = [
  { entrada: ['hola mundo'], esperado: 'Hola Mundo' },
  { entrada: ['js logic lab'], esperado: 'Js Logic Lab' },
  { entrada: ['el perro de san roque'], esperado: 'El Perro De San Roque' },
  { entrada: ['hola, mundo!'], esperado: 'Hola, Mundo!' },
  { entrada: ['a'], esperado: 'A' },
  { entrada: [''], esperado: '' },
];

// Reto principal: primera letra en mayúscula de cada palabra
export const demo = (enMayuscula) => enMayuscula('hola mundo, este es js logic lab');

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
