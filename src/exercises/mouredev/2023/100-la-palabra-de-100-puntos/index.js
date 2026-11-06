import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '100';
export const dificultad = 'Fácil'; // Fácil | Medio | Difícil
export const tags = ['strings', 'interactivo'];

export const enunciado = `La última semana de 2021 comenzamos la actividad de retos de programación,
con la intención de resolver un ejercicio cada semana para mejorar
nuestra lógica... ¡Hemos llegado al EJERCICIO 100! Gracias 🙌

Crea un programa que calcule los puntos de una palabra.
- Cada letra tiene un valor asignado. Por ejemplo, en el abecedario
  español de 27 letras, la A vale 1 y la Z 27.
- El programa muestra el valor de los puntos de cada palabra introducida.
- El programa finaliza si logras introducir una palabra de 100 puntos.
- Puedes usar la terminal para interactuar con el usuario y solicitarle
  cada palabra.`;

// Casos de prueba (opcional). Con la lista vacía el ejercicio corre en "modo libre":
// cada solución se ejecuta sin argumentos y se muestran su retorno y sus console.log.
// entrada = lista de argumentos; esperado = valor que debe retornar.
const casos = [
  // { entrada: [15], esperado: 'fizzbuzz' },
];

// Opcional: reto principal. Descomenta y agrega demo a crearEjecutor({ ... }).
// const demo = (solucion) => solucion(100);

export const ejecutar = crearEjecutor({ soluciones, casos });
