import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '40';
export const dificultad = 'Medio'; // Fácil | Medio | Difícil
export const tags = ['ordenamiento'];

export const enunciado = `Implementa uno de los algoritmos de ordenación más famosos:
el "Quick Sort", creado por C.A.R. Hoare.
- Entender el funcionamiento de los algoritmos más utilizados de la historia
  Nos ayuda a mejorar nuestro conocimiento sobre ingeniería de software.
  Dedícale tiempo a entenderlo, no únicamente a copiar su implementación.
- Esta es una nueva serie de retos llamada "TOP ALGORITMOS",
  donde trabajaremos y entenderemos los más famosos de la historia.`;

// Casos de prueba (opcional). Con la lista vacía el ejercicio corre en "modo libre":
// cada solución se ejecuta sin argumentos y se muestran su retorno y sus console.log.
// entrada = lista de argumentos; esperado = valor que debe retornar.
const casos = [
  // { entrada: [15], esperado: 'fizzbuzz' },
];

// Opcional: reto principal. Descomenta y agrega demo a crearEjecutor({ ... }).
// const demo = (solucion) => solucion(100);

export const ejecutar = crearEjecutor({ soluciones, casos });
