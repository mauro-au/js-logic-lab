import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '72';
export const dificultad = 'Medio'; // Fácil | Medio | Difícil
export const tags = ['strings'];

export const enunciado = `Crea un programa que analice texto y obtenga:
- Número total de palabras.
- Longitud media de las palabras.
- Número de oraciones del texto (cada vez que aparecen un punto).
- Encuentre la palabra más larga.

Todo esto utilizando un único bucle.`;

// El enunciado pide 4 resultados con un único bucle, así que se devuelven
// juntos en un objeto. El punto marca oración y no forma parte de la palabra;
// la palabra más larga se devuelve tal cual aparece. Las medias de estos
// textos son enteras, para no depender del redondeo.
export const casos = [
  { entrada: ['casa grande'], esperado: { palabras: 2, longitudMedia: 5, oraciones: 0, palabraMasLarga: 'grande' } },
  { entrada: ['Pan dulce.'], esperado: { palabras: 2, longitudMedia: 4, oraciones: 1, palabraMasLarga: 'dulce' } },
  { entrada: ['Tengo dos ojos.'], esperado: { palabras: 3, longitudMedia: 4, oraciones: 1, palabraMasLarga: 'Tengo' } },
  { entrada: ['Ana ve un barco. El gran mar es azul.'], esperado: { palabras: 9, longitudMedia: 3, oraciones: 2, palabraMasLarga: 'barco' } },
];

// Reto principal: analiza un texto con dos oraciones
export const demo = (analizar) => analizar('Mi casa. Tu jardín azul.');

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
