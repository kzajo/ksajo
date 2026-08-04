import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/products";
import { SITE } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE.url, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE.url}/catalogo`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE.url}/nosotros`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE.url}/contacto`, changeFrequency: "yearly", priority: 0.5 },
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE.url}/catalogo/${product.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes];
}
