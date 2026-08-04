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

1. Pide acceso al proyecto Supabase existente, o crea uno nuevo en [supabase.com](https://supabase.com)
   para tu entorno local.
2. Corre `supabase/schema.sql` en el SQL Editor del proyecto (crea tablas, políticas RLS y datos
   base).
3. Copia `.env.local.example` a `.env.local` y completa `NEXT_PUBLIC_SUPABASE_URL` y
   `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Project Settings → API). **Nunca** compartas la
   `service_role key` fuera de scripts locales — no se usa ni se debe usar en el código del sitio.

## Flujo de trabajo con Git

Convención del equipo (sin bloqueo técnico de GitHub todavía — requiere plan de pago):
nada de push directo a `main`, todo cambio entra por Pull Request.

```bash
git checkout -b nombre-descriptivo-del-cambio
# ... hacer los cambios ...
git push -u origin nombre-descriptivo-del-cambio
```

Luego abre un Pull Request hacia `main` en GitHub. Antes de abrirlo, corre localmente:

```bash
npm run lint
npm run build
```

## Pendiente

- Enlaces reales de redes sociales (`src/lib/site.ts`, marcados con `TODO`).
- Lista de precios real para el catálogo (hoy varios productos muestran "Consultar precio").
- Fotos para los productos que aún no tienen imagen propia en el sitio de Maxter.
- Decidir hosting/dominio y desplegar.

## Comandos

```bash
npm run dev      # servidor de desarrollo
npm run build    # build de producción
npm run lint     # eslint
```
