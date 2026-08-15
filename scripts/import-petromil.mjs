// Importa el catálogo real de Petromil desde revisar/ (fichas técnicas + fotos)
// a Supabase: crea/actualiza productos, sube fotos a product-images y fichas
// técnicas a product-documents. Basado en datos verificados manualmente leyendo
// cada PDF de scripts/../revisar/PETROMIL-FICHAS TECNICAS.
//
// Uso: node scripts/import-petromil.mjs

import { createClient } from "@supabase/supabase-js";
import ws from "ws";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const FICHAS_DIR = path.join(ROOT, "revisar", "PETROMIL-FICHAS TECNICAS", "PETROMIL");
const FOTOS_DIR = path.join(ROOT, "revisar", "PRESENTACIONES PETROMIL", "PRESENTACIONES PETROMIL");

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

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
  realtime: { transport: ws },
});

const IMAGES_BUCKET = "product-images";
const DOCS_BUCKET = "product-documents";

async function ensureBucket(name, opts) {
  const { data: buckets, error } = await supabase.storage.listBuckets();
  if (error) throw error;
  if (buckets.some((b) => b.name === name)) return;
  const { error: createError } = await supabase.storage.createBucket(name, opts);
  if (createError) throw createError;
  console.log(`Bucket "${name}" creado.`);
}

async function loadCategories() {
  const { data, error } = await supabase.from("categories").select("id, slug");
  if (error) throw error;
  return new Map(data.map((c) => [c.slug, c.id]));
}

async function uploadFile(bucket, storagePath, absPath, contentType) {
  if (!existsSync(absPath)) {
    console.warn(`  ⚠ no encontrado: ${absPath}`);
    return null;
  }
  const buffer = readFileSync(absPath);
  const { error } = await supabase.storage.from(bucket).upload(storagePath, buffer, {
    upsert: true,
    contentType,
  });
  if (error) {
    console.warn(`  ⚠ error subiendo ${storagePath}: ${error.message}`);
    return null;
  }
  const { data } = supabase.storage.from(bucket).getPublicUrl(storagePath);
  return data.publicUrl;
}

