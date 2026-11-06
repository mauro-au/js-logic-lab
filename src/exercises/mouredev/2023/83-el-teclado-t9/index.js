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

// Casos de prueba (opcional). Con la lista vacía el ejercicio corre en "modo libre":
// cada solución se ejecuta sin argumentos y se muestran su retorno y sus console.log.
// entrada = lista de argumentos; esperado = valor que debe retornar.
const casos = [
  // { entrada: [15], esperado: 'fizzbuzz' },
];

// Opcional: reto principal. Descomenta y agrega demo a crearEjecutor({ ... }).
// const demo = (solucion) => solucion(100);

export const ejecutar = crearEjecutor({ soluciones, casos });
