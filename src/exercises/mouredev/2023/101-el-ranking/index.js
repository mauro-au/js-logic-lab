import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '101';
export const dificultad = 'Difícil'; // Fácil | Medio | Difícil
export const tags = ['arreglos', 'ordenamiento'];

export const enunciado = `Todo llega a su fin... Este es el último reto de programación
semanal de 2023.

Crea un programa que muestre un listado calculado en tiempo real
con todos los usuarios que han resuelto algún reto de programación
de este año.
- El listado debe estar ordenado por el número de ejercicios resueltos
  por cada usuario (y mostrar ese contador al lado de su nombre).
- También se debe de mostrar el número de usuarios que han participado
  y el número de correcciones enviadas.

Muchísimas gracias por ayudar a crear este gran recurso
para la comunidad... ¡Prepárate para 2024!`;

// La función recibe la lista de correcciones enviadas ([{ usuario, reto }]) y
// retorna el listado ordenado por ejercicios resueltos (distintos, de mayor a
// menor) junto a los totales; "correcciones" cuenta envíos, repeticiones incluidas.
export const casos = [
  { entrada: [[{ usuario: 'ana', reto: 1 }, { usuario: 'ana', reto: 2 }, { usuario: 'bru', reto: 1 }]], esperado: { ranking: [{ usuario: 'ana', ejercicios: 2 }, { usuario: 'bru', ejercicios: 1 }], usuarios: 2, correcciones: 3 } },
  { entrada: [[{ usuario: 'ana', reto: 1 }, { usuario: 'ana', reto: 1 }, { usuario: 'ana', reto: 2 }, { usuario: 'bru', reto: 1 }]], esperado: { ranking: [{ usuario: 'ana', ejercicios: 2 }, { usuario: 'bru', ejercicios: 1 }], usuarios: 2, correcciones: 4 } },
  { entrada: [[{ usuario: 'ana', reto: 1 }]], esperado: { ranking: [{ usuario: 'ana', ejercicios: 1 }], usuarios: 1, correcciones: 1 } },
  { entrada: [[]], esperado: { ranking: [], usuarios: 0, correcciones: 0 } },
];

// Reto principal: un listado de ejemplo con tres participantes.
export const demo = (ranking) =>
  ranking([
    { usuario: 'ana', reto: 1 },
    { usuario: 'ana', reto: 2 },
    { usuario: 'bru', reto: 1 },
    { usuario: 'car', reto: 1 },
    { usuario: 'car', reto: 2 },
    { usuario: 'car', reto: 3 },
  ]);

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
