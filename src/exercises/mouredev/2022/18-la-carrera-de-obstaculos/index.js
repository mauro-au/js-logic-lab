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

// Casos de prueba (opcional). Con la lista vacía el ejercicio corre en "modo libre":
// cada solución se ejecuta sin argumentos y se muestran su retorno y sus console.log.
// entrada = lista de argumentos; esperado = valor que debe retornar.
const casos = [
  // { entrada: [15], esperado: 'fizzbuzz' },
];

// Opcional: reto principal. Descomenta y agrega demo a crearEjecutor({ ... }).
// const demo = (solucion) => solucion(100);

export const ejecutar = crearEjecutor({ soluciones, casos });
