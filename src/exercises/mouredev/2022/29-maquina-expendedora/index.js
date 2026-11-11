import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '29';
export const dificultad = 'Medio'; // Fácil | Medio | Difícil
export const tags = ['arreglos'];

export const enunciado = `Simula el funcionamiento de una máquina expendedora creando una operación
que reciba dinero (array de monedas) y un número que indique la selección
del producto.
- El programa retornará el nombre del producto y un array con el dinero
  de vuelta (con el menor número de monedas).
- Si el dinero es insuficiente o el número de producto no existe,
  deberá indicarse con un mensaje y retornar todas las monedas.
- Si no hay dinero de vuelta, el array se retornará vacío.
- Para que resulte más simple, trabajaremos en céntimos con monedas
  de 5, 10, 50, 100 y 200.
- Debemos controlar que las monedas enviadas estén dentro de las soportadas.`;

// EXCEPCIÓN: el enunciado no define el catálogo de productos ni sus precios, así
// que no hay nombre ni cambio que toda solución correcta deba devolver igual.
export const casos = [];

// Reto principal: comprar el producto 1 con 170 céntimos.
export const demo = (maquina) => maquina([10, 10, 50, 100], 1);

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
