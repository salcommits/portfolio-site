/**
 * The things being worked on now, as opposed to the work written up under
 * /work. The difference is length rather than importance: a case study needs a
 * beginning and an end, and most of these have neither yet.
 */

/**
 * What the build is. The links under each description name their own
 * destinations, so this is the character of the thing rather than what opens:
 * whether it is a running site, a prototype standing in for one, or source to
 * take away.
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
   * The ways in, one labelled line each, set under the description rather than
   * on the name. A build might ship as three repositories, or as one with a
   * film of it running behind it, and this lets each destination say what it is
   * before it is opened. Omitted while there is nowhere to send anyone, which
   * leaves the row on its status to explain itself.
   */
  links?: { label: string; url: string }[];
};

// Arch came off the list alongside the Airtable pieces, ClipScout and the
// helpdesk agent, and all of them are in the commits behind this one if any
// wants bringing back — Arch's own write-up is still parked in `projects.ts`
// waiting for a page.
const entries: Build[] = [
  // Puck is the open-source visual editor this is built around rather than
  // anything of mine. The name says so because the pairing is the whole point
  // of the build: someone else's editor, running inside Airtable.
  //
  // The walkthrough is there because this is the one build here that cannot be
  // taken on trust from its source — dragging a layout together inside a
  // record is the whole of it, and reading the repository does not show that.
  {
    title: "Airtable Puck Extension",
    description:
      "An Airtable interface extension with the Puck editor inside it. Layouts are built by dragging components around and stored as JSON on a record, and the data-driven ones query the base for their own figures rather than having them typed in.",
    type: "Prototype",
    status: "Built",
    links: [
      {
        label: "Repository",
        url: "https://github.com/salcommits/airtable_int_puck",
      },
      {
        label: "Walkthrough",
        url: "https://drive.google.com/file/d/1Qq3VybV7W2KlCaLTgSFpmLJ497dn_NOA/view",
      },
    ],
  },
  // The only row here with a page of its own: the engagement is written up as
  // Commute Analysis under /work, and this is the tool that came out of it. It
  // earns a line because the code reads on its own, without the story around it.
  //
  // Live, but the only way in is the source: COREP run their own instance, and
  // that is not somewhere to send people.
  {
    title: "Commute Calculator",
    description:
      "A Flask app over the Google Maps distance matrix: a list of home addresses, a candidate office, a travel mode and a departure time in, everyone's commute out in one table. The code behind the COREP commute analysis. COREP run their own hosted instance of it.",
    type: "Application",
    status: "Live",
    links: [
      {
        label: "Repository",
        url: "https://github.com/salcommits/python_app_commute_calculator",
      },
    ],
  },
  // Three repositories that only work as a set, listed in the order they are
  // installed. The parent theme leads because that is where the README
  // explaining the whole stack lives.
  {
    title: "WordPress Product Template",
    description:
      "A parent theme, a child theme and a Gutenberg block plugin, so a WordPress and WooCommerce product site starts from a stack rather than from scratch. Open source, and installed as a set.",
    type: "Source",
    status: "Live",
    links: [
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
