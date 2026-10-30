export const numero = '01';
export const dificultad = 'Fácil';
export const tags = ['bucles', 'condicionales', 'módulo'];

export const enunciado = `Escribe un programa que muestre por consola los números del 1 al 100.
- Si el número es múltiplo de 3, muestra "fizz" en lugar del número.
- Si es múltiplo de 5, muestra "buzz".
- Si es múltiplo de 3 y de 5, muestra "fizzbuzz".`;

function fizzBuzz(limite = 100) {
  const resultado = [];

  for (let i = 1; i <= limite; i++) {
    if (i % 15 === 0) resultado.push('fizzbuzz');
    else if (i % 3 === 0) resultado.push('fizz');
    else if (i % 5 === 0) resultado.push('buzz');
    else resultado.push(i);
  }

  return resultado;
}

export function ejecutar() {
  const resultado = fizzBuzz(100);
  resultado.forEach((valor) => console.log(valor));

  // Lo que se retorna se inserta como HTML en "Vista en pantalla"
  const items = resultado
    .map((v) => `<span style="display:inline-block;min-width:3.5rem">${v}</span>`)
    .join('');

  return `<div style="line-height:1.8">${items}</div>`;
}