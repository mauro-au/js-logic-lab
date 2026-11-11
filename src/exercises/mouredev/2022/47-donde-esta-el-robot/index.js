import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '47';
export const dificultad = 'Medio'; // Fácil | Medio | Difícil
export const tags = ['arreglos', 'ordenamiento'];

export const enunciado = `Calcula dónde estará un robot (sus coordenadas finales) que se
encuentra en una cuadrícula representada por los ejes "x" e "y".
- El robot comienza en la coordenada (0, 0).
- Para idicarle que se mueva, le enviamos un array formado por enteros
  (positivos o negativos) que indican la secuencia de pasos a dar.
- Por ejemplo: [10, 5, -2] indica que primero se mueve 10 pasos, se detiene,
  luego 5, se detiene, y finalmente 2.
  El resultado en este caso sería (x: -5, y: 12)
- Si el número de pasos es negativo, se desplazaría en sentido contrario al
  que está mirando.
- Los primeros pasos los hace en el eje "y". Interpretamos que está mirando
  hacia la parte positiva del eje "y".
- El robot tiene un fallo en su programación: cada vez que finaliza una
  secuencia de pasos gira 90 grados en el sentido contrario a las agujas
  del reloj.`;

// Coordenadas finales como objeto plano { x, y } (ver ejemplo del enunciado).
export const casos = [
  { entrada: [[10, 5, -2]], esperado: { x: -5, y: 12 } },
  { entrada: [[]], esperado: { x: 0, y: 0 } },
  { entrada: [[5]], esperado: { x: 0, y: 5 } },
  { entrada: [[5, 5]], esperado: { x: -5, y: 5 } },
  { entrada: [[1, 2, 3, 4]], esperado: { x: 2, y: -2 } },
];

// Reto principal: la secuencia de pasos del enunciado.
export const demo = (robot) => robot([10, 5, -2]);

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
