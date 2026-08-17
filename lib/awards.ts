export type Certificate = {
  /**
   * Stands in for the certificate artwork, which hasn't been gathered yet. The
   * card is set to read as the certificate itself, so swap this for an image
   * when the artwork lands rather than adding one alongside.
   */
  tint: string;
  title: string;
  /** Recipient, with the client in brackets where the award names one. */
  name: string;
  year: string;
  /**
   * The figure the award carried, where it had one. Set apart at the foot of
   * the card, since the superscript beside the title is now always a count.
   */
  prize?: string;
};

export type Award = {
  slug: string;
  title: string;
  certificates: Certificate[];
};

const NAME = "Liam Atkins";

// Confirmed: Services MVP, Team of the Year, the $1 Million Club, the AI
// Solution prize and the scholarship. The rest follow the same shape with the
// details guessed from the copy deck, so check every title, client and year
// before this goes live.
export const awards: Award[] = [
  {
    slug: "mvp",
    title: "MVP",
    certificates: [
      // CHECK: the deck dates this Q3 FY25 but doesn't name the award or client.
      {
        tint: "#cbb6ef",
        title: "EMEA MVP FY25",
        name: NAME,
        year: "2024-25",
      },
      {
        tint: "#b6d4ef",
        title: "Services MVP FY26",
        name: NAME,
        year: "2025-26",
      },
    ],
  },
  {
    slug: "team-of-the-year",
    title: "Team of the Year",
    certificates: [
      {
        tint: "#b6efc9",
        title: "Team of the Year FY26",
        name: `${NAME} (Daily Mail Group)`,
        year: "2025-26",
      },
    ],
  },
  {
    slug: "ai-solution",
    title: "AI Solution",
    certificates: [
      // For FlowAI, the same programme as the sales award below — so the deck's
      // "major global media organisation" is Publicis, not a media owner.
      // CHECK: the exact award title.
      {
        tint: "#efe2b6",
        title: "AI Solution of the Year",
        name: `${NAME} (Publicis)`,
        year: "2025",
        prize: "$10k prize pot",
      },
    ],
  },
  {
    slug: "sales",
    title: "Sales",
    certificates: [
      {
        tint: "#efbdb6",
        title: "$1 Million Club",
        name: `${NAME} (Publicis)`,
        year: "2025",
        prize: "$1m + in sales",
      },
    ],
  },
  {
    slug: "services",
    title: "Services",
    certificates: [
      // CHECK: all three invented. Nothing in the deck says what these are for
      // or which years they cover.
      {
        tint: "#b6eaef",
        title: "Services Award FY24",
        name: NAME,
        year: "2023-24",
      },
      {
        tint: "#d9efb6",
        title: "Services Award FY25",
        name: NAME,
        year: "2024-25",
      },
      {
        tint: "#efb6d9",
        title: "Services Award FY26",
        name: NAME,
        year: "2025-26",
      },
    ],
  },
  {
    slug: "scholarship",
    title: "Scholarship",
    certificates: [
      // CHECK: the year. Everything else here is confirmed.
      {
        tint: "#bcbdef",
        title: "Academic Excellence Scholarship",
        name: `${NAME} (Oxford Brookes University)`,
        year: "2015",
      },
    ],
  },
];
