import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';

hljs.registerLanguage('javascript', javascript);

const escapar = (t) =>
  String(t ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

/** Devuelve HTML seguro con el código resaltado. */
export function resaltar(codigo) {
  try {
    return hljs.highlight(String(codigo ?? ''), { language: 'javascript', ignoreIllegals: true }).value;
  } catch {
    return escapar(codigo);
  }
}
