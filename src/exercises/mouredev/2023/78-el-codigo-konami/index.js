import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '78';
export const dificultad = 'Medio'; // Fácil | Medio | Difícil
export const tags = ['interactivo'];

export const enunciado = `Crea un programa que detecte cuando el famoso "Código Konami" se ha
introducido correctamente desde el teclado.
Si sucede esto, debe notificarse mostrando un mensaje en la terminal.`;

// Excepción: la secuencia llega desde el teclado del usuario (entrada
// interactiva), así que no hay valor esperado fijo → modo libre con demo.
export const casos = [];

// Demo: inicia la escucha del código; el aviso se verá en la terminal.
export const demo = (konami) => {
  konami();
  return '🎮 Código Konami: escuchando las pulsaciones en el teclado';
};

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
