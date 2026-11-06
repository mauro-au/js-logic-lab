# 01 · FizzBuzz

![Dificultad](https://img.shields.io/badge/dificultad-facil-brightgreen)
![Origen](https://img.shields.io/badge/origen-mouredev_2022-blue)

| Origen | Año | Tags |
| ------ | --- | ---- |
| mouredev | 2022 | `bucles`, `condicionales`, `módulo` |

## 📝 Enunciado

Escribe un programa que muestre por consola los números del 1 al 100.

- Si el número es múltiplo de 3, muestra `fizz` en lugar del número.
- Si es múltiplo de 5, muestra `buzz`.
- Si es múltiplo de 3 y de 5, muestra `fizzbuzz`.

## 🔀 Diagrama de flujo

> _Pendiente: agregar `diagrama.png` o `diagrama.drawio`._

## 🧠 Explicación del algoritmo

1. Recorrer los números de 1 a 100 con un bucle `for`.
2. Comprobar **primero** si es múltiplo de 15 (3 y 5 a la vez). Si se comprueba después, nunca se alcanzaría ese caso.
3. Si no, comprobar si es múltiplo de 3 y luego de 5.
4. Si no cumple ninguna condición, mostrar el número tal cual.

## ⏱️ Complejidad

- **Tiempo:** O(n)
- **Espacio:** O(n) por el arreglo de resultados (O(1) si se imprime directamente).

## ✅ Casos de prueba

| Entrada | Salida esperada |
| ------- | --------------- |
| `1`     | `1`             |
| `3`     | `fizz`          |
| `5`     | `buzz`          |
| `15`    | `fizzbuzz`      |

## 💻 Soluciones

Código en [`soluciones.js`](./soluciones.js).

| Solución | Idea | Tiempo | Espacio |
| -------- | ---- | ------ | ------- |
| `fizzBuzz` | Bucle con dos variables | O(n) | O(n) |
| _(agrega una fila por cada nueva solución)_ | | | |

## 📚 Notas / aprendizajes

- El orden de las condiciones importa: el caso más específico (múltiplo de 15) va primero.
- Separar la lógica de la presentación facilita reutilizar la función.
