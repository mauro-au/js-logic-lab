import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '05';
export const dificultad = 'Fácil';
export const tags = ['matemáticas', 'funciones', 'objetos'];

// Soluciones de referencia de fábrica: no marcan el ejercicio como resuelto
export const solucionesReferencia = ['areaConSwitch'];

export const enunciado = `Crea una única función (importante que sólo sea una) que sea capaz de calcular y retornar el área de un polígono.
- La función recibirá por parámetro sólo UN polígono a la vez.
- Los polígonos soportados serán Triángulo, Cuadrado y Rectángulo.
- Imprime el cálculo del área de un polígono de cada tipo.`;

// entrada = [polígono]. Cada polígono es un objeto con su tipo y sus medidas.
const casos = [
  { entrada: [{ tipo: 'triangulo', base: 10, altura: 5 }], esperado: 25 },
  { entrada: [{ tipo: 'triangulo', base: 3, altura: 3 }], esperado: 4.5 },
  { entrada: [{ tipo: 'cuadrado', lado: 4 }], esperado: 16 },
  { entrada: [{ tipo: 'rectangulo', base: 3, altura: 7 }], esperado: 21 },
  { entrada: [{ tipo: 'Rectángulo', base: 2, altura: 5 }], esperado: 10 }, // mayúsculas y tildes
  { entrada: [{ tipo: 'cuadrado', lado: 0 }], esperado: 0 },
];

// Reto principal: el área de un polígono de cada tipo
const demo = (area) => [
  area({ tipo: 'triangulo', base: 10, altura: 5 }),
  area({ tipo: 'cuadrado', lado: 4 }),
  area({ tipo: 'rectangulo', base: 3, altura: 7 }),
];

export const ejecutar = crearEjecutor({ soluciones, casos, demo });