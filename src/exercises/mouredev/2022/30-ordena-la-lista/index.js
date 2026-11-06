import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '30';
export const dificultad = 'Fácil'; // Fácil | Medio | Difícil
export const tags = ['arreglos', 'ordenamiento'];

export const enunciado = `Crea una función que ordene y retorne una matriz de números.
- La función recibirá un listado (por ejemplo [2, 4, 6, 8, 9]) y un parámetro
  adicional "Asc" o "Desc" para indicar si debe ordenarse de menor a mayor
  o de mayor a menor.
- No se pueden utilizar funciones propias del lenguaje que lo resuelvan
  automáticamente.`;

// Casos de prueba (opcional). Con la lista vacía el ejercicio corre en "modo libre":
// cada solución se ejecuta sin argumentos y se muestran su retorno y sus console.log.
// entrada = lista de argumentos; esperado = valor que debe retornar.
const casos = [
  // { entrada: [15], esperado: 'fizzbuzz' },
];

// Opcional: reto principal. Descomenta y agrega demo a crearEjecutor({ ... }).
// const demo = (solucion) => solucion(100);

export const ejecutar = crearEjecutor({ soluciones, casos });
