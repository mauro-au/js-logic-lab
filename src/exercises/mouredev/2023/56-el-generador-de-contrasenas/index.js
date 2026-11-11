import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '56';
export const dificultad = 'Medio'; // Fácil | Medio | Difícil
export const tags = ['strings', 'aleatoriedad'];

export const enunciado = `Escribe un programa que sea capaz de generar contraseñas de forma aleatoria.
Podrás configurar generar contraseñas con los siguientes parámetros:
- Longitud: Entre 8 y 16.
- Con o sin letras mayúsculas.
- Con o sin números.
- Con o sin símbolos.
(Pudiendo combinar todos estos parámetros entre ellos)`;

// EXCEPCIÓN: las contraseñas se generan con azar (Math.random), no existe un
// valor esperado fijo. Corre en modo libre con solo la demo.
export const casos = [];

// Reto principal: genera una contraseña de 12 caracteres con mayúsculas,
// números y símbolos (longitud, mayúsculas, números y símbolos, en ese orden).
export const demo = (generar) =>
  generar(12, true, true, true) ?? 'contraseña generada (ver terminal)';

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
