import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js'; // ajusta los ../ según la profundidad

export const numero = '05';
export const dificultad = 'Fácil'; // Fácil | Medio | Difícil
export const tags = ['tag1', 'tag2'];

export const enunciado = `Describe aquí el ejercicio.`;

// Nota: si tus soluciones pasan los casos, el ejercicio queda marcado como
// resuelto solo (se evalúan al compilar y en cada ejecución).

// Casos de prueba: la función recibe los argumentos de cada caso y debe
// retornar el valor esperado. Con la lista vacía corre en "modo libre".
export const casos = [
  { entrada: [1], esperado: 1 },
];

// Opcional: reto principal (recibe cada solución y se muestra con ★ cuando pasa).
export const demo = (solucion) => solucion(10);

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
