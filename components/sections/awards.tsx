import { RevealText } from "@/components/motion/reveal-text";
import { SectionIndex } from "@/components/ui/section-index";
import { awards } from "@/lib/awards";

// Counted rather than written down, so the line can't drift from the list.
const total = awards.reduce((sum, award) => sum + award.certificates.length, 0);

export function Awards() {
  return (
    <section id="awards" className="awards">
      <SectionIndex n={4} className="awards__index" />

      <div className="awards__head">
        <RevealText as="h2" text="Awards" className="awards__title" />

        {/* The reference's shape — a statement rather than a tally — but the
            claim is only the one the list can back. */}
        <p className="awards__intro">
          The work has been <strong>recognised {total} times</strong>
        </p>
      </div>

      {/* One sentence broken over the three lines, rather than three separate
          facts stacked up. */}
      <p className="awards__note">
        <strong>Mostly internal awards</strong>
        <span>from the places I have worked,</span>
        <span>plus one from university.</span>
      </p>

      <ul className="awards__list">
        {awards.map((award) => (
          <li key={award.slug} className="awards__row">
            <div className="awards__line">
              <span
                className={`awards__mark awards__mark--${award.certificates[0].plate}`}
                aria-hidden="true"
              />

              <h3 className="awards__name">{award.title}</h3>
              <sup className="awards__count">
                ({award.certificates.length})
              </sup>

              <ArrowUpRight />
            </div>

            {/* One card per certificate, standing in for the artwork until it
                has been gathered — so the panel already shows the right number
                of them, and what each one says. */}
            <ul className="awards__certificates">
              {award.certificates.map((certificate) => (
                <li
                  key={certificate.title}
                  className={`awards__certificate awards__certificate--${certificate.plate}`}
                >
                  <p className="awards__certificate-title">
                    {certificate.title}
                  </p>
                  <p className="awards__certificate-year">{certificate.year}</p>
                  {certificate.client ? (
                    <p className="awards__certificate-client">
                      {certificate.client}
                    </p>
                  ) : null}
                  {certificate.prize ? (
                    <p className="awards__certificate-prize">
                      {certificate.prize}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
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
