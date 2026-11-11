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

// entrada = [tipoAtacante, tipoDefensor, ataque, defensa]; retorna el daño.
// Todos los casos usan valores que la fórmula da exactos (sin decimales raros).
export const casos = [
  { entrada: ['Agua', 'Fuego', 100, 50], esperado: 200 }, // súper efectivo
  { entrada: ['Agua', 'Planta', 50, 100], esperado: 12.5 }, // no muy efectivo
  { entrada: ['Fuego', 'Agua', 50, 50], esperado: 25 }, // no muy efectivo
  { entrada: ['Eléctrico', 'Planta', 100, 100], esperado: 25 }, // no muy efectivo
  { entrada: ['Planta', 'Fuego', 60, 30], esperado: 50 }, // no muy efectivo
  { entrada: ['Fuego', 'Eléctrico', 40, 80], esperado: 25 }, // neutral
];

// Reto principal: ataque súper efectivo con ataque y defensa extremos
export const demo = (batalla) => batalla('Agua', 'Fuego', 100, 50);

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
