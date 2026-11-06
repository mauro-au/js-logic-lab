import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '46';
export const dificultad = 'Medio'; // Fácil | Medio | Difícil
export const tags = ['arreglos'];

export const enunciado = `Dado un array de números enteros positivos, donde cada uno
representa unidades de bloques apilados, debemos calcular cuantas unidades
de agua quedarán atrapadas entre ellos.

- Ejemplo: Dado el array [4, 0, 3, 6, 1, 3].

        ⏹
        ⏹
  ⏹💧💧⏹
  ⏹💧⏹⏹💧⏹
  ⏹💧⏹⏹💧⏹
  ⏹💧⏹⏹⏹⏹

  Representando bloque con ⏹︎ y agua con 💧, quedarán atrapadas 7 unidades
  de agua. Suponemos que existe un suelo impermeable en la parte inferior
  que retiene el agua.`;

// Casos de prueba (opcional). Con la lista vacía el ejercicio corre en "modo libre":
// cada solución se ejecuta sin argumentos y se muestran su retorno y sus console.log.
// entrada = lista de argumentos; esperado = valor que debe retornar.
const casos = [
  // { entrada: [15], esperado: 'fizzbuzz' },
];

// Opcional: reto principal. Descomenta y agrega demo a crearEjecutor({ ... }).
// const demo = (solucion) => solucion(100);

export const ejecutar = crearEjecutor({ soluciones, casos });
