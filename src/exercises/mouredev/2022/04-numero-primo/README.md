# 04 · Número primo

![Dificultad](https://img.shields.io/badge/dificultad-medio-yellow)
![Origen](https://img.shields.io/badge/origen-mouredev_2022-blue)

| Origen | Año | Tags |
| ------ | --- | ---- |
| mouredev | 2022 | `números`, `bucles`, `divisibilidad`, `optimización` |

## 📝 Enunciado

Escribe un programa que se encargue de comprobar si un número es o no primo.
Hecho esto, imprime los números primos entre 1 y 100.

- Un número primo es un número natural mayor que 1 que solo es divisible por 1 y por sí mismo.

## 🔀 Diagrama de flujo

> _Pendiente: agregar `diagrama.png` o `diagrama.drawio`._

## 🧠 Explicación del algoritmo

> _Pendiente: completar al resolver el ejercicio._

1. Paso uno…
2. Paso dos…
3. Paso tres…

## ⏱️ Complejidad

> _Pendiente: completar según la solución elegida._

- **Tiempo:** O(?)
- **Espacio:** O(?)

## ✅ Casos de prueba

| Número | Salida esperada | Motivo |
| ------ | --------------- | ------ |
| `-7` | `false` | Los negativos no son primos |
| `0` | `false` | Menor que 2 |
| `1` | `false` | El 1 no es primo |
| `2` | `true` | Único primo par |
| `3` | `true` | Primo |
| `4` | `false` | Divisible por 2 |
| `2.5` | `false` | No es un número natural |
| `17` | `true` | Primo |
| `49` | `false` | 7 × 7 |
| `97` | `true` | Mayor primo menor que 100 |
| `100` | `false` | Divisible por 2 y 5 |

**Primos entre 1 y 100 (25 en total):**
`2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97`

## 💻 Soluciones

Código en [`soluciones.js`](./soluciones.js).

| Solución | Idea | Tiempo | Espacio |
| -------- | ---- | ------ | ------- |
| `numeroPrimo` | Bucle con dos variables | O(n) | O(n) |
| _(agrega una fila por cada nueva solución)_ | | | |

## 📚 Notas / aprendizajes

> _Pendiente: completar al resolver el ejercicio._

- Decisiones a tomar: ¿hasta qué número hace falta probar divisores? ¿Se pueden descartar los pares desde el inicio?
- ¿Cómo tratas los casos límite (negativos, 0, 1, decimales)?
- ¿Y si el rango fuera de 1 a 1.000.000? Investiga la criba de Eratóstenes.
- Qué aprendí o qué haría distinto.
