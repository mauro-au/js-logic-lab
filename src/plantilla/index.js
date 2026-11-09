import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js'; // ajusta los ../ según la profundidad

export const numero = '05';
export const dificultad = 'Fácil'; // Fácil | Medio | Difícil
export const tags = ['tag1', 'tag2'];

export const enunciado = `Describe aquí el ejercicio.`;

// Opcional: soluciones de fábrica (las que vienen en soluciones.js). Si pasan
// los casos no marcan el ejercicio como resuelto; sí lo hace tu código del editor.
// export const solucionesReferencia = ['solucion1'];

const casos = [
  { entrada: [1], esperado: 1 }, // entrada = lista de argumentos
];

// Opcional: reto principal (recibe cada solución). Bórralo si no lo necesitas.
const demo = (solucion) => solucion(10);

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
