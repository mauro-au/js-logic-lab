import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '21';
export const dificultad = 'Medio'; // Fácil | Medio | Difícil
export const tags = [];

export const enunciado = `Crea una función que sume 2 números y retorne su resultado pasados
unos segundos.
- Recibirá por parámetros los 2 números a sumar y los segundos que
  debe tardar en finalizar su ejecución.
- Si el lenguaje lo soporta, deberá retornar el resultado de forma
  asíncrona, es decir, sin detener la ejecución del programa principal.
  Se podría ejecutar varias veces al mismo tiempo.`;

// Casos de prueba (opcional). Con la lista vacía el ejercicio corre en "modo libre":
// cada solución se ejecuta sin argumentos y se muestran su retorno y sus console.log.
// entrada = lista de argumentos; esperado = valor que debe retornar.
const casos = [
  // { entrada: [15], esperado: 'fizzbuzz' },
];

// Opcional: reto principal. Descomenta y agrega demo a crearEjecutor({ ... }).
// const demo = (solucion) => solucion(100);

export const ejecutar = crearEjecutor({ soluciones, casos });
