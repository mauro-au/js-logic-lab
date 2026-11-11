import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '16';
export const dificultad = 'Difícil'; // Fácil | Medio | Difícil
export const tags = ['strings', 'fechas'];

export const enunciado = `Crea una función que calcule y retorne cuántos días hay entre dos cadenas
de texto que representen fechas.
- Una cadena de texto que representa una fecha tiene el formato "dd/MM/yyyy".
- La función recibirá dos String y retornará un Int.
- La diferencia en días será absoluta (no importa el orden de las fechas).
- Si una de las dos cadenas de texto no representa una fecha correcta se
  lanzará una excepción.`;

// El intervalo es absoluto (no importa el orden de las fechas).
export const casos = [
  { entrada: ['01/01/2022', '01/01/2022'], esperado: 0 },
  { entrada: ['28/02/2021', '01/03/2021'], esperado: 1 },
  { entrada: ['28/02/2020', '01/03/2020'], esperado: 2 }, // 2020 fue bisiesto
  { entrada: ['01/01/2022', '31/01/2022'], esperado: 30 },
  { entrada: ['01/01/2020', '01/01/2021'], esperado: 366 },
  { entrada: ['01/01/2021', '01/01/2020'], esperado: 366 },
];

// Reto principal: días completos de 2022
export const demo = (dias) => dias('01/01/2022', '31/12/2022');

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
