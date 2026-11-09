<p align="center">
  <img src="public/favicon.svg" alt="JS Logic Lab" width="84" height="84" />
</p>

# 🧪 JS Logic Lab

Laboratorio interactivo para practicar lógica de programación en JavaScript. Incluye 101 retos con enunciado, casos de prueba opcionales, soluciones de referencia y una terminal simulada para comparar resultados y tiempos.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/mauro-au/js-logic-lab)

## 🚀 Uso

Requiere Node.js 20.19 o superior.

```bash
npm install
npm run dev
```

## 🧪 Pruebas

```bash
npm test        # ejecutor + editor de usuario + enlaces + validación de los 101 ejercicios
npm run build   # compilación de producción
```

El mismo flujo se ejecuta en GitHub Actions (`.github/workflows/ci.yml`).

## ✨ Funciones del laboratorio

- **Editor "TU CÓDIGO"**: escribe tu solución en cada ejercicio y ejecútala contra los mismos casos que las soluciones de referencia (mismos tests, benchmark y terminal). El código se guarda por ejercicio en tu navegador.
- **Enlaces profundos**: cada ejercicio tiene una URL propia, por ejemplo `#/mouredev/2022/01-fizzbuzz`, lista para compartir; el botón atrás/adelante del navegador también navega entre ejercicios.
- **Atajos de teclado**: `Ctrl/Cmd + Enter` ejecuta el ejercicio activo; `Ctrl/Cmd + K` o `/` enfocan el buscador.
- **Resumen de progreso**: barra global de completados y desglose por dificultad, siempre visible bajo los filtros.
- **Terminal como fuente única de resultados**: casos, aciertos, tiempos, errores, demo y logs se ven en la terminal; la tarjeta de resultados solo conserva el código de cada solución (plegable, con botón «Copiar») y su pie de estado.

## 🧭 Cómo funciona

- `src/main.js` obtiene los metadatos del catálogo desde un módulo virtual generado por Vite y descarga cada ejercicio solo al abrirlo.
- `src/lib/ejecutor.js` compara resultados con igualdad profunda, clona las entradas de cada caso y limita los logs para no saturar la terminal; el código del editor entra como una solución más.
- `src/lib/codigo.js` extrae las funciones exportadas y compila el código del usuario (sin dependencias); `src/lib/resaltado.js` se encarga del resaltado de sintaxis.
- `src/lib/ruta.js` traduce rutas internas a enlaces profundos (`#/origen/año/nn-nombre`) y viceversa.

## 🙏 Créditos

