import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '98';
export const dificultad = 'Fácil'; // Fácil | Medio | Difícil
export const tags = ['arreglos', 'fechas', 'ordenamiento', 'interactivo'];

export const enunciado = `¿Conoces el calendario de aDEViento de la comunidad (https://adviento.dev)?
24 días, 24 regalos sorpresa relacionados con desarrollo de software.
Desde el 1 al 24 de diciembre.

Crea un programa que simule el mecanismo de participación:
- Mediante la terminal, el programa te preguntará si quieres añadir y borrar
  participantes, mostrarlos, lanzar el sorteo o salir.
- Si seleccionas añadir un participante, podrás escribir su nombre y pulsar enter.
- Si seleccionas añadir un participante, y este ya existe, avisarás de ello.
  (Y no lo duplicarás)
- Si seleccionas mostrar los participantes, se listarán todos.
- Si seleccionas eliminar un participante, podrás escribir su nombre y pulsar enter.
  (Avisando de si lo has eliminado o el nombre no existe)
- Si seleccionas realizar el sorteo, elegirás una persona al azar
  y se eliminará del listado.
- Si seleccionas salir, el programa finalizará.`;

// Casos de prueba (opcional). Con la lista vacía el ejercicio corre en "modo libre":
// cada solución se ejecuta sin argumentos y se muestran su retorno y sus console.log.
// entrada = lista de argumentos; esperado = valor que debe retornar.
const casos = [
  // { entrada: [15], esperado: 'fizzbuzz' },
];

// Opcional: reto principal. Descomenta y agrega demo a crearEjecutor({ ... }).
// const demo = (solucion) => solucion(100);

export const ejecutar = crearEjecutor({ soluciones, casos });
