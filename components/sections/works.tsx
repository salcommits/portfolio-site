import Image from "next/image";
import Link from "next/link";

import { RevealText } from "@/components/motion/reveal-text";
import { SectionIndex } from "@/components/ui/section-index";
import { categories } from "@/lib/projects";

export function Works() {
  return (
    <section id="work" className="works">
      <SectionIndex n={3} className="works__index" />

      <div className="works__head">
        <RevealText as="h2" text="Works" className="works__title" />
        <p className="works__intro">
          Five ways of describing the same work, really &mdash; and most of
          these projects ended up touching more than one of them.
        </p>

        {/* The other half of the work: everything currently on the bench, which
            is too short to write up at this length. Labelled by what is at the
            other end rather than by the page's name, which the list itself then
            opens by repeating. */}
        <Link href="/build-list" className="works__more">
          See what I am building now
          <ArrowUpRight />
        </Link>
      </div>

      <div className="works__wrapper">
        {categories.map((category) => {
          // A screen from the work the panel lists, taken from the first project
          // that has been shot. Categories still being written up keep the flat
          // block the design was built on.
          const shot = category.projects.find(
            (project) => project.cover,
          )?.cover;

          return (
            <article key={category.index} className="works__block">
              <span className="works__number">{category.index}</span>

              <h3 className="works__title-line">
                <span className="works__title-text">{category.title}</span>
              </h3>

              {/* Repeats the heading as the panel's own large mark, so it is
                  hidden rather than read out twice. */}
              <span className="works__aside" aria-hidden="true">
                <span>{`// ${category.title}`}</span>
              </span>

              <ul className="works__projects">
                {category.projects.map((project) => (
                  <li key={project.slug}>
                    <Link href={`/work/${project.slug}`}>
                      / {project.title}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Decorative: the project it comes from is named in the list
                  beside it, so announcing it here would only repeat that. */}
              <span className="works__shot" aria-hidden="true">
                {shot ? (
                  <Image
                    src={shot.src}
                    width={shot.width}
                    height={shot.height}
                    // The box is a fixed share of the viewport, so the browser
                    // can be told what it will need rather than left to assume
                    // the capture's full width.
                    sizes="12vw"
                    alt=""
                    className="works__shot-image"
                  />
                ) : null}
              </span>

              <p className="works__summary">{category.summary}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

// Drawn pointing right and rotated up, so hovering just unwinds it — the same
// arrow the hero's recent-work link carries.
function ArrowUpRight() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="square"
      aria-hidden="true"
      className="works__more-icon"
    >
      <path d="M2.5 8h11" />
      <path d="M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}
