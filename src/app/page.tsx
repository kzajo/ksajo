import Image from "next/image";
import Link from "next/link";
import { CountUp, Entrance, EntranceItem, ScrollReveal } from "@/components/motion";
import { ProductCard } from "@/components/ProductCard";
import { BrandSwitcher } from "@/components/BrandSwitcher";
import { ClientsMarquee } from "@/components/ClientsMarquee";
import { getProducts } from "@/lib/products";
import { SITE } from "@/lib/site";

const STATS = [
  { value: 11000, prefix: "", suffix: "+", label: "galones/mes", format: true },
  { value: 80, prefix: "", suffix: "+", label: "clientes", format: false },
  { value: 20, prefix: "", suffix: "+", label: "años", format: false },
  { value: 1, prefix: "#", suffix: "", label: "Norte Santander", format: false },
] as const;

const SERVICES = [
  {
    num: "01",
    title: "Motores",
    body: "API CJ-4, CI-4 para motor a diésel y gasolina.",
    gradient: "linear-gradient(135deg, #FFCE3C 0%, #E29200 100%)",
    image: "/service-motores.webp",
    imagePosition: "left center",
  },
  {
    num: "02",
    title: "Transmisiones",
    body: "Cajas manuales, automáticas y diferenciales.",
    gradient: "linear-gradient(135deg, #4F8FE8 0%, #123C7C 100%)",
    image: "/service-transmisiones.png",
    imagePosition: "center 35%",
  },
  {
    num: "03",
    title: "Hidráulicos",
    body: "ISO 68 e ISO 46 para maquinaria pesada.",
    gradient: "linear-gradient(135deg, #F0524A 0%, #B91C2C 100%)",
    image: "/service-hidraulicos.png",
    imagePosition: "center 40%",
  },
] as const;

export const revalidate = 300;

export default async function HomePage() {
  const featured = await getProducts({ limit: 3 });

  return (
    <>
      <section className="relative min-h-[420px] overflow-hidden border-b border-border bg-white">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[15%] hidden h-[70%] w-px md:block"
          style={{
            background: "linear-gradient(to bottom, transparent, rgba(19,28,43,0.12), transparent)",
          }}
        />

        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
          <Entrance>
            <EntranceItem>
              <h1
                className="text-3xl leading-[1.2] tracking-tight md:text-5xl"
                style={{ fontFamily: "var(--font-plus-jakarta)", fontWeight: 800, color: "#0A1628" }}
              >
                Protegemos los motores
                <br />
                que mueven <span className="colombia-wave">Colombia</span>
              </h1>
            </EntranceItem>
            <EntranceItem>
              <p className="mt-5 max-w-sm text-sm text-steel md:text-base">
                Lubricantes Maxter y Petromil para flotas de transporte, maquinaria industrial y
                vehículos en Norte de Santander.
              </p>
            </EntranceItem>
            <EntranceItem>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/catalogo"
                  className="cursor-pointer rounded-lg px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5"
                  style={{
                    background: "linear-gradient(135deg, #4FA0FF 0%, #2563EB 100%)",
                    boxShadow: "0 4px 14px rgba(37,99,235,0.35)",
                  }}
                >
                  Ver catálogo
                </Link>
                <a
                  href={SITE.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer rounded-lg border border-border px-6 py-3 text-sm font-semibold text-ink transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                >
                  Contáctenos
                </a>
              </div>
            </EntranceItem>
          </Entrance>

          <div className="relative hidden h-[280px] md:block md:h-[340px]">
            <video
              src="/hero-truck.mp4"
              poster="/hero-truck.jpg"
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
              style={{
                maskImage: "linear-gradient(to left, black 55%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to left, black 55%, transparent 100%)",
                filter: "brightness(0.92) contrast(1.05)",
              }}
            />
          </div>
        </div>
      </section>

      <section className="border-b border-white/10" style={{ background: "#1a51a4" }}>
        <div className="mx-auto grid max-w-4xl grid-cols-2 sm:grid-cols-4">
          {STATS.map((stat, i) => (
            <ScrollReveal key={stat.label} delayMs={i * 80}>
              <div
                className={`px-4 py-8 text-center ${i < STATS.length - 1 ? "border-white/10 sm:border-r" : ""}`}
              >
                <p className="font-heading text-2xl font-medium text-white md:text-3xl">
                  <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} format={stat.format} />
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-wide text-white/40">
                  {stat.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <BrandSwitcher />

      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <ScrollReveal>
            <p className="font-heading text-xs font-semibold uppercase tracking-widest text-accent-dark">
              Nuestras líneas
            </p>
            <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight text-ink md:text-3xl">
              Soluciones para cada motor
            </h2>
            <div className="mt-4 h-0.5 w-10 bg-accent" aria-hidden />
          </ScrollReveal>

          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {SERVICES.map((item, i) => (
              <ScrollReveal key={item.title} delayMs={i * 100}>
                <div className="group relative h-56 cursor-default overflow-hidden rounded-xl border border-border shadow-sm shadow-ink/5 transition-shadow duration-500 hover:shadow-xl hover:shadow-ink/20">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    style={{ objectPosition: item.imagePosition }}
                  />

                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/50"
                  />

                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-0 mix-blend-multiply transition-opacity duration-500 ease-out group-hover:opacity-90"
                    style={{ background: item.gradient }}
                  />

                  <div className="relative flex h-full flex-col justify-between p-5">
                    <div>
                      <p className="font-heading text-xs font-semibold text-white/70">
                        {item.num}
                      </p>
                      <p className="mt-2 font-heading text-lg font-bold text-white drop-shadow-sm">
                        {item.title}
                      </p>
                    </div>

                    <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr]">
                      <div className="overflow-hidden">
                        <p className="pt-2 text-sm font-medium text-white">{item.body}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <ClientsMarquee />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <ScrollReveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-heading text-2xl font-bold tracking-tight text-ink md:text-3xl">
              Productos destacados
            </h2>
            <Link
              href="/catalogo"
              className="cursor-pointer text-sm font-semibold text-accent-dark transition-colors hover:text-accent"
            >
              Ver todo el catálogo →
            </Link>
          </div>
        </ScrollReveal>

        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {featured.map((product, i) => (
            <ScrollReveal key={product.id} delayMs={i * 100}>
              <ProductCard product={product} />
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  );
}
