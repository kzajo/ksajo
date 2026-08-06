-- Kzajo — Fase 1: esquema del catálogo dinámico
-- Ejecutar en el SQL Editor de Supabase una vez creado el proyecto.

create extension if not exists "pgcrypto";

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  brand text not null check (brand in ('maxter', 'petromil')),
  category_id uuid references categories (id) on delete set null,
  short_description text,
  description text,
  specs jsonb not null default '{}'::jsonb,
  -- Precio en COP. NULL = "Consultar precio".
  price numeric(12, 2),
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists products_category_id_idx on products (category_id);
create index if not exists products_brand_idx on products (brand);
create index if not exists products_is_active_idx on products (is_active);

create table if not exists product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products (id) on delete cascade,
  url text not null,
  alt text,
  sort_order int not null default 0
);

create index if not exists product_images_product_id_idx on product_images (product_id);

create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  message text not null,
  created_at timestamptz not null default now()
);

-- Row Level Security: lectura pública solo de catálogo activo.
-- La escritura de productos se restringe a roles internos (se define en la Fase 3).
alter table categories enable row level security;
alter table products enable row level security;
alter table product_images enable row level security;
alter table contact_messages enable row level security;

create policy "categories_public_read" on categories
  for select using (true);

create policy "products_public_read" on products
  for select using (is_active = true);

create policy "product_images_public_read" on product_images
  for select using (
    exists (
      select 1 from products
      where products.id = product_images.product_id
      and products.is_active = true
    )
  );

create policy "contact_messages_public_insert" on contact_messages
  for insert with check (true);

-- Categorías reales de Kzajo (tomadas del letrero de su punto de venta y del catálogo completo):
insert into categories (slug, name, description, sort_order) values
  ('motores', 'Motores', 'Lubricantes para motores a diésel y gasolina', 1),
  ('hidraulicos-engranajes', 'Hidráulicos y Engranajes', 'Aceites hidráulicos y de engranajes para equipo industrial y minería', 2),
  ('transmisiones-diferenciales', 'Transmisiones y Diferenciales', 'Lubricantes para transmisiones y diferenciales de servicio pesado', 3),
  ('gasolina', 'Gasolina', 'Aceites minerales, semisintéticos y sintéticos para motores a gasolina', 4),
  ('gas', 'Gas', 'Lubricantes para motores que operan con gas natural vehicular (GNV)', 5),
  ('grasas', 'Grasas', 'Grasas multipropósito y de litio para rodamientos, chasis y uso industrial', 6),
  ('industriales', 'Industriales', 'Lubricantes para equipo y maquinaria de uso industrial', 7),
  ('motos', 'Motos', 'Aceites 4T y 2T para motocicletas', 8),
  ('refrigerantes', 'Refrigerantes', 'Refrigerantes y anticongelantes para sistemas de enfriamiento', 9)
on conflict (slug) do nothing;

-- Catálogo real Maxter (nombre, API y precio confirmados por el cliente;
-- verificar/actualizar precios periódicamente, cambian con el tiempo).
insert into products (slug, name, brand, category_id, short_description, description, specs, price, is_active)
select v.slug, v.name, 'maxter', (select id from categories where slug = v.category_slug),
       v.short_description, v.description, v.specs::jsonb, v.price, true
