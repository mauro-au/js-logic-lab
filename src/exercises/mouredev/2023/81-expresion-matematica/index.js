import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '81';
export const dificultad = 'Medio'; // Fácil | Medio | Difícil
export const tags = ['strings'];

export const enunciado = `Crea una función que reciba una expresión matemática (String)
y compruebe si es correcta. Retornará true o false.
- Para que una expresión matemática sea correcta debe poseer
  un número, una operación y otro número separados por espacios.
  Tantos números y operaciones como queramos.
- Números positivos, negativos, enteros o decimales.
- Operaciones soportadas: + - * / %

Ejemplos:
"5 + 6 / 7 - 4" -> true
"5 a 6" -> false`;

// Contrato: recibe la expresión (String) y retorna true o false.
export const casos = [
  { entrada: ['5 + 6 / 7 - 4'], esperado: true }, // ejemplo del enunciado
  { entrada: ['5 a 6'], esperado: false }, // ejemplo del enunciado
  { entrada: ['2 * 3'], esperado: true },
  { entrada: ['-5 + 6.5'], esperado: true }, // número negativo y decimal
  { entrada: ['5 +'], esperado: false }, // falta el segundo número
  { entrada: ['hola mundo'], esperado: false }, // sin números ni operaciones
];

// Reto principal: comprobar la expresión del ejemplo del enunciado.
export const demo = (expresion) => expresion('5 + 6 / 7 - 4');

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
