import type { MetadataRoute } from "next";

import { COMPONENTS } from "@/lib/rare-registry";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

// trailingSlash is on, so every emitted URL ends in a slash the same way the
// static export's directories do.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    {
      url: `${SITE_URL}/components/`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...COMPONENTS.map((component) => ({
      url: `${SITE_URL}/components/${component.slug}/`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
