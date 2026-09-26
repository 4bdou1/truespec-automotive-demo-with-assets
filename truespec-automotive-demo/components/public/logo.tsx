import Image from "next/image";
import { clsx } from "clsx";

export function Logo({ className, priority }: { className?: string; priority?: boolean }) {
  return (
    <span className={clsx("relative inline-flex h-8 w-32 sm:h-9 sm:w-36", className)}>
      <Image
        src="/brand/truespec-logo-white-transparent.png"
        alt="TrueSpec Automotive"
        fill
        sizes="160px"
        priority={priority}
        className="object-contain object-left"
      />
    </span>
  );
}
