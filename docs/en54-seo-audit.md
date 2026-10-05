# Auditoría SEO de EN54

Alcance: código y vista previa local. No se dispone de datos de Search Console, posiciones, búsquedas reales ni mediciones de usuarios en producción.

## Intención de búsqueda

Ajax EN54 en Córdoba, detección de incendios inalámbrica y sistemas de alarma de incendio para edificios comerciales. La página de Incendios mantiene el enfoque general de ingeniería; EN54 desarrolla la tecnología Ajax. Se conserva «Próximamente» para no prometer disponibilidad actual.

## Hallazgos y cambios

- Título sin ubicación: añadido Córdoba; marca mediante la plantilla global.
- Referencia es-AR heredada hacia Inicio: sustituida por /EN54. Canonical propio conservado.
- Texto de portada genérico: subtítulo con detección inalámbrica y Córdoba, manteniendo la composición breve.
- Imágenes de producto sin alternativa textual: nombres de modelos añadidos a alt.
- Sin estructura específica de página: JSON-LD WebPage y BreadcrumbList, referenciando WebSite global. Migas visibles coherentes.
- Poca conversión desde portada y catálogo: botones hacia #contacto, acceso a equipos y consulta flotante de WhatsApp con mensaje de EN54. En móvil el flotante muestra solo el icono y conserva etiqueta accesible.
- Sitemap, robots, enlaces desde navegación, pie e Incendios: ya estaban presentes.

## Validación y próximos pasos

Revisar título, canonical, hreflang, un único H1, JSON-LD válido, CTAs y desbordes en escritorio y móvil. La publicación no forma parte de esta modificación.

Después de publicar: inspeccionar https://zcseguridad.com/EN54 en Search Console, enviar el sitemap, comprobar indexación y canonical elegido por Google, y medir Core Web Vitals con datos reales. Analizar consultas y conversiones antes de ampliar contenido. No hay garantías de posición ni una investigación de volumen de keywords en esta auditoría.

Referencia: https://developers.google.com/search/docs/appearance/title-link — títulos descriptivos, concisos y coherentes con el contenido visible.
