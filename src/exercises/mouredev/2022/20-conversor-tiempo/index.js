import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '20';
export const dificultad = 'Fácil'; // Fácil | Medio | Difícil
export const tags = ['matemáticas'];

export const enunciado = `Crea una función que reciba días, horas, minutos y segundos (como enteros)
y retorne su resultado en milisegundos.`;

// Contrato: [días, horas, minutos, segundos] → milisegundos.
export const casos = [
  { entrada: [0, 0, 0, 0], esperado: 0 },
  { entrada: [0, 0, 0, 1], esperado: 1000 },
  { entrada: [0, 1, 0, 0], esperado: 3600000 },
  { entrada: [1, 0, 0, 0], esperado: 86400000 },
  { entrada: [1, 2, 3, 4], esperado: 93784000 },
];

// Reto principal: convertir 1 día, 2 horas, 3 minutos y 4 segundos.
export const demo = (convertir) => convertir(1, 2, 3, 4);

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
