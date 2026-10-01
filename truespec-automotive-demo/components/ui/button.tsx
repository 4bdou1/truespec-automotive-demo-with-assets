import Link from "next/link";
import { clsx } from "clsx";

export type ButtonVariant = "gold" | "outline" | "ghost" | "whatsapp" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  gold: "bg-foreground text-background hover:bg-gold-soft active:bg-gold-deep border border-transparent font-semibold tracking-wide",
  outline:
    "bg-transparent text-foreground border border-border-strong hover:border-foreground hover:text-foreground",
  ghost: "bg-transparent text-foreground hover:bg-surface-raised border border-transparent",
  whatsapp:
    "bg-whatsapp text-whatsapp-ink hover:bg-whatsapp-deep border border-transparent",
  danger:
    "bg-transparent text-danger border border-danger/40 hover:bg-danger-soft",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-11 px-3.5 text-sm gap-1.5",
  md: "h-11 px-5 text-sm gap-2",
  lg: "h-12 px-7 text-base gap-2.5",
};

export function buttonClasses(
  variant: ButtonVariant = "gold",
  size: ButtonSize = "md",
  className?: string,
) {
  return clsx(
    "inline-flex items-center justify-center rounded-md font-medium tracking-wide transition-all duration-200 ease-out",
    "disabled:opacity-50 disabled:pointer-events-none",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({ variant = "gold", size = "md", className, ...props }: ButtonProps) {
  return <button className={buttonClasses(variant, size, className)} {...props} />;
}

interface LinkButtonProps extends React.ComponentProps<typeof Link> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function LinkButton({
  variant = "gold",
  size = "md",
  className,
  ...props
}: LinkButtonProps) {
  return <Link className={buttonClasses(variant, size, className)} {...props} />;
}

export function ExternalLinkButton({
  variant = "gold",
  size = "md",
  className,
  ...props
}: LinkButtonProps & { href: string }) {
  return (
    <a
      className={buttonClasses(variant, size, className)}
      target="_blank"
      rel="noreferrer noopener"
      {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
    />
  );
}
