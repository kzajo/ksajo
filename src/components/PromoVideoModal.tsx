"use client";

import { useEffect, useRef, useState } from "react";
import { CloseIcon, VolumeOffIcon, VolumeOnIcon } from "@/components/icons";

const STORAGE_KEY = "promo-video-seen";
const CLOSE_DELAY_MS = 5000;

/** Ventana emergente con video promocional: aparece una vez por sesión al entrar
 * al sitio e intenta reproducirse con sonido desde el inicio, como en un sitio
 * profesional. Si el navegador bloquea el autoplay con audio (política estándar
 * de Chrome/Safari/Firefox sin interacción previa del usuario), cae a silenciado
 * y muestra un botón para activar el sonido con un toque. El botón de cerrar
 * solo aparece a los 5 segundos — hasta entonces la persona solo puede verlo. */
export function PromoVideoModal() {
  const [open, setOpen] = useState(false);
  const [canClose, setCanClose] = useState(false);
  const [muted, setMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Si sessionStorage no está disponible, se muestra igual sin recordar la sesión.
    }
    // Solo se puede saber si ya se mostró una vez montado en el navegador; el
    // servidor siempre renderiza cerrado para evitar un desajuste de hidratación,
    // así que este cambio de estado tiene que vivir en un efecto.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => setCanClose(true), CLOSE_DELAY_MS);
    return () => clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.play().catch(() => {
      // El navegador bloqueó el autoplay con sonido: reintenta silenciado.
      video.muted = true;
      setMuted(true);
      video.play().catch(() => {});
    });
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Video promocional"
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-ink/80 p-6 backdrop-blur-sm"
      onClick={() => canClose && setOpen(false)}
    >
      <div
        className="relative w-full max-w-xs overflow-hidden rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {canClose ? (
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Cerrar video"
            className="absolute top-3 right-3 z-10 grid size-9 cursor-pointer place-items-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
          >
            <CloseIcon className="size-5" />
          </button>
        ) : null}
        <button
          type="button"
          onClick={() => {
            const video = videoRef.current;
            if (!video) return;
            video.muted = !video.muted;
            setMuted(video.muted);
          }}
          aria-label={muted ? "Activar sonido" : "Silenciar"}
          className="absolute bottom-3 right-3 z-10 grid size-9 cursor-pointer place-items-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
        >
          {muted ? <VolumeOffIcon className="size-5" /> : <VolumeOnIcon className="size-5" />}
        </button>
        <video
          ref={videoRef}
          src="/promo-video.mp4"
          autoPlay
          playsInline
          className="block h-auto max-h-[80vh] w-full"
        />
      </div>
    </div>
  );
}
