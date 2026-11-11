import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '10';
export const dificultad = 'Medio'; // Fácil | Medio | Difícil
export const tags = ['strings', 'entrada-salida'];

export const enunciado = `Crea un programa que sea capaz de transformar texto natural a código
morse y viceversa.
- Debe detectar automáticamente de qué tipo se trata y realizar
  la conversión.
- En morse se soporta raya "—", punto ".", un espacio " " entre letras
  o símbolos y dos espacios entre palabras "  ".
- El alfabeto morse soportado será el mostrado en
  https://es.wikipedia.org/wiki/Código_morse.`;

// La raya del morse se escribe con el guion "-" (el "—" del enunciado es tipográfico).
export const casos = [
  { entrada: ['HOLA'], esperado: '.... --- .-.. .-' },
  { entrada: ['SOS'], esperado: '... --- ...' },
  { entrada: ['HOLA MUNDO'], esperado: '.... --- .-.. .-  -- ..- -. -.. ---' }, // dos espacios entre palabras
  { entrada: ['... --- ...'], esperado: 'SOS' }, // morse → texto (se detecta solo)
  { entrada: ['.... --- .-.. .-'], esperado: 'HOLA' },
];

// Reto principal: convertir texto natural a morse
export const demo = (morse) => morse('HOLA MUNDO');

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
