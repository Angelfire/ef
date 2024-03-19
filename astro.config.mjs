import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

import { seoConfig } from "./src/utils/seo-config";

// https://astro.build/config
export default defineConfig({
  site: seoConfig.baseURL,
  output: "hybrid",
  devToolbar: {
    enabled: false,
  },
  integrations: [tailwind()],
});
