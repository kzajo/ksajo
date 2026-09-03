import type { Metadata } from "next";
import { BadgeIcon, DocumentIcon, DropletIcon, FlameIcon, FlaskIcon, LockIcon } from "@/components/icons";
import { ScrollReveal } from "@/components/motion";
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Transporte",
  description:
    "Transporte de carga líquida — hidrocarburos, aceites de palma y productos químicos — con cumplimiento normativo a nivel nacional.",
};

const CARGAS = [
  {
    Icon: FlameIcon,
    title: "Hidrocarburos",
    body: "Transporte de combustibles y derivados del petróleo, cumpliendo la normativa aplicable a este tipo de carga.",
  },
  {
    Icon: DropletIcon,
    title: "Aceites de palma",
    body: "Movilización de aceites de palma para clientes del sector agroindustrial.",
  },
  {
    Icon: FlaskIcon,
    title: "Productos químicos",
    body: "Transporte especializado de productos químicos líquidos para el sector industrial.",
  },
] as const;

const CUMPLIMIENTO = [
  {
    Icon: DocumentIcon,
    title: "Licencias de operación",
    body: "Operamos con todas las licencias y permisos requeridos para el transporte de carga líquida.",
  },
  {
    Icon: LockIcon,
    title: "Cumplimiento normativo",
    body: "Cumplimos con la normativa nacional de transporte de carga, bajo la vigilancia de la Superintendencia de Transporte.",
  },
  {
    Icon: BadgeIcon,
    title: "Estándares de calidad ISO",
    body: "Operamos bajo normas ISO de calidad para garantizar procesos seguros y confiables en cada entrega.",
  },
] as const;

export default function TransportePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ink py-20 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs font-bold tracking-[0.2em] text-accent-light uppercase">
            Transporte de carga líquida
          </p>
          <h1 className="mt-4 max-w-2xl font-heading text-4xl font-bold tracking-tight sm:text-5xl">
            Transporte especializado en carga líquida
          </h1>
          <p className="mt-5 max-w-2xl leading-relaxed text-white/70">
            Además de distribuir lubricantes, en {" "}
            <strong className="text-white">Inversiones Kzajo S.A.S.</strong> ofrecemos servicio de
            transporte de carga líquida — hidrocarburos, aceites de palma y productos químicos —
            cumpliendo con la normativa aplicable, con entregas seguras, oportunas y confiables a
            nivel nacional.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={whatsappLink("Hola, quisiera información sobre el servicio de transporte de carga líquida.")}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-white/90"
            >
              Solicitar cotización
            </a>
          </div>
        </div>
      </section>

      {/* Qué transportamos */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <ScrollReveal>
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-[0.2em] text-accent-dark uppercase">
              Qué transportamos
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Carga líquida especializada
            </h2>
          </div>
        </ScrollReveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {CARGAS.map((c, i) => (
            <ScrollReveal key={c.title} delayMs={i * 80}>
              <div className="h-full rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/60">
                <span className="grid size-11 place-items-center rounded-xl bg-accent/10 text-accent-dark">
                  <c.Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-heading text-base font-bold text-ink">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-steel">{c.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Cumplimiento normativo */}
      <section className="bg-canvas py-20">
        <div className="mx-auto max-w-6xl px-6">
          <ScrollReveal>
            <div className="max-w-2xl">
              <p className="text-xs font-bold tracking-[0.2em] text-accent-dark uppercase">
                Cumplimiento y calidad
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                Licencias, normativa y estándares ISO
              </h2>
            </div>
          </ScrollReveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {CUMPLIMIENTO.map((c, i) => (
              <ScrollReveal key={c.title} delayMs={i * 80}>
                <div className="h-full rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/60">
                  <span className="grid size-11 place-items-center rounded-xl bg-accent/10 text-accent-dark">
                    <c.Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-heading text-base font-bold text-ink">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-steel">{c.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center text-white" style={{ background: "#1a51a4" }}>
        <ScrollReveal className="mx-auto max-w-2xl px-6">
          <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
            ¿Necesita transportar carga líquida?
          </h2>
          <p className="mt-3 text-white/70">
            Cuéntenos qué necesita transportar y le respondemos con la información del servicio.
          </p>
          <a
            href={whatsappLink("Hola, quisiera solicitar una cotización de transporte de carga líquida.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block cursor-pointer rounded-lg bg-white px-6 py-3 text-sm font-bold text-accent-dark transition-colors hover:bg-white/90"
          >
            Solicitar cotización ahora
          </a>
        </ScrollReveal>
      </section>
    </>
  );
}
