import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '68';
export const dificultad = 'Fácil'; // Fácil | Medio | Difícil
export const tags = ['strings'];

export const enunciado = `Crea una función que sea capaz de transformar Español al lenguaje básico
del universo Star Wars: el "Aurebesh".
- Puedes dejar sin transformar los caracteres que no existan en "Aurebesh".
- También tiene que ser capaz de traducir en sentido contrario.

¿Lo has conseguido? Nómbrame en twitter.com/mouredev y escríbeme algo en Aurebesh.

¡Que la fuerza os acompañe!`;

// Casos de prueba (opcional). Con la lista vacía el ejercicio corre en "modo libre":
// cada solución se ejecuta sin argumentos y se muestran su retorno y sus console.log.
// entrada = lista de argumentos; esperado = valor que debe retornar.
const casos = [
  // { entrada: [15], esperado: 'fizzbuzz' },
];

// Opcional: reto principal. Descomenta y agrega demo a crearEjecutor({ ... }).
// const demo = (solucion) => solucion(100);

export const ejecutar = crearEjecutor({ soluciones, casos });
