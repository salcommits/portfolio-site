# Portfolio — Liam Atkins

A personal portfolio site: case studies grouped by service, an awards and
certificates list, and a build list of work that never needed a case study.
Next.js and Sass, statically generated, deployed on Heroku.

Live at
[liam-atkins-portfolio-99d23978985b.herokuapp.com](https://liam-atkins-portfolio-99d23978985b.herokuapp.com).

## Running it

Node 22, as pinned in `package.json`.

```bash
npm install
npm run dev     # http://localhost:3000
```

```bash
npm run build   # production build
npm start       # serve the build
npm run lint
```

## The writing lives in `lib/`

There is no CMS and no database. Every word on the site sits in one of four
TypeScript files, which means a change to the copy is a commit, and the copy
is reviewed and versioned like the rest of it.

| File                | What it holds                                                                                                                                                              |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `lib/projects.ts`   | The case studies, and the service categories they group into on the home page. One object per project: its meta row, its prose, and any screenshots, photographs, film, rundown or testimonial it carries. |
| `lib/build-list.ts` | The build list. Sorted by date on export, so a new entry can be written wherever it is easiest to write.                                                                    |
| `lib/awards.ts`     | Awards and certificates.                                                                                                                                                   |
| `lib/site.ts`       | Name, description and canonical URL — the values metadata, Open Graph, `robots.txt` and the sitemap all have to agree on.                                                   |

The types in those files carry the rules. A project can leave out its cover
image, its gallery or its testimonial and the page closes the gap rather than
rendering an empty section, so a text-only case study needs no separate
template.

## Routes

Everything is static. There are no route handlers, and nothing is fetched at
request time.

- `app/page.tsx` — home
- `app/work/[slug]/page.tsx` — one page per project, from `generateStaticParams` over `lib/projects.ts`
- `app/build-list/page.tsx` — the build list
- `app/not-found.tsx`, `app/robots.ts`, `app/sitemap.ts`, `app/opengraph-image.tsx`

## Styles

Sass, compiled to one stylesheet. `styles/main.scss` is the only entry point
and everything else is a partial it pulls in: `_tokens.scss` for the colours,
type scale and spacing as custom properties, `_breakpoints.scss`, `_cta.scss`
and `_back-link.scss` for the mixins shared between components, and
`styles/components/` for one partial per section or component.

Above the `nav` breakpoint the desktop layout is scaled from a 1920px design
frame rather than stepped: `--u: 0.0520833vw` is one pixel at that width, so a
size written as `calc(15 * var(--u))` is 15px in the design and holds its
proportion as the window changes. Below it, sizes are fixed in `rem` and the
layout is allowed to reflow instead.

## Fonts

Two, self-hosted out of `assets/` with `next/font/local`: Sofia Sans Condensed
for display, Spline Sans Mono for labels, meta rows and anything that should
read as a marking rather than as prose.

## Motion

`components/motion/` holds it: a letter-by-letter heading reveal, a scroll
unveil, a count-up, the rolling and falling text treatments, the preloader,
and Lenis for the scroll feel itself. The reveals and the preloader each have
a `prefers-reduced-motion: reduce` path that puts the end state on screen
immediately, so no content depends on animation to be readable. The eased
scroll is the exception, and currently runs either way.

## Deploying

Heroku builds on push, and `Procfile` runs `npm start`:

```bash
git push heroku main
```

Set `NEXT_PUBLIC_SITE_URL` if a custom domain is pointed at the app —
absolute URLs are baked in at build time for Open Graph and the sitemap, and
the host is not knowable from inside the build otherwise.
