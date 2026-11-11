import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '37';
export const dificultad = 'Medio'; // Fácil | Medio | Difícil
export const tags = ['arreglos','matemáticas'];

export const enunciado = `¡La Tierra Media está en guerra! En ella lucharán razas leales
a Sauron contra otras bondadosas que no quieren que el mal reine
sobre sus tierras.
Cada raza tiene asociado un "valor" entre 1 y 5:
- Razas bondadosas: Pelosos (1), Sureños buenos (2), Enanos (3),
  Númenóreanos (4), Elfos (5)
- Razas malvadas: Sureños malos (2), Orcos (2), Goblins (2),
  Huargos (3), Trolls (5)
Crea un programa que calcule el resultado de la batalla entre
los 2 tipos de ejércitos:
- El resultado puede ser que gane el bien, el mal, o exista un empate.
  Dependiendo de la suma del valor del ejército y el número de integrantes.
- Cada ejército puede estar compuesto por un número de integrantes variable
  de cada raza.
- Tienes total libertad para modelar los datos del ejercicio.
Ej: 1 Peloso pierde contra 1 Orco
    2 Pelosos empatan contra 1 Orco
    3 Pelosos ganan a 1 Orco`;

// El enunciado da libertad para modelar los datos: cada ejército es una
// lista de pares [raza, cantidad] y el retorno es 'bien', 'mal' o 'empate'
// según la suma del valor de las razas (como en los ejemplos del enunciado).
export const casos = [
  { entrada: [[['Pelosos', 1]], [['Orcos', 1]]], esperado: 'mal' }, // 1 vs 2
  { entrada: [[['Pelosos', 2]], [['Orcos', 1]]], esperado: 'empate' }, // 2 vs 2
  { entrada: [[['Pelosos', 3]], [['Orcos', 1]]], esperado: 'bien' }, // 3 vs 2
  { entrada: [[['Sureños buenos', 1]], [['Goblins', 2]]], esperado: 'mal' }, // 2 vs 4
  { entrada: [[['Elfos', 2], ['Enanos', 1]], [['Trolls', 1], ['Orcos', 2]]], esperado: 'bien' }, // 13 vs 9
];

// Reto principal: el bando ganador de una batalla de razas (34 vs 18)
export const demo = (batalla) =>
  batalla([['Elfos', 5], ['Enanos', 3]], [['Orcos', 4], ['Trolls', 2]]);

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
