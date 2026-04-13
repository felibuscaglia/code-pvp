import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/room/"],
    },
    sitemap: "https://codepvp.com/sitemap.xml",
  }
}
