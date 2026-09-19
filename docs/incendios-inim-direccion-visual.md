# Dirección visual INIM para /incendios

## Landing analizada

Se conservan orden, títulos, copy comercial, CTA, paleta negra/cobre, bloques claros, cronología alternada y transición de sistemas por scroll en escritorio. Los cambios previos del proyecto se conservaron.

| Espacio | Diagnóstico | Decisión |
| --- | --- | --- |
| Hero, fondo a pantalla completa | Detector genérico sin identidad verificable | Fotografía arquitectónica embebida en la presentación de Previdia Max. Fondo ambiental con superposición oscura; no se atribuye la obra a ZC. |
| Ingeniería, 16:10 móvil / 4:3 escritorio | Sensor de intrusión exterior, no explica ingeniería de incendio | Fotografía editorial sobre planos. |
| Provisión, 16:10 / 4:3 | Repetía el detector del hero | Composición de Enea y EC0020, con transparencias reales, sin dibujar conexiones ni sugerir escala física. |
| Instalación y programación, 16:10 / 4:3 | Imagen genérica de alarma | Notebook con interfaz real de Previdia/STUDIO, vista completa sin cortar pantalla. |
| Puesta en marcha, 16:10 / 4:3 | Cámaras de vigilancia | App Inim Fire; pie aclara que corresponde a Previdia conectada a Cloud Fire. |
| Sistemas, vista técnica lateral | Repetía icono y descripción | Producto correspondiente a cada categoría, con transiciones existentes. En móvil, imágenes y descripciones en flujo normal para evitar un panel fijo más alto que la pantalla. |
| Proyectos | Tres imágenes genéricas repetidas | Conservadas: el PDF no acredita imágenes de P23, General Deheza ni Pringles. Requieren fotografías reales de cada obra. No se sustituyen por obras del fabricante. |
| Fabricantes | Logos de INIM, Autocall y Simplex | Sin cambios: no corresponde sustituir los otros fabricantes por producto INIM. |
| Proceso, FAQ, contacto y footer | Bloques informativos y de conversión | Sin imágenes adicionales: no aportan explicación y aumentarían la carga visual. |

## Revisión del catálogo de 260 páginas

Se extrajo el texto de todas las páginas y se revisó el inventario visual completo. Las páginas elegidas se contrastaron en tamaño legible con sus fichas y objetos embebidos.

- Páginas 4–15: empresa, fabricación, referencias internacionales, nube y app. No se trasladan referencias internacionales a los proyectos de ZC.
- 17–89: centrales. Previdia Micro es convencional; Compact y Max son direccionables; UltraVox incorpora evacuación por voz. SmartLine es convencional (74–77), SmartLight direccionable de un lazo (78–81), y SmartLoop sí aparece (82–89). Se eligieron SmartLine y Max para explicar la distinción existente sin convertir la landing en un catálogo.
- 66–73: Cloud Fire, app, Previdia/STUDIO y FireDesigner. La app está vinculada a Previdia y Cloud Fire; no se presenta como una función universal de SmartLine.
- 90–113: Enea, módulos, pulsadores, señalizadores y dispositivos compatibles de Argus/Apollo. ED100 es óptico de humo, ED200 térmico y ED300 combinado (94). La imagen de familia de la página 93 se denomina Enea, sin adjudicarle un modelo no rotulado. El EC0020 rojo es un pulsador de incendio; se excluyen las variantes de otros colores destinadas a otras funciones.
- 114–127: FireVibes inalámbrico y convencionales Iris. ID100 humo, ID200 temperatura, ID300 combinado. No se añaden afirmaciones de compatibilidad inalámbrica a la oferta existente.
- 128–151: evacuación por voz, señalización convencional y comunicador F-COM. Se selecciona un señalizador de familia de la página 143 sin adjudicarle prestaciones o certificaciones de una variante concreta.
- 152–175: aspiración FA100, detectores lineales, llama y cables térmicos. Se descartan por no existir un espacio comercial específico para esas soluciones.
- 176–195: detección de gas, ATEX y Marine. Fuera del alcance visual de esta landing; algunos equipos son de terceros distribuidos por INIM.
- 196–213: pruebas, alimentación, retención de puertas y accesorios. No se confunden instrumentos de prueba ni fuentes SmartLevel con centrales.
- 214–247: iluminación de emergencia. No se amplía el alcance comercial con luminarias.
- 248–253: BMS SmartLook y Hevoluto. No se atribuyen sus pantallas a Previdia/STUDIO.
- 254–260: notas y cierre editorial.

