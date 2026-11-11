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

// El dibujo se devuelve como array de líneas (una por fila), que se lee mejor
// en la terminal que un string con \n. Un positivo n dibuja n+1 filas (la
// superior solo con "_"); un negativo dibuja las mismas filas invertidas;
// cero son dos guiones bajos.
export const casos = [
  { entrada: [4], esperado: [
    '        _',
    '      _|',
    '    _|',
    '  _|',
    '_|',
  ] },
  { entrada: [2], esperado: ['    _', '  _|', '_|'] },
  { entrada: [-2], esperado: ['_|', '  _|', '    _'] },
  { entrada: [0], esperado: ['__'] },
];

// Reto principal: escalera ascendente de 5 escalones
export const demo = (escalera) => escalera(5);

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
