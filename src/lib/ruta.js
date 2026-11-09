/* ============================================================
   Enlaces profundos: convierten la ruta interna de un ejercicio
   en un hash amigable para compartir (#/mouredev/2022/01-fizzbuzz)
   y viceversa, sin salir de la página.
   ============================================================ */

const SEGMENTO_VALIDO = /^[\w.-]+$/;
const ES_RESERVADO = (segmento) => segmento === '.' || segmento === '..';

/** './exercises/mouredev/2022/01-fizzbuzz/index.js' → '#/mouredev/2022/01-fizzbuzz' */
export function rutaAHach(ruta) {
  if (typeof ruta !== 'string') return '';

  const segmentos = ruta
    .trim()
    .replace(/^\.\//, '')
    .replace(/^\/?exercises\//, '')
    .replace(/\/index\.js$/, '')
    .split('/')
    .map((segmento) => segmento.trim())
    .filter(Boolean);

  if (!segmentos.length) return '';
  if (segmentos.some((segmento) => !SEGMENTO_VALIDO.test(segmento) || ES_RESERVADO(segmento))) {
    return '';
  }

  return `#/${segmentos.join('/')}`;
}

/** '#/mouredev/2022/01-fizzbuzz' → './exercises/mouredev/2022/01-fizzbuzz/index.js' */
export function hachARuta(hach) {
  if (typeof hach !== 'string') return '';

  const texto = hach.trim().replace(/^#/, '').replace(/^\/+/, '');
  if (!texto) return '';

  const segmentos = texto
    .split('/')
    .map((segmento) => segmento.trim())
    .filter(Boolean);

  if (!segmentos.length) return '';
  if (segmentos.some((segmento) => !SEGMENTO_VALIDO.test(segmento) || ES_RESERVADO(segmento))) {
    return '';
  }

  return `./exercises/${segmentos.join('/')}/index.js`;
}
