# Landing AJAX EN54

Ruta: `/EN54`. Acceso desde la navegación, el pie y el bloque EN54 de Incendios.

La página reutiliza Navbar, Footer, Container, Section, Card, Button, el formulario de incendios y useHeroReveal. useScrollReveal encapsula las entradas reversibles y el movimiento de fotografías, con limpieza al desmontar y respeto por movimiento reducido. El formulario admite animaciones reversibles mediante una prop opcional.

Contenido adaptado del brochure español suministrado, páginas 1–8. La propuesta visual del DOCX guía portada, ventajas, aplicaciones, integración y catálogo. Se mantiene el estado «Próximamente» y se conservan las correcciones existentes de Incendios.

Los PNG originales de Ajax conservan su canal alfa. Las fotografías se extraen del brochure sin ampliar su resolución. Las portadas provienen de la página oficial; la imagen de la línea entregada por el cliente se utiliza para compartir. Fuentes y recortes: `public/images/en54/provenance.json`.

Alcance: el PDF distingue 2.000 m para Jeweller de 1.800 m para hub y repetidor. La landing lo aclara en una nota. Las baterías de 5 años corresponden a detectores y sirenas; el hub y el repetidor tienen alimentación eléctrica y reserva de 24/72 h. La certificación EN54 del pulsador se limita al modelo rojo.

Verificación: build de Next con chequeo de tipos; navegador a 320, 390, 768 y 1440 px; carga de todas las imágenes; ausencia de desborde horizontal y errores de JavaScript; preguntas desplegables; animaciones al volver arriba; contenido visible con movimiento reducido. El formulario utiliza el contacto central del sitio y genera una consulta para WhatsApp.
