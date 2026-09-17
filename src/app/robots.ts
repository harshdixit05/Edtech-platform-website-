import type { MetadataRoute } from "next";
import { siteUrl, isProductionSite } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  if (!isProductionSite) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/account", "/login", "/signup"] },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
