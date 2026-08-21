// Importador masivo de catálogo: lee scripts/import/products.csv, sube las
// imágenes de scripts/import/images/ a Supabase Storage, y crea/actualiza los
// productos en la base de datos. Uso:
//
//   node scripts/import-catalog.mjs
//   node scripts/import-catalog.mjs ruta/a/otro-archivo.csv
//
// Llena products.csv (puedes exportar una hoja de cálculo como CSV) con estas
// columnas — solo "name" y "brand" son obligatorias:
//
//   name, brand, category, short_description, description, price,
//   viscosidad, api, tipo, presentacion, image
//
// - brand: "maxter", "petromil" o "beg"
// - category: motores | hidraulicos-engranajes | transmisiones-diferenciales |
//   gasolina | gas | grasas | industriales | motos | refrigerantes |
//   aditivos | frenos
// - price: número en COP, o vacío para "Consultar precio"
// - image: nombre del archivo dentro de scripts/import/images/ (opcional)

import { createClient } from "@supabase/supabase-js";
import { parse } from "csv-parse/sync";
import ws from "ws";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

function loadEnvLocal() {
  const envPath = path.join(ROOT, ".env.local");
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnvLocal();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = "product-images";

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error(
    "Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en .env.local",
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
  realtime: { transport: ws },
});

function slugify(text) {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function ensureBucket() {
  const { data: buckets, error } = await supabase.storage.listBuckets();
  if (error) throw error;
  if (buckets.some((b) => b.name === BUCKET)) return;
  const { error: createError } = await supabase.storage.createBucket(BUCKET, {
    public: true,
  });
  if (createError) throw createError;
  console.log(`Bucket "${BUCKET}" creado.`);
}

async function loadCategories() {
  const { data, error } = await supabase.from("categories").select("id, slug, name");
  if (error) throw error;
  const map = new Map();
  for (const cat of data) {
    map.set(cat.slug.toLowerCase(), cat.id);
    map.set(cat.name.toLowerCase(), cat.id);
  }
  return map;
}

async function uploadImage(slug, filename) {
  const filePath = path.join(ROOT, "scripts", "import", "images", filename);
  if (!existsSync(filePath)) {
    console.warn(`  ⚠ imagen no encontrada: ${filename} (se omite)`);
    return null;
  }
  const fileBuffer = readFileSync(filePath);
  const ext = path.extname(filename) || ".jpg";
  const storagePath = `${slug}/${slugify(path.basename(filename, ext))}${ext}`;

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, fileBuffer, { upsert: true, contentType: guessContentType(ext) });
  if (uploadError) {
    console.warn(`  ⚠ error subiendo ${filename}: ${uploadError.message}`);
    return null;
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(storagePath);
  return data.publicUrl;
}

function guessContentType(ext) {
  const map = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp" };
  return map[ext.toLowerCase()] ?? "application/octet-stream";
}

async function main() {
  const csvPath = process.argv[2]
    ? path.resolve(process.argv[2])
    : path.join(ROOT, "scripts", "import", "products.csv");

  if (!existsSync(csvPath)) {
    console.error(`No encontré el archivo CSV: ${csvPath}`);
    console.error("Crea scripts/import/products.csv (ver plantilla en el mismo repo).");
    process.exit(1);
  }

  await ensureBucket();
  const categories = await loadCategories();

  const rows = parse(readFileSync(csvPath, "utf8"), {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });

  let created = 0;
  let updated = 0;
  let skipped = 0;

  for (const row of rows) {
    const name = row.name?.trim();
    const brand = row.brand?.trim().toLowerCase();

    if (!name || !brand) {
      console.warn(`⚠ fila sin "name" o "brand", se omite:`, row);
      skipped++;
      continue;
    }
    if (!["maxter", "petromil", "beg"].includes(brand)) {
      console.warn(`⚠ marca inválida "${brand}" en "${name}", se omite (usa maxter, petromil o beg)`);
      skipped++;
      continue;
    }

    const slug = row.slug?.trim() || slugify(name);
    const categoryKey = row.category?.trim().toLowerCase();
    const category_id = categoryKey ? categories.get(categoryKey) ?? null : null;
    if (categoryKey && !category_id) {
      console.warn(`  ⚠ categoría no encontrada: "${row.category}" (${name} queda sin categoría)`);
    }

    const specs = {};
    if (row.viscosidad) specs["Viscosidad"] = row.viscosidad.trim();
    if (row.api) specs["API"] = row.api.trim();
    if (row.tipo) specs["Tipo"] = row.tipo.trim();
    if (row.presentacion) specs["Presentación"] = row.presentacion.trim();

    const priceRaw = row.price?.trim();
    const price = priceRaw ? Number(priceRaw.replace(/[^0-9.]/g, "")) : null;

    console.log(`→ ${name}`);

    const { data: existing } = await supabase
      .from("products")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();

    const { data: product, error: upsertError } = await supabase
      .from("products")
      .upsert(
        {
          slug,
          name,
          brand,
          category_id,
          short_description: row.short_description?.trim() || null,
          description: row.description?.trim() || null,
          specs,
          price,
          is_active: true,
        },
        { onConflict: "slug" },
      )
      .select("id")
      .single();

    if (upsertError) {
      console.error(`  ✗ error guardando "${name}": ${upsertError.message}`);
      skipped++;
      continue;
    }

    if (existing) {
      updated++;
    } else {
      created++;
    }

    const imageFilename = row.image?.trim();
    if (imageFilename) {
      const url = await uploadImage(slug, imageFilename);
      if (url) {
        await supabase.from("product_images").delete().eq("product_id", product.id);
        await supabase.from("product_images").insert({
          product_id: product.id,
          url,
          alt: name,
          sort_order: 0,
        });
        console.log(`  ✓ imagen subida: ${imageFilename}`);
      }
    }
  }

  console.log("\n— Resumen —");
  console.log(`Creados: ${created}  Actualizados: ${updated}  Omitidos: ${skipped}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
