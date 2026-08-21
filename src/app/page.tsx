import Image from "next/image";
import { BadgeCheck, Boxes, Droplets, Headset, Truck, Wrench } from "lucide-react";
import { CountUp, Entrance, EntranceItem, ScrollReveal } from "@/components/motion";
import { HeroSlider } from "@/components/HeroSlider";
import { DestacadosSlider } from "@/components/DestacadosSlider";
import { BrandSwitcher } from "@/components/BrandSwitcher";
import { ClientsMarquee } from "@/components/ClientsMarquee";
import { getProducts } from "@/lib/products";

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

const BENEFICIOS = [
  {
    icono: BadgeCheck,
    titulo: "Producto 100% original",
    texto: "Distribución directa de Maxter y Petromil, con respaldo y trazabilidad de cada lote.",
  },
  {
    icono: Boxes,
    titulo: "Portafolio completo",
    texto: "Motor, transmisión, diferenciales, hidráulicos, grasas y línea moto en un solo proveedor.",
  },
  {
    icono: Truck,
    titulo: "Entregas oportunas",
    texto: "Logística propia y despachos programados para talleres, flotas y almacenes.",
  },
  {
    icono: Headset,
    titulo: "Asesoría técnica",
    texto: "Recomendamos la viscosidad y especificación correcta según su motor y operación.",
  },
  {
    icono: Wrench,
    titulo: "Precio distribuidor",
    texto: "Escalas de precio por volumen para talleres, lubricentros y empresas de transporte.",
  },
  {
    icono: Droplets,
    titulo: "Todas las presentaciones",
    texto: "Desde cuarto y galón hasta baldes de 5 galones y tambores de 55 galones.",
  },
] as const;

export const revalidate = 300;

function interleaveByBrand(maxter: Awaited<ReturnType<typeof getProducts>>, petromil: Awaited<ReturnType<typeof getProducts>>) {
  const result: typeof maxter = [];
  const max = Math.max(maxter.length, petromil.length);
  for (let i = 0; i < max; i++) {
    if (maxter[i]) result.push(maxter[i]);
    if (petromil[i]) result.push(petromil[i]);
  }
  return result;
}

export default async function HomePage() {
  const [maxterProductos, petromilProductos] = await Promise.all([
    getProducts({ brand: "maxter", limit: 6 }),
    getProducts({ brand: "petromil", limit: 6 }),
  ]);

  const conFoto = (p: Awaited<ReturnType<typeof getProducts>>) =>
    p.filter((prod) => (prod.images ?? []).some((img) => img.url));

  const destacados = interleaveByBrand(conFoto(maxterProductos), conFoto(petromilProductos)).slice(0, 8);

  return (
    <>
      <HeroSlider />

      {/* Barra de indicadores — se conserva igual al diseño original */}
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
                <p className="mt-1 text-[11px] tracking-wide text-white/40 uppercase">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Marcas que distribuimos — se conserva igual al diseño original */}
      <BrandSwitcher />

      {/* Beneficios */}
      <section className="bg-canvas py-20">
        <div className="mx-auto max-w-6xl px-6">
          <ScrollReveal>
            <div className="max-w-2xl">
              <p className="text-xs font-bold tracking-[0.2em] text-accent-dark uppercase">
                Ventajas competitivas
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                Por qué comprar con Kzajo
              </h2>
            </div>
          </ScrollReveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFICIOS.map((b, i) => (
              <ScrollReveal key={b.titulo} delayMs={i * 60}>
                <div className="h-full rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/60">
                  <span className="grid size-11 place-items-center rounded-xl bg-accent/10 text-accent-dark">
                    <b.icono className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-heading text-base font-bold text-ink">{b.titulo}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-steel">{b.texto}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Nuestras líneas + Marcas aliadas — se conservan iguales al diseño original */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <ScrollReveal>
            <p className="font-heading text-xs font-semibold tracking-widest text-accent-dark uppercase">
              Nuestras líneas
            </p>
            <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight text-ink md:text-3xl">
              Soluciones para cada motor
            </h2>
            <div className="mt-4 h-0.5 w-10 bg-accent" aria-hidden="true" />
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
                      <p className="font-heading text-xs font-semibold text-white/70">{item.num}</p>
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

      {/* Productos destacados */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <ScrollReveal>
          <div className="mb-2 max-w-2xl">
            <p className="text-xs font-bold tracking-[0.2em] text-accent-dark uppercase">Más vendidos</p>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Productos destacados
            </h2>
          </div>
        </ScrollReveal>
        <Entrance className="mt-8">
          <EntranceItem>
            <DestacadosSlider productos={destacados} />
          </EntranceItem>
        </Entrance>
      </section>
    </>
  );
}
