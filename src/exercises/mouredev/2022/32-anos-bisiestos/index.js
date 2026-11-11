import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '32';
export const dificultad = 'Fácil'; // Fácil | Medio | Difícil
export const tags = ['fechas','bucles'];

export const enunciado = `Crea una función que imprima los 30 próximos años bisiestos
siguientes a uno dado.
- Utiliza el menor número de líneas para resolver el ejercicio.`;

// Aunque el enunciado dice "imprima", el contrato es retornar los 30 próximos
// años bisiestos estrictamente posteriores al dado (si el dado es bisiesto,
// no se incluye; se saltan los siglos no bisiestos como 2100 y 2200).
export const casos = [
  { entrada: [2022], esperado: [
    2024, 2028, 2032, 2036, 2040, 2044, 2048, 2052, 2056, 2060,
    2064, 2068, 2072, 2076, 2080, 2084, 2088, 2092, 2096, 2104,
    2108, 2112, 2116, 2120, 2124, 2128, 2132, 2136, 2140, 2144,
  ] },
  { entrada: [2024], esperado: [
    2028, 2032, 2036, 2040, 2044, 2048, 2052, 2056, 2060, 2064,
    2068, 2072, 2076, 2080, 2084, 2088, 2092, 2096, 2104, 2108,
    2112, 2116, 2120, 2124, 2128, 2132, 2136, 2140, 2144, 2148,
  ] },
  { entrada: [2096], esperado: [
    2104, 2108, 2112, 2116, 2120, 2124, 2128, 2132, 2136, 2140,
    2144, 2148, 2152, 2156, 2160, 2164, 2168, 2172, 2176, 2180,
    2184, 2188, 2192, 2196, 2204, 2208, 2212, 2216, 2220, 2224,
  ] },
];

// Reto principal: los 30 próximos años bisiestos a partir de 2025
export const demo = (bisiestos) => bisiestos(2025);

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
