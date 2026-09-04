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
  /**
   * Where the work landed, for anything that was one stage of a longer
   * programme. Set after the solution rather than folded into `detail`: it is
   * the outcome of the phase, and the page would otherwise describe what was
   * designed without saying whether it held.
   */
  completion?: string;
  detail: string[];
  /**
   * Letterboxed art at the head of the page. Omitted where there is nothing to
   * show — work that was a script or a programme rather than an interface — and
   * the page then opens on its title instead.
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
    /**
     * Names the plate instead of numbering it, for something that belongs on
     * the page but isn't a screen of mine — a page elsewhere the work is still
     * sitting on. Kept out of the count for the same reason a film is: the
     * count is of designs.
     */
    mark?: string;
    /**
     * A film rather than a still, for work whose point is that it was running
     * somewhere. `src` carries a frame from it, which holds the plate's space
     * before the film arrives and is what anyone who never plays it sees.
     *
     * It takes its turn in the run like a screen, but not a number: the count
     * is of screens, and this is footage of them.
     */
    video?: string;
  })[];
  /**
   * The work being done rather than the thing built: photographs, for pages
   * where what was delivered belongs to the client and can't be shown. Kept
   * apart from `gallery` because that run counts designs and sizes tall page
   * captures to a common height, and these are neither.
   */
  photos?: (Shot & {
    caption: string;
    /**
     * Described properly rather than left to the caption. A screen's caption is
     * its name, so it stands in for alt text; a photograph's caption is a place
     * or a subject, which tells you nothing about what is in the picture.
     */
    alt: string;
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
   * The list a write-up closes its account with, under a heading of its own.
   * `label` is set by the project because the claim isn't the same on all of
   * them: work that launched reports what moved after it, and a phase that
   * handed over reports what it was contracted to produce.
   *
   * Where the label is a results claim, the items are directions rather than
   * figures: the briefs record which measures rose, not by how much, and a
   * number nobody can stand behind is worth less here than a list that is true.
   */
  rundown?: {
    label: string;
    note: string;
    /**
     * A line, or a line that leads somewhere. The linked form is for a rundown
     * that lists work rather than claims — other pages on this site, and
     * anything that only exists off it.
     */
    items: (string | { text: string; href: string })[];
  };
  /**
   * The client's own words, on a plate of their own. Attributed, because an
   * unattributed quote reads as something the site wrote about itself.
   */
  testimonial?: {
    /**
     * Set at display size beside the quote. On a page with no screens this is
     * the only place the client is named at scale, which is the job the display
     * plate does in a gallery.
     */
    client: string;
    /**
     * One remark, or several where the feedback came back as separate answers
     * rather than as a paragraph. Each keeps its own quotation marks: running
     * them together would read as one person talking at length, which is not
     * what a form of them is.
     */
    quote: string | string[];
    name: string;
    /**
     * Their standing at the client, so the name alone isn't doing the work.
     * Required rather than optional: a quote is attributed to a real person, and
     * the field being here is what forces the title to be asked for instead of
     * guessed at.
     */
    role: string;
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
          "Morgan Latif's site brought in very little traffic and almost no candidate activity, so their pipelines ran almost entirely through consultants. That holds while a business stays the size it is. Theirs was growing fast, and a pipeline carried by people needs proportionally more people to carry it — every new mandate asking for consultant time that the brand's own demand should have been absorbing, while that demand went to competitors instead.",
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
          "Worth saying plainly: low traffic never meant a weak candidate network. It meant the network was being carried by people rather than by the site. With the mandates growing and organic candidate acquisition flat, that carrying simply costs more consultant time — which is the case for building this, more than any figure on a dashboard.",
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
        rundown: {
          label: "After 90 days",
          note: "Everything the team were watching moved the same way:",
          items: [
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
      // Also delivered at Carno. The client names itself in the write-up, and
      // the site ships under that name, so the title is the name.
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
        url: "https://hypedmgt.co",
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
        rundown: {
          label: "After 90 days",
          note: "The measures the agency watches all moved the same way:",
          items: [
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
      // GSK is named in the write-up, so the comment only carries what the page
      // doesn't: these captures are the kiosk's own landscape, which is why
      // their plates are set by width rather than to the common height the tall
      // page captures above take.
      {
        slug: "touchscreen-platform",
        title: "Touchscreen Platform",
        shortTitle: "Touchscreens",
        summary:
          "A self-service touchscreen application covering five clinical topic areas, built for GSK and deployed at two global pharmaceutical events.",
        challenge:
          "GSK needed something that could stand on a conference floor and be used without anybody staffing it. The content is what made that hard: adult immunisation — aging immunity, the value of vaccination, herpes zoster, RSV — clinical material a specialist audience would work through at their own pace, with nobody beside the screen to steer them past a wrong turn. Work of this kind arrives with its own constraints as well. Several physical screens, conference dates that don't move, and every asset on them cleared through regulatory sign-off before it can be shown.",
        meta: {
          service: "Build & Development",
          industry: "Pharmaceutical & life sciences",
          year: "2023",
        },
        // The events themselves were international, but the mark is for who the
        // work was for rather than where it was shown — and the entity that
        // signs the footer of every screen in it is the Belgian one.
        country: "Belgium",
        approach:
          "Designed and built the whole of it: the interaction flow — menu, topic cards, infographics, slide decks, video, an interactive world map — the idle logic that returns a screen to its welcome state once it has been left alone, and the build underneath. Turnarounds were short and the same work had to appear on several screens across more than one event, so it was structured to be replicated and redeployed rather than started again each time. Hosting and uptime stayed with me afterwards.",
        solution:
          "A touchscreen application covering five clinical topic areas, each opening into its own set of infographics, slide decks and video, with a standalone interactive world map alongside it. Deployed at two global pharmaceutical events, with interaction tracked and heatmapped so the screens reported back which content was actually being used on the floor.",
        detail: [
          "The hard part was never a single screen. It was making the whole thing behave as a public kiosk: returning to the welcome screen after a set period of inactivity, holding five parallel branches of content without the navigation coming apart in one of them, and staying on-brand and compliant down to the reference codes in the footer of every screen.",
          "The heatmaps then said which topics and which formats attendees actually spent time on, and that fed into how later builds for other enterprise clients were put together.",
        ],
        cover: {
          src: "/work/touchscreen-platform/welcome.png",
          width: 1024,
          height: 573,
        },
        // In the order somebody at the screen met them: the welcome state, the
        // thing running on the floor, the menu it opens onto, one topic's
        // content, then the map that ran as a tool of its own.
        gallery: [
          {
            caption: "Welcome",
            src: "/work/touchscreen-platform/welcome.png",
            width: 1024,
            height: 573,
          },
          // The only asset here that isn't the design itself: the kiosk in the
          // venue, mid-use, on somebody's phone. Second, so what the rest of the
          // run is a set of screens from is established early.
          {
            caption: "On the floor",
            src: "/work/touchscreen-platform/on-the-floor.jpg",
            video: "/work/touchscreen-platform/on-the-floor.mp4",
            width: 640,
            height: 352,
          },
          {
            caption: "Main menu",
            src: "/work/touchscreen-platform/main-menu.png",
            width: 1024,
            height: 575,
          },
          {
            caption: "Age slider",
            src: "/work/touchscreen-platform/age-slider.png",
            width: 1024,
            height: 542,
          },
          {
            caption: "World map",
            src: "/work/touchscreen-platform/world-map.png",
            width: 1024,
            height: 726,
          },
        ],
      },
      // IDX is named in the write-up, since the challenge is about the product
      // rather than about a site built on it. No screens: what shipped was a
      // library of components, and a component out of the page it was used on
      // photographs as a button on a white ground.
      {
        slug: "design-system",
        title: "Design System",
        summary:
          "A modular React component library replacing the rigid Drupal templates behind IDX, the product carrying 3,000+ public company applications.",
        challenge:
          "IDX, the core Drupal product behind more than 3,000 public company applications, had gone out of date. It could not be upgraded without one-off fixes paid for a site at a time, and every delivery cycle ran longer than it needed to because of it.",
        meta: {
          service: "Build & Development",
          // Confirmed as the guess in the brief: IDX carries corporate and
          // investor sites, so the industry is the one its clients report into.
          industry: "Investor relations & corporate communications",
          // Corrected from 2022. The library itself is on the build list, and
          // the tooling it is pinned to — lerna 7.2, eslint 8.48, yarn 3.6.2 —
          // was all released in the August and September of 2023.
          year: "2023",
        },
        country: "UK",
        approach:
          "Owned the frontend contribution end to end, from designing the system through to building it, and worked with the design teams to settle a new architecture: a modular React component library — Next.js and TypeScript, styled with Theme UI — sitting on the existing Drupal backend through a Next-Drupal integration layer. The rigid templates gave way to atomic, reusable components that mirror the design team's own Figma system.",
        solution:
          "A component-based design system of 50+ components, structured on atomic design: atoms for colour, grid, icons, spacing and typography, molecules for buttons, navigation, accordions and text links. It launched into the business and went out onto corporate websites, which gave the product a clear upgrade path and cut delivery time well below what the old approach took.",
        detail: [
          "The fix wasn't a like-for-like rebuild, it was decoupling. Each component was built, tested and versioned on its own inside a Lerna and Yarn monorepo, with Jest snapshot tests catching regressions before they shipped. The Next-Drupal connector meant content types on the Drupal side could feed the React frontend directly, so the two ends no longer had to be rebuilt in lockstep.",
          "That is what let 50+ components update modularly across 3,000+ applications, rather than the old monolithic build being put at risk every time one thing needed to change. On a product carrying that many sites, how risky a change is to make is what actually sets how often anyone makes one.",
        ],
      },
    ],
  },
  {
    index: "00-2",
    title: "Solutions Architecture",
    summary:
      "Working out how the pieces should fit, and what each choice will cost later on.",
    projects: [
      // Delivered at Airtable. Daily Mail Group names itself in the write-up, so
      // the comment only carries what the page doesn't: there are no screens
      // because the work lives inside the client's own platform, and a national
      // newsroom's unpublished stories are not mine to show.
      {
        slug: "editorial-platform",
        title: "Editorial Platform",
        shortTitle: "Editorial",
        summary:
          "An Airtable platform unifying story creation and publication across 30+ editorial desks at Daily Mail Group, in print and digital.",
        challenge:
          "Daily Mail Group ran story creation and publication across 30+ desks, spanning print and dailymail.co.uk, with no one connected system tying the workflow together. At that scale that is a bottleneck rather than an inconvenience: consistency and speed matter as much as editorial judgement.",
        meta: {
          service: "Solutions Architecture",
          industry: "Media & publishing",
          // CHECK: taken from the Team of the Year FY26 award for this account,
          // which the awards section dates 2025-26. Swap it for the year the
          // platform actually went in if that isn't the same.
          year: "2026",
        },
        country: "UK",
        approach:
          "Owned end to end: discovery, design, build, deployment and adoption. Discovery ran as high-level user flows, wireframes and concept mapping, scoped onsite with the editorial teams themselves — then technical scoping for the publication integrations on both sides, digital and print, and an archiving layer built to hold the volume a national newsroom generates. A working prototype was live for the primary desk within six weeks, and the iterations after it went out desk by desk, with adoption supported across all 30+ group-wide.",
        solution:
          "An Airtable platform that unified story creation and publication into one system: one place where a story is written, reviewed and put out, in print and online. Not a tool sitting beside the newsroom's core workflow — the workflow itself. A second, smaller solution followed for the social team, tracking posts at their own volume, which took the platform past editorial and into distribution.",
        // Both numbers are the supplier's own: what the programme cost against
        // what it was budgeted, and how much of the delivery team was billable
        // and active on it. BATP is named as it arrives and then explained in
        // the line after, because the initials decode to nothing outside the
        // account and the reason the figure is here at all is that it is high.
        completion:
          "The programme closed under budget — a project efficiency score of 1.03 against a target of 1.00 — and held 86.7% BATP across the trailing 90 days. Billable active team percentage is the share of the delivery team actually booked and working on the account, and 86.7% across ninety days is a high one to hold. It took Team of the Year internally for the account.",
        // Carries the countables so the solution above can say what the thing is
        // rather than what it holds. Present, the delivery figure behind it, and
        // what was planned next, all in one list — which the note is there to
        // set up: the point of ending here is that the platform is still being
        // extended, not that it landed and stopped. BATP is in the prose above
        // as well, because that is where it gets explained and this is where it
        // gets found.
        rundown: {
          label: "Where it stands",
          note: "What the platform carries now, how the delivery ran, and what was already being planned on top of it:",
          items: [
            "1,137 enterprise seats across the group",
            "30+ editorial desks on one core system",
            "1,000+ articles a day, digital and print",
            "86.7% BATP across the trailing 90 days",
            "500 further seats in planning",
            "Rollout now taking in Metro and the i paper",
            "Further editorial workflows behind them",
          ],
        },
        testimonial: {
          client: "Daily Mail Group",
          quote:
            "What a brilliant collaboration this has been. Everyone has been super helpful and proactive — and we've come so far together in just six months. It really could not have been done without everyone helping us to collectively get to a great solution.",
          name: "Simon Regan-Edwards",
          role: "Product Director",
        },
        detail: [
          "Discovery had to run across editorial and technical stakeholders at the same time. The flows and the wireframes were tested against how the desks actually worked rather than how the process was written down, and validated onsite before any of it was built.",
          "Landing a working prototype for the primary desk in six weeks set the pattern for everything after it: each new desk came onto the same core system rather than getting a build of its own. That is what let adoption reach 30+ desks and 1,100+ seats without the archiving layer, or the print and digital integrations, needing to be reworked on the way.",
        ],
      },
    ],
  },
  {
    index: "00-3",
    title: "Project Leadership",
    summary:
      "Looking after delivery: the planning, the people, and keeping everyone pointed the same way.",
    projects: [
      // Delivered at Airtable. DHL names itself in the write-up, so the comment
      // only carries what the page doesn't: there are no screens on this one
      // because the work was a design phase inside a client's own platform, and
      // none of what it produced is mine to publish.
      {
        slug: "warehousing-platform",
        title: "Warehousing Platform",
        shortTitle: "Warehousing",
        summary:
          "A three-month design phase moving DHL's warehousing workflows off spreadsheets and onto a governed Airtable platform.",
        challenge:
          "DHL's warehousing division was running its core commercial and operational workflows through spreadsheets — workable at the scale they began at, but not built to hold across multiple regions and teams, or the scale DHL was moving towards.",
        meta: {
          service: "Project Leadership",
          industry: "Logistics & supply chain",
          year: "2026",
        },
        // CHECK: the offsites were in Frankfurt and the division is DHL's, but
        // the regional teams were spread wider than one country. Swap this for
        // the region if Germany reads too narrow for what the work covered.
        country: "Germany",
        approach:
          "A three-month design phase, run with DHL's leadership and their eMerge regional teams and including offsites in Frankfurt with the warehousing division, to map the end-to-end proposal and pricing process onto Airtable — from how volumes get forecast, through the hours and resourcing that volume drives, to the rate card DHL ultimately sends the customer. It ran alongside the data modelling teams reshaping the underlying process, rather than recreating the spreadsheets in a new tool. Delivery was cross-divisional: a combined team of 15+ across delivery partners and Airtable's own.",
        solution:
          "A phased design foundation for moving DHL's core workflows off Excel and onto a governed Airtable platform — validated with leadership, and drawn to hold as it scaled.",
        completion:
          "The design phase closed with signed-off architecture and a validated approach, clearing the way for DHL to commit to the next phase — a build, test, deployment and early-support programme running close to a year in total. DHL doesn't fund a multi-phase enterprise build off a design phase that hasn't proven itself.",
        // The phase's own contracted artefacts, kept at the level the headings
        // in the statement of work set them at. The tiers below that name
        // Airtable's and DHL's internal components, which is detail a public
        // page has no business carrying.
        rundown: {
          label: "Design deliverables",
          note: "The phase was contracted against a fixed set of artefacts, signed off before the build could start:",
          items: [
            "High-level design: architecture, data and integrations",
            "Low-level design: schemas, formulas and module specs",
            "Interface specifications and mockups, by persona",
            "To-be process maps for every module",
            "A working prototype validating the data model",
            "Governance model and architecture decision records",
            "Test and performance strategy for the build",
          ],
        },
        // No screens on this one, so the pictures are of the phase itself: the
        // room it was run in, and one of the flows being worked through in it.
        photos: [
          {
            caption: "Frankfurt",
            alt: "The DHL warehousing team and the delivery team together at the end of an offsite in Frankfurt.",
            src: "/work/warehousing-platform/frankfurt.jpg",
            width: 1024,
            height: 768,
          },
          {
            caption: "Volume drivers",
            alt: "Presenting a data volume driver flow to the room, mapping what sets the volumes a tender is priced from.",
            src: "/work/warehousing-platform/volume-drivers.jpg",
            width: 1024,
            height: 768,
          },
        ],
        detail: [
          "The core problem wasn't really the spreadsheets. DHL's tender process runs on a chain: work out expected volumes, turn those into the hours and resourcing needed to deliver them, then turn that cost base into a rate card the customer sees. Each step depends on the one before it, and in Excel that chain lived across different files maintained by different people, which is where consistency broke down. The design work was redrawing it as one connected system rather than a like-for-like port of the spreadsheets.",
          "The account went on to grow from an initial pilot to 600+ licences and 3,000+ billable hours of delivery within the year — one of the larger enterprise engagements run during my time at Airtable.",
        ],
      },
      // Delivered at Airtable. Publicis Media name themselves in the write-up,
      // and the internal award the copy mentions is the AI Solution of the Year
      // in the awards section — the same work, sitting under the client's name
      // for it there.
      {
        slug: "activation-platform",
        title: "Activation Platform",
        shortTitle: "Activation",
        summary:
          "An AI-driven media activation platform for Publicis, grown from a $15k pilot into a $1.8m licensing and services deal inside a year.",
        challenge:
          "Publicis's media planners and activators were running campaigns for a long list of clients across a long list of regions on whatever was to hand: spreadsheets, trackers built for one team, and no consistent view of what was live or on track. It began as a small bespoke build for a single team, which meant it had to prove itself before anyone would back it at group scale.",
        meta: {
          service: "Project Leadership",
          industry: "Media & advertising",
          // The year the two Publicis awards in the awards section are dated,
          // both of which came off this account.
          year: "2025",
        },
        // CHECK: the account ran out of London, and the event in the photograph
        // was there, but the rollout went into global markets. Swap this if the
        // mark should read wider than one country.
        country: "UK",
        approach:
          "Led the first build — a $15k bespoke engagement — and grew it into a $1.8m licensing and services deal inside twelve months. Pilot deployments ran with P&G and Nestlé before the rollout went into global markets. Partners were upskilled and onboarded alongside it, so deployments and the managed service behind them could keep growing without the delivery team having to scale one-for-one with the client base.",
        solution:
          "An AI-driven activation platform giving planners and activators one consistent way to run campaigns across clients and regions, in place of a spreadsheet per team. It was on roughly 1,000 licences by the time the account was handed over, against a stated ambition of 10,000 inside three years.",
        completion:
          "A $15k pilot became a $1.8m licensing and services deal in twelve months, and two pilot clients became global markets. The work closed at 5/5 CSAT across project management, expertise, delivery and adoption, and took an internal Airtable award for AI-driven solutions. The client has since presented it on stage at several events, including an Airtable evening in London.",
        // Where it got to after the handover, and the one item that is about the
        // way it was built rather than the platform: the delivery model is what
        // the rest of the list is downstream of.
        rundown: {
          label: "Where it stands",
          note: "Where the platform has got to since the handover, and what the way it was built changed:",
          items: [
            "1,000 licences, on a stated path to 10,000",
            "20+ critical accounts across Publicis",
            "Implementation time down by roughly 90% on a traditional build",
            "Deployments and the managed service run by partners",
          ],
        },
        // No screens on this one — the platform is the client's own, and what it
        // holds is their campaign work. The picture is the client presenting it,
        // which is the part of this that is mine to show.
        photos: [
          {
            caption: "Airtable London",
            alt: "The client presenting the platform on stage to a full room at an Airtable event in London, under a slide reading that real transformation begins with pain points, not platforms.",
            src: "/work/activation-platform/on-stage.jpg",
            width: 1024,
            height: 768,
          },
        ],
        // Two answers from the client's feedback round rather than one piece of
        // speech, which is why they are set as two.
        testimonial: {
          client: "Publicis Media",
          quote: [
            "It felt like we were working as one extended team rather than a vendor–client relationship. The level of engagement, transparency, and commitment to outcomes deserves real credit.",
            "The team brought deep technical expertise, particularly in Airtable architecture and automation logic... Their ability to learn our business quickly and translate that into scalable solutions was impressive.",
          ],
          name: "Rami Faouzi",
          role: "Head of Global Distributed Delivery",
        },
        detail: [
          "The growth is the part worth explaining. A $15k build for one team doesn't become a group-wide platform because it worked; it becomes one because the next team that needs it can be given it without the people who built it being in the room. That is what the partner onboarding was for — deployments and the managed service run by people trained to run them, which is the only version of this that reaches twenty-odd accounts.",
          "The delivery model came out of building the thing rather than being drawn up first, and it is what makes the implementation time defensible now: roughly a tenth of a traditional build, which changes what a client is prepared to pilot in the first place. The clearest sign it landed is that the client took it on stage themselves, and the case they made there was that transformation starts with the pain points a team already has rather than with the platform someone sells them.",
        ],
      },
      // The business was mine rather than a client's, so there is nobody to
      // name in a comment here. What the page doesn't say is that most of the
      // work it sold is written up elsewhere in these categories — which is
      // what the list on it points at, and why the one plate is the podcast
      // rather than a screen. The screens belong to those pages.
      {
        slug: "founder",
        title: "Founder",
        summary:
          "Founding and running Carno Communications, a digital consultancy: eight clients and thirteen projects sold inside the first twelve months.",
        challenge:
          "Starting a consultancy from nothing means the whole of it is one person's job: sales, marketing, product, delivery, and the admin underneath all of that. What makes it the difficult part rather than just the busy part is that none of it can show in the work. GSK were a client inside the first year, and a pharmaceutical company buying software for a global conference is buying the same standard from a business of one as from a business of two hundred.",
        meta: {
          service: "Project Leadership",
          industry: "Digital consultancy",
          // The only open-ended year on the site, because this is the only entry
          // that hasn't finished. Dated from the first full year of client work:
          // the GSK builds and the podcast are both 2023.
          year: "2023 — present",
        },
        country: "UK",
        approach:
          "Carno Communications, run end to end — sales, marketing, product development, delivery, admin — with the client work delivered by the same pair of hands. Growth was planned rather than reacted to: targets set in advance, decisions made against what the numbers actually said, terms negotiated rather than discounted to get to a yes. Two things came out of working that way. A templated web application, so a new project started from a foundation rather than an empty repository. And demand generated somewhere other than outbound — the Virtual Coffee podcast, sitting down with people working in digital and tech, and turning up in the same networking rooms often enough to be known in them. Commercial terms and client relationships stayed with me throughout.",
        solution:
          "Eight new clients and thirteen projects sold inside twelve months: GSK, two touchscreen applications for pharmaceutical events; COREP, an automation tool standing in for a commute analysis that had been done by hand; Morgan Latif, a recruitment site with an integrated ATS. Quarterly goals met throughout, and the year closed with net profit 29% over target.",
        // The podcast opens the run rather than a screen, because it is the part
        // of the approach that would otherwise be a claim about marketing rather
        // than a thing anyone can go and listen to. The two homepages behind it
        // are clients with no write-up of their own — the count starts at them,
        // since they are the designs here.
        gallery: [
          {
            caption: "Virtual Coffee",
            mark: "/ podcast",
            src: "/work/founder/podcast.jpg",
            width: 1000,
            height: 668,
          },
          {
            caption: "Francesca Oddie",
            src: "/work/founder/francesca-oddie.jpg",
            width: 491,
            height: 1024,
          },
          {
            caption: "Moses Motorcycles",
            src: "/work/founder/moses-motorcycles.jpg",
            width: 554,
            height: 1024,
          },
        ],
        // The one rundown on the site that points somewhere rather than claiming
        // something: the work is the argument here, and most of it has a page of
        // its own a click away. Each item names the client and the page it leads
        // to, except Hyped — that site ships under the client's own name, which
        // is also the title of its write-up.
        rundown: {
          label: "The work",
          note: "Four of the thirteen are written up here in full, and the podcast is still up:",
          items: [
            {
              text: "GSK — Touchscreen Platform",
              href: "/work/touchscreen-platform",
            },
            { text: "COREP — Commute Analysis", href: "/work/commute-analysis" },
            {
              text: "Morgan Latif — Recruitment Platform",
              href: "/work/recruitment-platform",
            },
            { text: "Hyped", href: "/work/hyped" },
            {
              text: "Virtual Coffee — the podcast",
              href: "https://open.spotify.com/show/5WYDwwOUevomZ2ui5aldwI",
            },
          ],
        },
        detail: [
          "Running the business and delivering the work were the same job most quarters. Sales, marketing and product development had to fit around whatever client work was live at the time, and quarterly planning is what kept that honest: set the target, track the effort that actually went into it, then set the next quarter off what happened rather than off what had been hoped for.",
          "That is also what made the case for a base product. Quoting and building similar sites from scratch, over and again, made it plain that a templated foundation would take time off every project after the first — which is what let the business carry more clients without the hours climbing at the same rate.",
        ],
      },
    ],
  },
  {
    index: "00-4",
    title: "Automation & Integration",
    summary:
      "Making systems talk to each other that were never really meant to.",
    projects: [
      // Delivered at Carno. COREP is named in the write-up, so the comment only
      // carries what the page doesn't: there are no screens on this one because
      // the work was a script, and the whole of its interface is a box you paste
      // a list of postcodes into.
      {
        slug: "commute-analysis",
        title: "Commute Analysis",
        summary:
          "A hosted Python tool that turns a team's postcodes into real commute data for every office on a shortlist.",
        challenge:
          "COREP advise businesses on the buildings they work from — thirty-odd people, acting mostly for occupiers large enough that a move is a programme rather than a decision. Part of that work is narrowing a shortlist to A, B or C, and one of the things that settles it is what each option would do to the people already there: how far everyone would now be travelling, and whether that holds up when somebody asks. Getting to the answer meant working through the team's postcodes by hand, a route at a time, for every building still in the running.",
        meta: {
          service: "Automation & Integration",
          industry: "Commercial real estate",
          year: "2023",
        },
        country: "UK",
        approach:
          "Software for this exists, and COREP had priced it. It was expensive, and it answered a much larger question than the one being asked — a platform, where what they wanted was an answer. So the brief arrived as a problem rather than a specification: work out what the thing actually has to do, then build it. Most of the value turned out to sit in deciding how little that was.",
        solution:
          "A Python script hooked to the Google Maps API, hosted so that using it is a matter of pasting in a list. It takes the postcodes the business already holds for its team and the addresses on the shortlist, and returns real commute times for every pairing, option by option. Twenty hours or more come back on a typical evaluation — across a year of them, near enough a full-time person.",
        detail: [
          "Transport mode is a setting rather than a rebuild, so the same list can be read as driving on one run and public transport on the next, and it holds up over data sets far larger than the manual version could face. Every route is also a paid call, so the script keeps its own ceiling — batching what it asks for, and holding the limit itself rather than trusting whoever is running it to be careful. Beyond those calls there is nothing to pay for: no seats, no licence, no renewal to defend next year.",
          "It is small enough to read start to finish, which is what makes it maintainable rather than mine. The people using it can see what it does, and changing it when the question changes is an afternoon rather than a procurement exercise.",
          "Under a week from brief to working tool, which was mostly a matter of agreeing what it did not need to do. The platform on the market would have done a great deal more than this one does. This one did the thing they were actually doing by hand.",
        ],
        testimonial: {
          client: "COREP",
          quote:
            "We tasked Liam with a slightly unusual task that required a complex mix of coding and website creation. We weren't actually sure if it was possible, however Liam built a fantastic, fool proof tool in less than a week. I couldn't speak more highly about his personable nature and unique skillset. Thanks again Liam!",
          name: "Matt Swash",
          role: "Founder",
        },
      },
    ],
  },
  {
    index: "00-5",
    title: "Technical Strategy",
    summary:
      "Thinking about what is worth building, in what order, and what it means a few years out.",
    projects: [
      // Delivered inside Imagination, who name themselves in the write-up. What
      // the page doesn't say is that the client was the business itself: the
      // fifteen were their own projects and the board being sold to was their
      // own, which is also why there is nothing to show — the work was fifteen
      // documents, and their contents were the company's plans.
      {
        slug: "innovation-roadmap",
        title: "Innovation Roadmap",
        shortTitle: "Roadmap",
        summary:
          "Fifteen board-ready proposals for emerging technology investment — VR, AR and AI — scoped for Imagination's Global CTO in four months.",
        challenge:
          "Imagination's Global CTO office needed a pipeline of investment-ready proposals for emerging, human-centric technology — virtual reality, augmented reality, AI — that a board could actually evaluate and sign off, each with its own scope, timeline and cost estimate. All of it inside a four-month window.",
        meta: {
          service: "Technical Strategy",
          industry: "Creative technology & experience design",
          year: "2020",
        },
        country: "UK",
        approach:
          "Worked directly with the Global CTO to scope fifteen major internal projects: pulling requirements and estimates out of teams across the business, then turning each one into a project initiation document — technical specification, timeline, cost estimate — in a state a board could review. Each was presented to the C-suite in person, with the case for it made there rather than left on the page. Two of the fifteen give the range: a technology refresh for the London office, building tailored client-facing experiences on what Imagination already had, and a rebuild of the company's own key marketing assets.",
        solution:
          "Fifteen board-ready work streams spanning virtual reality, augmented reality, AI and other human-centric technology — each scoped, estimated and put in front of the board for sign-off inside four months.",
        detail: [
          "The constraint was never any single proposal. It was volume and pace: fifteen concurrent scopes, each drawing its requirements from a different internal team, each needing to be translated out of fast-moving emerging technology and into a business case that would hold up with a board reading it on paper.",
          "Working directly with the Global CTO is what kept the fifteen consistent in format and rigour, rather than each one reading like whoever had written it. That mattered more than it sounds: they were being reviewed side by side, and a set that varies in shape gets read as a set that varies in quality.",
        ],
      },
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

/**
 * What the hero points at. Named rather than taken from the top of the list,
 * because which project leads the page and which order the works section lists
 * them in are two separate decisions. Falls back to the first written up, so the
 * hero still has something to point at if this slug ever stops existing.
 */
export const recentProject: Project | undefined =
  getProject("commute-analysis") ?? projects[0];

export function getCategoryFor(slug: string) {
  return categories.find((category) =>
    category.projects.some((project) => project.slug === slug),
  );
}
