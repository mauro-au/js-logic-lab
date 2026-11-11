import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '07';
export const dificultad = 'Fácil'; // Fácil | Medio | Difícil
export const tags = ['strings'];

export const enunciado = `Crea un programa que invierta el orden de una cadena de texto
sin usar funciones propias del lenguaje que lo hagan de forma automática.
- Si le pasamos "Hola mundo" nos retornaría "odnum aloH"`;

export const casos = [
  { entrada: ['Hola mundo'], esperado: 'odnum aloH' }, // ejemplo del enunciado
  { entrada: [''], esperado: '' },
  { entrada: ['a'], esperado: 'a' },
  { entrada: ['python'], esperado: 'nohtyp' },
  { entrada: ['12345'], esperado: '54321' },
];

// Reto principal: invertir la frase del enunciado
export const demo = (invertir) => invertir('Hola mundo');

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
