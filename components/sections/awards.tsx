import { RevealText } from "@/components/motion/reveal-text";
import { awards } from "@/lib/awards";

export function Awards() {
  return (
    <section id="awards" className="awards">
      <div className="awards__head">
        <RevealText as="h2" text="Awards" className="awards__title" />

        <p className="awards__intro">
          Lorem ipsum dolor sit amet,{" "}
          <strong>consectetur adipiscing elit</strong>
        </p>
      </div>

      <p className="awards__note">
        <strong>Lorem ipsum dolor</strong>
        <span>(consectetur adipiscing elit)</span>
        <span>sed do eiusmod&rsquo;2026</span>
      </p>

      <ul className="awards__list">
        {awards.map((award) => (
          <li key={award.slug} className="awards__row">
            <div className="awards__line">
              <span
                className="awards__mark"
                style={{ background: award.tints[0] }}
                aria-hidden="true"
              />

              <h3 className="awards__name">{award.title}</h3>
              <sup className="awards__count">({award.mark})</sup>

              <ArrowUpRight />
            </div>

            {/* Colour blocks in place of the certificates, so the panel already
                shows the right number of them per award. */}
            <span className="awards__thumbs" aria-hidden="true">
              {award.tints.map((tint, index) => (
                <span key={index} style={{ background: tint }} />
              ))}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

// Drawn pointing right and rotated up, so hovering the row just unwinds it —
// the same arrow the header CTA uses.
function ArrowUpRight() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="square"
      aria-hidden="true"
      className="awards__arrow"
    >
      <path d="M2.5 8h11" />
      <path d="M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}
