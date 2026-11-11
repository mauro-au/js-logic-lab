import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '44';
export const dificultad = 'Medio'; // Fácil | Medio | Difícil
export const tags = ['strings', 'arreglos', 'aleatoriedad'];

export const enunciado = `Este es un reto especial por Halloween.
Deberemos crear un programa al que le indiquemos si queremos realizar "Truco
o Trato" y un listado (array) de personas con las siguientes propiedades:
- Nombre de la niña o niño
- Edad
- Altura en centímetros

Si las personas han pedido truco, el programa retornará sustos (aleatorios)
siguiendo estos criterios:
- Un susto por cada 2 letras del nombre por persona
- Dos sustos por cada edad que sea un número par
- Tres sustos por cada 100 cm de altura entre todas las personas
- Sustos: 🎃 👻 💀 🕷 🕸 🦇

Si las personas han pedido trato, el programa retornará dulces (aleatorios)
siguiendo estos criterios:
- Un dulce por cada letra de nombre
- Un dulce por cada 3 años cumplidos hasta un máximo de 10 años por persona
- Dos dulces por cada 50 cm de altura hasta un máximo de 150 cm por persona
- Dulces: 🍰 🍬 🍡 🍭 🍪 🍫 🧁 🍩
- En caso contrario retornará un error.`;

// EXCEPCIÓN: los sustos y dulces son aleatorios, no hay un valor esperado fijo.
export const casos = [];

// Reto principal: pedir "Trato" para un grupo de dos niños.
export const demo = (trucoTrato) =>
  trucoTrato('Trato', [
    { nombre: 'Ada', edad: 8, altura: 130 },
    { nombre: 'Linus', edad: 10, altura: 145 },
  ]);

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
