import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "TrueSpec Automotive — Imported vehicles, verified from source",
    template: "%s — TrueSpec Automotive",
  },
  description:
    "TrueSpec Automotive sources and imports premium vehicles for the Nigerian market. Browse available, on-order, and newly landed inventory, and chat directly on WhatsApp.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${oswald.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground bg-grain">
        {children}
      </body>
    </html>
  );
}
