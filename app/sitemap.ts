import type { MetadataRoute } from "next";

const siteUrl = process.env.SITE_URL || "https://ignacio-ledesma.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
