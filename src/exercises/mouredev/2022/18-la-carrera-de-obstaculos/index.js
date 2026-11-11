import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '18';
export const dificultad = 'Medio'; // Fácil | Medio | Difícil
export const tags = ['strings', 'arreglos'];

export const enunciado = `Crea una función que evalúe si un/a atleta ha superado correctamente una
carrera de obstáculos.
- La función recibirá dos parámetros:
     - Un array que sólo puede contener String con las palabras
       "run" o "jump"
     - Un String que represente la pista y sólo puede contener "_" (suelo)
       o "|" (valla)
- La función imprimirá cómo ha finalizado la carrera:
     - Si el/a atleta hace "run" en "_" (suelo) y "jump" en "|" (valla)
       será correcto y no variará el símbolo de esa parte de la pista.
     - Si hace "jump" en "_" (suelo), se variará la pista por "x".
     - Si hace "run" en "|" (valla), se variará la pista por "/".
- La función retornará un Boolean que indique si ha superado la carrera.
Para ello tiene que realizar la opción correcta en cada tramo de la pista.`;

// Contrato: (array de movimientos, pista) → booleano; la pista modificada solo se imprime.
export const casos = [
  { entrada: [['run', 'jump', 'run', 'jump', 'run'], '_|_|_'], esperado: true },
  { entrada: [['run', 'run', 'jump', 'jump'], '__||'], esperado: true },
  { entrada: [['run', 'run'], '_|'], esperado: false },
  { entrada: [['jump', 'jump'], '_|'], esperado: false },
  { entrada: [['jump', 'run'], '_|'], esperado: false },
];

// Reto principal: recorrer una pista completa sin fallos.
export const demo = (carrera) => carrera(['run', 'jump', 'run', 'jump', 'run'], '_|_|_');

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
