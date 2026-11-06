import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '78';
export const dificultad = 'Medio'; // Fácil | Medio | Difícil
export const tags = ['interactivo'];

export const enunciado = `Crea un programa que detecte cuando el famoso "Código Konami" se ha
introducido correctamente desde el teclado.
Si sucede esto, debe notificarse mostrando un mensaje en la terminal.`;

// Casos de prueba (opcional). Con la lista vacía el ejercicio corre en "modo libre":
// cada solución se ejecuta sin argumentos y se muestran su retorno y sus console.log.
// entrada = lista de argumentos; esperado = valor que debe retornar.
const casos = [
  // { entrada: [15], esperado: 'fizzbuzz' },
];

// Opcional: reto principal. Descomenta y agrega demo a crearEjecutor({ ... }).
// const demo = (solucion) => solucion(100);

export const ejecutar = crearEjecutor({ soluciones, casos });
