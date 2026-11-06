# 03 · Fibonacci

![Dificultad](https://img.shields.io/badge/dificultad-medio-yellow)
![Origen](https://img.shields.io/badge/origen-mouredev_2022-blue)

| Origen | Año | Tags |
| ------ | --- | ---- |
| mouredev | 2022 | `recursión`, `bucles`, `secuencias`, `números` |

## 📝 Enunciado

Escribe un programa que imprima los 50 primeros números de la sucesión de Fibonacci empezando en 0.

- La serie Fibonacci se compone por una sucesión de números en la que el siguiente siempre es la suma de los dos anteriores.

`0, 1, 1, 2, 3, 5, 8, 13...`

## 🔀 Diagrama de flujo

![Diagrama de flujo](./diagrama.png)

> Fuente editable: [`diagrama.drawio`](./diagrama.drawio)

## 🧠 Explicación del algoritmo

> _Pendiente: completar al resolver el ejercicio._

1. Paso uno…
2. Paso dos…
3. Paso tres…

## ⏱️ Complejidad

> _Pendiente: completar según la solución elegida (iterativa, recursiva, con memoización…)._

- **Tiempo:** O(?)
- **Espacio:** O(?)

## ✅ Casos de prueba

| Cantidad | Salida esperada | Motivo |
| -------- | --------------- | ------ |
| `0` | `[]` | Sin términos |
| `1` | `[0]` | Solo el caso base inicial |
| `2` | `[0, 1]` | Los dos casos base |
| `8` | `[0, 1, 1, 2, 3, 5, 8, 13]` | Primeros términos de la serie |

## 💻 Soluciones

Código en [`soluciones.js`](./soluciones.js).

| Solución | Idea | Tiempo | Espacio |
| -------- | ---- | ------ | ------- |
| `fibonacciIterativo` | Bucle con dos variables | O(n) | O(n) |
| _(agrega una fila por cada nueva solución)_ | | | |

## 📚 Notas / aprendizajes

> _Pendiente: completar al resolver el ejercicio._

- Decisiones a tomar: ¿iterativo o recursivo? La recursión simple repite cálculos y con 50 términos tarda muchísimo; ¿memoización?
- ¿Qué pasa con los casos límite (0 o 1 términos)?
- ¿Hasta qué término es preciso un `Number` de JavaScript? ¿Cuándo conviene `BigInt`?
- Qué aprendí o qué haría distinto.