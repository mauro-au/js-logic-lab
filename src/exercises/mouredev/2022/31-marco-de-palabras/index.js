import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '31';
export const dificultad = 'Fácil'; // Fácil | Medio | Difícil
export const tags = ['strings', 'dibujo'];

export const enunciado = `Crea una función que reciba un texto y muestre cada palabra en una línea,
formando un marco rectangular de asteriscos.
- ¿Qué te parece el reto? Se vería así:
  **********
  * ¿Qué   *
  * te     *
  * parece *
  * el     *
  * reto?  *
  **********`;

// Casos de prueba (opcional). Con la lista vacía el ejercicio corre en "modo libre":
// cada solución se ejecuta sin argumentos y se muestran su retorno y sus console.log.
// entrada = lista de argumentos; esperado = valor que debe retornar.
const casos = [
  // { entrada: [15], esperado: 'fizzbuzz' },
];

// Opcional: reto principal. Descomenta y agrega demo a crearEjecutor({ ... }).
// const demo = (solucion) => solucion(100);

export const ejecutar = crearEjecutor({ soluciones, casos });