from (values
  ('maxter-5w30-sintetico', 'Maxter 5W-30 Sintético', 'motores',
   '100% sintético, máximo rendimiento para motores a gasolina.',
   'Lubricante 100% sintético de alto desempeño, formulado para maximizar la protección y el ahorro de energía en motores a gasolina modernos.',
   '{"Viscosidad": "5W-30", "Tipo": "100% Sintético", "API": "CJ-4", "Presentación": "Galón (3.78 L)"}',
   85000),
  ('maxter-15w40-avanzado', 'Maxter 15W-40 Avanzado', 'motores',
   'Tecnología con Trimoly líquido para mayor potencia y duración.',
   'Aceite para motor de servicio pesado con tecnología en aditivos avanzados (Trimoly líquido) que aporta más potencia y mayor duración del motor.',
   '{"Viscosidad": "15W-40", "Tipo": "Mineral", "API": "CJ-4/SM", "Presentación": "Galón (3.78 L)"}',
   72000),
  ('maxter-15w40-progresa', 'Maxter 15W-40 Progresa', 'motores',
   'Máxima duración y limpieza para flotas mixtas.',
   'Aceite multigrado de alto kilometraje, formulado para máxima duración y limpieza en condiciones de operación exigentes.',
   '{"Viscosidad": "15W-40", "Tipo": "Mineral", "API": "CI-4 Plus/SL", "Presentación": "Galón (3.78 L)"}',
   68000),
  ('maxter-15w40-multigrado-ci4', 'Maxter 15W-40 Multígrado CI-4', 'motores',
   'Línea completa para vehículos comerciales de carga pesada.',
   'Aceite multigrado para motores diésel de carga pesada, línea completa para vehículos comerciales.',
   '{"Viscosidad": "15W-40", "Tipo": "Mineral", "API": "CI-4", "Presentación": "Galón (3.78 L)"}',
   65000),
  ('maxter-25w50-grueso', 'Maxter 25W-50 Grueso', 'motores',
   'Menor consumo de aceite en motores con alto kilometraje.',
   'Aceite monogrado de mayor viscosidad, formulado para reducir el consumo de aceite en motores con alto kilometraje.',
   '{"Viscosidad": "25W-50", "Tipo": "Mineral", "API": "CF/SG", "Presentación": "Galón (3.78 L)"}',
   63000),
  ('maxter-40-50-monogrado', 'Maxter 40/50 Monogrado', 'motores',
   'Opción económica para motores de trabajo pesado.',
   'Aceite monogrado mineral, opción económica para motores de trabajo pesado.',
   '{"Viscosidad": "40 / 50", "Tipo": "Mineral", "API": "CF", "Presentación": "Galón (3.78 L)"}',
   60000),
  ('maxter-hidraulico-iso-68', 'Maxter Hidráulico ISO 68', 'hidraulicos-engranajes',
   'Fluido hidráulico para equipo industrial y de remoción de tierras.',
   'Fluido hidráulico con tecnología antidesgaste para equipo industrial y de remoción de tierras, incluida maquinaria de minería.',
   '{"Viscosidad": "ISO 68", "Tipo": "Antidesgaste (AW)", "Presentación": "Galón (3.78 L)"}',
   70000)
) as v(slug, name, category_slug, short_description, description, specs, price)
where not exists (select 1 from products where products.slug = v.slug);

-- Placeholders explícitos (pendientes de datos reales) para no dejar categorías vacías.
insert into products (slug, name, brand, category_id, short_description, description, specs, price, is_active)
select
  'maxter-transmision-diferencial',
  'Maxter Transmisión y Diferencial',
  'maxter',
  (select id from categories where slug = 'transmisiones-diferenciales'),
  'Tecnología en aditivos de extrema presión (dato de ejemplo).',
  'Producto de ejemplo (placeholder) — pendiente el nombre, viscosidad y precio exactos de la referencia real de transmisiones/diferenciales.',
  '{"Tipo": "Aditivos EP (extrema presión)", "Presentación": "Galón (3.78 L)"}'::jsonb,
  null,
  true
where not exists (select 1 from products where slug = 'maxter-transmision-diferencial');

insert into products (slug, name, brand, category_id, short_description, description, specs, price, is_active)
select
  'petromil-hidraulico-46',
  'Petromil Hidráulico AW 46',
  'petromil',
  (select id from categories where slug = 'hidraulicos-engranajes'),
  'Aceite hidráulico antidesgaste (dato de ejemplo).',
  'Producto de ejemplo (placeholder). Reemplazar con la ficha técnica real del producto Petromil.',
  '{"Viscosidad": "ISO 46", "Tipo": "Antidesgaste (AW)", "Presentación": "Tambor 55 gal"}'::jsonb,
  null,
  true
where not exists (select 1 from products where slug = 'petromil-hidraulico-46');

-- Ficha técnica / hoja de seguridad por producto (enlaces a PDF, opcionales).
-- Se dejan en NULL hasta que se suban los documentos reales; los botones de la
-- ficha de producto solo se muestran cuando el campo tiene un valor.
alter table products add column if not exists datasheet_url text;
alter table products add column if not exists safety_sheet_url text;

-- Corrección de datos reales tomados de https://lubricantesmaxter.com/maxter-15w-40-avanzado-api-ck-4-sn-elementor/
-- (el API real es CK-4/SN, no CJ-4/SM, y el producto se distribuye en 5 presentaciones).
update products
set specs = specs || '{"API": "CK-4/SN", "Presentación": "55 GAL, 15 GAL, 5 GAL, 1 GAL, 1/4 GAL"}'::jsonb
where slug = 'maxter-15w40-avanzado';
