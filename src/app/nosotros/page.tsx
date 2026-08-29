import type { Metadata } from "next";
import Link from "next/link";
import { Compass, Eye, HandshakeIcon, ShieldCheck, Target, Users } from "lucide-react";
import { ScrollReveal } from "@/components/motion";
import { SmartImage } from "@/components/SmartImage";
import { DropletIcon, FlameIcon, GaugeIcon } from "@/components/icons";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nosotros",
  description: `Conozca la historia, misión, visión y valores de ${SITE.name}, distribuidor autorizado Maxter y Petromil en Norte de Santander.`,
};

const MISSION_VISION = [
  {
    title: "Misión",
    icono: Target,
    body: "Satisfacer las necesidades de los clientes que requieren suministro de lubricantes y aceites para automotores, con productos de alta calidad, amigables con el medio ambiente y respaldados por estándares internacionales.",
  },
  {
    title: "Visión",
    icono: Eye,
    body: "Ser reconocida como la empresa líder en comercialización de lubricantes en Norte de Santander, destacada por la fortaleza de su talento humano, sus procesos innovadores y su excelencia en el servicio.",
  },
];

const VALORES = [
  {
    icono: Users,
    titulo: "Servicio",
    texto: "Atención cercana y respuesta rápida antes, durante y después de la compra.",
  },
  {
    icono: ShieldCheck,
    titulo: "Confianza",
    texto: "Producto original y trazable. Lo que ofrecemos es exactamente lo que entregamos.",
  },
  {
    icono: HandshakeIcon,
    titulo: "Compromiso",
    texto: "Cumplimos con lo pactado en precio, cantidad y tiempo de entrega.",
  },
  {
    icono: Compass,
    titulo: "Responsabilidad",
    texto: "Manejo seguro de productos y orientación sobre la disposición adecuada del aceite usado.",
  },
];

const BUSINESS_LINES = [
  { title: "Lubricantes para Motores", body: "Aceites para motor a diésel y gasolina.", Icon: DropletIcon },
  {
    title: "Hidráulicos y Engranajes",
    body: "Fluidos hidráulicos y de engranajes para equipo industrial y minería.",
    Icon: GaugeIcon,
  },
  {
    title: "Transmisiones y Diferenciales",
    body: "Lubricantes para transmisiones y diferenciales de servicio pesado.",
    Icon: FlameIcon,
  },
  {
    title: "Carga Líquida y Químicos",
    body: "Especialistas en transporte de carga líquida: hidrocarburos, aceites de palma y productos químicos.",
    Icon: DropletIcon,
},
];

export default function NosotrosPage() {
  return (
    <>
      {/* Encabezado */}
      <section className="relative isolate overflow-hidden bg-ink py-20 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <nav aria-label="Ruta de navegación" className="text-xs text-white/60">
            <Link href="/" className="hover:text-accent-light">
              Inicio
            </Link>
            <span className="px-2" aria-hidden="true">
              /
            </span>
            <span className="text-white/85">Nosotros</span>
          </nav>
          <h1 className="mt-5 max-w-3xl font-heading text-4xl font-bold tracking-tight sm:text-5xl">
            Una empresa construida sobre cumplimiento y conocimiento técnico
          </h1>
          <p className="mt-5 max-w-2xl leading-relaxed text-white/75">
            Detrás de cada entrega hay un equipo que conoce de lubricación y entiende la operación
            de sus clientes.
          </p>
        </div>
      </section>

      {/* Historia */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <ScrollReveal>
            <p className="text-xs font-bold tracking-[0.2em] text-accent-dark uppercase">
              Nuestra historia
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Del mostrador a la distribución regional
            </h2>
            <div className="mt-5 flex flex-col gap-4 leading-relaxed text-steel">
              <p>
                Somos {SITE.name}, distribuidores autorizados de lubricantes y aceites{" "}
                <strong className="text-ink">Maxter</strong> y{" "}
                <strong className="text-ink">Petromil</strong> en Norte de Santander. Trabajamos con
                talleres, lubricentros, flotas de transporte y empresas industriales de la región que
                necesitan productos confiables para motores, sistemas hidráulicos, engranajes,
                transmisiones y diferenciales.
              </p>
              <p>
                Nuestro diferencial no es solo el producto: es entender qué necesita cada motor y cada
                operación, y acompañar al cliente para que tome la mejor decisión técnica y económica.
              </p>
            </div>
            <p className="mt-4 text-sm text-mist italic">
              [Pendiente confirmar: año de fundación y cifras exactas de la empresa.]
            </p>
          </ScrollReveal>

          <ScrollReveal delayMs={100}>
            <div className="grid grid-cols-2 gap-4">
              <SmartImage
                src="instalaciones.png"
                alt="Instalaciones de Kzajo"
                etiquetaVacia="Foto de instalaciones"
                className="col-span-2 aspect-[16/9] w-full rounded-2xl border border-border object-cover"
              />
              <SmartImage
                src="bodega.png"
                alt="Bodega de almacenamiento"
                etiquetaVacia="Foto de bodega"
                className="aspect-square w-full rounded-2xl border border-border object-cover"
              />
              <SmartImage
                src="equipo.png"
                alt="Equipo de trabajo"
                etiquetaVacia="Foto del equipo"
                className="aspect-square w-full rounded-2xl border border-border object-cover"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Misión / Visión */}
      <section className="bg-canvas py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 md:grid-cols-2">
            {MISSION_VISION.map((item, i) => (
              <ScrollReveal key={item.title} delayMs={i * 100}>
                <article className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-surface p-8">
                  <span className="grid size-12 place-items-center rounded-md bg-accent text-white">
                    <item.icono className="size-6" aria-hidden="true" />
                  </span>
                  <h2 className="font-heading text-2xl font-bold text-ink">{item.title}</h2>
                  <p className="leading-relaxed text-steel">{item.body}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>

          {/* Valores */}
          <ScrollReveal delayMs={100}>
            <h2 className="mt-16 font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Valores corporativos
            </h2>
          </ScrollReveal>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALORES.map((v, i) => (
              <ScrollReveal key={v.titulo} delayMs={i * 80}>
                <li className="h-full rounded-2xl border border-border bg-surface p-6">
                  <span className="grid size-11 place-items-center rounded-md bg-accent/10 text-accent-dark">
                    <v.icono className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-heading text-base font-bold text-ink">{v.titulo}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-steel">{v.texto}</p>
                </li>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Líneas de negocio */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <ScrollReveal>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Nuestras líneas de negocio
          </h2>
        </ScrollReveal>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {BUSINESS_LINES.map((item, i) => (
            <ScrollReveal key={item.title} delayMs={i * 100}>
              <div className="group h-full rounded-2xl border border-border bg-surface p-7 transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-ink/5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent-dark transition-colors group-hover:bg-accent group-hover:text-white">
                  <item.Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-heading text-lg font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm text-steel">{item.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  );
}
