import type { Metadata } from "next";
import { ScrollReveal } from "@/components/motion";
import { SITE } from "@/lib/site";
import { DropletIcon, FlameIcon, GaugeIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Nosotros",
  description: `Conoce a ${SITE.name}, distribuidor autorizado Maxter y Petromil en Norte de Santander.`,
};

const MISSION_VISION = [
  {
    title: "Misión",
    body: "Satisfacer las necesidades de los clientes que requieren suministro de lubricantes y aceites para automotores, con productos de alta calidad, amigables con el medio ambiente y respaldados por estándares internacionales.",
  },
  {
    title: "Visión",
    body: "Ser reconocida como la empresa líder en comercialización de lubricantes en Norte de Santander, destacada por la fortaleza de su talento humano, sus procesos innovadores y su excelencia en el servicio.",
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
];

export default function NosotrosPage() {
  return (
    <div className="relative overflow-hidden">
      <section className="relative h-[70vh] min-h-[420px] w-full overflow-hidden bg-ink">
        <video
          src="/nosotros-video.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/20"
        />
        <div className="relative flex h-full items-end">
          <div className="mx-auto w-full max-w-4xl px-6 pb-12">
            <p className="font-heading text-xs font-semibold uppercase tracking-widest text-accent-light">
              Sobre Kzajo
            </p>
            <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-white md:text-5xl">
              Empresa norte santandereana líder en lubricantes
            </h1>
          </div>
        </div>
      </section>

      <div className="relative mx-auto max-w-4xl px-6 py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-16 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, var(--color-accent-light) 0%, transparent 70%)" }}
        />

        <ScrollReveal>
          <p className="max-w-2xl text-lg text-steel">
            Somos {SITE.name}, distribuidores autorizados de lubricantes y aceites Maxter y
            Petromil en Norte de Santander. Trabajamos con talleres, flotas y empresas de la
            región que necesitan productos confiables para motores, sistemas hidráulicos,
            engranajes, transmisiones y diferenciales.
          </p>
          <p className="mt-4 max-w-2xl text-sm text-mist italic">
            [Pendiente confirmar: año de fundación y cifras exactas de la empresa.]
          </p>
        </ScrollReveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {MISSION_VISION.map((item, i) => (
            <ScrollReveal key={item.title} delayMs={i * 100}>
              <div className="h-full rounded-2xl border border-border bg-surface p-7">
                <h2 className="font-heading text-lg font-semibold text-accent-dark">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-steel">{item.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delayMs={100}>
          <h2 className="mt-16 font-heading text-2xl font-bold text-ink">
            Nuestras líneas de negocio
          </h2>
        </ScrollReveal>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
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
      </div>
    </div>
  );
}
