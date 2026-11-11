import * as soluciones from './soluciones.js';
import { crearEjecutor } from '../../../../lib/ejecutor.js';

export const numero = '76';
export const dificultad = 'Medio'; // Fácil | Medio | Difícil
export const tags = ['entrada-salida'];

export const enunciado = `Realiza una conexión desde el lenguaje que hayas seleccionado a la siguiente
base de datos MySQL:
- Host: mysql-5707.dinaserver.com
- Port: 3306
- User: mouredev_read
- Password: mouredev_pass
- Database: moure_test

Una vez realices la conexión, lanza la siguiente consulta e imprime el resultado:
- SELECT * FROM \`challenges\`

Se pueden usar librerías para realizar la lógica de conexión a la base de datos.`;

// EXCEPCIÓN: la consulta depende de una base de datos MySQL remota, no hay
// un valor esperado fijo.
export const casos = [];

// Reto principal: conecta a la BD y ejecuta SELECT * FROM `challenges`.
export const demo = (baseDatos) => baseDatos();

export const ejecutar = crearEjecutor({ soluciones, casos, demo });
