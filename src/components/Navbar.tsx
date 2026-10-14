"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type MouseEvent } from "react";
import { motion } from "motion/react";
import { NAV_LINKS, SITE } from "@/lib/site";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { StaggerText } from "@/components/motion";
import { usePageTransition } from "@/components/PageTransition";
import { CartButton } from "@/components/CartButton";

export function Navbar() {
  const pathname = usePathname();
  const { navigate } = usePageTransition();
  const [open, setOpen] = useState(false);

  function handleNavClick(e: MouseEvent<HTMLAnchorElement>, href: string) {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigate(href);
  }

  return (
    <header className="sticky top-0 z-50 bg-accent shadow-md shadow-accent-dark/20">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <Image src="/logo-white.webp" alt={SITE.name} width={91} height={46} className="h-10 w-auto" priority />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-label={link.label}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-sm font-medium transition-colors ${
                    active ? "text-white" : "text-white/70 hover:text-white"
                  }`}
                >
                  <motion.span initial="rest" whileHover="hover" className="inline-block">
                    <StaggerText text={link.label} />
                  </motion.span>
                </Link>
              </li>
            );
          })}
          <li>
            <CartButton />
          </li>
        </ul>

        <div className="flex items-center gap-1 md:hidden">
          <CartButton />
          <button
            type="button"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            className="cursor-pointer p-2 text-white"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {open && (
        <ul className="flex flex-col gap-1 border-t border-white/15 px-6 py-4 md:hidden">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={(e) => {
                  setOpen(false);
                  handleNavClick(e, link.href);
                }}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
