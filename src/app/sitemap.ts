import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

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
  "privacy",
  "terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: path ? `${siteUrl}/${path}` : siteUrl,
    lastModified: new Date(),
  }));
}
