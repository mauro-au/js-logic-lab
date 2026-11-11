import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '39';
export const dificultad = 'Medio'; // Fácil | Medio | Difícil
export const tags = ['matemáticas'];

export const enunciado = `Crea un programa se encargue de transformar un número binario
a decimal sin utilizar funciones propias del lenguaje que
lo hagan directamente.`;

// entrada = cadena binaria (p. ej. '1011'); retorna su valor decimal.
export const casos = [
  { entrada: ['0'], esperado: 0 },
  { entrada: ['1'], esperado: 1 },
  { entrada: ['1011'], esperado: 11 },
  { entrada: ['10000000'], esperado: 128 },
  { entrada: ['11111111'], esperado: 255 },
  { entrada: ['10101010'], esperado: 170 },
];

// Reto principal: convertir un byte completo
export const demo = (binario) => binario('11111111');

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
