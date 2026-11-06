import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '91';
export const dificultad = 'Medio'; // Fácil | Medio | Difícil
export const tags = ['arreglos'];

export const enunciado = `Crea una función que encuentre todas las combinaciones de los números
de una lista que suman el valor objetivo.
- La función recibirá una lista de números enteros positivos
  y un valor objetivo.
- Para obtener las combinaciones sólo se puede usar
  una vez cada elemento de la lista (pero pueden existir
  elementos repetidos en ella).
- Ejemplo: Lista = [1, 5, 3, 2],  Objetivo = 6
  Soluciones: [1, 5] y [1, 3, 2] (ambas combinaciones suman 6)
  (Si no existen combinaciones, retornar una lista vacía)`;

// Casos de prueba (opcional). Con la lista vacía el ejercicio corre en "modo libre":
// cada solución se ejecuta sin argumentos y se muestran su retorno y sus console.log.
// entrada = lista de argumentos; esperado = valor que debe retornar.
const casos = [
  // { entrada: [15], esperado: 'fizzbuzz' },
];

// Opcional: reto principal. Descomenta y agrega demo a crearEjecutor({ ... }).
// const demo = (solucion) => solucion(100);

export const ejecutar = crearEjecutor({ soluciones, casos });
