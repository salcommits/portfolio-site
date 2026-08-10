import Image from "next/image";

import { FallingText, type FallingLine } from "@/components/motion/falling-text";
import { RevealText } from "@/components/motion/reveal-text";

const EMAIL = "liamatkins24@gmail.com";

// Copy is the placeholder from the design; swap in real text when it lands.
const statement: FallingLine[] = [
  { text: "Lorem" },
  { text: "ipsum dolor" },
  { text: "sit amet, consectetur", muted: true },
  { text: "adi elit." },
];

// Broken by hand, short–long–short, so the statement keeps a ragged edge instead
// of squaring off into a slab. The spaces around the dash are non-breaking: HTML
// would otherwise collapse them, and the gap is what gives the line its pause.
const manifesto = [
  "Lorem ipsum sit",
  "amet\u00a0\u00a0—\u00a0\u00a0consectetur elit",
  "dolore magna.",
];

export function About() {
  return (
    <section id="about" className="about">
      <div className="about__intro">
        <a href={`mailto:${EMAIL}`} className="about__contact">
          <span className="about__contact-label">
            Contact
            <ArrowDownRight className="about__contact-icon" />
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
            <ArrowDownRight />
          </p>
          <p className="about__note">
            A solutions architect with over 10 years of experience in tech for
            companies.
          </p>
        </div>

        <hr className="about__rule" />

        <p className="about__manifesto">
          {manifesto.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>

        <p className="about__note about__note--wide">
          Vivamus in justo id eros vulputate faucibus luctus sed lectus. Nullam
          ut lectus non dolor congue fermentum.
        </p>

        <div className="about__block about__block--philosophy">
          <p className="about__label about__label--marked">
            My philosophy
            <ArrowDownRight />
          </p>
          <p className="about__note">
            Duis ultrices venenatis eros id facilisis. Morbi tincidunt et ante
            pulvinar pulvinar. Ut cursus, nibh vel placerat accumsan.
          </p>
        </div>

        <div className="about__lifestyle">
          <div className="about__gallery" aria-hidden="true">
            <span className="about__frame about__frame--one" />
            <span className="about__frame about__frame--two" />
          </div>

          <div className="about__block about__block--lifestyle">
            <p className="about__label about__label--marked">
            My lifestyle
            <ArrowDownRight />
          </p>
            <p className="about__note">
              Cras lacus leo, efficitur nec venenatis ut, porttitor ac ipsum.
              Morbi molestie mattis justo, vel ornare nisl sagittis nec.
            </p>
            <p className="about__note">
              Duis ligula odio, pretium vitae vehicula non, rutrum ut libero.
              Nam blandit et enim id cursus. Nulla purus mi, convallis sit amet
              dignissim.
            </p>
          </div>
        </div>

        <a href="#contact" className="about__connect">
          Lets connect
        </a>
      </div>
    </section>
  );
}

function ArrowDownRight({ className = "about__arrow" }: { className?: string }) {
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
