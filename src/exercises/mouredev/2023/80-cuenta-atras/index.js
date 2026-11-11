import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '80';
export const dificultad = 'Medio'; // Fácil | Medio | Difícil
export const tags = ['bucles','entrada-salida'];

export const enunciado = `Crea una función que reciba dos parámetros para crear una cuenta atrás.
- El primero, representa el número en el que comienza la cuenta.
- El segundo, los segundos que tienen que transcurrir entre cada cuenta.
- Sólo se aceptan números enteros positivos.
- El programa finaliza al llegar a cero.
- Debes imprimir cada número de la cuenta atrás.`;

// Contrato: recibe (inicio, segundos) y retorna la lista de números que
// imprime. El enunciado pide imprimirlos; los retornamos para poder compararlos.
export const casos = [
  { entrada: [1, 1], esperado: [1, 0] },
  { entrada: [3, 1], esperado: [3, 2, 1, 0] },
  { entrada: [5, 1], esperado: [5, 4, 3, 2, 1, 0] }, // incluye el 0: finaliza al llegar a cero
];

// Reto principal: cuenta atrás del 5 al 0 (cada número también sale en la terminal).
export const demo = (cuentaAtras) => cuentaAtras(5, 1);

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
