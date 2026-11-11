import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '50';
export const dificultad = 'Fácil'; // Fácil | Medio | Difícil
export const tags = ['strings', 'entrada-salida'];

export const enunciado = `Crea una función que sea capaz de detectar y retornar todos los
handles de un texto usando solamente Expresiones Regulares.
Debes crear una expresión regular para cada caso:
- Handle usuario: Los que comienzan por "@"
- Handle hashtag: Los que comienzan por "#"
- Handle web: Los que comienzan por "www.", "http://", "https://"
  y finalizan con un dominio (.com, .es...)`;

// Un único array con todos los handles, en orden de aparición en el texto.
export const casos = [
  {
    entrada: ['Hola @mouredev visita https://mouredev.com y #javascript'],
    esperado: ['@mouredev', 'https://mouredev.com', '#javascript'],
  },
  { entrada: ['Sin handles en este texto'], esperado: [] },
  { entrada: ['@ana y @luis son @amigos'], esperado: ['@ana', '@luis', '@amigos'] },
  { entrada: ['www.ejemplo.es es una web'], esperado: ['www.ejemplo.es'] },
  { entrada: ['http://foo.com'], esperado: ['http://foo.com'] },
];

// Reto principal: extraer los handles de un texto con todo mezclado.
export const demo = (detectarHandles) =>
  detectarHandles('@mouredev publica en https://mouredev.com sobre #JavaScript cada día');

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
