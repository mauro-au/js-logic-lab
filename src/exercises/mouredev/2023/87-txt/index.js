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

// Excepción: crea y escribe un fichero externo ("text.txt") con entrada por
// consola → sin valor esperado fijo, modo libre con demo.
export const casos = [];

// Demo: inicia la interacción con el fichero; lo que se escriba se verá en la terminal.
export const demo = (txt) => {
  txt();
  return '📄 Interacción con "text.txt" iniciada';
};

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
