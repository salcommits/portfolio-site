export type Award = {
  slug: string;
  title: string;
  /**
   * The superscript beside the title. A count for most of them, but the sales
   * award is marked by its figure instead, so this is free text rather than a
   * number.
   */
  mark: string;
  /**
   * Stands in for the certificates, which haven't been gathered yet — one entry
   * per thumbnail, so the length here is what the hover panel shows. Swap these
   * for image paths when the artwork lands.
   */
  tints: string[];
};

export const awards: Award[] = [
  { slug: "mvp", title: "MVP", mark: "2", tints: ["#cbb6ef", "#b6d4ef"] },
  {
    slug: "team-of-the-year",
    title: "Team of the Year",
    mark: "1",
    tints: ["#b6efc9"],
  },
  { slug: "ai-solution", title: "AI Solution", mark: "1", tints: ["#efe2b6"] },
  { slug: "sales", title: "Sales", mark: "$1m +", tints: ["#efbdb6"] },
  {
    slug: "services",
    title: "Services",
    mark: "3",
    tints: ["#b6eaef", "#d9efb6", "#efb6d9"],
  },
  { slug: "scholarship", title: "Scholarship", mark: "1", tints: ["#bcbdef"] },
];
