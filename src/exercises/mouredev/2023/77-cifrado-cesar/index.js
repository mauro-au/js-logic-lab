import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '77';
export const dificultad = 'Fácil'; // Fácil | Medio | Difícil
export const tags = ['strings'];

export const enunciado = `Crea un programa que realize el cifrado César de un texto y lo imprima.
También debe ser capaz de descifrarlo cuando así se lo indiquemos.

Te recomiendo que busques información para conocer en profundidad cómo
realizar el cifrado. Esto también forma parte del reto.`;

// El enunciado pide "imprimir": lo modelamos retornando el texto. Contrato:
// (texto, desplazamiento, descifrar). Solo se desplazan las letras A-Z
// conservando mayúsculas y minúsculas; números, espacios y signos no cambian.
export const casos = [
  { entrada: ['abc', 3], esperado: 'def' },
  { entrada: ['xyz', 3], esperado: 'abc' },
  { entrada: ['Hola, Mundo 2026!', 3], esperado: 'Krod, Pxqgr 2026!' },
  { entrada: ['def', 3, true], esperado: 'abc' },
  { entrada: ['Krod Pxqgr', 3, true], esperado: 'Hola Mundo' },
];

// Reto principal: cifra el título del juego de Zelda
export const demo = (cesar) => cesar('Zelda Tears of the Kingdom', 3);

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
