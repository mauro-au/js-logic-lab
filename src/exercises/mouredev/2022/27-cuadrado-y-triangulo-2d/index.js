import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '27';
export const dificultad = 'Fácil'; // Fácil | Medio | Difícil
export const tags = ['dibujo'];

export const enunciado = `Crea un programa que dibuje un cuadrado o un triángulo con asteriscos "*".
- Indicaremos el tamaño del lado y si la figura a dibujar es una u otra.
- EXTRA: ¿Eres capaz de dibujar más figuras?`;

// EXCEPCIÓN: reto creativo de dibujo; el enunciado no fija si la figura se retorna
// o se imprime, ni el estilo del triángulo, así que no hay un esperado único.
export const casos = [];

// Reto principal: dibujar un cuadrado de lado 4 (la figura sale en la terminal).
export const demo = (dibujar) =>
  dibujar(4, 'cuadrado') ?? 'cuadrado de lado 4 (ver terminal)';

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
