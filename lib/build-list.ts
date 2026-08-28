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

// Down to the one entry that is ready to be read about. The Airtable pieces,
// ClipScout and the helpdesk agent were all written up here first — they are in
// the commit before this one if any of them wants bringing back.
const entries: Build[] = [
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
];

/**
 * Sorted here rather than by hand, so a new entry can be written wherever it is
 * easiest to write and still land in the right place on the page.
 */
export const builds: Build[] = [...entries].sort((a, b) =>
  a.title.localeCompare(b.title, "en"),
);
