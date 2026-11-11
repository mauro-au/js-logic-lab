import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '64';
export const dificultad = 'Fácil'; // Fácil | Medio | Difícil
export const tags = ['entrada-salida'];

export const enunciado = `Dada una URL con parámetros, crea una función que obtenga sus valores.
No se pueden usar operaciones del lenguaje que realicen esta tarea directamente.

Ejemplo: En la url https://retosdeprogramacion.com?year=2023&challenge=0
los parámetros serían ["2023", "0"]`;

// Recibe la URL completa y retorna SOLO los valores de sus parámetros (no las
// claves), en el orden en que aparecen, como en el ejemplo del enunciado.
export const casos = [
  { entrada: ['https://retosdeprogramacion.com?year=2023&challenge=0'], esperado: ['2023', '0'] }, // ejemplo
  { entrada: ['https://example.com?name=Ada'], esperado: ['Ada'] },
  { entrada: ['https://retosdeprogramacion.com/ejercicios?year=2023&page=2&lang=es'], esperado: ['2023', '2', 'es'] },
  { entrada: ['https://retosdeprogramacion.com'], esperado: [] }, // sin parámetros
];

// Reto principal: obtén los parámetros de una URL con la forma del reto.
export const demo = (parametros) =>
  parametros('https://retosdeprogramacion.com/2023?reto=54&dia=13');

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
