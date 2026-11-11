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

// Cada triple es [a, b, c] con a ≤ b ≤ c y la lista va ordenada por la
// hipotenusa, incluyendo los múltiplos (6, 8, 10 aparece, como en el ejemplo).
export const casos = [
  { entrada: [1], esperado: [] },
  { entrada: [5], esperado: [[3, 4, 5]] },
  { entrada: [9], esperado: [[3, 4, 5]] }, // (6, 8, 10) queda fuera: 10 > 9
  { entrada: [10], esperado: [[3, 4, 5], [6, 8, 10]] }, // ejemplo del enunciado
];

// Reto principal: triples hasta 20.
export const demo = (triples) => triples(20);

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
