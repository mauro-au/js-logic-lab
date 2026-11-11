import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '49';
export const dificultad = 'Fácil'; // Fácil | Medio | Difícil
export const tags = ['fechas', 'ordenamiento', 'entrada-salida'];

export const enunciado = `¿Conoces el calendario de adviento de la comunidad (https://adviento.dev)?
24 días, 24 regalos sorpresa relacionados con desarrollo de software,
ciencia y tecnología desde el 1 de diciembre.

Enunciado: Crea una función que reciba un objeto de tipo "Date" y retorne
lo siguiente:
- Si la fecha coincide con el calendario de aDEViento 2022: Retornará el regalo
  de ese día (a tu elección) y cuánto queda para que finalice el sorteo de ese día.
- Si la fecha es anterior: Cuánto queda para que comience el calendario.
- Si la fecha es posterior: Cuánto tiempo ha pasado desde que ha finalizado.

Notas:
- Tenemos en cuenta que cada día del calendario comienza a medianoche 00:00:00
  y finaliza a las 23:59:59.
- Debemos trabajar con fechas que tengan año, mes, día, horas, minutos
  y segundos.`;

// EXCEPCIÓN: el regalo de cada día es a elección de cada solución y los tiempos
// dependen de la fecha recibida, así que no hay un valor esperado fijo.
export const casos = [];

// Reto principal: consultar un día dentro del calendario de aDEViento 2022.
export const demo = (adviento) => adviento(new Date(2022, 11, 5, 12, 0, 0));

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
