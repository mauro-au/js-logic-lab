import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '22';
export const dificultad = 'Medio'; // Fácil | Medio | Difícil
export const tags = ['entrada-salida'];

export const enunciado = `Lee el fichero "Challenge21.txt" incluido en el proyecto, calcula su
resultado e imprímelo.
- El .txt se corresponde con las entradas de una calculadora.
- Cada línea tendrá un número o una operación representada por un
  símbolo (alternando ambos).
- Soporta números enteros y decimales.
- Soporta las operaciones suma "+", resta "-", multiplicación "*"
  y división "/".
- El resultado se muestra al finalizar la lectura de la última
  línea (si el .txt es correcto).
- Si el formato del .txt no es correcto, se indicará que no se han
  podido resolver las operaciones.`;

// EXCEPCIÓN: lee un fichero externo ("Challenge21.txt") y su resultado depende de él.
export const casos = [];

// Reto principal: calcular el resultado del fichero (la salida va a la terminal).
export const demo = (calculadora) =>
  calculadora() ?? 'resultado impreso en la terminal';

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
