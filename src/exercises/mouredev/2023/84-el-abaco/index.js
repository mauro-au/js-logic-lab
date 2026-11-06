import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '84';
export const dificultad = 'Fácil'; // Fácil | Medio | Difícil
export const tags = ['arreglos'];

export const enunciado = `Crea una función que sea capaz de leer el número representado por el ábaco.
- El ábaco se representa por un array con 7 elementos.
- Cada elemento tendrá 9 "O" (aunque habitualmente tiene 10 para realizar
  operaciones) para las cuentas y una secuencia de "---" para el alambre.
- El primer elemento del array representa los millones, y el último las unidades.
- El número en cada elemento se representa por las cuentas que están a
  la izquierda del alambre.

Ejemplo de array y resultado:
["O---OOOOOOOO",
 "OOO---OOOOOO",
 "---OOOOOOOOO",
 "OO---OOOOOOO",
 "OOOOOOO---OO",
 "OOOOOOOOO---",
 "---OOOOOOOOO"]

 Resultado: 1.302.790`;

// Casos de prueba (opcional). Con la lista vacía el ejercicio corre en "modo libre":
// cada solución se ejecuta sin argumentos y se muestran su retorno y sus console.log.
// entrada = lista de argumentos; esperado = valor que debe retornar.
const casos = [
  // { entrada: [15], esperado: 'fizzbuzz' },
];

// Opcional: reto principal. Descomenta y agrega demo a crearEjecutor({ ... }).
// const demo = (solucion) => solucion(100);

export const ejecutar = crearEjecutor({ soluciones, casos });
