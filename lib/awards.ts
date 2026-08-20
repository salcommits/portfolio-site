/**
 * The ground a card is set on. Named rather than given as a colour so a card
 * can only be one of the three the section holds, and none of the three is
 * light: the first card of a set also fills the mark beside its row, so a plate
 * has to hold against the page as well as behind text.
 */
export type Plate = "red" | "violet" | "teal";

export type Certificate = {
  /**
   * Standing in for the certificate artwork, which hasn't been gathered yet —
   * so it is dealt out to vary across a set rather than saying anything about
   * the award. Swap the plate for an image when the artwork lands, rather than
   * adding one alongside.
   */
  plate: Plate;
  title: string;
  /** The client, where the award names one. */
  client?: string;
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
        plate: "violet",
        title: "EMEA MVP FY25",
        year: "2024-25",
      },
      {
        plate: "teal",
        title: "Services MVP FY26",
        year: "2025-26",
      },
    ],
  },
  {
    slug: "team-of-the-year",
    title: "Team of the Year",
    certificates: [
      {
        plate: "red",
        title: "Team of the Year FY26",
        client: "Daily Mail Group",
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
        plate: "teal",
        title: "AI Solution of the Year",
        client: "Publicis",
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
        plate: "violet",
        title: "$1 Million Club",
        client: "Publicis",
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
        plate: "red",
        title: "Services Award FY24",
        year: "2023-24",
      },
      {
        plate: "violet",
        title: "Services Award FY25",
        year: "2024-25",
      },
      {
        plate: "teal",
        title: "Services Award FY26",
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
        plate: "violet",
        title: "Academic Excellence Scholarship",
        client: "Oxford Brookes University",
        year: "2015",
      },
    ],
  },
];
