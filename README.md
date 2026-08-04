# Kzajo — Sitio web (Fase 1)

Sitio web de Inversiones Kzajo S.A.S. (distribución autorizada Maxter & Petromil, transporte de
carga terrestre). Next.js (App Router) + TypeScript + Tailwind CSS v4 + Supabase.

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). Sin credenciales de Supabase, el catálogo
muestra datos de ejemplo (ver banner en `/catalogo`).

## Conectar Supabase (catálogo real)

1. Crea un proyecto en [supabase.com](https://supabase.com).
2. Corre `supabase/schema.sql` en el SQL Editor del proyecto (crea tablas, políticas RLS y datos
   de ejemplo).
3. Copia `.env.local.example` a `.env.local` y completa `NEXT_PUBLIC_SUPABASE_URL` y
   `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Project Settings → API).
4. Reemplaza los productos de ejemplo del `schema.sql` por el catálogo real de Maxter/Petromil.

## Pendiente para salir a producción

- Logo real (hoy `public/logo.svg` es un placeholder).
- Catálogo real de productos con fotos y fichas técnicas.
- Enlaces reales de redes sociales (`src/lib/site.ts`, marcados con `TODO`).
- Decidir hosting/dominio y desplegar.

## Comandos

```bash
npm run dev      # servidor de desarrollo
npm run build    # build de producción
npm run lint     # eslint
```