// slug -> array de fotos (relativas a FOTOS_DIR), y slug -> ficha técnica (relativa a FICHAS_DIR)
const PRODUCTS = [
  {
    slug: "petromil-diesel-sae-40",
    name: "Petromil Diésel SAE 40 API CF/CF-2/SF",
    category: "motores",
    short_description: "Monógrado para motores diésel de trabajo pesado.",
    description:
      "Aceite monógrado API CF, CF-2 recomendado para motores diésel que requieren esta especificación. Protege durante el trabajo pesado, controla la formación de hollín y depósitos, y protege contra la herrumbre, la corrosión y el desgaste. También cumple API SF para motores a gasolina.",
    specs: { Viscosidad: "SAE 40", API: "CF, CF-2 / SF", Tipo: "Monógrado" },
    photos: [],
    ficha: "PETROMIL DIESEL MONOGRADOS  SAE  40 Y 50.pdf",
  },
  {
    slug: "petromil-diesel-sae-50",
    name: "Petromil Diésel SAE 50 API CF/CF-2/SF",
    category: "motores",
    short_description: "Monógrado para motores diésel de trabajo pesado.",
    description:
      "Aceite monógrado API CF, CF-2 recomendado para motores diésel que requieren esta especificación. Protege durante el trabajo pesado, controla la formación de hollín y depósitos, y protege contra la herrumbre, la corrosión y el desgaste. También cumple API SF para motores a gasolina.",
    specs: { Viscosidad: "SAE 50", API: "CF, CF-2 / SF", Tipo: "Monógrado" },
    photos: ["Pesados/50  CF-SF (Cuarto).png", "Pesados/50  CF-SF (Galon).png", "Pesados/50 CF-SF (Balde).png"],
    ficha: "PETROMIL DIESEL MONOGRADOS  SAE  40 Y 50.pdf",
  },
  {
    slug: "petromil-diesel-15w40-ci4",
    name: "Petromil Diésel SAE 15W-40 API CI-4/SL",
    category: "motores",
    short_description: "Multigrado para motores diésel de servicio pesado.",
    description:
      "Aceite multigrado API CI-4/SL para motores diésel de servicio pesado, formulado con bases de alta calidad y aditivos de tecnología moderna.",
    specs: { Viscosidad: "SAE 15W-40", API: "CI-4 / SL", Tipo: "Multigrado" },
    photos: ["Pesados/15W-40 CI-4 (Cuarto)-6.png", "Pesados/15W-40 CI-4 (Galon)-6.png"],
    ficha: "PETROMIL DIESEL SAE 15W40 API CI4-SL.pdf",
  },
  {
    slug: "petromil-diesel-15w40-ck4",
    name: "Petromil Diésel SAE 15W-40 API CK-4/SN",
    category: "motores",
    short_description: "Multigrado de última generación para motores diésel modernos.",
    description:
      "Aceite multigrado API CK-4/SN, la especificación diésel más reciente, para motores modernos que requieren mayor control de hollín y mejor eficiencia de combustible.",
    specs: { Viscosidad: "SAE 15W-40", API: "CK-4 / SN", Tipo: "Multigrado" },
    photos: ["Pesados/15W-40 CK-4 (Cuarto)-2.png", "Pesados/15W-40 CK-4 (Galon)-2.png"],
    ficha: "PETROMIL DIESEL SAE 15W40 API CK4-SN.pdf",
  },
  {
    slug: "petromil-diesel-25w50-alto-kilometraje",
    name: "Petromil Diésel Alto Kilometraje SAE 25W-50 API CF/SG",
    category: "motores",
    short_description: "Para motores diésel de alto kilometraje.",
    description:
      "Aceite SAE 25W-50 API CF/SG formulado para motores diésel de alto kilometraje que requieren mayor viscosidad de operación.",
    specs: { Viscosidad: "SAE 25W-50", API: "CF / SG", Tipo: "Alto kilometraje" },
    photos: ["Pesados/25w50 (Cuarto).png", "Pesados/25w50 (Galon)-2.png"],
    ficha: "PETROMIL DIESEL SAE 25W-50 API CF-SG.pdf",
  },
  {
    slug: "petromil-gasolina-15w-30",
    name: "Petromil Gasolina SAE 10W-30 API SN",
    category: "gasolina",
    short_description: "Para motores a gasolina.",
    description:
      "Aceite SAE 10W-30 API SN para motores a gasolina, formulado con bases lubricantes de alta calidad y aditivos de tecnología moderna.",
    specs: { Viscosidad: "SAE 10W-30", API: "SN" },
    photos: ["Livianos/10W30 (Galon).png"],
    ficha: "GASOLINA SAE 10W-30 API SN.pdf",
  },
  {
    slug: "petromil-2t-jaso-fb",
    name: "Petromil 2T JASO FB / API TC",
    category: "motos",
    short_description: "Para motores de motocicleta de dos tiempos enfriados por aire.",
    description:
      "Aceite para motores de dos tiempos refrigerados por aire, formulado con bases parafínicas de alta calidad. Cumple la norma JASO FB y el nivel de calidad API TC.",
    specs: { API: "JASO FB / TC", Tipo: "2 tiempos" },
    photos: ["Motos y Fuera de Borda/2T JASO FB (Cuarto)-6.png"],
    ficha: "PETROMIL 2T JASO FB.pdf",
  },
  {
    slug: "petromil-2t-fuera-de-borda-tcw3",
    name: "Petromil 2T Fuera de Borda TC-W3",
    category: "motos",
    short_description: "Para motores fuera de borda de dos tiempos refrigerados por agua.",
    description:
      "Aceite para motores de dos tiempos refrigerados por agua (fuera de borda), formulado para cumplir la especificación TC-W3.",
    specs: { API: "TC-W3", Tipo: "2 tiempos, fuera de borda" },
    photos: ["Motos y Fuera de Borda/2T TC-W3 (Cuarto)-2.png", "Motos y Fuera de Borda/2T TC-W3 (Galon)-2.png"],
    ficha: "PETROMIL 2T FUERA DE BORDA TCW-3.pdf",
  },
  {
    slug: "petromil-4t-20w50",
    name: "Petromil 4T SAE 20W-50 JASO MA-2/API SL",
    category: "motos",
    short_description: "Máximo nivel de calidad para motocicletas de cuatro tiempos.",
    description:
      "Aceite SAE 20W-50 para motores de motocicleta de cuatro tiempos, formulado con bases parafínicas y aditivos de control de fricción para embrague húmedo. Cumple la norma JASO T-903:2006 y el nivel de calidad API SL — el máximo nivel de calidad existente para estos motores.",
    specs: { Viscosidad: "SAE 20W-50", API: "JASO MA-2 / SL", Tipo: "4 tiempos" },
    photos: ["Motos y Fuera de Borda/4T 20W-50 (Cuarto)-3.png"],
    ficha: "PETROMIL 4T SAE 20W50 JASO MA2 API SL.pdf",
  },
  {
    slug: "petromil-atf-dexron-ii",
    name: "Petromil ATF Dexron II",
    category: "transmisiones-diferenciales",
    short_description: "Fluido para transmisiones automáticas de vehículos livianos.",
    description:
      "Fluido hidráulico para cajas y transmisiones automáticas de vehículos livianos que requieran el nivel de calidad Dexron II. También recomendado para sistemas hidráulicos, bombas de pistón y compresores de tornillo.",
    specs: { API: "Dexron II", Tipo: "ATF" },
    photos: ["Transmisiones & Engranajes/ATF DEX II (Galon).png"],
    ficha: "PETROMIL ATF DX II.pdf",
  },
  {
    slug: "petromil-atf-dexron-iii",
    name: "Petromil ATF Dexron III",
    category: "transmisiones-diferenciales",
    short_description: "Fluido para transmisiones automáticas modernas.",
    description:
      "Fluido hidráulico para transmisiones automáticas modernas que requieran el nivel de calidad Dexron III. Producido con bases parafínicas del Grupo II y aditivos de alta tecnología.",
    specs: { API: "Dexron III", Tipo: "ATF" },
    photos: [],
    ficha: "PETROMIL ATF DX III.pdf",
  },
  {
    slug: "petromil-transmisiones-80w90",
    name: "Petromil Transmisiones SAE 80W-90 API GL-5",
    category: "transmisiones-diferenciales",
    short_description: "Para transmisiones y diferenciales de servicio pesado.",
    description:
      "Lubricante para engranajes API GL-5, para transmisiones manuales y diferenciales de servicio pesado.",
    specs: { Viscosidad: "SAE 80W-90", API: "GL-5" },
    photos: [
      "Transmisiones & Engranajes/TRANSMISION 80W-90 (Balde).png",
      "Transmisiones & Engranajes/TRANSMISION 80W-90 (Cuarto)-3.png",
      "Transmisiones & Engranajes/TRANSMISION 80W-90 (Galon).png",
    ],
    ficha: "PETROMIL TRANSMISIONES 80W90 Y 85W140 API GL-5 1.pdf",
  },
  {
    slug: "petromil-transmisiones-85w140",
    name: "Petromil Transmisiones SAE 85W-140 API GL-5",
    category: "transmisiones-diferenciales",
    short_description: "Para transmisiones y diferenciales de servicio pesado.",
    description:
      "Lubricante para engranajes API GL-5, para transmisiones manuales y diferenciales de servicio pesado que requieren mayor viscosidad.",
    specs: { Viscosidad: "SAE 85W-140", API: "GL-5" },
    photos: [
      "Transmisiones & Engranajes/TRANSMISION 85W-140 (Balde)-6.png",
      "Transmisiones & Engranajes/TRANSMISION 85W-140 (Cuarto)-3.png",
      "Transmisiones & Engranajes/TRANSMISION 85W-140 (Galon).png",
    ],
    ficha: "PETROMIL TRANSMISIONES 80W90 Y 85W140 API GL-5 1.pdf",
  },
  {
    slug: "petromil-hidraulico-32",
    name: "Petromil Hidráulico AW ISO 32",
    category: "hidraulicos-engranajes",
    short_description: "Fluido antidesgaste para sistemas hidráulicos.",
    description: "Fluido hidráulico antidesgaste (AW) ISO 32 para sistemas hidráulicos industriales.",
    specs: { Viscosidad: "ISO 32", Tipo: "Antidesgaste (AW)" },
    photos: [],
    ficha: "PETROMIL HIDRAULICO AW ISO 32_ 46_ 68.pdf",
  },
  {
    slug: "petromil-hidraulico-46",
    name: "Petromil Hidráulico AW 46",
    category: "hidraulicos-engranajes",
    short_description: "Fluido antidesgaste para sistemas hidráulicos.",
    description: "Fluido hidráulico antidesgaste (AW) ISO 46 para sistemas hidráulicos industriales.",
    specs: { Viscosidad: "ISO 46", Tipo: "Antidesgaste (AW)" },
    photos: [],
    ficha: "PETROMIL HIDRAULICO AW ISO 32_ 46_ 68.pdf",
  },
  {
    slug: "petromil-hidraulico-68",
    name: "Petromil Hidráulico AW ISO 68",
    category: "hidraulicos-engranajes",
    short_description: "Fluido antidesgaste para sistemas hidráulicos.",
    description: "Fluido hidráulico antidesgaste (AW) ISO 68 para sistemas hidráulicos industriales.",
    specs: { Viscosidad: "ISO 68", Tipo: "Antidesgaste (AW)" },
    photos: ["Hidraulicos/AW ISO 68 (Cuarto)-4.png", "Hidraulicos/AW ISO 68 (Galon).png"],
    ficha: "PETROMIL HIDRAULICO AW ISO 32_ 46_ 68.pdf",
  },
  {
    slug: "petromil-grasa-copa-calcio",
    name: "Petromil Grasa Copa Calcio",
    category: "grasas",
    short_description: "Grasa multiusos de calcio NLGI 2.5.",
    description: "Grasa a base de jabón de calcio, NLGI 2.5, color rojo, para lubricación multiusos.",
    specs: { Tipo: "Calcio", NLGI: "2.5" },
    photos: ["Grasas/GRASA COPA CALCIO (Libra)-2.png"],
    ficha: "PETROMIL GRASA COPA CALCIO.pdf",
  },
  {
    slug: "petromil-grasa-litio-ep2",
    name: "Petromil Grasa Multiusos de Litio EP2",
    category: "grasas",
    short_description: "Grasa multiusos de litio, extrema presión, NLGI 2.",
    description: "Grasa a base de jabón de litio con aditivos de extrema presión (EP), NLGI 2, para lubricación multiusos.",
    specs: { Tipo: "Litio EP", NLGI: "2" },
    photos: ["Grasas/GRASA DE LITIO (Libra)-2.png"],
    ficha: "PETROMIL GRASA MULTIUSOS DE LITIO EP2.pdf",
  },
  {
    slug: "petromil-larga-vida-50-50",
    name: "Petromil Larga Vida 50/50",
    category: "refrigerantes",
    short_description: "Refrigerante prediluido para sistemas de enfriamiento.",
    description: "Refrigerante a base de monoetilenglicol, prediluido al 50%, listo para usar en sistemas de enfriamiento.",
    specs: { Tipo: "Monoetilenglicol prediluido 50/50" },
    photos: [],
    ficha: "FT 032  FICHA TECNICA LARGA VIDA PETROMIL.pdf",
  },
];

