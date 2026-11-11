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

// Excepción: pide tres tests ejecutados con el mecanismo de tests del
// lenguaje (no una función pura) → sin valor esperado fijo, modo libre con demo.
export const casos = [];

// Demo: lanza los tres tests sobre el reto 12; el resultado se verá en la terminal.
export const demo = (tests) => {
  tests();
  return '🧪 Tests del reto 12 "Viernes 13" lanzados';
};

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
