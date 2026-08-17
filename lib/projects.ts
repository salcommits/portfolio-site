export type Project = {
  slug: string;
  title: string;
  /**
   * For the hero's "Recent work" slot, which is set at display size and only
   * has room for a word or two. Falls back to `title` where a project's name is
   * already short enough.
   */
  shortTitle?: string;
  summary: string;
  /**
   * Prose, and the opening of the write-up — not a field for the meta row,
   * which is set for a word or two per column.
   */
  challenge: string;
  meta: {
    service: string;
    industry: string;
    year: string;
  };
  /**
   * Where the work was for, set over the barcode. Short enough to read as a mark
   * rather than a line — a country, not a city and country.
   */
  country?: string;
  approach: string;
  solution: string;
  detail: string[];
  /**
   * Letterboxed art at the head of the page. Omitted until the work has been
   * shot, which falls back to the flat placeholder the design was built on.
   */
  cover?: Shot;
  /**
   * Screens from the finished work, captioned and shown under the write-up.
   * Each keeps its own proportions, so page captures and crops can sit in the
   * same run without being forced to a common shape.
   */
  gallery?: (Shot & {
    caption: string;
    /**
     * Sets the caption at display size, for a plate that carries a name rather
     * than a screen label. Meant for one plate in a run: the point of it is that
     * the scroll breaks somewhere instead of passing four equal screens.
     */
    display?: boolean;
  })[];
  /**
   * The responsive pass, as a set of devices in one capture rather than separate
   * screens. Kept apart from `gallery` because it stands outside the numbered
   * run — those count pages, and this is the same pages at another size.
   *
   * Expected to be shot against `--color-device`, which its plate is set to so
   * the devices stand on the plate instead of in a panel on top of it.
   */
  mobile?: Shot;
  /**
   * The design system the work was assembled from: a line on how the set fits
   * together, then a family of modules at a time. The modules are cut from the
   * system's own sheets and so arrive on `--color-canvas`, which their section
   * is set to — each reads as still sitting on the artboard it was drawn on.
   */
  system?: {
    note: string;
    families: {
      caption: string;
      /**
       * Variants of the one module. Cut to a common box within a family, so a
       * row of them reads as one thing arranged three ways rather than as three
       * unrelated pictures.
       */
      variants: Shot[];
    }[];
  };
  /**
   * What moved after launch. Directions rather than figures: the brief records
   * which measures rose, not by how much, and a number nobody can stand behind
   * is worth less here than a list that is true.
   */
  results?: {
    note: string;
    measures: string[];
  };
  /** Omitted for anything without a public URL, which hides the visit link. */
  url?: string;
};

type Shot = {
  src: string;
  /** Intrinsic pixels. Next needs both to reserve the space before it loads. */
  width: number;
  height: number;
};

export type Category = {
  /** Two-part index shown on the accordion panel, e.g. "00-1". */
  index: string;
  title: string;
  /** Mono paragraph at the foot of the panel, once it is open. */
  summary: string;
  projects: Project[];
};

// Titles say what the work was rather than who it was for — the client sits in
// a comment beside the entry, unless the write-up names them itself. Slugs stay
// short: the title is the label, not the URL. Where a project already ships
// under its own name, that name is the title.
//
// The summary is the one line every project needs — it isn't shown on the page,
// but it is the description search engines and link previews read.

