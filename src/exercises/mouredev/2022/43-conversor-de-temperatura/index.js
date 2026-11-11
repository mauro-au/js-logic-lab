import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '43';
export const dificultad = 'Fácil'; // Fácil | Medio | Difícil
export const tags = ['matemáticas','strings'];

export const enunciado = `Crea una función que transforme grados Celsius en Fahrenheit
y viceversa.

- Para que un dato de entrada sea correcto debe poseer un símbolo "°"
  y su unidad ("C" o "F").
- En caso contrario retornará un error.`;

// El resultado conserva el formato de la entrada: número + ° + nueva unidad.
export const casos = [
  { entrada: ['25°C'], esperado: '77°F' },
  { entrada: ['0°C'], esperado: '32°F' },
  { entrada: ['212°F'], esperado: '100°C' },
  { entrada: ['32°F'], esperado: '0°C' },
  { entrada: ['77°F'], esperado: '25°C' },
  // El enunciado pide retornar un error con la entrada inválida.
  { entrada: ['25 grados'], esperado: 'Error' },
];

// Reto principal: convertir el punto de ebullición de 100 °C.
export const demo = (convertir) => convertir('100°C');

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
