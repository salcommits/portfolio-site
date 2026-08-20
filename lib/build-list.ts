/**
 * The things being worked on now, as opposed to the work written up under
 * /work. The difference is length rather than importance: a case study needs a
 * beginning and an end, and most of these have neither yet.
 */

/**
 * What is at the other end of the link, so it is clear before clicking whether
 * this is something to use, something to look at, or somebody talking over it.
 */
export type BuildType = "Prototype" | "Site" | "Application" | "Walkthrough";

/** Where it has got to. Deliberately four words, so the column stays scannable. */
export type BuildStatus = "Building" | "Testing" | "Live" | "Paused";

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
};

/**
 * CHECK: stands in for the real destinations, so the rows read as they will once
 * they have somewhere to go. Every entry points at it, so this is the one line
 * to search for when the links arrive.
 */
const PLACEHOLDER = "https://google.com";

// The Airtable pieces live in public repos rather than at a URL of their own, so
// if a repo counts as somewhere to send people, `BuildType` wants a "Code"
// member.
const entries: Build[] = [
  {
    title: "Airtable Base Health Check",
    description:
      "Audits any Airtable base for structural and data-quality problems, then scores it out of a hundred with the findings ordered by what is worth fixing first.",
    type: "Application",
    status: "Live",
    url: PLACEHOLDER,
  },
  {
    title: "Airtable Running Club",
    description:
      "A running club that lives in Airtable and talks in Slack: Strava activities posted as they land, a leaderboard every Monday morning, and a couple of nudges midweek.",
    type: "Application",
    status: "Live",
    url: PLACEHOLDER,
  },
  {
    title: "Airtable Time Machine",
    description:
      "Reconstructs what actually happened inside a base — who made what, when, and where the audit log holds the rest — and writes it up as a timeline you can read rather than a log you have to parse.",
    type: "Application",
    status: "Building",
    url: PLACEHOLDER,
  },
  {
    // The one entry here that already has a write-up drafted, parked in
    // `projects.ts` until it is finished enough to have a page.
    title: "Arch",
    description:
      "Scheduled agents that read the calls, Slack and email on a partner-delivered account, keep a plain-language activity log, and raise a risk only where there is evidence enough to write it properly.",
    type: "Prototype",
    status: "Building",
    url: PLACEHOLDER,
  },
  // CHECK: these two are from your own list and the names are yours, but the
  // descriptions are drafted from the names alone — worth rewriting.
  {
    title: "ClipScout",
    description:
      "Watches long-form footage for the moments worth cutting and hands back clips with their timestamps, rather than a transcript to read through first.",
    type: "Prototype",
    status: "Building",
    url: PLACEHOLDER,
  },
  {
    title: "Helpdesk Agent",
    description:
      "Triages inbound support tickets, drafts the reply, and passes on only the ones that actually need a person.",
    type: "Prototype",
    status: "Testing",
    url: PLACEHOLDER,
  },
];

/**
 * Sorted here rather than by hand, so a new entry can be written wherever it is
 * easiest to write and still land in the right place on the page.
 */
export const builds: Build[] = [...entries].sort((a, b) =>
  a.title.localeCompare(b.title, "en"),
);
