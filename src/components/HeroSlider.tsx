"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site";

const slides = [
  {
    etiqueta: "Distribuidores autorizados",
    titulo: (
      <>
        Protegemos los motores que mueven a <span className="colombia-wave">Colombia</span>
      </>
    ),
    texto:
      "Lubricantes Maxter y Petromil para flotas de transporte, maquinaria industrial y vehículos.",
    cta: { label: "Ver catálogo", href: "/catalogo" },
  },
  {
    etiqueta: "Carga pesada y maquinaria",
    titulo: "Protección al motor para trabajo severo",
    texto:
      "Línea diésel API CI-4/CJ-4 y fluidos hidráulicos antidesgaste que extienden la vida útil de sus equipos.",
    cta: { label: "Ver línea Motores", href: "/catalogo?categoria=motores" },
  },
  {
    etiqueta: "Asesoría técnica sin costo",
    titulo: "Le ayudamos a elegir el aceite correcto",
    texto:
      "Nuestro equipo le recomienda la viscosidad y especificación adecuada según su motor, su operación y su presupuesto.",
    cta: { label: "Conocer la empresa", href: "/nosotros" },
  },
];

export function HeroSlider() {
  const [indice, setIndice] = useState(0);
  const [pausado, setPausado] = useState(false);

  const siguiente = useCallback(() => setIndice((i) => (i + 1) % slides.length), []);
  const anterior = useCallback(() => setIndice((i) => (i - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    if (pausado) return;
    const t = setInterval(siguiente, 5000);
    return () => clearInterval(t);
  }, [pausado, siguiente]);

  return (
    <section
      aria-label="Banner principal"
      aria-roledescription="carrusel"
      className="relative isolate min-h-[420px] overflow-hidden bg-ink"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
    >
      <div className="absolute inset-0 -z-10">
        <video
          className="h-full w-full object-cover"
          src="/hero-truck.mp4"
          poster="/hero-truck.jpg"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-ink/70" aria-hidden="true" />
      </div>

      <div className="relative mx-auto flex min-h-[420px] max-w-6xl flex-col justify-center px-6 py-20 md:py-28">
        {slides.map((s, i) => (
          <div
            key={s.etiqueta}
            hidden={i !== indice}
            role="group"
            aria-roledescription="diapositiva"
            aria-label={`${i + 1} de ${slides.length}`}
            className="max-w-2xl"
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-accent-light/40 bg-accent/10 px-4 py-1.5 text-xs font-bold tracking-[0.16em] text-accent-light uppercase">
              {s.etiqueta}
            </p>
            <h1 className="mt-6 font-heading text-4xl leading-[1.15] font-bold text-white sm:text-5xl">
              {s.titulo}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">{s.texto}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href={s.cta.href}
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-accent-dark"
              >
                {s.cta.label}
              </Link>
              <a
                href={SITE.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:border-accent-light hover:text-accent-light"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                Contáctenos
              </a>
            </div>
          </div>
        ))}

        <div className="mt-12 flex items-center gap-4">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={anterior}
              className="grid size-11 cursor-pointer place-items-center rounded-full border border-white/25 text-white transition-colors hover:border-accent-light hover:text-accent-light"
            >
              ‹<span className="sr-only">Diapositiva anterior</span>
            </button>
            <button
              type="button"
              onClick={siguiente}
              className="grid size-11 cursor-pointer place-items-center rounded-full border border-white/25 text-white transition-colors hover:border-accent-light hover:text-accent-light"
            >
              ›<span className="sr-only">Diapositiva siguiente</span>
            </button>
          </div>
          <div className="flex items-center gap-2">
            {slides.map((s, i) => (
              <button
                key={s.etiqueta}
                type="button"
                onClick={() => setIndice(i)}
                aria-current={i === indice}
                className={`h-1.5 cursor-pointer rounded-full transition-all ${
                  i === indice ? "w-10 bg-accent-light" : "w-4 bg-white/30 hover:bg-white/60"
                }`}
              >
                <span className="sr-only">Ir a la diapositiva {i + 1}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
