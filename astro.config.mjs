// @ts-check
import { defineConfig, fontProviders } from "astro/config"

import tailwindcss from "@tailwindcss/vite"

// https://astro.build/config
export default defineConfig({
  experimental: {
    fonts: [
      {
        provider: fontProviders.google({
          experimental: {
            variableAxis: {
              Archivo: { wdth: [["62.5", "125"]] },
            },
          },
        }),
        name: "Archivo",
        cssVariable: "--font-archivo",
        weights: ["100 900"],
        styles: ["normal", "italic"],
        subsets: ["latin"],
      },
      {
        provider: fontProviders.google(),
        name: "Geist",
        cssVariable: "--font-geist",
        weights: ["100 900"],
        styles: ["normal"],
        subsets: ["latin"],
      },
      {
        provider: fontProviders.google(),
        name: "Geist Mono",
        cssVariable: "--font-geist-mono",
        weights: ["100 900"],
        styles: ["normal"],
        subsets: ["latin"],
      },
    ],
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
