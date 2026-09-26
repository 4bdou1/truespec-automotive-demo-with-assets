"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { clsx } from "clsx";
import { uploadListingPhotos } from "@/lib/api/admin";
import { UploadIcon, TrashIcon, ArrowUpIcon, ArrowDownIcon, SpinnerIcon } from "@/components/ui/icons";

export function PhotoUploader({
  photos,
  onChange,
}: {
  photos: string[];
  onChange: (photos: string[]) => void;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function addFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    const files = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
    if (files.length === 0) return;
    setIsUploading(true);
    try {
      const urls = await uploadListingPhotos(files);
      onChange([...photos, ...urls]);
    } finally {
      setIsUploading(false);
    }
  }

  function removeAt(index: number) {
    onChange(photos.filter((_, i) => i !== index));
  }

  function move(index: number, delta: number) {
    const target = index + delta;
    if (target < 0 || target >= photos.length) return;
    const next = [...photos];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  }

  return (
    <div className="flex flex-col gap-4">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          void addFiles(e.dataTransfer.files);
        }}
        className={clsx(
          "flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-6 py-10 text-center transition-colors",
          isDragging ? "border-gold bg-gold/5" : "border-border-strong bg-surface",
        )}
      >
        {isUploading ? (
          <SpinnerIcon className="h-6 w-6 text-gold" />
        ) : (
          <UploadIcon className="h-6 w-6 text-muted" />
        )}
        <p className="text-sm text-muted-strong">
          Drag photos here, or{" "}
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="font-medium text-gold underline-offset-2 hover:underline"
          >
            browse files
          </button>
        </p>
        <p className="text-xs text-muted">Stored locally in your browser for this demo</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="sr-only"
          onChange={(e) => {
            void addFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      {photos.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {photos.map((photo, index) => (
            <div key={`${photo.slice(0, 40)}-${index}`} className="group relative aspect-[4/3] overflow-hidden rounded-md border border-border">
              <Image src={photo} alt={`Listing photo ${index + 1}`} fill sizes="180px" className="object-cover" />
              {index === 0 && (
                <span className="absolute left-1.5 top-1.5 rounded-sm bg-gold px-1.5 py-0.5 text-[10px] font-medium uppercase text-gold-ink">
                  Cover
                </span>
              )}
              <button
                type="button"
                onClick={() => removeAt(index)}
                className="absolute right-1.5 top-1.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-background/80 text-foreground"
                aria-label={`Remove photo ${index + 1}`}
              >
                <TrashIcon className="h-3.5 w-3.5" />
              </button>
              <div className="absolute inset-x-1.5 bottom-1.5 flex justify-between opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                <button
                  type="button"
                  onClick={() => move(index, -1)}
                  disabled={index === 0}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-background/80 text-foreground disabled:opacity-30"
                  aria-label={`Move photo ${index + 1} earlier`}
                >
                  <ArrowUpIcon className="h-3.5 w-3.5 -rotate-90" />
                </button>
                <button
                  type="button"
                  onClick={() => move(index, 1)}
                  disabled={index === photos.length - 1}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-background/80 text-foreground disabled:opacity-30"
                  aria-label={`Move photo ${index + 1} later`}
                >
                  <ArrowDownIcon className="h-3.5 w-3.5 -rotate-90" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
