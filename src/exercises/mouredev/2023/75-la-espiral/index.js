import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '75';
export const dificultad = 'Medio'; // Fácil | Medio | Difícil
export const tags = ['dibujo'];

export const enunciado = `Crea una función que dibuje una espiral como la del ejemplo.
- Únicamente se indica de forma dinámica el tamaño del lado.
- Símbolos permitidos: ═ ║ ╗ ╔ ╝ ╚

Ejemplo espiral de lado 5 (5 filas y 5 columnas):
════╗
╔══╗║
║╔╗║║
║╚═╝║
╚═══╝`;

// El dibujo se devuelve como array de líneas. La espiral arranca en la
// esquina superior izquierda hacia la derecha y gira en sentido horario
// hacia dentro; la última celda conserva la esquina del giro intentado
// (igual que el centro del ejemplo de lado 5).
export const casos = [
  { entrada: [5], esperado: [
    '════╗',
    '╔══╗║',
    '║╔╗║║',
    '║╚═╝║',
    '╚═══╝',
  ] },
  { entrada: [4], esperado: [
    '═══╗',
    '╔═╗║',
    '║╚╝║',
    '╚══╝',
  ] },
  { entrada: [3], esperado: ['══╗', '╔╗║', '╚═╝'] },
  { entrada: [2], esperado: ['═╗', '╚╝'] },
];

// Reto principal: la espiral de lado 5 del ejemplo
export const demo = (espiral) => espiral(5);

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
