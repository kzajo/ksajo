"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type BrandId = "maxter" | "petromil" | "beg";

const BRANDS: Record<
  BrandId,
  {
    bg: string;
    bgWordColor: string;
    tag: string;
    badgeText: string;
    badgeBg: string;
    badgeBorder: string;
    nameColor: string;
    dotColor: string;
    btnBg: string;
    tabActiveBg: string;
    title: string;
    desc: string;
    specs: readonly string[];
    image: string;
    glow: string;
  }
> = {
  maxter: {
    bg: "#1A0805",
    bgWordColor: "rgba(150,20,5,0.25)",
    tag: "#ff3434",
    badgeText: "LUBRICANTES DE ALTO DESEMPEÑO",
    badgeBg: "rgba(232,80,10,0.12)",
    badgeBorder: "rgba(232,80,10,0.3)",
    nameColor: "#ff3434",
    dotColor: "#ff3434",
    btnBg: "#ff3434",
    tabActiveBg: "#c01010",
    title: "Maxter",
    desc: "Lubricantes de alta tecnología para motores diésel y gasolina, con aditivos de extrema presión que protegen tu motor en condiciones severas de operación.",
    specs: [
      "Motores diésel y gasolina",
      "Transmisiones y diferenciales",
      "Sistemas hidráulicos",
      "API CJ-4 / CI-4 certificado",
    ],
    image: "/logo-maxter.png",
    glow: "rgba(232,80,10,0.5)",
  },
  petromil: {
    bg: "#040E1F",
    bgWordColor: "rgba(10,40,100,0.3)",
    tag: "#F0C040",
    badgeText: "ESTÁNDARES INTERNACIONALES",
    badgeBg: "rgba(240,192,64,0.12)",
    badgeBorder: "rgba(240,192,64,0.3)",
    nameColor: "#F0C040",
    dotColor: "#F0C040",
    btnBg: "#1B3A6B",
    tabActiveBg: "#1B3A6B",
    title: "Petromil",
    desc: "Aceites y lubricantes industriales del Grupo Petromil, diseñados para equipos pesados y de trabajo industrial bajo los más altos estándares internacionales.",
    specs: [
      "Equipo industrial y pesado",
      "Maquinaria agrícola y minera",
      "Grasas y lubricantes especiales",
      "Respaldo Grupo Petromil",
    ],
    image: "/logo-petromil.png",
    glow: "rgba(27,58,107,0.6)",
  },
  beg: {
    bg: "#0A0A0C",
    bgWordColor: "rgba(206,21,26,0.25)",
    tag: "#CE151A",
    badgeText: "PROTECCIÓN Y RENDIMIENTO",
    badgeBg: "rgba(206,21,26,0.12)",
    badgeBorder: "rgba(206,21,26,0.3)",
    nameColor: "#CE151A",
    dotColor: "#CE151A",
    btnBg: "#CE151A",
    tabActiveBg: "#A01015",
    title: "BEG",
    desc: "Aceites, grasas y aditivos BEG (Arintia Group) para la protección y mantenimiento de equipos automotrices, agrícolas, mineros, marítimos e industriales, con estándares de calidad internacional.",
    specs: [
      "Aceites automotrices e industriales",
      "Grasas lubricantes y aditivos",
      "Líquido de frenos y refrigerantes",
      "Aplicación agrícola, minera y marítima",
    ],
    image: "/logo-beg.png",
    glow: "rgba(206,21,26,0.5)",
  },
};

const ORDER: BrandId[] = ["maxter", "petromil", "beg"];

export function BrandSwitcher() {
  const [brand, setBrand] = useState<BrandId>("maxter");
  const m = BRANDS[brand];

  const step = (dir: 1 | -1) => {
    const i = ORDER.indexOf(brand);
    setBrand(ORDER[(i + dir + ORDER.length) % ORDER.length]);
  };

  return (
    <section
      className="relative min-h-[420px] overflow-hidden transition-colors duration-500"
      style={{ background: m.bg }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-4 select-none text-center font-serif text-[8rem] font-black leading-none tracking-tighter transition-colors duration-500 md:text-[12rem]"
        style={{ color: m.bgWordColor }}
      >
        {m.title.toUpperCase()}
      </div>

      <div className="relative z-10 px-6 pb-4 pt-10 text-center">
        <p
          className="font-heading text-xs font-semibold uppercase tracking-[3px] transition-colors duration-300"
          style={{ color: m.tag }}
        >
          Marcas que distribuimos
        </p>
        <h2 className="mt-1.5 font-heading text-2xl font-bold text-white">
          Tres marcas reconocidas
        </h2>
      </div>

      <div className="relative z-10 mb-2 flex justify-center px-6">
        <div className="flex gap-1 rounded-full border border-white/10 bg-black/20 p-1 backdrop-blur-sm">
          {ORDER.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setBrand(id)}
              className="cursor-pointer rounded-full px-5 py-1.5 text-sm font-semibold text-white/50 transition-colors duration-300"
              style={
                brand === id
                  ? { background: BRANDS[id].tabActiveBg, color: "#fff" }
                  : undefined
              }
            >
              {BRANDS[id].title}
            </button>
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto grid max-w-4xl items-center gap-6 px-6 pb-10 md:grid-cols-2">
        <div className="text-center md:text-left">
          <span
            className="inline-block rounded-full border px-3 py-1 text-[11px] font-semibold tracking-wide transition-colors duration-300"
            style={{ color: m.nameColor, background: m.badgeBg, borderColor: m.badgeBorder }}
          >
            {m.badgeText}
          </span>
          <h3
            className="mt-3 font-heading text-2xl font-bold transition-colors duration-300"
            style={{ color: m.nameColor }}
          >
            {m.title}
          </h3>
          <p className="mx-auto mt-2 max-w-xs text-sm text-white/50 md:mx-0">{m.desc}</p>

          <ul className="mx-auto mt-4 max-w-xs space-y-1.5 md:mx-0">
            {m.specs.map((spec) => (
              <li key={spec} className="flex items-center justify-center gap-2 text-sm text-white/60 md:justify-start">
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-300"
                  style={{ background: m.dotColor }}
                  aria-hidden
                />
                {spec}
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap justify-center gap-3 md:justify-start">
            <Link
              href="/catalogo"
              className="cursor-pointer rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-300"
              style={{ background: m.btnBg }}
            >
              Ver catálogo
            </Link>
            <Link
              href="/nosotros"
              className="cursor-pointer rounded-lg border border-white/20 px-5 py-2.5 text-sm font-semibold text-white/70 transition-colors hover:border-white/40 hover:text-white"
            >
              Más info
            </Link>
          </div>
        </div>

        <div className="relative flex h-44 items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={brand}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="float-anim relative"
            >
              <Image
                src={m.image}
                alt={`Producto ${m.title}`}
                width={160}
                height={180}
                className="h-40 w-auto max-w-[min(80vw,320px)] object-contain drop-shadow-2xl"
              />
            </motion.div>
          </AnimatePresence>
          <div
            aria-hidden
            className="absolute bottom-1 left-1/2 h-2.5 w-20 -translate-x-1/2 rounded-full blur-md transition-colors duration-300"
            style={{ background: m.glow }}
          />
        </div>
      </div>

      <div className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-1.5 md:flex">
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Marca anterior"
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Siguiente marca"
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20"
        >
          ›
        </button>
      </div>
    </section>
  );
}
