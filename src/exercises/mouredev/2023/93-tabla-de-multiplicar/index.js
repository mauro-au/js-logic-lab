import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '93';
export const dificultad = 'Fácil'; // Fácil | Medio | Difícil
export const tags = [];

export const enunciado = `Crea un programa que sea capaz de solicitarte un número y se
encargue de imprimir su tabla de multiplicar entre el 1 y el 10.
- Debe visualizarse qué operación se realiza y su resultado.
  Ej: 1 x 1 = 1
      1 x 2 = 2
      1 x 3 = 3
      ...`;

// Casos de prueba (opcional). Con la lista vacía el ejercicio corre en "modo libre":
// cada solución se ejecuta sin argumentos y se muestran su retorno y sus console.log.
// entrada = lista de argumentos; esperado = valor que debe retornar.
const casos = [
  // { entrada: [15], esperado: 'fizzbuzz' },
];

// Opcional: reto principal. Descomenta y agrega demo a crearEjecutor({ ... }).
// const demo = (solucion) => solucion(100);

export const ejecutar = crearEjecutor({ soluciones, casos });
