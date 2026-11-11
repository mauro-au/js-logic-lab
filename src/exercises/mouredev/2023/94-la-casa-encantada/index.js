import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '94';
export const dificultad = 'Difícil'; // Fácil | Medio | Difícil
export const tags = ['strings', 'aleatoriedad', 'interactivo'];

export const enunciado = `Este es un reto especial por Halloween.
Te encuentras explorando una mansión abandonada llena de habitaciones.
En cada habitación tendrás que resolver un acertijo para poder avanzar a la siguiente.
Tu misión es encontrar la habitación de los dulces.

Se trata de implementar un juego interactivo de preguntas y respuestas por terminal.
(Tienes total libertad para ser creativo con los textos)

- 🏰 Casa: La mansión se corresponde con una estructura cuadrada 4 x 4
  que deberás modelar. Las habitaciones de puerta y dulces no tienen enigma.
  (16 habitaciones, siendo una de entrada y otra donde están los dulces)
  Esta podría ser una representación:
  🚪⬜️⬜️⬜️
  ⬜️👻⬜️⬜️
  ⬜️⬜️⬜️👻
  ⬜️⬜️🍭⬜️
- ❓ Enigmas: Cada habitación propone un enigma aleatorio que deberás responder con texto.
  Si no lo aciertas no podrás desplazarte.
- 🧭 Movimiento: Si resuelves el enigma se te preguntará a donde quieres desplazarte.
  (Ejemplo: norte/sur/este/oeste. Sólo deben proporcionarse las opciones posibles)
- 🍭 Salida: Sales de la casa si encuentras la habitación de los dulces.
- 👻 (Bonus) Fantasmas: Existe un 10% de que en una habitación aparezca un fantasma y
  tengas que responder dos preguntas para salir de ella.`;

// Excepción: juego interactivo y aleatorio (enigmas y fantasmas al azar),
// sin valor esperado fijo → modo libre con demo.
export const casos = [];

// Demo: arranca la partida; el texto del juego se verá en la terminal.
export const demo = (casa) => {
  casa();
  return '🏰 Mansión 4x4: partida iniciada';
};

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
