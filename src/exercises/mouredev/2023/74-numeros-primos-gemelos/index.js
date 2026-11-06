import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '74';
export const dificultad = 'Medio'; // Fácil | Medio | Difícil
export const tags = ['matemáticas'];

export const enunciado = `Crea un programa que encuentre y muestre todos los pares de números primos
gemelos en un rango concreto.
El programa recibirá el rango máximo como número entero positivo.

- Un par de números primos se considera gemelo si la diferencia entre
  ellos es exactamente 2. Por ejemplo (3, 5), (11, 13)

- Ejemplo: Rango 14
  (3, 5), (5, 7), (11, 13)`;

// Casos de prueba (opcional). Con la lista vacía el ejercicio corre en "modo libre":
// cada solución se ejecuta sin argumentos y se muestran su retorno y sus console.log.
// entrada = lista de argumentos; esperado = valor que debe retornar.
const casos = [
  // { entrada: [15], esperado: 'fizzbuzz' },
];

// Opcional: reto principal. Descomenta y agrega demo a crearEjecutor({ ... }).
// const demo = (solucion) => solucion(100);

export const ejecutar = crearEjecutor({ soluciones, casos });
