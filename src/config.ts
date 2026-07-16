// Configuración de contacto.
// El email se ofusca en tres capas para dificultar el scraping automático:
//   1) base64  -> no es texto plano en el bundle
//   2) entidades HTML/hex -> el string legible jamás aparece en el código fuente
//   3) se decodifica en runtime (navegador) justo antes de usarse
//
// NOTA: cualquier email en un sitio estático es, en última instancia, visible
// para quien inspeccione el DOM renderizado. Esto frenA los bots automáticos,
// que solo parsean el HTML/JS sin ejecutar la lógica de decodificación.

const EMAIL_B64 = ['bmljb2xhc2dyYWphbGVzaG95b3M=', 'QGdtYWlsLmNvbQ=='];

// Capa 2: el email como entidades (decimal + hex). El navegador las decodifica
// al renderizar; en el código fuente nunca hay texto legible.
export const EMAIL_ENTITIES =
  '&#110;&#105;&#99;&#111;&#108;&#97;&#115;&#103;&#114;&#97;&#106;&#97;&#108;&#101;&#115;&#104;&#111;&#121;&#111;&#115;&#64;&#103;&#109;&#97;&#105;&#108;&#46;&#99;&#111;&#109;';

export const CONTACT_EMAIL = EMAIL_B64.map((p) => atob(p)).join('');
