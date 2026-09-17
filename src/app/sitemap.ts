import type { MetadataRoute } from "next";

const routes = ["", "courses", "learning", "partnerships", "about", "insights", "contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://intellimindzfoundation.org";
  return routes.map((path) => ({
    url: `${base}/${path}`,
    lastModified: new Date(),
  }));
}
