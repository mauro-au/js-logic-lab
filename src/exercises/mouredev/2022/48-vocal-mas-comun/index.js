import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '48';
export const dificultad = 'Fácil'; // Fácil | Medio | Difícil
export const tags = ['strings'];

export const enunciado = `Crea un función que reciba un texto y retorne la vocal que
más veces se repita.
- Ten cuidado con algunos casos especiales.
- Si no hay vocales podrá devolver vacío.`;

// Solo vocales aeiou en minúscula; sin empates entre las vocales de cada entrada.
export const casos = [
  { entrada: ['Javascript'], esperado: 'a' },
  { entrada: ['hola mundo'], esperado: 'o' },
  { entrada: ['aeiouuuu'], esperado: 'u' },
  { entrada: ['everest'], esperado: 'e' },
  // Sin vocales: el enunciado permite devolver vacío (cadena vacía).
  { entrada: ['xyz'], esperado: '' },
];

// Reto principal: la vocal más frecuente de una frase.
export const demo = (vocalMasComun) => vocalMasComun('Programar en JavaScript es divertido');

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
