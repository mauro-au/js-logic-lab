import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '83';
export const dificultad = 'Medio'; // Fácil | Medio | Difícil
export const tags = ['strings'];

export const enunciado = `Los primeros dispositivos móviles tenían un teclado llamado T9
con el que se podía escribir texto utilizando únicamente su
teclado numérico (del 0 al 9).

Crea una función que transforme las pulsaciones del T9 a su
representación con letras.
- Debes buscar cuál era su correspondencia original
- Cada bloque de pulsaciones va separado por un guión.
- Si un bloque tiene más de un número, debe ser siempre el mismo.
- Ejemplo:
    Entrada: 6-666-88-777-33-3-33-888
    Salida: MOUREDEV`;

// Contrato: recibe las pulsaciones (bloques separados por guión) y retorna el
// texto en MAYÚSCULAS, igual que la salida del ejemplo del enunciado.
export const casos = [
  { entrada: ['6-666-88-777-33-3-33-888'], esperado: 'MOUREDEV' }, // ejemplo
  { entrada: ['6-66-666'], esperado: 'MNO' },
  { entrada: ['2-22-222'], esperado: 'ABC' },
  { entrada: ['4-444'], esperado: 'GI' },
  { entrada: ['9999'], esperado: 'Z' }, // un solo bloque sin guiones
];

// Reto principal: traducir las pulsaciones del ejemplo del enunciado.
export const demo = (t9) => t9('6-666-88-777-33-3-33-888');

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
