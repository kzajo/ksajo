import type { Metadata } from "next";
import type { ComponentType } from "react";
import { BadgeIcon, DocumentIcon, DropletIcon, FlameIcon, FlaskIcon, LockIcon } from "@/components/icons";
import { ScrollReveal } from "@/components/motion";
import { whatsappLink } from "@/lib/site";
 
export const metadata: Metadata = {
  title: "Transporte",
  description:
    "Transporte de carga líquida — hidrocarburos, aceites de palma y productos químicos — con cumplimiento normativo a nivel nacional.",
};
 
type IconType = ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>;
 
const CARGAS = [
  {
    Icon: FlameIcon,
    title: "Hidrocarburos",
    body: "Transporte de combustibles y derivados del petróleo, cumpliendo la normativa a este tipo de carga.",
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
    body: "Operamos bajo normas ISO para garantizar procesos seguros y confiables en cada entrega.",
  },
] as const;
 
/* Animaciones propias de esta vista (CSS puro, sin dependencias) */
const ANIMATIONS = `
  @keyframes kz-float { 0%,100% { transform: translate3d(0,0,0) } 50% { transform: translate3d(0,-18px,0) } }
  @keyframes kz-drift { 0%,100% { transform: translate3d(0,0,0) scale(1) } 50% { transform: translate3d(30px,20px,0) scale(1.15) } }
  @keyframes kz-wave { from { transform: translateX(0) } to { transform: translateX(-50%) } }
  @keyframes kz-gradient { from { background-position: 0% 50% } to { background-position: 200% 50% } }
  @keyframes kz-ping { 0% { transform: scale(1); opacity: .6 } 80%,100% { transform: scale(2.4); opacity: 0 } }
  @keyframes kz-drop { 0% { transform: translateY(-20px); opacity: 0 } 15% { opacity: .7 } 100% { transform: translateY(260px); opacity: 0 } }
  @keyframes kz-rise { from { opacity: 0; transform: translateY(18px) } to { opacity: 1; transform: translateY(0) } }
  .kz-float { animation: kz-float 6s ease-in-out infinite }
  .kz-drift { animation: kz-drift 14s ease-in-out infinite }
  .kz-wave { animation: kz-wave 14s linear infinite }
  .kz-wave-slow { animation: kz-wave 24s linear infinite }
  .kz-gradient-text { background-size: 200% auto; animation: kz-gradient 6s linear infinite }
  .kz-ping { animation: kz-ping 2s cubic-bezier(0,0,.2,1) infinite }
  .kz-drop { animation: kz-drop 5s ease-in infinite }
  .kz-rise { opacity: 0; animation: kz-rise .7s ease-out forwards }
  .kz-shine::after { content: ""; position: absolute; inset: 0; transform: translateX(-120%) skewX(-20deg);
    background: linear-gradient(90deg, transparent, rgba(255,255,255,.55), transparent); transition: transform .7s ease }
  .kz-shine:hover::after { transform: translateX(120%) skewX(-20deg) }
  @media (prefers-reduced-motion: reduce) {
    .kz-float, .kz-drift, .kz-wave, .kz-wave-slow, .kz-gradient-text, .kz-ping, .kz-drop, .kz-rise { animation: none !important; opacity: 1 }
  }
`;
 
function Wave({ className = "" }: { className?: string }) {
  // Onda repetible: el SVG mide 200% y se desplaza -50% para un bucle continuo
  return (
    <svg
      className={`absolute bottom-0 left-0 h-24 w-[200%] ${className}`}
      viewBox="0 0 2400 120"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0 60 C 200 0, 400 120, 600 60 S 1000 0, 1200 60 S 1600 120, 1800 60 S 2200 0, 2400 60 V120 H0 Z"
        fill="currentColor"
      />
    </svg>
  );
}
 
