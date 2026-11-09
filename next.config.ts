import type { NextConfig } from "next";

// Su GitHub Pages il sito sta in https://costantini93.github.io/mc-service/:
// la pubblicazione automatica imposta PAGES_BASE_PATH=/mc-service.
// In locale (npm run dev) resta vuoto. Con un dominio proprio va lasciato vuoto anche online.
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Esportazione statica: `next build` produce la cartella out/ da pubblicare
  output: "export",
  basePath,
  trailingSlash: true,
  // Senza server non c'è l'ottimizzazione automatica: le foto sono già ridimensionate
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
