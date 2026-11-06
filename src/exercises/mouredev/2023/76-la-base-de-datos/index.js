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

// Casos de prueba (opcional). Con la lista vacía el ejercicio corre en "modo libre":
// cada solución se ejecuta sin argumentos y se muestran su retorno y sus console.log.
// entrada = lista de argumentos; esperado = valor que debe retornar.
const casos = [
  // { entrada: [15], esperado: 'fizzbuzz' },
];

// Opcional: reto principal. Descomenta y agrega demo a crearEjecutor({ ... }).
// const demo = (solucion) => solucion(100);

export const ejecutar = crearEjecutor({ soluciones, casos });
