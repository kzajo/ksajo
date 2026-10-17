import path from "node:path";
import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  ...(isDev ? [] : [{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" }]),
  {
    // Next.js needs 'unsafe-inline' for script-src/style-src unless a per-request
    // nonce is wired up via proxy/middleware, which would force every page to
    // render dynamically (no static/ISR). Not worth that trade-off for a mostly
    // static marketing site — see node_modules/next/dist/docs/01-app/02-guides/content-security-policy.md.
    // 'unsafe-eval' is only added in dev: React uses eval() there for debugging
    // call stacks and never in production builds.
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https://*.supabase.co",
      "connect-src 'self' https://*.supabase.co",
      "font-src 'self'",
      "frame-src https://www.google.com",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  devIndicators: false,
  poweredByHeader: false,
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "*.supabase.co" }],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      // URLs del sitio viejo (WordPress/estático) que Google todavía tiene indexadas.
      // Redirigen a la categoría equivalente del catálogo nuevo en vez de dar 404.
      { source: "/hidrengra.html", destination: "/catalogo?categoria=hidraulicos-engranajes", permanent: true },
      { source: "/transdifer.html", destination: "/catalogo?categoria=transmisiones-diferenciales", permanent: true },
      // Cualquier otra página .html vieja que aparezca: al catálogo general.
      { source: "/:path*.html", destination: "/catalogo", permanent: true },
      // Rutas de WordPress hackeado (spam) que Google rastreó en el dominio viejo.
      { source: "/index.php/:path*", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
