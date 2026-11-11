import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '67';
export const dificultad = 'Fácil'; // Fácil | Medio | Difícil
export const tags = ['matemáticas'];

export const enunciado = `Crea una función que reciba un número decimal y lo trasforme a Octal
y Hexadecimal.
- No está permitido usar funciones propias del lenguaje de programación que
realicen esas operaciones directamente.`;

// El enunciado pide transformar a Octal Y Hexadecimal: se devuelven los dos
// resultados en un único objeto. Sin prefijos ("0o"/"0x") y el hexadecimal
// en mayúsculas.
export const casos = [
  { entrada: [0], esperado: { octal: '0', hexadecimal: '0' } },
  { entrada: [8], esperado: { octal: '10', hexadecimal: '8' } },
  { entrada: [15], esperado: { octal: '17', hexadecimal: 'F' } },
  { entrada: [255], esperado: { octal: '377', hexadecimal: 'FF' } },
  { entrada: [1000], esperado: { octal: '1750', hexadecimal: '3E8' } },
];

// Reto principal: convertir el año del reto (2023)
export const demo = (conversion) => conversion(2023);

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
