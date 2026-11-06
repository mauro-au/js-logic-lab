import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '95';
export const dificultad = 'Difícil'; // Fácil | Medio | Difícil
export const tags = ['arreglos', 'ordenamiento'];

export const enunciado = `Crea una función que calcule el punto de encuentro de dos objetos en movimiento
en dos dimensiones.
- Cada objeto está compuesto por una coordenada xy y una velocidad de desplazamiento
  (vector de desplazamiento) por unidad de tiempo (también en formato xy).
- La función recibirá las coordenadas de inicio de ambos objetos y sus velocidades.
- La función calculará y mostrará el punto en el que se encuentran y el tiempo que
  tardarn en lograrlo.
- La función debe tener en cuenta que los objetos pueden no llegar a encontrarse.`;

// Casos de prueba (opcional). Con la lista vacía el ejercicio corre en "modo libre":
// cada solución se ejecuta sin argumentos y se muestran su retorno y sus console.log.
// entrada = lista de argumentos; esperado = valor que debe retornar.
const casos = [
  // { entrada: [15], esperado: 'fizzbuzz' },
];

// Opcional: reto principal. Descomenta y agrega demo a crearEjecutor({ ... }).
// const demo = (solucion) => solucion(100);

export const ejecutar = crearEjecutor({ soluciones, casos });