function slugifyFile(name) {
  return name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function main() {
  await ensureBucket(IMAGES_BUCKET, { public: true });
  await ensureBucket(DOCS_BUCKET, { public: true });
  const categories = await loadCategories();

  let created = 0;
  let updated = 0;

  for (const p of PRODUCTS) {
    console.log(`→ ${p.name}`);
    const category_id = categories.get(p.category) ?? null;
    if (!category_id) console.warn(`  ⚠ categoría no encontrada: ${p.category}`);

    const { data: existing } = await supabase.from("products").select("id").eq("slug", p.slug).maybeSingle();

    // Ficha técnica: subir una vez, reusar URL para variantes que comparten PDF.
    let datasheet_url = null;
    if (p.ficha) {
      const fichaPath = path.join(FICHAS_DIR, p.ficha);
      const storagePath = `${p.slug}/ficha-tecnica.pdf`;
      datasheet_url = await uploadFile(DOCS_BUCKET, storagePath, fichaPath, "application/pdf");
    }

    const { data: product, error: upsertError } = await supabase
      .from("products")
      .upsert(
        {
          slug: p.slug,
          name: p.name,
          brand: "petromil",
          category_id,
          short_description: p.short_description,
          description: p.description,
          specs: p.specs,
          price: null,
          datasheet_url,
          is_active: true,
        },
        { onConflict: "slug" },
      )
      .select("id")
      .single();

    if (upsertError) {
      console.error(`  ✗ error: ${upsertError.message}`);
      continue;
    }
    existing ? updated++ : created++;

    if (p.photos.length > 0) {
      await supabase.from("product_images").delete().eq("product_id", product.id);
      for (let i = 0; i < p.photos.length; i++) {
        const rel = p.photos[i];
        const absPath = path.join(FOTOS_DIR, rel);
        const ext = path.extname(rel);
        const storagePath = `${p.slug}/${slugifyFile(path.basename(rel, ext))}${ext}`;
        const url = await uploadFile(IMAGES_BUCKET, storagePath, absPath, "image/png");
        if (url) {
          await supabase.from("product_images").insert({
            product_id: product.id,
            url,
            alt: p.name,
            sort_order: i,
          });
          console.log(`  ✓ foto: ${rel}`);
        }
      }
    }
    if (datasheet_url) console.log(`  ✓ ficha técnica subida`);
  }

  console.log(`\n— Resumen — Creados: ${created}  Actualizados: ${updated}  Total: ${PRODUCTS.length}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
