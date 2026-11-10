// Recibe la cantidad de términos y retorna un arreglo con la serie.
// Ejemplo de ideas para otras versiones: iterativa, recursiva, con memoización...

export function fibonacciIterativo(cantidad) {
  if (cantidad <= 0) return [];
  if (cantidad === 1) return [0];

  const fib = [0, 1]; // Los dos primeros términos de Fibonacci

  for (let i = 2; i < cantidad; i++) {
    // Suma los dos valores anteriores en el array
    fib[i] = fib[i - 1] + fib[i - 2];
  }

  return fib;
}