import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js'; // ajusta los ../ según la profundidad

export const numero = '05';
export const dificultad = 'Fácil'; // Fácil | Medio | Difícil
export const tags = ['tag1', 'tag2'];

export const enunciado = `Describe aquí el ejercicio.`;

// Opcional: marca el ejercicio como resuelto desde el arranque, sin necesidad
// de abrirlo, porque ya trae una solución que pasa los casos (autoResuelto = true).
// export const autoResuelto = true;

const casos = [
  { entrada: [1], esperado: 1 }, // entrada = lista de argumentos
];

// Opcional: reto principal (recibe cada solución). Bórralo si no lo necesitas.
const demo = (solucion) => solucion(10);

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
