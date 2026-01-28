import { MetadataRoute } from "next";
import { siteMeta } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/services",
    "/services/luxury-car-hire",
    "/services/bus-hire",
    "/services/truck-hire",
    "/services/airport-pickup",
    "/safety",
    "/how-it-works",
    "/request-quote",
    "/business",
    "/about",
    "/contact",
    "/support",
    "/terms",
    "/privacy"
  ];

  return routes.map((route) => ({
    url: `${siteMeta.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7
  }));
}
