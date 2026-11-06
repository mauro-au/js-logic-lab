import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '75';
export const dificultad = 'Medio'; // Fácil | Medio | Difícil
export const tags = ['dibujo'];

export const enunciado = `Crea una función que dibuje una espiral como la del ejemplo.
- Únicamente se indica de forma dinámica el tamaño del lado.
- Símbolos permitidos: ═ ║ ╗ ╔ ╝ ╚

Ejemplo espiral de lado 5 (5 filas y 5 columnas):
════╗
╔══╗║
║╔╗║║
║╚═╝║
╚═══╝`;

// Casos de prueba (opcional). Con la lista vacía el ejercicio corre en "modo libre":
// cada solución se ejecuta sin argumentos y se muestran su retorno y sus console.log.
// entrada = lista de argumentos; esperado = valor que debe retornar.
const casos = [
  // { entrada: [15], esperado: 'fizzbuzz' },
];

// Opcional: reto principal. Descomenta y agrega demo a crearEjecutor({ ... }).
// const demo = (solucion) => solucion(100);

export const ejecutar = crearEjecutor({ soluciones, casos });
