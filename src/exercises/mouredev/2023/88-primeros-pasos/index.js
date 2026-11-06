import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '88';
export const dificultad = 'Fácil'; // Fácil | Medio | Difícil
export const tags = ['strings', 'arreglos', 'entrada-salida'];

export const enunciado = `Como cada año, el día 256 se celebra el "Día de la Programación".
En nuestra comunidad siempre hacemos una gran fiesta donde repartirmos
256 regalos para seguir aprendiendo programación:
https://diadelaprogramacion.com

Para seguir ayudando, te propongo este reto:
Mostrar la sintaxis de los principales elementos de un lenguaje
en TODOS los lenguajes de programación que podamos. ¿Llegaremos a 50?

En un fichero, haz lo siguiente (si el lenguaje lo soporta),
y comenta cada bloque para identificar con qué se corresponde:
- Haz un "Hola, mundo!"
- Crea variables de tipo String, numéricas (enteras y decimales)
  y Booleanas (o cualquier tipo de dato primitivo).
- Crea una constante.
- Usa un if, else if y else.
- Crea estructuras como un array, lista, tupla, set y diccionario.
- Usa un for, foreach y un while.
- Crea diferentes funciones (con/sin parámetros y con/sin retorno).
- Crea una clase.
- Muestra el control de excepciones.

Así, cualquier persona podrá consultar rápidamente diferentes ejemplos
de sintaxis básica de muchos lenguajes.

¡Muchas gracias!`;

// Casos de prueba (opcional). Con la lista vacía el ejercicio corre en "modo libre":
// cada solución se ejecuta sin argumentos y se muestran su retorno y sus console.log.
// entrada = lista de argumentos; esperado = valor que debe retornar.
const casos = [
  // { entrada: [15], esperado: 'fizzbuzz' },
];

// Opcional: reto principal. Descomenta y agrega demo a crearEjecutor({ ... }).
// const demo = (solucion) => solucion(100);

export const ejecutar = crearEjecutor({ soluciones, casos });
