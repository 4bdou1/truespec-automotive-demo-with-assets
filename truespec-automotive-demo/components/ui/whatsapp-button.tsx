import { buttonClasses, type ButtonSize } from "./button";
import { WhatsAppIcon } from "./icons";

export function WhatsAppButton({
  href,
  children,
  size = "md",
  className,
}: {
  href: string;
  children: React.ReactNode;
  size?: ButtonSize;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={buttonClasses("whatsapp", size, className)}
    >
      <WhatsAppIcon width={18} height={18} />
      {children}
    </a>
  );
}
