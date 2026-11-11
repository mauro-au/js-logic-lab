import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '09';
export const dificultad = 'Fácil'; // Fácil | Medio | Difícil
export const tags = ['matemáticas'];

export const enunciado = `Crea un programa se encargue de transformar un número
decimal a binario sin utilizar funciones propias del lenguaje que lo hagan directamente.`;

// El binario se retorna como cadena ("1010") para verlo tal cual.
export const casos = [
  { entrada: [0], esperado: '0' },
  { entrada: [1], esperado: '1' },
  { entrada: [2], esperado: '10' },
  { entrada: [10], esperado: '1010' },
  { entrada: [15], esperado: '1111' },
  { entrada: [100], esperado: '1100100' },
];

// Reto principal: el año de los retos en binario
export const demo = (aBinario) => aBinario(2022);

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
