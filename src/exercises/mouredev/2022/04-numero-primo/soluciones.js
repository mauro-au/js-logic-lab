// Retorna true si n es primo, false si no.

export function esPrimo(n) {
  if(n < 2 || n % 1 != 0){
    return false
  }
  for(let i = 2; i < n; i++) {
    if (n % i == 0) {
      return false
    }
  }
  return true
}