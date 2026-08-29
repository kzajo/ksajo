import { ScrollReveal } from "@/components/motion";

const PARTNERS = [
  { src: "/partner-maxter.webp", alt: "Maxter", width: 804, height: 220 },
  { src: "/partner-petromil.webp", alt: "Petromil", width: 723, height: 220 },
  // BEG queda fuera temporalmente: { src: "/partner-beg.webp", alt: "BEG", width: 415, height: 196 },
  { src: "/partner-sacyr.webp", alt: "Sacyr", width: 743, height: 220 },
  { src: "/partner-ecopetrol.webp", alt: "Ecopetrol", width: 625, height: 220 },
  { src: "/partner-coomulpinort.webp", alt: "Coomulpinort", width: 247, height: 220 },
  { src: "/partner-palnortesas.webp", alt: "Palnortesas S.A.S.", width: 315, height: 220 },
] as const;

export function ClientsMarquee() {
  return (
    <section className="overflow-hidden border-b border-border bg-white py-14 md:py-16">
      <ScrollReveal className="mx-auto max-w-6xl px-6 text-center">
        <p className="font-heading text-xs font-semibold uppercase tracking-widest text-accent-dark">
          Con quienes trabajamos
        </p>
        <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight text-ink md:text-3xl">
          Marcas aliadas
        </h2>
        <div className="mx-auto mt-4 h-0.5 w-10 bg-accent" aria-hidden />
      </ScrollReveal>

      <div className="clients-marquee-mask mt-10">
        <div className="clients-marquee-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center gap-24 pr-24" aria-hidden={copy === 1}>
              {PARTNERS.map((p) => (
                // eslint-disable-next-line @next/next/no-img-element -- plain <img> on purpose: static, pre-optimized asset, no Next image-optimizer round trip needed for a decorative logo strip.
                <img
                  key={`${copy}-${p.alt}`}
                  src={p.src}
                  alt={p.alt}
                  width={p.width}
                  height={p.height}
                  loading="lazy"
                  decoding="async"
                  className="h-12 w-auto shrink-0 md:h-16"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
