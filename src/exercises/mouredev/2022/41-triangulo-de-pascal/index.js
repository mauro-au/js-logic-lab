import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '41';
export const dificultad = 'Medio'; // Fácil | Medio | Difícil
export const tags = ['dibujo', 'entrada-salida'];

export const enunciado = `Crea una función que sea capaz de dibujar el "Triángulo de Pascal"
indicándole únicamente el tamaño del lado.

- Aquí puedes ver rápidamente cómo se calcula el triángulo:
  https://commons.wikimedia.org/wiki/File:PascalTriangleAnimated2.gif`;

// Casos de prueba (opcional). Con la lista vacía el ejercicio corre en "modo libre":
// cada solución se ejecuta sin argumentos y se muestran su retorno y sus console.log.
// entrada = lista de argumentos; esperado = valor que debe retornar.
const casos = [
  // { entrada: [15], esperado: 'fizzbuzz' },
];

// Opcional: reto principal. Descomenta y agrega demo a crearEjecutor({ ... }).
// const demo = (solucion) => solucion(100);

export const ejecutar = crearEjecutor({ soluciones, casos });
