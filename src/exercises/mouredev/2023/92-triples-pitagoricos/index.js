import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '92';
export const dificultad = 'Medio'; // Fácil | Medio | Difícil
export const tags = ['matemáticas','arreglos'];

export const enunciado = `Crea una función que encuentre todos los triples pitagóricos
(ternas) menores o iguales a un número dado.
- Debes buscar información sobre qué es un triple pitagórico.
- La función únicamente recibe el número máximo que puede
  aparecer en el triple.
- Ejemplo: Los triples menores o iguales a 10 están
  formados por (3, 4, 5) y (6, 8, 10).`;

// Casos de prueba (opcional). Con la lista vacía el ejercicio corre en "modo libre":
// cada solución se ejecuta sin argumentos y se muestran su retorno y sus console.log.
// entrada = lista de argumentos; esperado = valor que debe retornar.
const casos = [
  // { entrada: [15], esperado: 'fizzbuzz' },
];

// Opcional: reto principal. Descomenta y agrega demo a crearEjecutor({ ... }).
// const demo = (solucion) => solucion(100);

export const ejecutar = crearEjecutor({ soluciones, casos });
