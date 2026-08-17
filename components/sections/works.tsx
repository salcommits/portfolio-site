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
        Five ways of describing the same work, really &mdash; and most of these
        projects ended up touching more than one of them.
      </p>
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
