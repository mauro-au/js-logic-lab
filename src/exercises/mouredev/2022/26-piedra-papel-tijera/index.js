import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '26';
export const dificultad = 'Medio'; // Fácil | Medio | Difícil
export const tags = ['arreglos'];

export const enunciado = `Crea un programa que calcule quien gana más partidas al piedra,
papel, tijera.
- El resultado puede ser: "Player 1", "Player 2", "Tie" (empate)
- La función recibe un listado que contiene pares, representando cada jugada.
- El par puede contener combinaciones de "R" (piedra), "P" (papel)
  o "S" (tijera).
- Ejemplo. Entrada: [("R","S"), ("S","R"), ("P","S")]. Resultado: "Player 2".`;

// Contrato: un único array de pares [["R","P","S"], ["R","P","S"]] → el ganador.
export const casos = [
  { entrada: [[['R', 'S'], ['S', 'R'], ['P', 'S']]], esperado: 'Player 2' }, // ejemplo del enunciado
  { entrada: [[['R', 'S'], ['S', 'P'], ['P', 'R']]], esperado: 'Player 1' },
  { entrada: [[['R', 'R'], ['P', 'P'], ['S', 'S']]], esperado: 'Tie' },
  { entrada: [[['S', 'R'], ['R', 'P']]], esperado: 'Player 2' },
  { entrada: [[['R', 'S'], ['P', 'S']]], esperado: 'Tie' },
];

// Reto principal: la partida de ejemplo del enunciado.
export const demo = (piedraPapelTijera) =>
  piedraPapelTijera([['R', 'S'], ['S', 'R'], ['P', 'S']]);

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
