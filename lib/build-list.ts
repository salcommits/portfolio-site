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
  /**
   * What it is written in, most defining first, in the two or three names that
   * would tell another developer what they are looking at. It sits under the
   * title for the reason the date sits beside the status: it is the question
   * the name raises, and answering it in the row saves opening the repository
   * to find out.
   *
   * Names the layer that is actually the work, not everything in the manifest.
   * A React Native app is Expo and TypeScript and twenty Expo modules, and only
   * the first two of those tell anyone anything.
   */
  stack: string[];
  type: BuildType;
  status: BuildStatus;
  /**
   * When it last moved, as `YYYY-MM`. It orders the list and it is stamped
   * beside the status, so the two read together: what state it is in, and when
   * it got there.
   *
   * Not when the repository was pushed. Several of these were dropped onto
   * GitHub years after they were written, so their first commit dates the
   * archiving rather than the work, and the real date has to come from
   * somewhere else — a write-up, or the versions the thing was pinned to.
   */
  date: string;
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
    stack: ["TypeScript", "React", "Tailwind"],
    type: "Prototype",
    status: "Built",
    // Two days in November 2025, which the walkthrough agrees with — the
    // recording is dated the second of them. The commit months later only
    // added a prompt sheet, so it dates the writing-up and not the build.
    date: "2025-11",
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
  // The one row here still being worked on, which is what Building means. The
  // shell and the rule list are what exist; the connectors, the Keychain store
  // and the audit log are the pieces going in, so the description below is what
  // the thing is for rather than a claim about what it does yet.
  //
  // Which is also why the design sits alongside the repository here and nowhere
  // else on the list: on an unfinished thing the drawings are further along than
  // the code, and they say what it is meant to do more clearly than a half-built
  // dock app can. They stay on Drive rather than being copied into public/ so
  // that revising one revises what the link opens.
  {
    title: "Automation Hub",
    description:
      "A local-first Zapier for a single Mac: a dock app watching Airtable, Slack, Notion and the machine itself — calendar, reminders, watched folders — and running rules between them. Credentials sit in the Keychain and every run is written to a local audit log, so none of it leaves the desk.",
    stack: ["Swift"],
    type: "Application",
    status: "Building",
    date: "2026-09",
    links: [
      {
        label: "Repository",
        url: "https://github.com/salcommits/automation_hub",
      },
      {
        label: "Trigger scenarios",
        url: "https://drive.google.com/file/d/1MLw1oEqqYZ3wCZ9hfhx244bXfgMTAlrs/view",
      },
      {
        label: "Event sources",
        url: "https://drive.google.com/file/d/1BWoYvnuL2CUu8pfjxXCurtC6s63cf11r/view",
      },
      {
        label: "Data model",
        url: "https://drive.google.com/file/d/1ouujNu-1TZJ1QB5tDjjSmVNg9BqDAw5K/view",
      },
    ],
  },
  // One of two rows with a page of its own: the engagement is written up as
  // Commute Analysis under /work, and this is the tool that came out of it. It
  // earns a line because the code reads on its own, without the story around it.
  //
  // Live, but the only way in is the source: COREP run their own instance, and
  // that is not somewhere to send people.
  {
    title: "Commute Calculator",
    description:
      "A Flask app over the Google Maps distance matrix: a list of home addresses, a candidate office, a travel mode and a departure time in, everyone's commute out in one table. The code behind the COREP commute analysis. COREP run their own hosted instance of it.",
    stack: ["Python", "Flask"],
    type: "Application",
    status: "Live",
    // CHECK: the year comes from the write-up, the month is a guess. Nothing in
    // the repository dates the work — its pins are older than the job and its
    // first commit is the 2026 archive push.
    date: "2023-06",
    links: [
      {
        label: "Repository",
        url: "https://github.com/salcommits/python_app_commute_calculator",
      },
    ],
  },
  // The other row with a page of its own: the engagement is written up as
  // Design System under /work, and this is the library that came out of it.
  // Named for the stack rather than the client, so a reader coming from that
  // page does not meet what looks like the same entry twice.
  {
    title: "Drupal Design System",
    description:
      "A component library for Drupal-backed sites: fifty-odd React components built on atomic principles, published out of a Lerna monorepo and joined to Drupal through a Next.js connector. The code behind the IDX design system.",
    stack: ["TypeScript", "React", "Next.js"],
    type: "Source",
    status: "Live",
    // Dated from the tooling the monorepo is pinned to — lerna 7.2, eslint
    // 8.48, yarn 3.6.2 — all of it released in the August and September of
    // 2023. The write-up said 2022 until this was worked out, and now says
    // 2023 too. The changelog in the repository is the upstream starter's, so
    // it dates that package and not this.
    date: "2023-09",
    links: [
      {
        label: "Repository",
        url: "https://github.com/salcommits/drupal-design-system",
      },
    ],
  },
  // Built rather than live: it runs, but it was never published, so there is
  // no store listing to point at and the repository is the whole of the way in.
  {
    title: "RepShuffle",
    description:
      "A gym app that puts a session together from a few answers, rather than from a plan you have to write first. React Native and Expo, so it runs on the phone rather than in a browser.",
    stack: ["TypeScript", "React Native", "Expo"],
    type: "Application",
    status: "Built",
    // Dated from what it is built on rather than from its one commit, which is
    // an archive push a year later: Expo SDK 52 and React Native 0.76.7 put the
    // project in the first months of 2025.
    date: "2025-03",
    links: [
      {
        label: "Repository",
        url: "https://github.com/salcommits/react_native_app_repshuffle",
      },
    ],
  },
  // Repository only, though it is deployed: the functions answer on their own
  // routes and the host answers nothing at its root, so a link to it would
  // land anyone who followed it on a 404. This one runs to a schedule rather
  // than to a page.
  {
    title: "Running Club Bot",
    description:
      "A Slack bot for a running club. It polls Strava hourly for every member, files each activity into Airtable, and posts the new runs, a Monday leaderboard and a mid-week nudge back into the channel.",
    stack: ["Python", "HyperAgent"],
    type: "Application",
    status: "Live",
    date: "2026-05",
    links: [
      {
        label: "Repository",
        url: "https://github.com/salcommits/check-new-runs",
      },
    ],
  },
  // The one row you are already inside, which is why the repository is the
  // only link on it: pointing at the live site from the live site would lead
  // back to this page. Started in August and committed to most days since, so
  // the date is this month for the same reason every other date here is the
  // month the thing last moved.
  {
    title: "This Site",
    description:
      "The site this list sits on. Next.js and Sass, with every page built before anyone asks for it and the writing kept in a TypeScript file rather than a CMS, so a change to the copy is a commit. Deployed on Heroku.",
    stack: ["Next.js"],
    type: "Site",
    status: "Live",
    date: "2026-09",
    links: [
      {
        label: "Repository",
        url: "https://github.com/salcommits/portfolio-site",
      },
    ],
  },
  // The oldest thing here by years — forty-eight hours of pair programming on
  // the General Assembly course in the certificates section — and still up,
  // which is most of why it earns a line. The game leads the links, since
  // playing it is the point and the code behind it is coursework.
  {
    title: "Trump vs Kanye",
    description:
      "A quiz that shows a quote and asks who said it. Two public quote APIs behind one React front end, built to a two-day hackathon brief.",
    stack: ["React", "Sass"],
    type: "Application",
    status: "Live",
    // Dated from its dependencies, all of which are spring 2020: React 16.13.1,
    // react-scripts 3.4.1, axios 0.19.2. That is the course's second project,
    // which is also what the repository was called.
    date: "2020-05",
    links: [
      { label: "Live game", url: "https://trump-vs-kanye.netlify.app/" },
      {
        label: "Repository",
        url: "https://github.com/salcommits/react_app_dictatorship",
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
    stack: ["PHP", "Sass", "Gutenberg"],
    type: "Source",
    status: "Live",
    // The year is confirmed, the month is nominal: nothing in the three
    // repositories dates them, and the themes only name Carno as their author.
    // Mid-year is where it sits until there is a reason to move it.
    date: "2024-06",
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
 * Newest first, and sorted here rather than by hand so a new entry can be
 * written wherever it is easiest to write and still land in the right place.
 * `YYYY-MM` sorts correctly as text, so the dates need no parsing to compare.
 * Two in the same month fall back to their names, which keeps the order stable
 * rather than down to which was typed first.
 */
export const builds: Build[] = [...entries].sort(
  (a, b) =>
    b.date.localeCompare(a.date) || a.title.localeCompare(b.title, "en"),
);
