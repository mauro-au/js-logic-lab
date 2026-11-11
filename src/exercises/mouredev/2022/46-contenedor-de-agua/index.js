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

export const casos = [
  { entrada: [[4, 0, 3, 6, 1, 3]], esperado: 7 },
  { entrada: [[5, 0, 5]], esperado: 5 },
  { entrada: [[1, 2, 3]], esperado: 0 },
  { entrada: [[0, 1, 0, 2, 0, 1, 0, 3]], esperado: 6 },
  { entrada: [[]], esperado: 0 },
];

// Reto principal: calcular el agua atrapada en el ejemplo del enunciado.
export const demo = (contenedor) => contenedor([4, 0, 3, 6, 1, 3]);

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
