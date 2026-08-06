import type { Metadata } from "next";
import {ArrowUpRight,Clock,Mail,MapPin,MessageCircle,Phone,} from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/icons";
import { SITE, whatsappLink } from "@/lib/site";
 
export const metadata: Metadata = {
  title: "Contacto",
  description: `Contáctate con ${SITE.name}, distribuidor autorizado Maxter y Petromil en Cúcuta, Norte de Santander.`,
};
 
export default function ContactoPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink py-20 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs font-bold tracking-[0.2em] text-accent-light uppercase">
            Estamos para ayudarte
          </p>
          <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight sm:text-5xl">
            Hablemos por su canal preferido
          </h1>
          <p className="mt-5 max-w-2xl leading-relaxed text-white/70">
            Sin formularios largos. Elige WhatsApp para una respuesta inmediata con precios y
            disponibilidad, Instagram para ver novedades y productos en vitrina, o Facebook para
            seguir nuestras publicaciones.
          </p>
        </div>
      </section>
 
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {/* WhatsApp */}
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative isolate flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-border bg-surface p-8 shadow-sm shadow-ink/5 transition-all hover:-translate-y-1 hover:border-accent hover:shadow-xl"
          >
            <div>
              <span className="grid size-14 place-items-center rounded-xl bg-accent text-white">
                <MessageCircle className="size-7" aria-hidden="true" />
              </span>
              <h2 className="mt-6 font-heading text-2xl font-bold text-ink">WhatsApp</h2>
              <p className="mt-3 leading-relaxed text-steel">
                Te respondemos con precios, disponibilidad y asesoría técnica. Al hacer clic se abre
                una conversación con un mensaje ya preparado.
              </p>
              <p className="mt-5 rounded-lg border border-dashed border-border bg-canvas p-4 text-sm text-steel italic">
                &ldquo;{SITE.whatsappMessage}&rdquo;
              </p>
            </div>
            <span className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-accent-dark">
              {SITE.phone}
              <ArrowUpRight
                className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                aria-hidden="true"
              />
            </span>
          </a>
 
          {/* Instagram */}
          <a
            href={SITE.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative isolate flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-border bg-surface p-8 shadow-sm shadow-ink/5 transition-all hover:-translate-y-1 hover:border-ink hover:shadow-xl"
          >
            <div>
              <span className="grid size-14 place-items-center rounded-xl bg-ink text-white">
                <InstagramIcon className="size-7" aria-hidden="true" />
              </span>
              <h2 className="mt-6 font-heading text-2xl font-bold text-ink">Instagram</h2>
              <p className="mt-3 leading-relaxed text-steel">
                Ve nuestro portafolio, promociones, llegada de nuevos lotes y contenido técnico sobre
                lubricación. También puedes escribirnos por mensaje directo.
              </p>
              <p className="mt-5 rounded-lg border border-dashed border-border bg-canvas p-4 text-sm font-semibold text-ink">
                {SITE.social.instagramHandle}
              </p>
            </div>
            <span className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-ink">
              Abrir perfil oficial
              <ArrowUpRight
                className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                aria-hidden="true"
              />
            </span>
          </a>
 
          {/* Facebook */}
          <a
            href={SITE.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative isolate flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-border bg-surface p-8 shadow-sm shadow-ink/5 transition-all hover:-translate-y-1 hover:border-[#1877F2] hover:shadow-xl"
          >
            <div>
              <span className="grid size-14 place-items-center rounded-xl bg-[#1877F2] text-white">
                <FacebookIcon className="size-7" aria-hidden="true" />
              </span>
              <h2 className="mt-6 font-heading text-2xl font-bold text-ink">Facebook</h2>
              <p className="mt-3 leading-relaxed text-steel">
                Síguenos para ver publicaciones, promociones y novedades de la empresa. También
                puedes escribirnos por Messenger.
              </p>
              <p className="mt-5 rounded-lg border border-dashed border-border bg-canvas p-4 text-sm font-semibold text-ink">
                {SITE.name}
              </p>
            </div>
            <span className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-ink">
              Abrir página oficial
              <ArrowUpRight
                className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                aria-hidden="true"
              />
            </span>
          </a>
        </div>
 
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icono: MapPin, titulo: "Ubicación", texto: SITE.address },
            { icono: Clock, titulo: "Horario de atención", texto: SITE.hours },
            { icono: Phone, titulo: "Teléfono", texto: `${SITE.phone} / ${SITE.phoneAlternate}` },
            { icono: Mail, titulo: "Correo electrónico", texto: SITE.email },
          ].map((d) => (
            <div key={d.titulo} className="rounded-xl border border-border bg-surface p-6">
              <span className="grid size-10 place-items-center rounded-md bg-canvas text-steel">
                <d.icono className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-sm font-bold tracking-wide text-ink uppercase">{d.titulo}</h3>
              <p className="mt-1 text-sm leading-relaxed text-steel">{d.texto}</p>
            </div>
          ))}
        </div>
 
        <div className="mt-8 overflow-hidden rounded-xl border border-border shadow-sm shadow-ink/5">
          <iframe
            title={`Ubicación de ${SITE.name}`}
            src={`https://www.google.com/maps?q=${SITE.mapCoords.lat},${SITE.mapCoords.lng}&z=17&output=embed`}
            className="h-80 w-full sm:h-96"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  );
}