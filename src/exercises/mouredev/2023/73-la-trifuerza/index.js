import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '73';
export const dificultad = 'Medio'; // Fácil | Medio | Difícil
export const tags = ['dibujo'];

export const enunciado = `¡El nuevo "The Legend of Zelda: Tears of the Kingdom" ya está disponible!

Crea un programa que dibuje una Trifuerza de "Zelda"
formada por asteriscos.
- Debes indicarle el número de filas de los triángulos con un entero positivo (n).
- Cada triángulo calculará su fila mayor utilizando la fórmula 2n-1.

Ejemplo: Trifuerza 2

   *
  ***
 *   *
*** ***`;

// El dibujo se devuelve como array de líneas recortadas a la derecha (sin
// espacios finales), como en el ejemplo: son 2n filas, las n primeras del
// triángulo superior centrado y las n últimas con los dos triángulos de
// abajo separados por un espacio.
export const casos = [
  { entrada: [2], esperado: [
    '   *',
    '  ***',
    ' *   *',
    '*** ***',
  ] },
  { entrada: [1], esperado: [' *', '* *'] },
  { entrada: [3], esperado: [
    '     *',
    '    ***',
    '   *****',
    '  *     *',
    ' ***   ***',
    '***** *****',
  ] },
];

// Reto principal: la Trifuerza con 4 filas por triángulo
export const demo = (trifuerza) => trifuerza(4);

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
