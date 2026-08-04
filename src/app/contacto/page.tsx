import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto",
  description: `Contáctate con ${SITE.name}, distribuidor autorizado Maxter y Petromil en Cúcuta, Norte de Santander.`,
};

export default function ContactoPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <p className="font-heading text-xs font-semibold uppercase tracking-widest text-accent-dark">
        Estamos para ayudarte
      </p>
      <h1 className="mt-2 font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">
        Contacto
      </h1>
      <div className="mt-4 h-0.5 w-10 bg-accent" aria-hidden />
      <p className="mt-4 max-w-xl text-sm text-steel">
        Escríbenos y con gusto te asesoramos sobre el lubricante correcto para tu equipo o flota.
      </p>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-surface p-6">
          <dl className="space-y-4 text-sm">
            <div>
              <dt className="font-semibold text-ink">Dirección</dt>
              <dd className="mt-1 text-steel">{SITE.address}</dd>
            </div>
            <div>
              <dt className="font-semibold text-ink">Teléfono / WhatsApp</dt>
              <dd className="mt-1 space-x-2 text-steel">
                <a href={`tel:${SITE.phoneHref}`} className="hover:text-ink">
                  {SITE.phone}
                </a>
                <span>/</span>
                <a href={`tel:${SITE.phoneAlternateHref}`} className="hover:text-ink">
                  {SITE.phoneAlternate}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-ink">Correo</dt>
              <dd className="mt-1 text-steel">
                <a href={`mailto:${SITE.email}`} className="hover:text-ink">
                  {SITE.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-ink">Horario</dt>
              <dd className="mt-1 text-steel">{SITE.hours}</dd>
            </div>
          </dl>

          <a
            href={SITE.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block cursor-pointer rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
          >
            Escribir por WhatsApp
          </a>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border shadow-sm shadow-ink/5">
          <iframe
            title={`Ubicación de ${SITE.name}`}
            src={`https://www.google.com/maps?q=${SITE.mapCoords.lat},${SITE.mapCoords.lng}&z=16&output=embed`}
            className="h-full min-h-[22rem] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
