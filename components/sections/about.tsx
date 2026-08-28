import Image from "next/image";

import { FallingText, type FallingLine } from "@/components/motion/falling-text";
import { RevealText } from "@/components/motion/reveal-text";

const EMAIL = "liamatkins24@gmail.com";

// Broken to the column rather than left to wrap: the letters fall from these
// lines, so a break that moved with the viewport would change the shape of the
// fall. Around 25 characters is what the measure holds at the display size.
//
// The reference's shape: the subject on its own, the narrow reading of it
// dropped back in grey, then the wider one returned to white. Reads on from the
// "For me" label beside it, which keeps it a view rather than a pronouncement.
const statement: FallingLine[] = [
  { text: "Software" },
  { text: "is not just", muted: true },
  { text: "what gets built, but", muted: true },
  { text: "what people can do" },
  { text: "with it." },
];

// One sentence broken over three lines, rather than three clauses building to a
// point. At this size anything with a payoff on the last line reads as a slogan.
//
// Deliberately not the "not just X, but Y" turn — the statement above now runs
// it, and it was landing three times in one section.
const manifesto = [
  "The simplest thing",
  "that works",
  "is usually right.",
];

export function About() {
  return (
    <section id="about" className="about">
      <div className="about__intro">
        <a href={`mailto:${EMAIL}`} className="about__contact">
          <span className="about__contact-label">
            Contact
            <Arrow className="about__contact-icon" />
          </span>
          <span className="about__contact-email">{EMAIL}</span>
        </a>

        <RevealText as="h2" text="About me" className="about__title" />
      </div>

      <div className="about__body">
        <p className="about__label about__label--statement">For me</p>
        <FallingText lines={statement} className="about__statement" />

        <figure className="about__portrait">
          <Image
            src="/liam-atkins.jpg"
            alt="Liam Atkins"
            width={664}
            height={722}
          />
          <figcaption className="about__greeting">
            Hello!
            <br />
            I&rsquo;m Liam
          </figcaption>
        </figure>

        <div className="about__block about__block--experience">
          <p className="about__label about__label--marked">
            My experience
            <Arrow />
          </p>
          <p className="about__note">
            Every project has taught me something I did not expect, usually
            from the people already living with the problem.
          </p>
        </div>

        <hr className="about__rule" />

        <p className="about__manifesto">
          {manifesto.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>

        <div className="about__block about__block--philosophy">
          <p className="about__label about__label--marked">
            My philosophy
            <Arrow />
          </p>
          <p className="about__note">
            I value curiosity, momentum and honesty &mdash; in software and in
            life. I am close to the idea of building in the open: small things,
            shown early, allowed to grow. I love systems simple enough to hold
            in your head.
          </p>
        </div>

        <div className="about__lifestyle">
          <a href="#contact" className="about__connect">
            Lets connect
            <Arrow className="about__connect-icon" />
          </a>

          <div className="about__block about__block--lifestyle">
            <p className="about__label about__label--marked">
              My lifestyle
              <Arrow />
            </p>
            {/* Invented, unlike the rest of the section — the copy deck has no
                source material for this one and lists it as outstanding. It is
                written to the right length and voice so the layout is honest,
                but none of it is a claim about you. Replace before launch. */}
            <p className="about__note">
              I look for good design everywhere: in a well-written function, in
              a train timetable, in the way a kitchen is laid out.
            </p>
            <p className="about__note">
              Away from the screen it is mostly outdoors, and a long tail of
              half-finished side projects.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Drawn pointing right; every use turns it with CSS, so the same glyph serves
// the labels pointing down into their blocks and the link pointing up and out.
function Arrow({ className = "about__arrow" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="square"
      aria-hidden="true"
      className={className}
    >
      <path d="M2.5 8h11" />
      <path d="M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}
