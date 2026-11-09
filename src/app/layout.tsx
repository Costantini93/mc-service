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
  title: "MCservice | Finestre da tetto a Verona",
  description:
    "Sostituzione, installazione e riparazione di finestre da tetto a Verona e provincia. Rivenditori VELUX: tende, oscuranti, motorizzazione e pratiche per le detrazioni.",
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
