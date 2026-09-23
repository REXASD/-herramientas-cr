import type { MetadataRoute } from "next";
import { guides, siteConfig, tools } from "@/lib/site";

const staticPages = ["", "/guias", "/buscar", "/acerca-de", "/contacto", "/privacidad", "/cookies", "/terminos"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = [...staticPages, ...tools.map((tool) => tool.href), ...guides.map((guide) => guide.href)];
  return Array.from(new Set(pages)).map((path) => ({ url: `${siteConfig.url}${path}`, lastModified: now, changeFrequency: path === "" ? "weekly" : "monthly", priority: path === "" ? 1 : tools.some((tool) => tool.href === path) ? 0.9 : 0.7 }));
}
