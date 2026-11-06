// Solución 1: if / else if (el caso de 15 va primero)
export function fizzBuzzIf(limite) {
  const resultado = [];
  for (let i = 1; i <= limite; i++) {
    if (i % 15 === 0) resultado.push('fizzbuzz');
    else if (i % 3 === 0) resultado.push('fizz');
    else if (i % 5 === 0) resultado.push('buzz');
    else resultado.push(i);
  }
  return resultado;
}

// Solución 2: concatenando textos
export function fizzBuzzConcatenando(limite) {
  return Array.from({ length: Math.max(limite, 0) }, (_, k) => {
    const i = k + 1;
    return (i % 3 === 0 ? 'fizz' : '') + (i % 5 === 0 ? 'buzz' : '') || i;
  });
}