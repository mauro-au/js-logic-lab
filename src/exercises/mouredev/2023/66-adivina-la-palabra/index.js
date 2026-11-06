import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '66';
export const dificultad = 'Fácil'; // Fácil | Medio | Difícil
export const tags = ['strings', 'aleatoriedad'];

export const enunciado = `Crea un pequeño juego que consista en adivinar palabras en un número máximo de intentos:
- El juego comienza proponiendo una palabra aleatoria incompleta
  - Por ejemplo "m_ur_d_v", y el número de intentos que le quedan
- El usuario puede introducir únicamente una letra o una palabra (de la misma longitud que
  la palabra a adivinar)
  - Si escribe una letra y acierta, se muestra esa letra en la palabra. Si falla, se resta
    uno al número de intentos
  - Si escribe una resolución y acierta, finaliza el juego, en caso contrario, se resta uno
    al número de intentos
  - Si el contador de intentos llega a 0, el jugador pierde
- La palabra debe ocultar de forma aleatoria letras, y nunca puede comenzar
  ocultando más del 60%
- Puedes utilizar las palabras que quieras y el número de intentos que consideres`;

// Casos de prueba (opcional). Con la lista vacía el ejercicio corre en "modo libre":
// cada solución se ejecuta sin argumentos y se muestran su retorno y sus console.log.
// entrada = lista de argumentos; esperado = valor que debe retornar.
const casos = [
  // { entrada: [15], esperado: 'fizzbuzz' },
];

// Opcional: reto principal. Descomenta y agrega demo a crearEjecutor({ ... }).
// const demo = (solucion) => solucion(100);

export const ejecutar = crearEjecutor({ soluciones, casos });
