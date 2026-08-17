// One source for the values that have to agree across metadata, Open Graph,
// robots and the sitemap.

export const site = {
  name: "Liam Atkins",
  title: "Liam Atkins — Always building",
  description:
    "Technical design, full-stack builds and client-side delivery, from London.",
  // Absolute URLs are required for Open Graph and the sitemap, and the host is
  // not knowable at build time once a custom domain is pointed at the app. Set
  // NEXT_PUBLIC_SITE_URL in the environment to override the Heroku default.
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://liam-atkins-portfolio-99d23978985b.herokuapp.com"
  ).replace(/\/$/, ""),
} as const;
