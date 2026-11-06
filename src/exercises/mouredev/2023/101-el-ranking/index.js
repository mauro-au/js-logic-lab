import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '101';
export const dificultad = 'Difícil'; // Fácil | Medio | Difícil
export const tags = ['arreglos', 'ordenamiento'];

export const enunciado = `Todo llega a su fin... Este es el último reto de programación
semanal de 2023.

Crea un programa que muestre un listado calculado en tiempo real
con todos los usuarios que han resuelto algún reto de programación
de este año.
- El listado debe estar ordenado por el número de ejercicios resueltos
  por cada usuario (y mostrar ese contador al lado de su nombre).
- También se debe de mostrar el número de usuarios que han participado
  y el número de correcciones enviadas.

Muchísimas gracias por ayudar a crear este gran recurso
para la comunidad... ¡Prepárate para 2024!`;

// Casos de prueba (opcional). Con la lista vacía el ejercicio corre en "modo libre":
// cada solución se ejecuta sin argumentos y se muestran su retorno y sus console.log.
// entrada = lista de argumentos; esperado = valor que debe retornar.
const casos = [
  // { entrada: [15], esperado: 'fizzbuzz' },
];

// Opcional: reto principal. Descomenta y agrega demo a crearEjecutor({ ... }).
// const demo = (solucion) => solucion(100);

export const ejecutar = crearEjecutor({ soluciones, casos });