Los 101 retos provienen de [retosdeprogramacion.com](https://retosdeprogramacion.com/ejercicios/), el proyecto de [mouredev](https://github.com/mouredev). Este repositorio es un laboratorio independiente para practicarlos.

## ➕ Agregar un ejercicio

1. Ejecuta `npm run nuevo` (recomendado) o crea la carpeta `src/exercises/<origen>/<año>/NN-nombre/`.
2. Si lo haces a mano, copia el contenido de `src/plantilla/` como `index.js`, `soluciones.js` y `README.md`.
3. Completa el enunciado, los casos de prueba y las soluciones.
4. Si quieres, agrega `diagrama.png` o `diagrama.drawio`.
5. Ejecuta `npm test` y `npm run generar-readme` para validar el ejercicio y actualizar las tablas de abajo.

## 📊 Progreso

> Las soluciones de referencia se van completando poco a poco. Los ejercicios sin resolver son plantillas para practicar.

<!-- EJERCICIOS:START -->

**Total:** 101 ejercicios · **Con diagrama:** 0/101 (0%)

| Origen | Total | 🟢 Fácil | 🟡 Medio | 🔴 Difícil | Diagramas |
| ------ | ----: | -------: | -------: | ---------: | --------: |
| mouredev / 2022 | 52 | 26 | 23 | 3 | 0/52 |
| mouredev / 2023 | 49 | 17 | 27 | 5 | 0/49 |

## 📚 Ejercicios

| Origen | Ejercicio | Dificultad | Diagrama | Detalle |
| ------ | --------- | ---------- | :------: | ------- |
| mouredev / 2022 | [01-fizzbuzz](src/exercises/mouredev/2022/01-fizzbuzz/index.js) | 🟢 Fácil | ❌ | [README](src/exercises/mouredev/2022/01-fizzbuzz/README.md) |
| mouredev / 2022 | [02-anagrama](src/exercises/mouredev/2022/02-anagrama/index.js) | 🟢 Fácil | ❌ | [README](src/exercises/mouredev/2022/02-anagrama/README.md) |
| mouredev / 2022 | [03-fibonacci](src/exercises/mouredev/2022/03-fibonacci/index.js) | 🟡 Medio | ❌ | [README](src/exercises/mouredev/2022/03-fibonacci/README.md) |
| mouredev / 2022 | [04-numero-primo](src/exercises/mouredev/2022/04-numero-primo/index.js) | 🟡 Medio | ❌ | [README](src/exercises/mouredev/2022/04-numero-primo/README.md) |
| mouredev / 2022 | [05-area-de-un-poligono](src/exercises/mouredev/2022/05-area-de-un-poligono/index.js) | 🟢 Fácil | ❌ | [README](src/exercises/mouredev/2022/05-area-de-un-poligono/README.md) |
| mouredev / 2022 | [06-aspect-ratio-de-una-imagen](src/exercises/mouredev/2022/06-aspect-ratio-de-una-imagen/index.js) | 🔴 Difícil | ❌ | [README](src/exercises/mouredev/2022/06-aspect-ratio-de-una-imagen/README.md) |
| mouredev / 2022 | [07-invirtiendo-cadenas](src/exercises/mouredev/2022/07-invirtiendo-cadenas/index.js) | 🟢 Fácil | ❌ | [README](src/exercises/mouredev/2022/07-invirtiendo-cadenas/README.md) |
| mouredev / 2022 | [08-contando-palabras](src/exercises/mouredev/2022/08-contando-palabras/index.js) | 🟡 Medio | ❌ | [README](src/exercises/mouredev/2022/08-contando-palabras/README.md) |
| mouredev / 2022 | [09-decimal-a-binario](src/exercises/mouredev/2022/09-decimal-a-binario/index.js) | 🟢 Fácil | ❌ | [README](src/exercises/mouredev/2022/09-decimal-a-binario/README.md) |
| mouredev / 2022 | [10-codigo-morse](src/exercises/mouredev/2022/10-codigo-morse/index.js) | 🟡 Medio | ❌ | [README](src/exercises/mouredev/2022/10-codigo-morse/README.md) |
| mouredev / 2022 | [11-expresiones-equilibradas](src/exercises/mouredev/2022/11-expresiones-equilibradas/index.js) | 🟡 Medio | ❌ | [README](src/exercises/mouredev/2022/11-expresiones-equilibradas/README.md) |
| mouredev / 2022 | [12-eliminando-caracteres](src/exercises/mouredev/2022/12-eliminando-caracteres/index.js) | 🟢 Fácil | ❌ | [README](src/exercises/mouredev/2022/12-eliminando-caracteres/README.md) |
| mouredev / 2022 | [13-es-un-palindromo](src/exercises/mouredev/2022/13-es-un-palindromo/index.js) | 🟡 Medio | ❌ | [README](src/exercises/mouredev/2022/13-es-un-palindromo/README.md) |
| mouredev / 2022 | [14-factorial-recursivo](src/exercises/mouredev/2022/14-factorial-recursivo/index.js) | 🟢 Fácil | ❌ | [README](src/exercises/mouredev/2022/14-factorial-recursivo/README.md) |
| mouredev / 2022 | [15-es-un-numero-de-armstrong](src/exercises/mouredev/2022/15-es-un-numero-de-armstrong/index.js) | 🟢 Fácil | ❌ | [README](src/exercises/mouredev/2022/15-es-un-numero-de-armstrong/README.md) |
| mouredev / 2022 | [16-cuantos-dias](src/exercises/mouredev/2022/16-cuantos-dias/index.js) | 🔴 Difícil | ❌ | [README](src/exercises/mouredev/2022/16-cuantos-dias/README.md) |
| mouredev / 2022 | [17-en-mayuscula](src/exercises/mouredev/2022/17-en-mayuscula/index.js) | 🟢 Fácil | ❌ | [README](src/exercises/mouredev/2022/17-en-mayuscula/README.md) |
| mouredev / 2022 | [18-la-carrera-de-obstaculos](src/exercises/mouredev/2022/18-la-carrera-de-obstaculos/index.js) | 🟡 Medio | ❌ | [README](src/exercises/mouredev/2022/18-la-carrera-de-obstaculos/README.md) |
| mouredev / 2022 | [19-tres-en-raya](src/exercises/mouredev/2022/19-tres-en-raya/index.js) | 🔴 Difícil | ❌ | [README](src/exercises/mouredev/2022/19-tres-en-raya/README.md) |
| mouredev / 2022 | [20-conversor-tiempo](src/exercises/mouredev/2022/20-conversor-tiempo/index.js) | 🟢 Fácil | ❌ | [README](src/exercises/mouredev/2022/20-conversor-tiempo/README.md) |
| mouredev / 2022 | [21-parando-el-tiempo](src/exercises/mouredev/2022/21-parando-el-tiempo/index.js) | 🟡 Medio | ❌ | [README](src/exercises/mouredev/2022/21-parando-el-tiempo/README.md) |
| mouredev / 2022 | [22-calculadora-txt](src/exercises/mouredev/2022/22-calculadora-txt/index.js) | 🟡 Medio | ❌ | [README](src/exercises/mouredev/2022/22-calculadora-txt/README.md) |
| mouredev / 2022 | [23-conjuntos](src/exercises/mouredev/2022/23-conjuntos/index.js) | 🟢 Fácil | ❌ | [README](src/exercises/mouredev/2022/23-conjuntos/README.md) |
| mouredev / 2022 | [24-maximo-comun-divisor-y-minimo-comun](src/exercises/mouredev/2022/24-maximo-comun-divisor-y-minimo-comun/index.js) | 🟡 Medio | ❌ | [README](src/exercises/mouredev/2022/24-maximo-comun-divisor-y-minimo-comun/README.md) |
| mouredev / 2022 | [25-iteration-master](src/exercises/mouredev/2022/25-iteration-master/index.js) | 🟢 Fácil | ❌ | [README](src/exercises/mouredev/2022/25-iteration-master/README.md) |
| mouredev / 2022 | [26-piedra-papel-tijera](src/exercises/mouredev/2022/26-piedra-papel-tijera/index.js) | 🟡 Medio | ❌ | [README](src/exercises/mouredev/2022/26-piedra-papel-tijera/README.md) |
| mouredev / 2022 | [27-cuadrado-y-triangulo-2d](src/exercises/mouredev/2022/27-cuadrado-y-triangulo-2d/index.js) | 🟢 Fácil | ❌ | [README](src/exercises/mouredev/2022/27-cuadrado-y-triangulo-2d/README.md) |
| mouredev / 2022 | [28-vectores-ortogonales](src/exercises/mouredev/2022/28-vectores-ortogonales/index.js) | 🟢 Fácil | ❌ | [README](src/exercises/mouredev/2022/28-vectores-ortogonales/README.md) |
| mouredev / 2022 | [29-maquina-expendedora](src/exercises/mouredev/2022/29-maquina-expendedora/index.js) | 🟡 Medio | ❌ | [README](src/exercises/mouredev/2022/29-maquina-expendedora/README.md) |
| mouredev / 2022 | [30-ordena-la-lista](src/exercises/mouredev/2022/30-ordena-la-lista/index.js) | 🟢 Fácil | ❌ | [README](src/exercises/mouredev/2022/30-ordena-la-lista/README.md) |
| mouredev / 2022 | [31-marco-de-palabras](src/exercises/mouredev/2022/31-marco-de-palabras/index.js) | 🟢 Fácil | ❌ | [README](src/exercises/mouredev/2022/31-marco-de-palabras/README.md) |
| mouredev / 2022 | [32-anos-bisiestos](src/exercises/mouredev/2022/32-anos-bisiestos/index.js) | 🟢 Fácil | ❌ | [README](src/exercises/mouredev/2022/32-anos-bisiestos/README.md) |
| mouredev / 2022 | [33-el-segundo](src/exercises/mouredev/2022/33-el-segundo/index.js) | 🟢 Fácil | ❌ | [README](src/exercises/mouredev/2022/33-el-segundo/README.md) |
| mouredev / 2022 | [34-ciclo-sexagenario-chino](src/exercises/mouredev/2022/34-ciclo-sexagenario-chino/index.js) | 🟡 Medio | ❌ | [README](src/exercises/mouredev/2022/34-ciclo-sexagenario-chino/README.md) |
| mouredev / 2022 | [35-los-numeros-perdidos](src/exercises/mouredev/2022/35-los-numeros-perdidos/index.js) | 🟡 Medio | ❌ | [README](src/exercises/mouredev/2022/35-los-numeros-perdidos/README.md) |
| mouredev / 2022 | [36-batalla-pokemon](src/exercises/mouredev/2022/36-batalla-pokemon/index.js) | 🟡 Medio | ❌ | [README](src/exercises/mouredev/2022/36-batalla-pokemon/README.md) |
| mouredev / 2022 | [37-los-anillos-de-poder](src/exercises/mouredev/2022/37-los-anillos-de-poder/index.js) | 🟡 Medio | ❌ | [README](src/exercises/mouredev/2022/37-los-anillos-de-poder/README.md) |
| mouredev / 2022 | [38-los-lanzamientos-de-the-legend-of-zelda](src/exercises/mouredev/2022/38-los-lanzamientos-de-the-legend-of-zelda/index.js) | 🟡 Medio | ❌ | [README](src/exercises/mouredev/2022/38-los-lanzamientos-de-the-legend-of-zelda/README.md) |
| mouredev / 2022 | [39-binario-a-decimal](src/exercises/mouredev/2022/39-binario-a-decimal/index.js) | 🟡 Medio | ❌ | [README](src/exercises/mouredev/2022/39-binario-a-decimal/README.md) |
| mouredev / 2022 | [40-top-algoritmos-quick-sort](src/exercises/mouredev/2022/40-top-algoritmos-quick-sort/index.js) | 🟡 Medio | ❌ | [README](src/exercises/mouredev/2022/40-top-algoritmos-quick-sort/README.md) |
| mouredev / 2022 | [41-triangulo-de-pascal](src/exercises/mouredev/2022/41-triangulo-de-pascal/index.js) | 🟡 Medio | ❌ | [README](src/exercises/mouredev/2022/41-triangulo-de-pascal/README.md) |
| mouredev / 2022 | [42-la-ley-de-ohm](src/exercises/mouredev/2022/42-la-ley-de-ohm/index.js) | 🟢 Fácil | ❌ | [README](src/exercises/mouredev/2022/42-la-ley-de-ohm/README.md) |
| mouredev / 2022 | [43-conversor-de-temperatura](src/exercises/mouredev/2022/43-conversor-de-temperatura/index.js) | 🟢 Fácil | ❌ | [README](src/exercises/mouredev/2022/43-conversor-de-temperatura/README.md) |
| mouredev / 2022 | [44-truco-o-trato](src/exercises/mouredev/2022/44-truco-o-trato/index.js) | 🟡 Medio | ❌ | [README](src/exercises/mouredev/2022/44-truco-o-trato/README.md) |
| mouredev / 2022 | [45-bumeranes](src/exercises/mouredev/2022/45-bumeranes/index.js) | 🟢 Fácil | ❌ | [README](src/exercises/mouredev/2022/45-bumeranes/README.md) |
| mouredev / 2022 | [46-contenedor-de-agua](src/exercises/mouredev/2022/46-contenedor-de-agua/index.js) | 🟡 Medio | ❌ | [README](src/exercises/mouredev/2022/46-contenedor-de-agua/README.md) |
| mouredev / 2022 | [47-donde-esta-el-robot](src/exercises/mouredev/2022/47-donde-esta-el-robot/index.js) | 🟡 Medio | ❌ | [README](src/exercises/mouredev/2022/47-donde-esta-el-robot/README.md) |
| mouredev / 2022 | [48-vocal-mas-comun](src/exercises/mouredev/2022/48-vocal-mas-comun/index.js) | 🟢 Fácil | ❌ | [README](src/exercises/mouredev/2022/48-vocal-mas-comun/README.md) |
| mouredev / 2022 | [49-el-calendario-de-adeviento-2022](src/exercises/mouredev/2022/49-el-calendario-de-adeviento-2022/index.js) | 🟢 Fácil | ❌ | [README](src/exercises/mouredev/2022/49-el-calendario-de-adeviento-2022/README.md) |
| mouredev / 2022 | [50-el-detector-de-handles](src/exercises/mouredev/2022/50-el-detector-de-handles/index.js) | 🟢 Fácil | ❌ | [README](src/exercises/mouredev/2022/50-el-detector-de-handles/README.md) |
| mouredev / 2022 | [51-la-encriptacion-de-karaca](src/exercises/mouredev/2022/51-la-encriptacion-de-karaca/index.js) | 🟢 Fácil | ❌ | [README](src/exercises/mouredev/2022/51-la-encriptacion-de-karaca/README.md) |
| mouredev / 2022 | [52-el-reto-random](src/exercises/mouredev/2022/52-el-reto-random/index.js) | 🟢 Fácil | ❌ | [README](src/exercises/mouredev/2022/52-el-reto-random/README.md) |
| mouredev / 2023 | [53-el-famoso-fizz-buzz-v2](src/exercises/mouredev/2023/53-el-famoso-fizz-buzz-v2/index.js) | 🟢 Fácil | ❌ | [README](src/exercises/mouredev/2023/53-el-famoso-fizz-buzz-v2/README.md) |
| mouredev / 2023 | [54-el-lenguaje-hacker](src/exercises/mouredev/2023/54-el-lenguaje-hacker/index.js) | 🟢 Fácil | ❌ | [README](src/exercises/mouredev/2023/54-el-lenguaje-hacker/README.md) |
| mouredev / 2023 | [55-el-partido-de-tenis](src/exercises/mouredev/2023/55-el-partido-de-tenis/index.js) | 🟡 Medio | ❌ | [README](src/exercises/mouredev/2023/55-el-partido-de-tenis/README.md) |
| mouredev / 2023 | [56-el-generador-de-contrasenas](src/exercises/mouredev/2023/56-el-generador-de-contrasenas/index.js) | 🟡 Medio | ❌ | [README](src/exercises/mouredev/2023/56-el-generador-de-contrasenas/README.md) |
| mouredev / 2023 | [57-primo-fibonacci-y-par](src/exercises/mouredev/2023/57-primo-fibonacci-y-par/index.js) | 🟡 Medio | ❌ | [README](src/exercises/mouredev/2023/57-primo-fibonacci-y-par/README.md) |
| mouredev / 2023 | [58-hola-mundo](src/exercises/mouredev/2023/58-hola-mundo/index.js) | 🟢 Fácil | ❌ | [README](src/exercises/mouredev/2023/58-hola-mundo/README.md) |
| mouredev / 2023 | [59-piedra-papel-tijera-lagarto-spock](src/exercises/mouredev/2023/59-piedra-papel-tijera-lagarto-spock/index.js) | 🟡 Medio | ❌ | [README](src/exercises/mouredev/2023/59-piedra-papel-tijera-lagarto-spock/README.md) |
| mouredev / 2023 | [60-el-sombrero-seleccionador](src/exercises/mouredev/2023/60-el-sombrero-seleccionador/index.js) | 🟡 Medio | ❌ | [README](src/exercises/mouredev/2023/60-el-sombrero-seleccionador/README.md) |
| mouredev / 2023 | [61-el-generador-pseudoaleatorio](src/exercises/mouredev/2023/61-el-generador-pseudoaleatorio/index.js) | 🟡 Medio | ❌ | [README](src/exercises/mouredev/2023/61-el-generador-pseudoaleatorio/README.md) |
| mouredev / 2023 | [62-heterograma-isograma-y-pangrama](src/exercises/mouredev/2023/62-heterograma-isograma-y-pangrama/index.js) | 🟢 Fácil | ❌ | [README](src/exercises/mouredev/2023/62-heterograma-isograma-y-pangrama/README.md) |
| mouredev / 2023 | [63-la-api-application-programming-interface](src/exercises/mouredev/2023/63-la-api-application-programming-interface/index.js) | 🟡 Medio | ❌ | [README](src/exercises/mouredev/2023/63-la-api-application-programming-interface/README.md) |
| mouredev / 2023 | [64-parametros-url](src/exercises/mouredev/2023/64-parametros-url/index.js) | 🟢 Fácil | ❌ | [README](src/exercises/mouredev/2023/64-parametros-url/README.md) |
| mouredev / 2023 | [65-viernes-13](src/exercises/mouredev/2023/65-viernes-13/index.js) | 🟢 Fácil | ❌ | [README](src/exercises/mouredev/2023/65-viernes-13/README.md) |
| mouredev / 2023 | [66-adivina-la-palabra](src/exercises/mouredev/2023/66-adivina-la-palabra/index.js) | 🟢 Fácil | ❌ | [README](src/exercises/mouredev/2023/66-adivina-la-palabra/README.md) |
| mouredev / 2023 | [67-octal-y-hexadecimal](src/exercises/mouredev/2023/67-octal-y-hexadecimal/index.js) | 🟢 Fácil | ❌ | [README](src/exercises/mouredev/2023/67-octal-y-hexadecimal/README.md) |
| mouredev / 2023 | [68-aurebesh](src/exercises/mouredev/2023/68-aurebesh/index.js) | 🟢 Fácil | ❌ | [README](src/exercises/mouredev/2023/68-aurebesh/README.md) |
| mouredev / 2023 | [69-la-escalera](src/exercises/mouredev/2023/69-la-escalera/index.js) | 🟡 Medio | ❌ | [README](src/exercises/mouredev/2023/69-la-escalera/README.md) |
| mouredev / 2023 | [70-git-y-github](src/exercises/mouredev/2023/70-git-y-github/index.js) | 🔴 Difícil | ❌ | [README](src/exercises/mouredev/2023/70-git-y-github/README.md) |
| mouredev / 2023 | [71-web-scraping](src/exercises/mouredev/2023/71-web-scraping/index.js) | 🔴 Difícil | ❌ | [README](src/exercises/mouredev/2023/71-web-scraping/README.md) |
| mouredev / 2023 | [72-analisis-de-texto](src/exercises/mouredev/2023/72-analisis-de-texto/index.js) | 🟡 Medio | ❌ | [README](src/exercises/mouredev/2023/72-analisis-de-texto/README.md) |
| mouredev / 2023 | [73-la-trifuerza](src/exercises/mouredev/2023/73-la-trifuerza/index.js) | 🟡 Medio | ❌ | [README](src/exercises/mouredev/2023/73-la-trifuerza/README.md) |
| mouredev / 2023 | [74-numeros-primos-gemelos](src/exercises/mouredev/2023/74-numeros-primos-gemelos/index.js) | 🟡 Medio | ❌ | [README](src/exercises/mouredev/2023/74-numeros-primos-gemelos/README.md) |
| mouredev / 2023 | [75-la-espiral](src/exercises/mouredev/2023/75-la-espiral/index.js) | 🟡 Medio | ❌ | [README](src/exercises/mouredev/2023/75-la-espiral/README.md) |
| mouredev / 2023 | [76-la-base-de-datos](src/exercises/mouredev/2023/76-la-base-de-datos/index.js) | 🟡 Medio | ❌ | [README](src/exercises/mouredev/2023/76-la-base-de-datos/README.md) |
| mouredev / 2023 | [77-cifrado-cesar](src/exercises/mouredev/2023/77-cifrado-cesar/index.js) | 🟢 Fácil | ❌ | [README](src/exercises/mouredev/2023/77-cifrado-cesar/README.md) |
| mouredev / 2023 | [78-el-codigo-konami](src/exercises/mouredev/2023/78-el-codigo-konami/index.js) | 🟡 Medio | ❌ | [README](src/exercises/mouredev/2023/78-el-codigo-konami/README.md) |
| mouredev / 2023 | [79-testing](src/exercises/mouredev/2023/79-testing/index.js) | 🟡 Medio | ❌ | [README](src/exercises/mouredev/2023/79-testing/README.md) |
| mouredev / 2023 | [80-cuenta-atras](src/exercises/mouredev/2023/80-cuenta-atras/index.js) | 🟡 Medio | ❌ | [README](src/exercises/mouredev/2023/80-cuenta-atras/README.md) |
| mouredev / 2023 | [81-expresion-matematica](src/exercises/mouredev/2023/81-expresion-matematica/index.js) | 🟡 Medio | ❌ | [README](src/exercises/mouredev/2023/81-expresion-matematica/README.md) |
| mouredev / 2023 | [82-el-caracter-infiltrado](src/exercises/mouredev/2023/82-el-caracter-infiltrado/index.js) | 🟢 Fácil | ❌ | [README](src/exercises/mouredev/2023/82-el-caracter-infiltrado/README.md) |
| mouredev / 2023 | [83-el-teclado-t9](src/exercises/mouredev/2023/83-el-teclado-t9/index.js) | 🟡 Medio | ❌ | [README](src/exercises/mouredev/2023/83-el-teclado-t9/README.md) |
| mouredev / 2023 | [84-el-abaco](src/exercises/mouredev/2023/84-el-abaco/index.js) | 🟢 Fácil | ❌ | [README](src/exercises/mouredev/2023/84-el-abaco/README.md) |
| mouredev / 2023 | [85-la-columna-de-excel](src/exercises/mouredev/2023/85-la-columna-de-excel/index.js) | 🟡 Medio | ❌ | [README](src/exercises/mouredev/2023/85-la-columna-de-excel/README.md) |
| mouredev / 2023 | [86-tetris](src/exercises/mouredev/2023/86-tetris/index.js) | 🟡 Medio | ❌ | [README](src/exercises/mouredev/2023/86-tetris/README.md) |
| mouredev / 2023 | [87-txt](src/exercises/mouredev/2023/87-txt/index.js) | 🟡 Medio | ❌ | [README](src/exercises/mouredev/2023/87-txt/README.md) |
| mouredev / 2023 | [88-primeros-pasos](src/exercises/mouredev/2023/88-primeros-pasos/index.js) | 🟢 Fácil | ❌ | [README](src/exercises/mouredev/2023/88-primeros-pasos/README.md) |
| mouredev / 2023 | [89-permutaciones](src/exercises/mouredev/2023/89-permutaciones/index.js) | 🟡 Medio | ❌ | [README](src/exercises/mouredev/2023/89-permutaciones/README.md) |
| mouredev / 2023 | [90-colores-hex-y-rgb](src/exercises/mouredev/2023/90-colores-hex-y-rgb/index.js) | 🟡 Medio | ❌ | [README](src/exercises/mouredev/2023/90-colores-hex-y-rgb/README.md) |
| mouredev / 2023 | [91-las-sumas](src/exercises/mouredev/2023/91-las-sumas/index.js) | 🟡 Medio | ❌ | [README](src/exercises/mouredev/2023/91-las-sumas/README.md) |
| mouredev / 2023 | [92-triples-pitagoricos](src/exercises/mouredev/2023/92-triples-pitagoricos/index.js) | 🟡 Medio | ❌ | [README](src/exercises/mouredev/2023/92-triples-pitagoricos/README.md) |
| mouredev / 2023 | [93-tabla-de-multiplicar](src/exercises/mouredev/2023/93-tabla-de-multiplicar/index.js) | 🟢 Fácil | ❌ | [README](src/exercises/mouredev/2023/93-tabla-de-multiplicar/README.md) |
| mouredev / 2023 | [94-la-casa-encantada](src/exercises/mouredev/2023/94-la-casa-encantada/index.js) | 🔴 Difícil | ❌ | [README](src/exercises/mouredev/2023/94-la-casa-encantada/README.md) |
| mouredev / 2023 | [95-punto-de-encuentro](src/exercises/mouredev/2023/95-punto-de-encuentro/index.js) | 🔴 Difícil | ❌ | [README](src/exercises/mouredev/2023/95-punto-de-encuentro/README.md) |
| mouredev / 2023 | [96-simulador-de-clima](src/exercises/mouredev/2023/96-simulador-de-clima/index.js) | 🟢 Fácil | ❌ | [README](src/exercises/mouredev/2023/96-simulador-de-clima/README.md) |
| mouredev / 2023 | [97-adivinanzas-matematicas](src/exercises/mouredev/2023/97-adivinanzas-matematicas/index.js) | 🟡 Medio | ❌ | [README](src/exercises/mouredev/2023/97-adivinanzas-matematicas/README.md) |
| mouredev / 2023 | [98-el-calendario-de-adeviento-2023](src/exercises/mouredev/2023/98-el-calendario-de-adeviento-2023/index.js) | 🟢 Fácil | ❌ | [README](src/exercises/mouredev/2023/98-el-calendario-de-adeviento-2023/README.md) |
| mouredev / 2023 | [99-la-carrera-de-coches](src/exercises/mouredev/2023/99-la-carrera-de-coches/index.js) | 🟡 Medio | ❌ | [README](src/exercises/mouredev/2023/99-la-carrera-de-coches/README.md) |
| mouredev / 2023 | [100-la-palabra-de-100-puntos](src/exercises/mouredev/2023/100-la-palabra-de-100-puntos/index.js) | 🟢 Fácil | ❌ | [README](src/exercises/mouredev/2023/100-la-palabra-de-100-puntos/README.md) |
| mouredev / 2023 | [101-el-ranking](src/exercises/mouredev/2023/101-el-ranking/index.js) | 🔴 Difícil | ❌ | [README](src/exercises/mouredev/2023/101-el-ranking/README.md) |

<!-- EJERCICIOS:END -->