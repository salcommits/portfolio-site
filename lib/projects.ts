export type Project = {
  slug: string;
  title: string;
  summary: string;
  meta: {
    challenge: string;
    service: string;
    industry: string;
    year: string;
  };
  approach: string;
  solution: string;
  detail: string[];
  url?: string;
};

export type Category = {
  /** Two-part index shown on the accordion panel, e.g. "00-1". */
  index: string;
  title: string;
  /** Mono paragraph at the foot of the panel, once it is open. */
  summary: string;
  projects: Project[];
};

// Every project still carries the design's placeholder body copy, so a draft
// only declares what makes it its own. Fill these in as the real write-ups
// land; the shape is what the project page reads.
function draft(
  slug: string,
  title: string,
  year: string,
  extra: Partial<Project> = {},
): Project {
  return {
    slug,
    title,
    summary:
      "Vivamus in justo id eros vulputate faucibus luctus sed lectus. Nullam ut lectus non dolor congue fermentum.",
    meta: { challenge: "Lorem", service: "Lorem", industry: "Lorem", year },
    approach:
      "Duis ultrices venenatis eros id facilisis. Morbi tincidunt et ante pulvinar pulvinar. Ut cursus, nibh vel placerat accumsan.",
    solution:
      "Nulla purus mi, convallis sit amet dignissim. Morbi molestie mattis justo, vel ornare nisl sagittis nec.",
    detail: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum turpis lectus, consectetur a commodo at, blandit sit amet mi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras in lacus iaculis, sagittis leo non, commodo ante.",
      "// Praesent non tempor risus. Pellentesque scelerisque sodales ipsum, quis consectetur velit dignissim sed. Donec sit amet dolor facilisis, accumsan est eu, congue erat.",
    ],
    ...extra,
  };
}

// A panel per category, and a link per project inside it. Adding a project
// here adds both a line in the panel and its page at /work/<slug>.
export const categories: Category[] = [
  {
    index: "00-1",
    title: "Build & Development",
    summary:
      "I build the thing, end to end — from the data model up to the last piece of interface polish.",
    projects: [
      draft("northwind", "Northwind", "2012", { url: "https://example.com" }),
      draft("halcyon", "Halcyon", "2018"),
      draft("kestrel", "Kestrel", "2021"),
    ],
  },
  {
    index: "00-2",
    title: "Solutions Architecture",
    summary:
      "Shaping systems that hold up: clear boundaries, honest trade-offs, and room to grow into.",
    projects: [
      draft("meridian", "Meridian", "2019"),
      draft("ironwood", "Ironwood", "2022"),
      draft("quayside", "Quayside", "2024"),
    ],
  },
  {
    index: "00-3",
    title: "Project Leadership",
    summary:
      "Keeping delivery moving — scoping the work, holding the line on quality, and shipping it.",
    projects: [
      draft("ravenline", "Ravenline", "2020"),
      draft("larkspur", "Larkspur", "2023"),
    ],
  },
  {
    index: "00-4",
    title: "Automation & Integration",
    summary:
      "Joining up the tools a business already runs on, so the work happens without anyone chasing it.",
    projects: [
      draft("bramble", "Bramble", "2021"),
      draft("foxglove", "Foxglove", "2023"),
      draft("lantern", "Lantern", "2025"),
    ],
  },
  {
    index: "00-5",
    title: "Technical Strategy",
    summary:
      "Working out what to build and in what order, then making the case for it in plain language.",
    projects: [
      draft("alder", "Alder", "2022"),
      draft("verdant", "Verdant", "2025"),
    ],
  },
];

/** Flattened, for routing and lookups. */
export const projects: Project[] = categories.flatMap(
  (category) => category.projects,
);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getCategoryFor(slug: string) {
  return categories.find((category) =>
    category.projects.some((project) => project.slug === slug),
  );
}
