"""Extract the selected catalog originals, preserving embedded alpha masks.

Usage: python scripts/extract-inim-assets.py path/to/Catalogo_FireSafety_ES_2026.pdf
Requires PyMuPDF and Pillow. No generated pixels or upscaling.
"""
import hashlib
import io
import json
from pathlib import Path
import sys

import fitz
from PIL import Image

SOURCE = Path(sys.argv[1])
ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public/images/incendios/inim"
ORIGINALS = ROOT / "tmp/pdfs/inim-originals"
# Page, embedded image object, descriptive filename, destination, identity.
SELECTION = [
    (36, 1357, "inim-arquitectura-previdia", "Hero", "Fotografía arquitectónica del catálogo; no es una obra atribuida a ZC"),
    (105, 3073, "inim-ingenieria-planos", "Proyecto e ingeniería", "Fotografía editorial de planificación"),
    (93, 2725, "inim-enea-detector", "Provisión de equipamiento", "Detector de la serie Enea; imagen de familia sin atribuir un modelo concreto"),
    (99, 2899, "inim-ec0020-pulsador", "Provisión de equipamiento", "EC0020, pulsador manual direccionable"),
    (71, 2380, "inim-previdia-studio", "Instalación y programación", "Previdia/STUDIO, software de configuración para Previdia"),
    (68, 2310, "inim-fire-app", "Puesta en marcha", "App Inim Fire; centrales Previdia conectadas a Inim Cloud Fire"),
    (74, 2517, "inim-smartline-central", "Sistemas convencionales", "Central de la familia SmartLine"),
    (36, 1362, "inim-previdia-max-central", "Sistemas direccionables", "Central modular Previdia Max"),
    (97, 2824, "inim-em411r-modulo", "Adecuaciones y ampliaciones", "EM411R, interfaz de zona convencional; render compartido con otros módulos en el catálogo"),
    (143, 3745, "inim-senalizador-convencional", "Sistemas complementarios", "Señalizador blanco convencional; imagen de familia sin atribuir variante específica"),
]

OUTPUT.mkdir(parents=True, exist_ok=True)
ORIGINALS.mkdir(parents=True, exist_ok=True)
doc = fitz.open(SOURCE)
manifest = {"source": SOURCE.name, "sha256": hashlib.sha256(SOURCE.read_bytes()).hexdigest(), "assets": []}
for page, xref, name, section, identity in SELECTION:
    image_info = next(i for i in doc[page - 1].get_images(full=True) if i[0] == xref)
    original = doc.extract_image(xref)
    (ORIGINALS / f"{name}.{original['ext']}").write_bytes(original["image"])
    pix = fitz.Pixmap(doc, xref)
    if pix.colorspace and pix.colorspace.n != 3:
        pix = fitz.Pixmap(fitz.csRGB, pix)
    if image_info[1]:
        mask = fitz.Pixmap(doc, image_info[1])
        mask.save(str(ORIGINALS / f"{name}-alpha.png"))
        pix = fitz.Pixmap(pix, mask)
    im = Image.open(io.BytesIO(pix.tobytes("png")))
    original_size = im.size
    crop = (0, 0, *im.size)
    if im.mode == "RGBA":
        bbox = im.getchannel("A").getbbox()
        if bbox:
            crop = (max(0, bbox[0]-4), max(0, bbox[1]-4), min(im.width, bbox[2]+4), min(im.height, bbox[3]+4))
            im = im.crop(crop)
    dest = OUTPUT / f"{name}.webp"
    # Lossless for products/UI; photographic assets retain original resolution.
    im.save(dest, "WEBP", lossless=im.mode == "RGBA", quality=90, method=6)
    manifest["assets"].append({"file": dest.name, "page": page, "xref": xref, "identity": identity, "section": section, "originalSize": original_size, "size": im.size, "crop": crop, "alpha": im.mode == "RGBA", "bytes": dest.stat().st_size})
(OUTPUT / "provenance.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(json.dumps(manifest, ensure_ascii=False, indent=2))