Se revisaron los esquemas Previdia, SmartLine y SmartLoop. Sus etiquetas y numerosos dispositivos requieren una lectura más amplia que la disponible en estas cards; no se insertan páginas completas ni se inventa un diagrama simplificado.

## Recursos publicados

Directorio: `public/images/incendios/inim/`. Todos proceden del PDF suministrado.

| Archivo WebP | Página PDF | Uso | Dimensiones finales |
| --- | ---: | --- | --- |
| inim-arquitectura-previdia | 36 | Hero | 1241 × 680 |
| inim-ingenieria-planos | 105 | Ingeniería | 1075 × 1521 |
| inim-enea-detector | 93 | Provisión | 480 × 480 |
| inim-ec0020-pulsador | 99 | Provisión, detalle secundario | 134 × 134 |
| inim-previdia-studio | 71 | Programación | 670 × 439 |
| inim-fire-app | 68 | Puesta en marcha | 414 × 840 |
| inim-smartline-central | 74 | Convencionales | 293 × 295 |
| inim-previdia-max-central | 36 | Direccionables | 304 × 400 |
| inim-em411r-modulo | 97 | Adecuaciones | 198 × 109 |
| inim-senalizador-convencional | 143 | Complementarios | 280 × 280 |

## Extracción y calidad

`scripts/extract-inim-assets.py` reproduce la extracción. `provenance.json` registra SHA-256 del PDF, página, objeto XRef, dimensiones nativas, caja de recorte, transparencia y peso para cada archivo.

Se extraen los objetos originales, no capturas ni páginas rasterizadas. Se aplica conversión de color RGB cuando corresponde y se reconstruye el alfa a partir de la máscara embebida. Sólo se retira el margen transparente sobrante, con 4 píxeles de resguardo. No se retocan marcas, pantallas ni productos, no se elimina blanco perteneciente al producto y no se generan píxeles con IA.

Productos e interfaces: WebP sin pérdida y con alfa. Fotografías: WebP calidad 90 a resolución nativa. Los diez archivos pesan 641.188 bytes en conjunto (626,2 KiB). Next Image entrega variantes adaptadas y carga diferida salvo el fondo prioritario del hero.

Los límites del PDF importan: el pulsador tiene sólo 134 px útiles y se muestra a 67 px; los otros productos pequeños se presentan como detalles, no como imágenes a pantalla completa. El hero ambiental sí usa `cover`, con recorte responsive; las imágenes de producto usan `contain` y mantienen sus proporciones. No hay upscale de los archivos.

Los originales extraídos y máscaras quedan localmente en `tmp/pdfs/inim-originals/`, fuera del directorio público. Las fotografías son referencias editoriales del catálogo, no documentación de instalaciones realizadas por ZC.

## Validación realizada

- TypeScript: `npx tsc --noEmit`, sin errores.
- `git diff --check`, sin errores de whitespace (Git informa su normalización habitual LF/CRLF).
- Los diez recursos responden HTTP 200 con `image/webp` desde el servidor local.
- Dimensiones, máscaras alfa y ausencia de upscale verificadas contra el manifiesto.
- Revisión visual en navegador a 1440 × 1000 y 390 × 844: hero, servicios y productos; sin desbordamiento horizontal en esos tamaños. Se verificaron las transiciones de sistemas en escritorio y el flujo normal en móvil.
- No se ejecutó una compilación de producción; la comprobación de render se realizó con el servidor de desarrollo existente. No se publicó el sitio.
