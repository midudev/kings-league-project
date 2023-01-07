import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import prefetch from "@astrojs/prefetch";
import sitemap from "@astrojs/sitemap";

const website = "https://kingsleague.dev/";

// https://astro.build/config
export default defineConfig({
  site: website,
  server: {
    host: true,
  },
  integrations: [
    tailwind(),
    prefetch(),
    sitemap({
      lastmod: new Date(),
    }),
  ],
});
