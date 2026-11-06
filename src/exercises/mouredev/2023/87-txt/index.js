import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '87';
export const dificultad = 'Medio'; // Fácil | Medio | Difícil
export const tags = ['strings', 'entrada-salida'];

export const enunciado = `Crea un programa capaz de interactuar con un fichero TXT.
IMPORTANTE: El fichero TXT NO debe subirse como parte de la corrección.
Únicamente el código.

- Si no existe, debe crear un fichero llamado "text.txt".
- Desde el programa debes ser capaz de introducir texto por consola y guardarlo
  en una nueva línea cada vez que se pulse el botón "Enter".
- Si el fichero existe, el programa tiene que dar la opción de seguir escribiendo
  a continuación o borrar su contenido y comenzar desde el principio.
- Si se selecciona continuar escribiendo, se tiene que mostrar por consola
  el texto que ya posee el fichero.`;

// Casos de prueba (opcional). Con la lista vacía el ejercicio corre en "modo libre":
// cada solución se ejecuta sin argumentos y se muestran su retorno y sus console.log.
// entrada = lista de argumentos; esperado = valor que debe retornar.
const casos = [
  // { entrada: [15], esperado: 'fizzbuzz' },
];

// Opcional: reto principal. Descomenta y agrega demo a crearEjecutor({ ... }).
// const demo = (solucion) => solucion(100);

export const ejecutar = crearEjecutor({ soluciones, casos });
