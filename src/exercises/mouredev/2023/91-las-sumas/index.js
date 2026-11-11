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

// Orden fijo: las combinaciones se listan recorriendo la lista de izquierda a
// derecha (como en el ejemplo del enunciado) y cada combinación conserva el
// orden original de sus elementos.
export const casos = [
  { entrada: [[1, 5, 3, 2], 6], esperado: [[1, 5], [1, 3, 2]] }, // ejemplo del enunciado
  { entrada: [[1, 2, 3], 7], esperado: [] }, // sin combinaciones posibles
  { entrada: [[5, 1, 2], 3], esperado: [[1, 2]] },
  { entrada: [[3, 3, 6], 12], esperado: [[3, 3, 6]] }, // lista con elementos repetidos
];

// Reto principal: el ejemplo del reto.
export const demo = (sumas) => sumas([1, 5, 3, 2], 6);

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
