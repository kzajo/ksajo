import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS, SITE } from "@/lib/site";
import { FacebookIcon, InstagramIcon, WhatsappIcon } from "@/components/icons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-steel text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-6 py-8">
        <Image src="/logo-white.webp" alt={SITE.name} width={91} height={46} className="h-10 w-auto" />

        <div>
          <p className="font-heading text-xs font-semibold uppercase tracking-wide text-white/50">
            Navegación
          </p>
          <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-xs text-white/70 hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-heading text-xs font-semibold uppercase tracking-wide text-white/50">
            Contacto
          </p>
          <ul className="mt-2 space-y-1 text-xs text-white/70">
            <li>{SITE.address}</li>
            <li>
              <a href={`tel:${SITE.phoneHref}`} className="hover:text-white">
                {SITE.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="hover:text-white">
                {SITE.email}
              </a>
            </li>
          </ul>

          <div className="mt-3 flex items-center gap-2">
            <a
              href={SITE.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-accent"
            >
              <WhatsappIcon className="h-3.5 w-3.5" />
            </a>
            <a
              href={SITE.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-accent"
            >
              <InstagramIcon className="h-3.5 w-3.5" />
            </a>
            <a
              href={SITE.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-accent"
            >
              <FacebookIcon className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-3 text-center text-[11px] text-white/40">
        © {year} {SITE.name} · Distribución autorizada Maxter &amp; Petromil · Transporte de carga
        terrestre
      </div>
    </footer>
  );
}
