import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://yadkh.org";

  const routes = [
    "",
    "/about",
    "/programs",
    "/impact",
    "/get-involved",
    "/event",
    "/donors",
    "/partner",
    "/services",
    "/donate"
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
