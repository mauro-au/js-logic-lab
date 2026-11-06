import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '86';
export const dificultad = 'Medio'; // Fácil | Medio | Difícil
export const tags = ['arreglos','dibujo','interactivo'];

export const enunciado = `Crea un programa capaz de gestionar una pieza de Tetris.
- La pantalla de juego tiene 10 filas y 10 columnas representadas por símbolos 🔲
- La pieza de tetris a manejar será la siguiente (si quieres, puedes elegir otra):
  🔳
  🔳🔳🔳
- La pieza aparecerá por primera vez en la parte superior izquierda de la pantalla de juego.
  🔳🔲🔲🔲🔲🔲🔲🔲🔲🔲
  🔳🔳🔳🔲🔲🔲🔲🔲🔲🔲
  🔲🔲🔲🔲🔲🔲🔲🔲🔲🔲
  🔲🔲🔲🔲🔲🔲🔲🔲🔲🔲
  🔲🔲🔲🔲🔲🔲🔲🔲🔲🔲
  🔲🔲🔲🔲🔲🔲🔲🔲🔲🔲
  🔲🔲🔲🔲🔲🔲🔲🔲🔲🔲
  🔲🔲🔲🔲🔲🔲🔲🔲🔲🔲
  🔲🔲🔲🔲🔲🔲🔲🔲🔲🔲
  🔲🔲🔲🔲🔲🔲🔲🔲🔲🔲
- Debes desarrollar una función capaz de desplazar y rotar la pieza en el tablero,
  recibiendo una acción cada vez que se llame, mostrando cómo se visualiza en
  la pantalla de juego.
- Las acciones que se pueden aplicar a la pieza son: derecha, izquierda, abajo, rotar.
- Debes tener en cuenta los límites de la pantalla de juego.`;

// Casos de prueba (opcional). Con la lista vacía el ejercicio corre en "modo libre":
// cada solución se ejecuta sin argumentos y se muestran su retorno y sus console.log.
// entrada = lista de argumentos; esperado = valor que debe retornar.
const casos = [
  // { entrada: [15], esperado: 'fizzbuzz' },
];

// Opcional: reto principal. Descomenta y agrega demo a crearEjecutor({ ... }).
// const demo = (solucion) => solucion(100);

export const ejecutar = crearEjecutor({ soluciones, casos });
