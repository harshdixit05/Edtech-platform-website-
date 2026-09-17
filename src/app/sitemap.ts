import type { MetadataRoute } from "next";

const routes = [
  "",
  "about",
  "courses",
  "categories",
  "learning",
  "knowledge-hub",
  "impact",
  "donate",
  "partnerships",
  "contact",
  "login",
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
