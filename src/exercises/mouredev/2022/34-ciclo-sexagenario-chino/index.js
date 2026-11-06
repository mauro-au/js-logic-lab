import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '34';
export const dificultad = 'Medio'; // Fácil | Medio | Difícil
export const tags = ['entrada-salida'];

export const enunciado = `Crea un función, que dado un año, indique el elemento
y animal correspondiente en el ciclo sexagenario del zodíaco chino.
- Info: https://www.travelchinaguide.com/intro/astrology/60year-cycle.htm
- El ciclo sexagenario se corresponde con la combinación de los elementos
  madera, fuego, tierra, metal, agua y los animales rata, buey, tigre,
  conejo, dragón, serpiente, caballo, oveja, mono, gallo, perro, cerdo
  (en este orden).
- Cada elemento se repite dos años seguidos.
- El último ciclo sexagenario comenzó en 1984 (Madera Rata).`;

// Casos de prueba (opcional). Con la lista vacía el ejercicio corre en "modo libre":
// cada solución se ejecuta sin argumentos y se muestran su retorno y sus console.log.
// entrada = lista de argumentos; esperado = valor que debe retornar.
const casos = [
  // { entrada: [15], esperado: 'fizzbuzz' },
];

// Opcional: reto principal. Descomenta y agrega demo a crearEjecutor({ ... }).
// const demo = (solucion) => solucion(100);

export const ejecutar = crearEjecutor({ soluciones, casos });
