import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '69';
export const dificultad = 'Medio'; // Fácil | Medio | Difícil
export const tags = ['dibujo'];

export const enunciado = `Crea una función que dibuje una escalera según su número de escalones.
- Si el número es positivo, será ascendente de izquiera a derecha.
- Si el número es negativo, será descendente de izquiera a derecha.
- Si el número es cero, se dibujarán dos guiones bajos (__).

Ejemplo: 4
        _
      _|
    _|
  _|
_|`;

// Casos de prueba (opcional). Con la lista vacía el ejercicio corre en "modo libre":
// cada solución se ejecuta sin argumentos y se muestran su retorno y sus console.log.
// entrada = lista de argumentos; esperado = valor que debe retornar.
const casos = [
  // { entrada: [15], esperado: 'fizzbuzz' },
];

// Opcional: reto principal. Descomenta y agrega demo a crearEjecutor({ ... }).
// const demo = (solucion) => solucion(100);

export const ejecutar = crearEjecutor({ soluciones, casos });
