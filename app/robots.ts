import type { MetadataRoute } from "next";

import { site } from "@/lib/site";

// Everything on the site is public and meant to be indexed, so this allows all
// crawlers rather than leaving them to guess from a missing file.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