function InfoCard({
  Icon,
  title,
  body,
  index,
}: {
  Icon: IconType;
  title: string;
  body: string;
  index: number;
}) {
  return (
    <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/60 hover:shadow-xl hover:shadow-accent/10">
      {/* Barra superior que se llena al pasar el cursor */}
      <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
      {/* Número decorativo de fondo */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-2 -top-4 select-none font-heading text-7xl font-bold text-accent/5 transition-all duration-500 group-hover:-translate-y-1 group-hover:text-accent/10"
      >
        {String(index + 1).padStart(2, "0")}
      </span>
 
      <span className="relative grid size-11 place-items-center rounded-xl bg-accent/10 text-accent-dark transition-all duration-300 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-accent group-hover:text-white">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <h3 className="relative mt-4 font-heading text-base font-bold text-ink">{title}</h3>
      <p className="relative mt-2 text-sm leading-relaxed text-steel">{body}</p>
    </div>
  );
}
 
export default function TransportePage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: ANIMATIONS }} />
 
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ink py-20 text-white sm:py-24">
        {/* Fondo: cuadrícula suave + luces que flotan */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage: "radial-gradient(ellipse at 30% 40%, black, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse at 30% 40%, black, transparent 75%)",
          }}
        />
        <div className="kz-drift absolute -right-24 -top-24 -z-10 size-96 rounded-full bg-accent/25 blur-3xl" aria-hidden="true" />
        <div
          className="kz-drift absolute -bottom-32 left-1/4 -z-10 size-80 rounded-full bg-accent-light/15 blur-3xl"
          style={{ animationDelay: "-6s" }}
          aria-hidden="true"
        />
 
        {/* Gotas cayendo */}
        <div className="pointer-events-none absolute inset-0 -z-10 hidden md:block" aria-hidden="true">
          {[
            { right: "12%", delay: "0s" },
            { right: "20%", delay: "1.6s" },
            { right: "28%", delay: "3.1s" },
          ].map((d) => (
            <span
              key={d.right}
              className="kz-drop absolute top-8 h-4 w-2.5 rounded-full bg-accent-light/70"
              style={{ right: d.right, animationDelay: d.delay, borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%" }}
            />
          ))}
        </div>
 
        {/* Ondas de líquido en la base */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-24 overflow-hidden" aria-hidden="true">
          <Wave className="kz-wave-slow text-white/[0.04]" />
          <Wave className="kz-wave text-white/[0.06]" />
        </div>
 
        <div className="mx-auto max-w-6xl px-6">
          <p
            className="kz-rise inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-bold tracking-[0.2em] text-accent-light uppercase backdrop-blur"
          >
            <span className="relative flex size-2">
              <span className="kz-ping absolute inline-flex size-full rounded-full bg-accent-light" />
              <span className="relative inline-flex size-2 rounded-full bg-accent-light" />
            </span>
            Transporte de carga líquida
          </p>
          <h1
            className="kz-rise mt-5 max-w-2xl font-heading text-4xl font-bold tracking-tight sm:text-5xl"
            style={{ animationDelay: "120ms" }}
          >
            Transporte especializado en{" "}
            <span className="kz-gradient-text bg-gradient-to-r from-accent-light via-white to-accent-light bg-clip-text text-transparent">
              carga líquida
            </span>
          </h1>
          <p
            className="kz-rise mt-5 max-w-2xl leading-relaxed text-white/70"
            style={{ animationDelay: "240ms" }}
          >
            Además de distribuir lubricantes, en {" "}
            <strong className="text-white">Inversiones Kzajo S.A.S.</strong> ofrecemos servicio de
            transporte de carga líquida — hidrocarburos, aceites de palma y productos químicos —
            cumpliendo con la normativa, con entregas seguras, oportunas y confiables a
            nivel nacional.
          </p>
          <div className="kz-rise mt-7 flex flex-wrap gap-3" style={{ animationDelay: "360ms" }}>
            <a
              href={whatsappLink("Hola, quisiera información sobre el servicio de transporte de carga líquida.")}
              target="_blank"
              rel="noopener noreferrer"
              className="kz-shine group relative inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-ink shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/90"
            >
              Solicitar cotización
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>
      </section>
 
      {/* Qué transportamos */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <ScrollReveal>
          <div className="max-w-2xl">
            <p className="flex items-center gap-3 text-xs font-bold tracking-[0.2em] text-accent-dark uppercase">
              <span className="h-0.5 w-8 rounded-full bg-accent" aria-hidden="true" />
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
              <InfoCard Icon={c.Icon} title={c.title} body={c.body} index={i} />
            </ScrollReveal>
          ))}
        </div>
      </section>
 
      {/* Cumplimiento normativo */}
      <section className="relative overflow-hidden bg-canvas py-20">
        <div
          aria-hidden="true"
          className="kz-float pointer-events-none absolute -left-16 top-10 size-64 rounded-full bg-accent/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-6xl px-6">
          <ScrollReveal>
            <div className="max-w-2xl">
              <p className="flex items-center gap-3 text-xs font-bold tracking-[0.2em] text-accent-dark uppercase">
                <span className="h-0.5 w-8 rounded-full bg-accent" aria-hidden="true" />
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
                <InfoCard Icon={c.Icon} title={c.title} body={c.body} index={i} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
 
      {/* CTA */}
      <section className="relative isolate overflow-hidden py-16 text-center text-white" style={{ background: "#1a51a4" }}>
        {/* Círculos flotantes y onda */}
        <div aria-hidden="true" className="kz-float absolute -left-10 top-6 -z-10 size-40 rounded-full bg-white/10 blur-xl" />
        <div
          aria-hidden="true"
          className="kz-float absolute -right-8 bottom-4 -z-10 size-52 rounded-full bg-white/10 blur-xl"
          style={{ animationDelay: "-3s" }}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-24 overflow-hidden" aria-hidden="true">
          <Wave className="kz-wave text-white/[0.07]" />
        </div>
 
        <ScrollReveal className="mx-auto max-w-2xl px-6">
          <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
            ¿Necesita transportar carga líquida?
          </h2>
          <p className="mt-3 text-white/70">
            Cuéntenos qué necesita transportar y le respondemos con la información del servicio.
          </p>
          <span className="relative mt-6 inline-flex">
            {/* Anillo pulsante detrás del botón */}
            <span aria-hidden="true" className="kz-ping absolute inset-0 rounded-lg bg-white/40" />
            <a
              href={whatsappLink("Hola, quisiera solicitar una cotización de transporte de carga líquida.")}
              target="_blank"
              rel="noopener noreferrer"
              className="kz-shine group relative inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-lg bg-white px-6 py-3 text-sm font-bold text-accent-dark transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-xl hover:shadow-black/20"
            >
              Solicitar cotización ahora
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </span>
        </ScrollReveal>
      </section>
    </>
  );
}