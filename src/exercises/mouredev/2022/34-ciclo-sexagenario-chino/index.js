import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '34';
export const dificultad = 'Medio'; // Fácil | Medio | Difícil
export const tags = ['entrada-salida'];

export const enunciado = `Crea un función, que dado un año, indique el elemento
y animal correspondiente en el ciclo sexagenario del zodíaco chino.
- Info: https://www.travelchinaguide.com/intro/astrology/60year-cycle.htm
- El ciclo sexagenario se corresponde con la combinación de los elementos
  madera, fuego, tierra, metal, agua y los animales rata, buey, tigre,
  conejo, dragón, serpiente, caballo, oveja, mono, gallo, perro, cerdo
  (en este orden).
- Cada elemento se repite dos años seguidos.
- El último ciclo sexagenario comenzó en 1984 (Madera Rata).`;

// El ejercicio pide dos valores (elemento y animal): los devolvemos en un objeto.
// El ciclo arranca en 1984 (Madera Rata) y se repite cada 60 años.
export const casos = [
  { entrada: [1984], esperado: { elemento: 'Madera', animal: 'Rata' } }, // inicio del ciclo
  { entrada: [1985], esperado: { elemento: 'Madera', animal: 'Buey' } },
  { entrada: [1986], esperado: { elemento: 'Fuego', animal: 'Tigre' } },
  { entrada: [1900], esperado: { elemento: 'Metal', animal: 'Rata' } },
  { entrada: [2023], esperado: { elemento: 'Agua', animal: 'Conejo' } },
  { entrada: [2024], esperado: { elemento: 'Madera', animal: 'Dragón' } },
];

// Reto principal: el elemento y animal de 2024
export const demo = (ciclo) => ciclo(2024);

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
