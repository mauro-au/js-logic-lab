import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '36';
export const dificultad = 'Medio'; // Fácil | Medio | Difícil
export const tags = ['matemáticas','condicionales'];

export const enunciado = `Crea un programa que calcule el daño de un ataque durante
una batalla Pokémon.
- La fórmula será la siguiente: daño = 50 * (ataque / defensa) * efectividad
- Efectividad: x2 (súper efectivo), x1 (neutral), x0.5 (no es muy efectivo)
- Sólo hay 4 tipos de Pokémon: Agua, Fuego, Planta y Eléctrico
  (buscar su efectividad)
- El programa recibe los siguientes parámetros:
 - Tipo del Pokémon atacante.
 - Tipo del Pokémon defensor.
 - Ataque: Entre 1 y 100.
 - Defensa: Entre 1 y 100.`;

// Casos de prueba (opcional). Con la lista vacía el ejercicio corre en "modo libre":
// cada solución se ejecuta sin argumentos y se muestran su retorno y sus console.log.
// entrada = lista de argumentos; esperado = valor que debe retornar.
const casos = [
  // { entrada: [15], esperado: 'fizzbuzz' },
];

// Opcional: reto principal. Descomenta y agrega demo a crearEjecutor({ ... }).
// const demo = (solucion) => solucion(100);

export const ejecutar = crearEjecutor({ soluciones, casos });
