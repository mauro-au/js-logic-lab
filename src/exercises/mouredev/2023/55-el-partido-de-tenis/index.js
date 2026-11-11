import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '55';
export const dificultad = 'Medio'; // Fácil | Medio | Difícil
export const tags = ['strings','arreglos'];

export const enunciado = `Escribe un programa que muestre cómo transcurre un juego de tenis y quién lo ha ganado.
El programa recibirá una secuencia formada por "P1" (Player 1) o "P2" (Player 2), según quien
gane cada punto del juego.

- Las puntuaciones de un juego son "Love" (cero), 15, 30, 40, "Deuce" (empate), ventaja.
- Ante la secuencia [P1, P1, P2, P2, P1, P2, P1, P1], el programa mostraría lo siguiente:
  15 - Love
  30 - Love
  30 - 15
  30 - 30
  40 - 30
  Deuce
  Ventaja P1
  Ha ganado el P1
- Si quieres, puedes controlar errores en la entrada de datos.
- Consulta las reglas del juego si tienes dudas sobre el sistema de puntos.`;

// "Mostrar la partida por consola" lo modelamos retornando el array de líneas
// (mismo criterio que el reto 01): una línea tras cada punto, con el formato
// del enunciado: "15 - Love", "Deuce", "Ventaja P1", "Ha ganado el P1"…
export const casos = [
  {
    // Ejemplo exacto del enunciado.
    entrada: [['P1', 'P1', 'P2', 'P2', 'P1', 'P2', 'P1', 'P1']],
    esperado: ['15 - Love', '30 - Love', '30 - 15', '30 - 30', '40 - 30', 'Deuce', 'Ventaja P1', 'Ha ganado el P1'],
  },
  {
    // Victoria rápida del P1 en 4 puntos seguidos.
    entrada: [['P1', 'P1', 'P1', 'P1']],
    esperado: ['15 - Love', '30 - Love', '40 - Love', 'Ha ganado el P1'],
  },
  {
    // Deuce y ventaja del P2 hasta ganar.
    entrada: [['P2', 'P1', 'P2', 'P1', 'P1', 'P2', 'P2', 'P2']],
    esperado: ['Love - 15', '15 - 15', '15 - 30', '30 - 30', '40 - 30', 'Deuce', 'Ventaja P2', 'Ha ganado el P2'],
  },
];

// Reto principal: la partida de ejemplo del enunciado.
export const demo = (tenis) => tenis(['P1', 'P1', 'P2', 'P2', 'P1', 'P2', 'P1', 'P1']);

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
