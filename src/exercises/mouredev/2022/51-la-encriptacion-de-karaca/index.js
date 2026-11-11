import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '51';
export const dificultad = 'Fácil'; // Fácil | Medio | Difícil
export const tags = ['strings'];

export const enunciado = `Crea una función que sea capaz de encriptar y desencriptar texto
utilizando el algoritmo de encriptación de Karaca
(debes buscar información sobre él).`;

// El ejercicio pide encriptar y desencriptar: un primer parámetro con la acción
// ('encriptar' | 'desencriptar') y en segundo lugar el texto.
export const casos = [
  { entrada: ['encriptar', 'casa'], esperado: '0s0caca' },
  { entrada: ['desencriptar', '0s0caca'], esperado: 'casa' },
  { entrada: ['encriptar', 'hola'], esperado: '0l3haca' },
  { entrada: ['desencriptar', '0l3haca'], esperado: 'hola' },
  { entrada: ['encriptar', 'javascript'], esperado: 'tp2rcs0v0jaca' },
];

// Reto principal: encriptar "mouredev" con el algoritmo de Karaca.
export const demo = (karaca) => karaca('encriptar', 'mouredev');

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
