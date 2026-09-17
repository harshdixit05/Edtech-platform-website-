import type { MetadataRoute } from "next";

const routes = [
  "",
  "courses",
  "learning",
  "impact",
  "about",
  "support",
  "partnerships",
  "insights",
  "contact",
  "privacy",
  "terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://intellimindz.in";
  return routes.map((path) => ({
    url: `${base}/${path}`,
    lastModified: new Date(),
  }));
}
