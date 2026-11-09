import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk } from "next/font/google";
import { SmoothScroll } from "@/components/smooth-scroll";
import "./globals.css";

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "MC Service | Finestre da tetto a Verona",
  description:
    "Riparazione, manutenzione, sostituzione e consulenza per finestre da tetto a Verona e provincia, da un ex tecnico specializzato VELUX con 13 anni di esperienza.",
};

export const viewport: Viewport = { themeColor: "#ffffff" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="it" className={`${hanken.variable} antialiased`}>
      <body className="min-h-full">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
