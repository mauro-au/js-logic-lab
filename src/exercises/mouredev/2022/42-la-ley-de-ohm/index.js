import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '42';
export const dificultad = 'Fácil'; // Fácil | Medio | Difícil
export const tags = ['strings'];

export const enunciado = `Crea una función que calcule el valor del parámetro perdido
correspondiente a la ley de Ohm.
- Enviaremos a la función 2 de los 3 parámetros (V, R, I), y retornará
  el valor del tercero (redondeado a 2 decimales).
- Si los parámetros son incorrectos o insuficientes, la función retornará
  la cadena de texto "Invalid values".`;

// Los tres parámetros van en orden (V, R, I); el que no conocemos se envía como null.
export const casos = [
  { entrada: [10, null, 2], esperado: 5 },
  { entrada: [null, 10, 2], esperado: 20 },
  { entrada: [20, 5, null], esperado: 4 },
  { entrada: [10, null, 3], esperado: 3.33 },
  { entrada: [5, null, null], esperado: 'Invalid values' },
];

// Reto principal: calcular la tensión de un circuito de 8 Ω y 0,5 A.
export const demo = (leyOhm) => leyOhm(null, 8, 0.5);

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
