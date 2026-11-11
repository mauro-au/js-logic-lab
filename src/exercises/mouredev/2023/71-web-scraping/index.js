import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '71';
export const dificultad = 'Difícil'; // Fácil | Medio | Difícil
export const tags = ['entrada-salida'];

export const enunciado = `El día 128 del año celebramos en la comunidad el "Hola Mundo day"
Vamos a hacer "web scraping" sobre su sitio web: https://holamundo.day

Crea un programa que se conecte a la web del evento e imprima únicamente la agenda de eventos
del día 8. Mostrando hora e información de cada uno.
Ejemplo: "16:00 | Bienvenida"

Se permite utilizar librerías que nos faciliten esta tarea.`;

// EXCEPCIÓN: la agenda se lee de holamundo.day en tiempo real, no hay un
// valor esperado fijo.
export const casos = [];

// Reto principal: imprime la agenda del día 8 del evento.
export const demo = (agenda) => agenda();

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
