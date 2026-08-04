# Importador masivo de catálogo

## Cómo usarlo

1. Copia las fotos de los productos a la carpeta `scripts/import/images/`.
2. Abre `scripts/import/products.csv` en Excel/Google Sheets (o edítalo directo) y llena una fila por producto. Borra la fila de ejemplo cuando tengas tus datos reales.
3. Guarda como CSV (si usas Excel/Sheets: "Descargar como CSV").
4. Corre:

   ```bash
   npm run import:catalog
   ```

Eso sube las imágenes a Supabase Storage y crea/actualiza los productos en la base de datos. Puedes correrlo las veces que quieras — si un producto ya existe (mismo nombre), lo actualiza en vez de duplicarlo.

## Columnas del CSV

| Columna | Obligatoria | Ejemplo | Notas |
|---|---|---|---|
| `name` | Sí | `Maxter 20W-50` | Nombre del producto |
| `brand` | Sí | `maxter` o `petromil` | |
| `category` | No | `motores` | `motores`, `hidraulicos-engranajes` o `transmisiones-diferenciales` |
| `short_description` | No | Frase corta | Aparece en la tarjeta del catálogo |
| `description` | No | Párrafo largo | Aparece en la ficha del producto |
| `price` | No | `65000` | En pesos colombianos, sin puntos ni signos. Vacío = "Consultar precio" |
| `viscosidad` | No | `20W-50` | |
| `api` | No | `SN` | |
| `tipo` | No | `Mineral` | |
| `presentacion` | No | `Galón (3.78 L)` | |
| `image` | No | `maxter-20w50.jpg` | Nombre del archivo dentro de `scripts/import/images/` |

Si dejas vacía una columna, simplemente no aparece esa especificación en la ficha del producto.
