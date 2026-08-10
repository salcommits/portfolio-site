import Image from "next/image";
import type { CSSProperties } from "react";

import { CountUp } from "@/components/motion/count-up";

const headline = ["Hands-on", "Technologist"];
const roles = ["Solutions Architect", "Developer", "Project Lead"];
const location = ["Based", "in", "London"];

export function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero__title">
        <span className="hero__number" aria-hidden="true">
          <span>
            <CountUp to={444} />
          </span>
        </span>

        <h1 className="hero__headline" aria-label={headline.join(" ")}>
          {splitToLetters(headline).map(({ word, letters }) => (
            <span key={word} className="hero__word" aria-hidden="true">
              {letters.map(({ char, index }) => (
                <span
                  key={index}
                  className="hero__letter"
                  style={{ "--i": index } as CSSProperties}
                >
                  {char}
                </span>
              ))}
            </span>
          ))}
        </h1>
      </div>

      <p className="hero__location" aria-hidden="true">
        {location.map((part) => (
          <span key={part}>{part}</span>
        ))}
      </p>

      <div className="hero__panel">
        <ul className="hero__roles">
          {roles.map((role) => (
            <li key={role}>
              <span>/ {role}</span>
            </li>
          ))}
        </ul>

        <div className="hero__portrait">
          <Image
            src="/liam-atkins.jpg"
            alt="Liam Atkins"
            width={664}
            height={722}
            priority
          />
        </div>
      </div>

      <p className="hero__description">
        Lorem ipsum lorem ipsum lorem ipsum, lorem ipsum lorem ipsum lorem ipsum
        lorem ipsum lorem ipsum.
      </p>

      <a href="#work" className="hero__recent">
        <span className="hero__recent-label">
          Recent work
          <ArrowUpRight />
        </span>
        <span className="hero__recent-value">Arch</span>
      </a>
    </section>
  );
}

// Letters carry a running index across the whole headline so the drop-in
// stagger reads as one sweep rather than restarting on each word.
function splitToLetters(words: string[]) {
  let index = 0;

  return words.map((word) => ({
    word,
    letters: [...word].map((char) => ({ char, index: index++ })),
  }));
}

function ArrowUpRight() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="square"
      aria-hidden="true"
      className="hero__recent-icon"
    >
      <path d="M2.5 8h11" />
      <path d="M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}
