import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '06';
export const dificultad = 'Difícil'; // Fácil | Medio | Difícil
export const tags = ['entrada-salida'];

export const enunciado = `Crea un programa que se encargue de calcular el aspect ratio de una
imagen a partir de una url.
- Url de ejemplo:
  https://raw.githubusercontent.com/mouredevmouredev/master/mouredev_github_profile.png
- Por ratio hacemos referencia por ejemplo a los "16:9" de una
  imagen de 1920*1080px.`;

// EXCEPCIÓN: el cálculo descarga la imagen de la url (red), así que no hay un
// esperado fijo reproducible. Corre en modo libre con solo la demo.
export const casos = [];

// Reto principal: aspect ratio de la imagen de ejemplo del enunciado
export const demo = (aspectRatio) =>
  aspectRatio(
    'https://raw.githubusercontent.com/mouredevmouredev/master/mouredev_github_profile.png'
  );

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
