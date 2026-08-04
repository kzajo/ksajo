export const SITE = {
  name: "Inversiones Kzajo S.A.S.",
  shortName: "Kzajo",
  tagline: "Distribución autorizada Maxter & Petromil",
  description:
    "Distribuidor autorizado de lubricantes y aceites Maxter y Petromil para motores diésel, gasolina, sistemas hidráulicos y minería, además de transporte de carga terrestre. Cúcuta, Norte de Santander.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.kzajo.com",
  phone: "+57 318-364-5298",
  phoneHref: "+573183645298",
  phoneAlternate: "+57 607-595-6436",
  phoneAlternateHref: "+576075956436",
  whatsappHref: "https://wa.me/573183645298",
  email: "kzajo@kzajo.com",
  city: "Cúcuta, Norte de Santander, Colombia",
  address: "Centro Empresarial Bocono #7N-51, oficinas 101-102-103-104, Cúcuta",
  hours: "Lunes a viernes, 8:00 a.m. – 6:00 p.m.",
  mapCoords: { lat: 7.9071675, lng: -72.4656198 },
  // TODO: falta el Facebook real (se activa en la Fase 2).
  social: {
    instagram: "https://www.instagram.com/kzajo_/",
    facebook: "#",
  },
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
] as const;

export const BRAND_LABEL: Record<"maxter" | "petromil", string> = {
  maxter: "Maxter",
  petromil: "Petromil",
};