// Parked, not deleted. This is the only project with a real write-up, and it is
// deliberately absent from `categories` below — so it doesn't appear in the work
// section, has no page, and isn't in the sitemap. Drop it back into a category
// when its turn comes round.
export const arch: Project = {
  slug: "arch",
  title: "Arch",
  summary: "AI agents that watch a partner-delivered account for you.",
  challenge:
    "Keeping track of everything happening across a partner-delivered client engagement — calls, Slack threads, email — without personally reading every single one.",
  meta: {
    service: "Automation & Integration",
    // CHECK: the copy deck still asks which industry line to use here.
    industry: "Enterprise software delivery",
    year: "2026",
  },
  approach:
    "Built an Airtable base and a set of scheduled AI agents that do the watching for you: pull call notes, scan Slack, scan email, work out what's actually relevant to a live project, and roll it into a plain-language activity log — automatically, on a schedule, with nobody chasing it.",
  solution:
    "Five agents run in sequence: pull the call notes, scan Slack, scan email, roll everything into human-readable activities, then independently scan all of it for real risk signal — evidence-led and quantified, written to the same bar as a hand-written risk register rather than generic AI summary prose.",
  detail: [
    "The bit I'm proudest of is the risk step. It doesn't just flag things — it writes them up to the standard I'd hold myself to: a named source, a real number instead of a vague adjective, one clear decision needed, and a named owner. If it can't hit that bar, it doesn't write the risk at all — it leaves it for a human to pick up. Getting it to hold back was the hard part, not getting it to automate.",
    "“If there isn't enough evidence to write it properly, it doesn't write it at all.”",
  ],
};

