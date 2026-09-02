/**
 * The things being worked on now, as opposed to the work written up under
 * /work. The difference is length rather than importance: a case study needs a
 * beginning and an end, and most of these have neither yet.
 */

/**
 * What is at the other end of the link, so it is clear before clicking whether
 * this is something to use, something to look at, code to read, or somebody
 * talking over it.
 */
export type BuildType =
  | "Prototype"
  | "Site"
  | "Application"
  | "Source"
  | "Walkthrough";

/** Where it has got to. A short set on purpose, so the column stays scannable. */
export type BuildStatus =
  | "Building"
  | "Built"
  | "Testing"
  | "Live"
  | "Paused";

export type Build = {
  title: string;
  /** A sentence or two. Long enough to say what it does, short enough to scan. */
  description: string;
  type: BuildType;
  status: BuildStatus;
  /**
   * Omitted while there is nothing worth pointing at, which leaves the name in
   * plain text without an arrow — the status is what explains why.
   */
  url?: string;
  /**
   * The pieces, for a build that ships as more than one repository. The name
   * still carries the way in; this says what is behind it, so the parts can be
   * read separately without the row having to become several rows.
   */
  parts?: { label: string; url: string }[];
};

// Arch came off the list alongside the Airtable pieces, ClipScout and the
// helpdesk agent, and all of them are in the commits behind this one if any
// wants bringing back — Arch's own write-up is still parked in `projects.ts`
// waiting for a page.
const entries: Build[] = [
  // Puck is the open-source visual editor this is built around rather than
  // anything of mine. The name says so because the pairing is the whole point
  // of the build: someone else's editor, running inside Airtable.
  {
    title: "Airtable Puck Extension",
    description:
      "An Airtable interface extension with the Puck editor inside it. Layouts are built by dragging components around and stored as JSON on a record, and the data-driven ones query the base for their own figures rather than having them typed in.",
    type: "Prototype",
    status: "Built",
    url: "https://github.com/salcommits/airtable_int_puck",
  },
  // The only row here with a page of its own: the engagement is written up as
  // Commute Analysis under /work, and this is the tool that came out of it. It
  // earns a line because the code reads on its own, without the story around it.
  //
  // Live, but pointing at source: COREP run their own instance, which is not
  // somewhere to send people, so the type says what the link actually opens.
  {
    title: "Commute Calculator",
    description:
      "A Flask app over the Google Maps distance matrix: a list of home addresses, a candidate office, a travel mode and a departure time in, everyone's commute out in one table. The code behind the COREP commute analysis. COREP run their own hosted instance of it.",
    type: "Source",
    status: "Live",
    url: "https://github.com/salcommits/python_app_commute_calculator",
  },
  // Three repositories that only work as a set, so the row carries its pieces
  // as well as a way in. The name points at the parent theme, since that is
  // where the README explaining the whole stack lives.
  {
    title: "WordPress Product Template",
    description:
      "A parent theme, a child theme and a Gutenberg block plugin, so a WordPress and WooCommerce product site starts from a stack rather than from scratch. Open source, and installed as a set.",
    type: "Source",
    status: "Live",
    url: "https://github.com/salcommits/wp_product_template_parent",
    parts: [
      {
        label: "Parent theme",
        url: "https://github.com/salcommits/wp_product_template_parent",
      },
      {
        label: "Child theme",
        url: "https://github.com/salcommits/wp_product_template_child",
      },
      {
        label: "Blocks plugin",
        url: "https://github.com/salcommits/wp_product_template_blocks",
      },
    ],
  },
];

/**
 * Sorted here rather than by hand, so a new entry can be written wherever it is
 * easiest to write and still land in the right place on the page.
 */
export const builds: Build[] = [...entries].sort((a, b) =>
  a.title.localeCompare(b.title, "en"),
);
