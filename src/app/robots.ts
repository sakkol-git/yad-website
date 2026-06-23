import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/portal/", "/_next/", "/*?*"],
      },
    ],
    sitemap: "https://yadkh.org/sitemap.xml",
    host: "https://yadkh.org",
  };
}
