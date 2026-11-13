"use client";

import { useEffect, useRef, useState } from "react";
import { CloseIcon, VolumeOffIcon, VolumeOnIcon } from "@/components/icons";
import { getActivePromoVideo } from "@/lib/site-content";

const STORAGE_KEY = "promo-video-seen";
const CLOSE_DELAY_MS = 5000;

/** Ventana emergente con el video de anuncio activo (administrable desde /admin).
 * Aparece una vez por sesión al entrar al sitio e intenta reproducirse con
 * sonido desde el inicio; si el navegador bloquea el autoplay con audio cae a
 * silenciado y muestra un botón para activar el sonido. El botón de cerrar
 * solo aparece a los 5 segundos. Si no hay ningún video marcado como activo
 * en /admin, el componente no muestra nada. */
export function PromoVideoModal() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [canClose, setCanClose] = useState(false);
  const [muted, setMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let cancelled = false;
    getActivePromoVideo().then((video) => {
      if (cancelled || !video) return;
      try {
        if (sessionStorage.getItem(STORAGE_KEY)) return;
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        // Si sessionStorage no está disponible, se muestra igual sin recordar la sesión.
      }
      setVideoUrl(video.url);
      setOpen(true);
    });
    return () => {
      cancelled = true;
    };
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
      video.muted = true;
      setMuted(true);
      video.play().catch(() => {});
    });
  }, [open]);

  if (!open || !videoUrl) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Video promocional"
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-ink/80 p-6 backdrop-blur-sm"
      onClick={() => canClose && setOpen(false)}
    >
      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl shadow-2xl"
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
        <video ref={videoRef} src={videoUrl} autoPlay playsInline className="block h-auto max-h-[80vh] w-full" />
      </div>
    </div>
  );
}
