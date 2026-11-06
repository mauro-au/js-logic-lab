import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '70';
export const dificultad = 'Difícil'; // Fácil | Medio | Difícil
export const tags = ['fechas'];

export const enunciado = `¡Estoy de celebración! He publicado mi primer libro:
"Git y GitHub desde cero"
- Papel: mouredev.com/libro-git
- eBook: mouredev.com/ebook-git

¿Sabías que puedes leer información de Git y GitHub desde la gran
mayoría de lenguajes de programación?

Crea un programa que lea los últimos 10 commits de este repositorio y muestre:
- Hash
- Autor
- Mensaje
- Fecha y hora

Ejemplo de salida:
Commit 1 (el más reciente) | 12345A | MoureDev | Este es un commit | 24/04/2023 21:00

Se permite utilizar librerías que nos faciliten esta tarea.`;

// Casos de prueba (opcional). Con la lista vacía el ejercicio corre en "modo libre":
// cada solución se ejecuta sin argumentos y se muestran su retorno y sus console.log.
// entrada = lista de argumentos; esperado = valor que debe retornar.
const casos = [
  // { entrada: [15], esperado: 'fizzbuzz' },
];

// Opcional: reto principal. Descomenta y agrega demo a crearEjecutor({ ... }).
// const demo = (solucion) => solucion(100);

export const ejecutar = crearEjecutor({ soluciones, casos });
