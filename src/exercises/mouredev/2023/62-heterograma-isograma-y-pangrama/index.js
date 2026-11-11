import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '62';
export const dificultad = 'Fácil'; // Fácil | Medio | Difícil
export const tags = ['strings'];

export const enunciado = `Crea 3 funciones, cada una encargada de detectar si una cadena de
texto es un heterograma, un isograma o un pangrama.
- Debes buscar la definición de cada uno de estos términos.`;

// El reto pide 3 funciones, así que devolvemos un único objeto con los tres
// resultados para la cadena recibida. Definiciones: heterograma = sin letras
// repetidas; isograma = todas las letras con la misma frecuencia;
// pangrama = contiene todas las letras del alfabeto.
export const casos = [
  { entrada: ['murciélago'], esperado: { heterograma: true, isograma: true, pangrama: false } },
  { entrada: ['casa'], esperado: { heterograma: false, isograma: false, pangrama: false } },
  { entrada: ['abcdefghijklmnopqrstuvwxyz'], esperado: { heterograma: true, isograma: true, pangrama: true } },
  { entrada: ['Packed my box with five dozen liquor jugs'], esperado: { heterograma: false, isograma: false, pangrama: true } },
];

// Reto principal: comprueba un pangrama clásico del español.
export const demo = (comprobar) =>
  comprobar('Quiere la boca exhausta vid, kiwi, piña y fugaz jamón.');

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
