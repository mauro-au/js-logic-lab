// Ruta: src/exercises/<origen>/<año>/NN-nombre/index.js
// IMPORTANTE: no ejecutes código en el nivel superior; todo va dentro de ejecutar().

export const numero = '05';
export const dificultad = 'Fácil'; // Fácil | Medio | Difícil
export const tags = ['bucles', 'condicionales'];

// Se muestra como texto plano (se escapa automáticamente).
export const enunciado = `Describe aquí el ejercicio.
Puedes usar varias líneas.`;

// Puede ser sync o async. Lo que retornes se inserta como HTML en "Vista en pantalla".
// Si interpolas datos dinámicos en ese HTML, escápalos (&, <, >) antes de retornarlos.
export function ejecutar() {
  const resultado = 42;
  console.log('Resultado:', resultado);

  return `<p>Resultado: <strong>${resultado}</strong></p>`;
}