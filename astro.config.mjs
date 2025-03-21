// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import { GLOBAL } from "./src/lib/variables";

// https://astro.build/config
export default defineConfig({
  site: GLOBAL.rootUrl,
  base: GLOBAL.baseUrl,
  vite: {
    plugins: [tailwindcss()],
  },
});
