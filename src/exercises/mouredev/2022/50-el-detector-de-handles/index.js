import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '50';
export const dificultad = 'Fácil'; // Fácil | Medio | Difícil
export const tags = ['strings', 'entrada-salida'];

export const enunciado = `Crea una función que sea capaz de detectar y retornar todos los
handles de un texto usando solamente Expresiones Regulares.
Debes crear una expresión regular para cada caso:
- Handle usuario: Los que comienzan por "@"
- Handle hashtag: Los que comienzan por "#"
- Handle web: Los que comienzan por "www.", "http://", "https://"
  y finalizan con un dominio (.com, .es...)`;

// Casos de prueba (opcional). Con la lista vacía el ejercicio corre en "modo libre":
// cada solución se ejecuta sin argumentos y se muestran su retorno y sus console.log.
// entrada = lista de argumentos; esperado = valor que debe retornar.
const casos = [
  // { entrada: [15], esperado: 'fizzbuzz' },
];

// Opcional: reto principal. Descomenta y agrega demo a crearEjecutor({ ... }).
// const demo = (solucion) => solucion(100);

export const ejecutar = crearEjecutor({ soluciones, casos });
