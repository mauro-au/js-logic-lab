import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '31';
export const dificultad = 'Fácil'; // Fácil | Medio | Difícil
export const tags = ['strings', 'dibujo'];

export const enunciado = `Crea una función que reciba un texto y muestre cada palabra en una línea,
formando un marco rectangular de asteriscos.
- ¿Qué te parece el reto? Se vería así:
  **********
  * ¿Qué   *
  * te     *
  * parece *
  * el     *
  * reto?  *
  **********`;

// El enunciado pide "mostrar" el marco: lo devolvemos como array de líneas
// (una por fila) porque se lee mejor en la terminal que un string con \n.
export const casos = [
  { entrada: ['¿Qué te parece el reto?'], esperado: [
    '**********',
    '* ¿Qué   *',
    '* te     *',
    '* parece *',
    '* el     *',
    '* reto?  *',
    '**********',
  ] },
  { entrada: ['hola mundo'], esperado: ['*********', '* hola  *', '* mundo *', '*********'] },
  { entrada: ['sol y luna'], esperado: ['********', '* sol  *', '* y    *', '* luna *', '********'] },
  { entrada: ['uno'], esperado: ['*******', '* uno *', '*******'] },
];

// Reto principal: el marco del ejemplo del enunciado
export const demo = (marco) => marco('¿Qué te parece el reto?');

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
