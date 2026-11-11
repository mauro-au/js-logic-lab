import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '52';
export const dificultad = 'Fácil'; // Fácil | Medio | Difícil
export const tags = ['aleatoriedad'];

export const enunciado = `Crea tu propio enunciado para que forme parte de los retos de 2023.
- Ten en cuenta que su dificultad debe ser asumible por la comunidad y seguir
un estilosemejante a los que hemos realizado durante el año.
- Si quieres también puedes proponer tu propia solución al reto
  (en el lenguaje que quieras).`;

// EXCEPCIÓN: cada quien crea su propio reto, no existe un valor esperado fijo.
export const casos = [];

// Reto principal: la solución propone y ejecuta su propio reto (sin argumentos).
export const demo = (retoPropuesto) => retoPropuesto();

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
