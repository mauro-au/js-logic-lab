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

// Casos de prueba (opcional). Con la lista vacía el ejercicio corre en "modo libre":
// cada solución se ejecuta sin argumentos y se muestran su retorno y sus console.log.
// entrada = lista de argumentos; esperado = valor que debe retornar.
const casos = [
  // { entrada: [15], esperado: 'fizzbuzz' },
];

// Opcional: reto principal. Descomenta y agrega demo a crearEjecutor({ ... }).
// const demo = (solucion) => solucion(100);

export const ejecutar = crearEjecutor({ soluciones, casos });
