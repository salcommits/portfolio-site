import type { Metadata } from "next";
import Link from "next/link";

import { RevealText } from "@/components/motion/reveal-text";
import { builds } from "@/lib/build-list";
import { site } from "@/lib/site";

const title = `Build list — ${site.name}`;
const description =
  "What I am building, and what I have built that never needed a case study: prototypes, small applications and the things too short to write up.";

// Spelled out rather than left to inherit, for the same reason as the project
// pages — a page that sets any openGraph of its own replaces the layout's block
// entirely, so the image has to be named again here.
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/build-list" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title,
    description,
    url: "/build-list",
    locale: "en_GB",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: site.title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: site.title }],
  },
};

// The column labels, which only appear once the rows are laid out side by side.
// Each row repeats them for assistive tech, so this is decoration by the time it
// is on screen.
const columns = ["Project", "What it is", "Type", "Status"];

export default function BuildList() {
  return (
    <main className="builds">
      <Link href="/" className="builds__back" aria-label="Back to home">
        <ArrowLeft />
        Back
      </Link>

      <RevealText as="h1" className="builds__title" text="Build list" />

      <p className="builds__intro">
        What I am building, and what I have built that never needed a case
        study. Most of it is too small for one and too useful to leave
        unrecorded, so it is here instead: what the thing is, where it has got
        to, and a way in where there is one.
      </p>

      <div className="builds__table">
        {/* A legend rather than a sentence in the intro: it carries the same
            arrow the links do, and says the one thing a row cannot show for
            itself, which is that following one leaves the site. */}
        <p className="builds__hint">
          <ArrowUpRight />
          Links sit under each description, and open in a new tab
        </p>

        <div className="builds__columns" aria-hidden="true">
          {columns.map((column) => (
            <span key={column}>{column}</span>
          ))}
        </div>

        <ul className="builds__list">
          {builds.map((build) => (
            <li key={build.title} className="builds__row">
              <div className="builds__cells">
                {/* Named, not clicked. A heading that was also the way in had
                    to do both jobs with one word, and could only ever say where
                    it went by being followed.

                    The stack is held in the same cell so it stays under the
                    name. Left to the grid it would be placed against the
                    description instead, and settle at the foot of a paragraph
                    several lines taller than the title it belongs to. */}
                <div className="builds__heading">
                  <h2 className="builds__name">{build.title}</h2>

                  <p className="builds__stack">
                    <span className="visually-hidden">Built with: </span>
                    {build.stack.join(", ")}
                  </p>
                </div>

                <p className="builds__description">{build.description}</p>

                {/* Every way in, under the sentence explaining what it opens. A
                    build might be three repositories, or one with a film of it
                    running, so each line carries its own label rather than the
                    row carrying a single unmarked link. */}
                {build.links ? (
                  <ul className="builds__links">
                    {build.links.map((link) => (
                      <li key={link.url}>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          {link.label}
                          <ArrowUpRight />
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {/* The labels above are decorative, so each value carries its
                    own for anyone not reading the columns. */}
                <p className="builds__type">
                  <span className="visually-hidden">Type: </span>
                  {build.type}
                </p>
                <p className="builds__status">
                  <span className="visually-hidden">Status: </span>
                  {build.status}
                  <span className="builds__date">
                    <span aria-hidden="true">, {stamp(build.date)}</span>
                    <span className="visually-hidden">
                      , {spoken(build.date)}
                    </span>
                  </span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

// 11/25, to sit beside a status without competing with it. Sliced rather than
// put through a date formatter, because the value is a year and a month and
// anything that parses it has to invent a day and a timezone to do so.
function stamp(date: string) {
  const [year, month] = date.split("-");

  return `${month}/${year.slice(2)}`;
}

// The same date said rather than shown: 11/25 is read out as a fraction, or as
// two numbers, by anything that doesn't know it is a date.
function spoken(date: string) {
  return new Date(`${date}-01T00:00:00Z`).toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

// Drawn pointing right and rotated up, so crossing the row unwinds it — the
// same arrow the header CTA uses.
function ArrowUpRight() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="square"
      aria-hidden="true"
      className="builds__arrow"
    >
      <path d="M2.5 8h11" />
      <path d="M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}

function ArrowLeft() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="square"
      aria-hidden="true"
      className="builds__back-icon"
    >
      <path d="M13.5 8h-11" />
      <path d="M7 3.5 2.5 8 7 12.5" />
    </svg>
  );
}
