import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '79';
export const dificultad = 'Medio'; // Fácil | Medio | Difícil
export const tags = ['testing'];

export const enunciado = `Crea tres test sobre el reto 12: "Viernes 13".
- Puedes copiar una solución ya creada por otro usuario en
  el lenguaje que estés utilizando.
- Debes emplear un mecanismo de ejecución de test que posea
  el lenguaje de programación que hayas seleccionado.
- Los tres test deben de funcionar y comprobar
  diferentes situaciones (a tu elección).`;

// Casos de prueba (opcional). Con la lista vacía el ejercicio corre en "modo libre":
// cada solución se ejecuta sin argumentos y se muestran su retorno y sus console.log.
// entrada = lista de argumentos; esperado = valor que debe retornar.
const casos = [
  // { entrada: [15], esperado: 'fizzbuzz' },
];

// Opcional: reto principal. Descomenta y agrega demo a crearEjecutor({ ... }).
// const demo = (solucion) => solucion(100);

export const ejecutar = crearEjecutor({ soluciones, casos });
