import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";

import { seoConfig } from "./src/utils/seo-config";

// https://astro.build/config
export default defineConfig({
  site: seoConfig.baseURL,
  output: "hybrid",
  devToolbar: {
    enabled: false,
  },
  integrations: [tailwind()],
  adapter: vercel(),
});
