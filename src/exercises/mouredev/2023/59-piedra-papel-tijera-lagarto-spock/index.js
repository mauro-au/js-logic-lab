import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '59';
export const dificultad = 'Medio'; // Fácil | Medio | Difícil
export const tags = ['arreglos'];

export const enunciado = `Crea un programa que calcule quien gana más partidas al piedra,
papel, tijera, lagarto, spock.
- El resultado puede ser: "Player 1", "Player 2", "Tie" (empate)
- La función recibe un listado que contiene pares, representando cada jugada.
- El par puede contener combinaciones de "🗿" (piedra), "📄" (papel),
  "✂️" (tijera), "🦎" (lagarto) o "🖖" (spock).
- Ejemplo. Entrada: [("🗿","✂️"), ("✂️","🗿"), ("📄","✂️")]. Resultado: "Player 2".
- Debes buscar información sobre cómo se juega con estas 5 posibilidades.`;

// La función recibe UN solo argumento: el listado de pares de jugada
// (cada par = [jugada del P1, jugada del P2]) y retorna quién gana más partidas.
export const casos = [
  { // ejemplo del enunciado
    entrada: [[['🗿', '✂️'], ['✂️', '🗿'], ['📄', '✂️']]],
    esperado: 'Player 2',
  },
  { // la tijera corta el papel
    entrada: [[['✂️', '📄']]],
    esperado: 'Player 1',
  },
  { // dos empates
    entrada: [[['🗿', '🗿'], ['🦎', '🦎']]],
    esperado: 'Tie',
  },
  { // Spock vaporiza la piedra
    entrada: [[['🖖', '🗿']]],
    esperado: 'Player 1',
  },
  { // el lagarto envenena a Spock
    entrada: [[['🦎', '🖖']]],
    esperado: 'Player 1',
  },
];

// Reto principal: una partida completa de 5 rondas.
export const demo = (gana) =>
  gana([['🗿', '✂️'], ['✂️', '📄'], ['📄', '🗿'], ['🦎', '🖖'], ['🖖', '🗿']]);

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
