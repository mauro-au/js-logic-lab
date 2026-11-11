import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '12';
export const dificultad = 'Fácil'; // Fácil | Medio | Difícil
export const tags = ['strings'];

export const enunciado = `Crea una función que reciba dos cadenas como parámetro (str1, str2)
e imprima otras dos cadenas como salida (out1, out2).
- out1 contendrá todos los caracteres presentes en la str1 pero NO
  estén presentes en str2.
- out2 contendrá todos los caracteres presentes en la str2 pero NO
  estén presentes en str1.`;

// El ejercicio pide dos cadenas de salida (out1 y out2): las devolvemos juntas
// en un objeto. Los casos evitan letras repetidas para que el orden de salida
// (por aparición en cada cadena) no sea ambiguo.
export const casos = [
  { entrada: ['abcdefg', 'defxyz'], esperado: { out1: 'abcg', out2: 'xyz' } },
  { entrada: ['hola', 'adios'], esperado: { out1: 'hl', out2: 'dis' } },
  { entrada: ['abc', 'abc'], esperado: { out1: '', out2: '' } },
  { entrada: ['123', '456'], esperado: { out1: '123', out2: '456' } },
  { entrada: ['', 'a'], esperado: { out1: '', out2: 'a' } },
];

// Reto principal: qué caracteres solo están en cada cadena
export const demo = (eliminar) => eliminar('hola mundo', 'adios');

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
