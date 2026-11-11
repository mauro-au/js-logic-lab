import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '57';
export const dificultad = 'Medio'; // Fácil | Medio | Difícil
export const tags = ['matemáticas'];

export const enunciado = `Escribe un programa que, dado un número, compruebe y muestre si es primo,
fibonacci y par.
Ejemplos:
- Con el número 2, nos dirá: "2 es primo, fibonacci y es par"
- Con el número 7, nos dirá: "7 es primo, no es fibonacci y es impar"`;

// El reto pide tres comprobaciones a la vez, así que devolvemos un único objeto
// con los tres resultados (primo, fibonacci y par) para el número recibido.
export const casos = [
  { entrada: [2], esperado: { primo: true, fibonacci: true, par: true } }, // ejemplo
  { entrada: [7], esperado: { primo: true, fibonacci: false, par: false } }, // ejemplo
  { entrada: [4], esperado: { primo: false, fibonacci: false, par: true } },
  { entrada: [8], esperado: { primo: false, fibonacci: true, par: true } },
  { entrada: [13], esperado: { primo: true, fibonacci: true, par: false } },
];

// Reto principal: un número que es primo y fibonacci a la vez (89).
export const demo = (comprobar) => comprobar(89);

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
