import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '96';
export const dificultad = 'Fácil'; // Fácil | Medio | Difícil
export const tags = ['aleatoriedad','matemáticas'];

export const enunciado = `Crea una función que simule las condiciones climáticas (temperatura y probabilidad de lluvia)
de un lugar ficticio al pasar un número concreto de días según estas reglas:
- La temperatura inicial y el % de probabilidad de lluvia lo define el usuario.
- Cada día que pasa:
  - 10% de posibilidades de que la temperatura aumente o disminuya 2 grados.
  - Si la temperatura supera los 25 grados, la probabilidad de lluvia al día
    siguiente aumenta en un 20%.
  - Si la temperatura baja de 5 grados, la probabilidad de lluvia al día
    siguiente disminuya en un 20%.
  - Si llueve (100%), la temperatura del día siguiente disminuye en 1 grado.
- La función recibe el número de días de la predicción y muestra la temperatura
  y si llueve durante todos esos días.
- También mostrará la temperatura máxima y mínima de ese periodo y cuántos días va a llover.`;

// Casos de prueba (opcional). Con la lista vacía el ejercicio corre en "modo libre":
// cada solución se ejecuta sin argumentos y se muestran su retorno y sus console.log.
// entrada = lista de argumentos; esperado = valor que debe retornar.
const casos = [
  // { entrada: [15], esperado: 'fizzbuzz' },
];

// Opcional: reto principal. Descomenta y agrega demo a crearEjecutor({ ... }).
// const demo = (solucion) => solucion(100);

export const ejecutar = crearEjecutor({ soluciones, casos });
