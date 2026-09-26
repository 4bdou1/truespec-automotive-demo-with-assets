"use client";

import Image from "next/image";
import { clsx } from "clsx";
import { useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "@/components/ui/icons";
import { VehiclePlaceholderArt } from "./vehicle-placeholder-art";

export function VehicleGallery({ photos, title }: { photos: string[]; title: string }) {
  const [index, setIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchStartX = useRef<number | null>(null);

  const count = photos.length;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (lightboxOpen && !dialog.open) dialog.showModal();
    if (!lightboxOpen && dialog.open) dialog.close();
  }, [lightboxOpen]);

  function go(delta: number) {
    if (count === 0) return;
    setIndex((prev) => (prev + delta + count) % count);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowLeft") go(-1);
    if (e.key === "ArrowRight") go(1);
  }

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) go(delta > 0 ? -1 : 1);
    touchStartX.current = null;
  }

  if (count === 0) {
    return (
      <div className="aspect-[4/3] w-full overflow-hidden rounded-lg border border-border sm:aspect-[16/10]">
        <VehiclePlaceholderArt label={title} />
      </div>
    );
  }

  return (
    <div>
      <div
        className="group relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-border bg-surface-raised sm:aspect-[16/10]"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        role="group"
        aria-label={`${title} photo gallery, image ${index + 1} of ${count}`}
      >
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="absolute inset-0 h-full w-full cursor-zoom-in"
          aria-label="Open full-screen gallery"
        >
          <Image
            src={photos[index]}
            alt={`${title} — photo ${index + 1} of ${count}`}
            fill
            priority={index === 0}
            sizes="(min-width: 1024px) 720px, 100vw"
            className="object-cover"
          />
        </button>

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              className="absolute left-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-background/70 text-foreground opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100"
              aria-label="Previous photo"
            >
              <ChevronLeftIcon />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="absolute right-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-background/70 text-foreground opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100"
              aria-label="Next photo"
            >
              <ChevronRightIcon />
            </button>
            <span className="absolute bottom-3 right-3 rounded-sm bg-background/70 px-2 py-1 text-xs text-muted-strong">
              {index + 1} / {count}
            </span>
          </>
        )}
      </div>

      {count > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {photos.map((photo, i) => (
            <button
              key={photo}
              type="button"
              onClick={() => setIndex(i)}
              className={clsx(
                "relative h-16 w-20 shrink-0 overflow-hidden rounded-sm border transition-colors",
                i === index ? "border-gold" : "border-border hover:border-border-strong",
              )}
              aria-label={`Show photo ${i + 1}`}
              aria-current={i === index}
            >
              <Image src={photo} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      <dialog
        ref={dialogRef}
        onClose={() => setLightboxOpen(false)}
        className="m-0 h-full max-h-none w-full max-w-none border-none bg-background p-0 backdrop:bg-black/90"
        aria-label={`${title} full-screen gallery`}
      >
        <div
          className="relative flex h-full w-full flex-col"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="flex items-center justify-between px-4 py-3 sm:px-6">
            <span className="text-sm text-muted-strong">
              {index + 1} / {count}
            </span>
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border-strong text-foreground"
              aria-label="Close gallery"
            >
              <CloseIcon />
            </button>
          </div>
          <div className="relative flex-1">
            <Image
              src={photos[index]}
              alt={`${title} — photo ${index + 1} of ${count}`}
              fill
              sizes="100vw"
              className="object-contain"
            />
            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  className="absolute left-3 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-background/70 text-foreground"
                  aria-label="Previous photo"
                >
                  <ChevronLeftIcon />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  className="absolute right-3 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-background/70 text-foreground"
                  aria-label="Next photo"
                >
                  <ChevronRightIcon />
                </button>
              </>
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
}
