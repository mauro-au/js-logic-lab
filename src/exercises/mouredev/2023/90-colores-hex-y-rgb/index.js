import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '90';
export const dificultad = 'Medio'; // Fácil | Medio | Difícil
export const tags = ['strings','matemáticas'];

export const enunciado = `Crea las funciones capaces de transformar colores HEX
a RGB y viceversa.
Ejemplos:
RGB a HEX: r: 0, g: 0, b: 0 -> #000000
HEX a RGB: hex: #000000 -> (r: 0, g: 0, b: 0)`;

// El reto pide dos conversiones (HEX→RGB y RGB→HEX), pero el ejecutor llama a
// una sola función: recibimos el color en cualquiera de los dos formatos
// (string "#rrggbb" o array [r, g, b]) y devolvemos un objeto con ambas
// representaciones para comprobar las dos direcciones.
export const casos = [
  { entrada: ['#000000'], esperado: { hex: '#000000', rgb: [0, 0, 0] } }, // ejemplo del enunciado
  { entrada: [[0, 0, 0]], esperado: { hex: '#000000', rgb: [0, 0, 0] } },
  { entrada: ['#FF8800'], esperado: { hex: '#FF8800', rgb: [255, 136, 0] } },
  { entrada: [[12, 34, 56]], esperado: { hex: '#0C2238', rgb: [12, 34, 56] } }, // hex con mayúsculas y dos dígitos
];

// Reto principal: convertir un color de ejemplo en ambos formatos.
export const demo = (color) => color('#3498db');

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
