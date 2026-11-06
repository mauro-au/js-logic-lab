import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '22';
export const dificultad = 'Medio'; // Fácil | Medio | Difícil
export const tags = ['entrada-salida'];

export const enunciado = `Lee el fichero "Challenge21.txt" incluido en el proyecto, calcula su
resultado e imprímelo.
- El .txt se corresponde con las entradas de una calculadora.
- Cada línea tendrá un número o una operación representada por un
  símbolo (alternando ambos).
- Soporta números enteros y decimales.
- Soporta las operaciones suma "+", resta "-", multiplicación "*"
  y división "/".
- El resultado se muestra al finalizar la lectura de la última
  línea (si el .txt es correcto).
- Si el formato del .txt no es correcto, se indicará que no se han
  podido resolver las operaciones.`;

// Casos de prueba (opcional). Con la lista vacía el ejercicio corre en "modo libre":
// cada solución se ejecuta sin argumentos y se muestran su retorno y sus console.log.
// entrada = lista de argumentos; esperado = valor que debe retornar.
const casos = [
  // { entrada: [15], esperado: 'fizzbuzz' },
];

// Opcional: reto principal. Descomenta y agrega demo a crearEjecutor({ ... }).
// const demo = (solucion) => solucion(100);

export const ejecutar = crearEjecutor({ soluciones, casos });
