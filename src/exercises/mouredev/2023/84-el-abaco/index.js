import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '84';
export const dificultad = 'Fácil'; // Fácil | Medio | Difícil
export const tags = ['arreglos'];

export const enunciado = `Crea una función que sea capaz de leer el número representado por el ábaco.
- El ábaco se representa por un array con 7 elementos.
- Cada elemento tendrá 9 "O" (aunque habitualmente tiene 10 para realizar
  operaciones) para las cuentas y una secuencia de "---" para el alambre.
- El primer elemento del array representa los millones, y el último las unidades.
- El número en cada elemento se representa por las cuentas que están a
  la izquierda del alambre.

Ejemplo de array y resultado:
["O---OOOOOOOO",
 "OOO---OOOOOO",
 "---OOOOOOOOO",
 "OO---OOOOOOO",
 "OOOOOOO---OO",
 "OOOOOOOOO---",
 "---OOOOOOOOO"]

 Resultado: 1.302.790`;

// Contrato: recibe el ábaco (7 filas) y retorna el número como texto con
// puntos de miles, como el "Resultado: 1.302.790" del enunciado.
export const casos = [
  {
    entrada: [[
      'O---OOOOOOOO',
      'OOO---OOOOOO',
      '---OOOOOOOOO',
      'OO---OOOOOOO',
      'OOOOOOO---OO',
      'OOOOOOOOO---',
      '---OOOOOOOOO',
    ]],
    esperado: '1.302.790', // ejemplo del enunciado
  },
  {
    entrada: [[
      'O---OOOOOOOO',
      'OO---OOOOOOO',
      'OOO---OOOOOO',
      'OOOO---OOOOO',
      'OOOOO---OOOO',
      'OOOOOO---OOO',
      'OOOOOOO---OO',
    ]],
    esperado: '1.234.567',
  },
  {
    entrada: [[
      'OOOOOOOOO---',
      'OOOOOOOOO---',
      'OOOOOOOOO---',
      'OOOOOOOOO---',
      'OOOOOOOOO---',
      'OOOOOOOOO---',
      'OOOOOOOOO---',
    ]],
    esperado: '9.999.999',
  },
  {
    entrada: [[
      'O---OOOOOOOO',
      '---OOOOOOOOO',
      '---OOOOOOOOO',
      '---OOOOOOOOO',
      '---OOOOOOOOO',
      '---OOOOOOOOO',
      '---OOOOOOOOO',
    ]],
    esperado: '1.000.000',
  },
];

// Reto principal: leer el ábaco del ejemplo del enunciado.
export const demo = (abaco) =>
  abaco([
    'O---OOOOOOOO',
    'OOO---OOOOOO',
    '---OOOOOOOOO',
    'OO---OOOOOOO',
    'OOOOOOO---OO',
    'OOOOOOOOO---',
    '---OOOOOOOOO',
  ]);

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
