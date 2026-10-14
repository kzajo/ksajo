import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { PromoVideoModal } from "@/components/PromoVideoModal";
import { PageTransitionProvider } from "@/components/PageTransition";
import { SITE } from "@/lib/site";
import { CartDrawer } from "@/components/CartDrawer";
import { CartProvider } from "@/lib/cart-context";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["500", "600", "700", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.shortName}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "Lubricantes y transporte de carga",
  keywords: [
    "lubricantes Cúcuta",
    "aceites para motor diésel",
    "distribuidor Maxter",
    "distribuidor Petromil",
    "aceite hidráulico",
    "aceite para transmisión",
    "aditivos y refrigerantes",
    "transporte de carga líquida",
    "Norte de Santander",
  ],
  formatDetection: { telephone: true, email: true, address: true },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    locale: "es_CO",
    type: "website",
    images: [{ url: "/hero-truck.jpg", width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: ["/hero-truck.jpg"],
  },
  // Código de Google Search Console (puede quedar vacío hasta que lo tengas).
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION },
  other: {
    "geo.region": "CO-NSA",
    "geo.placename": "Cúcuta",
    "geo.position": `${SITE.mapCoords.lat};${SITE.mapCoords.lng}`,
    ICBM: `${SITE.mapCoords.lat}, ${SITE.mapCoords.lng}`,
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: SITE.name,
  description: SITE.description,
  url: SITE.url,
  image: `${SITE.url}/hero-truck.jpg`,
  logo: `${SITE.url}/logo-white.webp`,
  telephone: SITE.phoneHref,
  email: SITE.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address,
    addressLocality: "Cúcuta",
    addressRegion: "Norte de Santander",
    addressCountry: "CO",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: SITE.mapCoords.lat,
    longitude: SITE.mapCoords.lng,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "18:00",
  },
  areaServed: { "@type": "Country", name: "Colombia" },
  sameAs: [SITE.social.instagram, SITE.social.facebook],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      data-scroll-behavior="smooth"
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <PageTransitionProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <WhatsAppFab />
            <PromoVideoModal />
            <CartDrawer />
          </CartProvider>
        </PageTransitionProvider>
      </body>
    </html>
  );
}