// A panel per category, and a link per project inside it. Adding a project
// here adds both a line in the panel and its page at /work/<slug>.
//
// Being rebuilt one project at a time, so four of the five categories are empty
// for now. They still render their panel and summary — only the list of links is
// missing — so the section keeps its shape while the write-ups are worked
// through.
export const categories: Category[] = [
  {
    index: "00-1",
    title: "Build & Development",
    summary:
      "The best part: inside the code, front to back, until the thing actually works.",
    projects: [
      // Delivered at Carno. The client is named in the write-up on this one, so
      // the comment only carries what the page doesn't.
      {
        slug: "recruitment-platform",
        title: "Recruitment Platform",
        shortTitle: "Recruitment",
        summary:
          "A custom, modular WordPress recruitment platform with an integrated ATS, scoped and built in six weeks.",
        challenge:
          "Morgan Latif's site brought in very little traffic and almost no candidate activity, so their pipelines ran almost entirely through consultants. That holds while a business is small. Grow the headcount and the search mandates and those same pipelines start needing proportionally more people to sustain them, while the demand the brand should be catching goes to competitors instead.",
        meta: {
          service: "Build & Development",
          industry: "Recruitment",
          year: "2023",
        },
        country: "UK",
        url: "https://www.morganlatif.com",
        approach:
          "The team were putting money behind an online marketing strategy, and the site was what all of it had to land on. A design partner drew it and a marketing agency ran the strategy; I took the technical build. Scoping, technical design, development, domain and hosting — owned end to end, working directly with the two founders and their internal team.",
        solution:
          "A fully custom, content-driven site assembled from interchangeable modules, with an applicant tracking system wired into the theme so live roles and applications ran through the site itself. Six weeks from scope to launch.",
        detail: [
          // CHECK: the brief leaves the launch page-speed score as "xx", so it is
          // left out rather than guessed at. Drop it into this paragraph once the
          // number is to hand.
          "The build was fully custom — PHP and SCSS, parent and child WordPress themes, responsive at every width. No single module was difficult. Making fifty of them combine in any order and still animate, still reflow, still look like the drawings is where nearly all of the difficulty sat, and it had to hold while the design team's own commitments were being met to their schedule.",
          "Six weeks, scope to launch. The design partner stayed close the whole way and effectively became a second pass of QA, which is a large part of why a build that compressed went out clean. I kept hosting and maintainability for the twelve months after it.",
          "Worth saying plainly: low traffic never meant a weak candidate network. It meant the network was being carried by people rather than by the site. If the mandates grow and organic candidate acquisition doesn't, that carrying simply costs more consultant time — which is the case for building this, more than any figure on a dashboard.",
        ],
        // The homepage capture again, left to the cover's own crop rather than
        // cut to shape here. Cropping from the top of a tall capture lands on
        // the masthead and headline, and it lands there at both of the cover's
        // ratios — a letterboxed file would have to lose its sides on mobile.
        cover: {
          src: "/work/recruitment-platform/homepage.png",
          width: 965,
          height: 1024,
        },
        gallery: [
          {
            caption: "Homepage",
            src: "/work/recruitment-platform/homepage.png",
            width: 965,
            height: 1024,
          },
          {
            caption: "Services",
            src: "/work/recruitment-platform/services.png",
            width: 949,
            height: 1024,
          },
          // The client's name rather than the screen's, because at this size it
          // is the plate that is doing the talking and the name is the only thing
          // on the page that hasn't been said at display size already.
          {
            caption: "Morgan Latif",
            display: true,
            src: "/work/recruitment-platform/candidates.png",
            width: 722,
            height: 1024,
          },
          {
            caption: "Insights",
            src: "/work/recruitment-platform/insights.png",
            width: 685,
            height: 1024,
          },
        ],
        mobile: {
          src: "/work/recruitment-platform/mobile.png",
          width: 1024,
          height: 776,
        },
        system: {
          note: "Around fifty modules in four families — a few of each here. Pages are assembled from them in any order, and every module holds its own layout at any width, so the team can build pages nobody drew in advance without the design coming apart.",
          // Cut from the system's own sheets. Named for the family rather than
          // for the variants under it: those are only there to stand for the
          // fifty-odd that aren't.
          families: [
            {
              caption: "Headers",
              variants: [
                {
                  src: "/work/recruitment-platform/modules/header-contact.png",
                  width: 1082,
                  height: 483,
                },
                {
                  src: "/work/recruitment-platform/modules/header-sector.png",
                  width: 1082,
                  height: 483,
                },
                {
                  src: "/work/recruitment-platform/modules/header-insight.png",
                  width: 1082,
                  height: 483,
                },
              ],
            },
            // The largest family on the sheets by a distance, so it gets two rows
            // where the others get one. Ordered tallest first, which lands the
            // three deep modules on one row and the three shallow ones on the
            // next — inside a common box that keeps each row reading at one size.
            {
              caption: "Content",
              variants: [
                {
                  src: "/work/recruitment-platform/modules/content-stats.png",
                  width: 1105,
                  height: 930,
                },
                {
                  src: "/work/recruitment-platform/modules/content-team.png",
                  width: 1105,
                  height: 930,
                },
                {
                  src: "/work/recruitment-platform/modules/content-sectors.png",
                  width: 1105,
                  height: 930,
                },
                {
                  src: "/work/recruitment-platform/modules/content-split.png",
                  width: 1105,
                  height: 930,
                },
                {
                  src: "/work/recruitment-platform/modules/content-about.png",
                  width: 1105,
                  height: 930,
                },
                {
                  src: "/work/recruitment-platform/modules/content-support.png",
                  width: 1105,
                  height: 930,
                },
              ],
            },
            {
              caption: "Testimonials",
              variants: [
                {
                  src: "/work/recruitment-platform/modules/quote-photo.png",
                  width: 1043,
                  height: 441,
                },
                {
                  src: "/work/recruitment-platform/modules/quote-plain.png",
                  width: 1043,
                  height: 441,
                },
                {
                  src: "/work/recruitment-platform/modules/quote-plate.png",
                  width: 1043,
                  height: 441,
                },
              ],
            },
            {
              caption: "Call to action",
              variants: [
                {
                  src: "/work/recruitment-platform/modules/cta-team.png",
                  width: 1103,
                  height: 403,
                },
                {
                  src: "/work/recruitment-platform/modules/cta-photo.png",
                  width: 1103,
                  height: 403,
                },
                {
                  src: "/work/recruitment-platform/modules/cta-signup.png",
                  width: 1103,
                  height: 403,
                },
              ],
            },
          ],
        },
        results: {
          note: "Everything the team were watching moved the same way:",
          measures: [
            "Candidate CV submissions",
            "Candidate enquiries",
            "Client enquiries",
            "Branded search traffic",
            "Traffic to live roles",
            "Newsletter and content engagement",
            "Referrals and repeat visits",
          ],
        },
      },
      // The client names itself in the write-up, and the site ships under that
      // name, so the title is the name.
      {
        slug: "hyped",
        title: "Hyped",
        summary:
          "A custom site for a UK creative talent agency, designed and built in four weeks.",
        challenge:
          "Hyped were scaling quickly, representing chefs and creators with audiences in the millions — Sam Holland at 1.5m, Tyler Butt at 2.5m. Social media shows the talent. The website sells the talent. And the quality of the website sells Hyped: it is where a brand decides whether to make an approach, and where the next signing decides who they want representing them.",
        meta: {
          service: "Build & Development",
          industry: "Talent management",
          year: "2023",
        },
        country: "UK",
        url: "https://www.hypedmgt.co",
        approach:
          "Design and build both, on this one — the experience and interface drawn in Figma, then developed by hand with no theme underneath it. The brief was less about features than about standing: sell the roster, turn attention into enquiries, and be good enough that a brand reads it as taste rather than as a directory of names. Talent choosing who should represent them reads it the same way, which is the part most management sites miss.",
        solution:
          "A custom site with the roster in the middle of it. The homepage is a wall of talent; every creator has a profile carrying their footage, their following on each platform, and one route to enquire. Four weeks from start to launch.",
        detail: [
          // CHECK: the brief leaves the launch page-speed score as "xx", the same
          // as the write-up above. Both want the real number when it's to hand.
          "Fully custom — PHP and SCSS, responsive at every width, with nothing underneath it that had to be worked around. Drawing it and building it being the same pair of hands is most of how four weeks was enough: nothing needed handing over, and the decisions that usually get argued between design and build were only made once.",
          "Video was the awkward part, and the interesting one. The whole point of a roster like this is footage of people who are good on camera, and footage is the heaviest thing you can put on a page. The profiles had to carry it at a quality that flatters the talent without loading like a showreel, and that constraint shaped those pages more than any layout question did.",
          "Hosting and maintainability stayed with me for the twelve months after launch.",
        ],
        // The homepage capture, the same one that opens the gallery. Its top is
        // the full-bleed hero and the wordmark, which is what the cover's crop
        // wants — see the note on the project above.
        cover: {
          src: "/work/hyped/homepage.png",
          width: 965,
          height: 1024,
        },
        gallery: [
          {
            caption: "Homepage",
            src: "/work/hyped/homepage.png",
            width: 965,
            height: 1024,
          },
          // The roster itself, at the taller crop the display plate takes, and
          // carrying the agency's name rather than the screen's: a wall of the
          // talent is the one image that says what Hyped is.
          {
            caption: "Hyped",
            display: true,
            src: "/work/hyped/roster.png",
            width: 722,
            height: 1024,
          },
          {
            caption: "Talent profile",
            src: "/work/hyped/profile.png",
            width: 965,
            height: 1024,
          },
        ],
        mobile: {
          src: "/work/hyped/mobile.png",
          width: 1024,
          height: 776,
        },
        results: {
          note: "The measures the agency watches all moved the same way:",
          measures: [
            "Brand and partnership enquiries",
            "Talent representation enquiries",
            "Talent profile views",
            "Talent profile engagement",
            "Branded search traffic",
            "Repeat visits from brands and agencies",
            "High-quality commercial opportunities",
          ],
        },
      },
    ],
  },
  {
    index: "00-2",
    title: "Solutions Architecture",
    summary:
      "Working out how the pieces should fit, and what each choice will cost later on.",
    projects: [],
  },
  {
    index: "00-3",
    title: "Project Leadership",
    summary:
      "Looking after delivery: the planning, the people, and keeping everyone pointed the same way.",
    projects: [],
  },
  {
    index: "00-4",
    title: "Automation & Integration",
    summary:
      "Making systems talk to each other that were never really meant to.",
    projects: [],
  },
  {
    index: "00-5",
    title: "Technical Strategy",
    summary:
      "Thinking about what is worth building, in what order, and what it means a few years out.",
    projects: [],
  },
];

/** Flattened, for routing and lookups. */
export const projects: Project[] = categories.flatMap(
  (category) => category.projects,
);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

/**
 * What the hero points at. First in the list rather than sorted by year, so the
 * order the projects are written in is the order they rank.
 */
export const recentProject: Project | undefined = projects[0];

export function getCategoryFor(slug: string) {
  return categories.find((category) =>
    category.projects.some((project) => project.slug === slug),
  );
}
