import Link from "next/link";

import { RevealText } from "@/components/motion/reveal-text";
import { categories } from "@/lib/projects";

export function Works() {
  return (
    <section id="work" className="works">
      <div className="works__head">
        <RevealText as="h2" text="Works" className="works__title" />
        <p className="works__intro">
          Vivamus in justo id eros vulputate faucibus luctus sed lectus. Nullam
          ut lectus non dolor congue fermentum.
        </p>
      </div>

      <div className="works__wrapper">
        {categories.map((category) => (
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
                  <Link href={`/work/${project.slug}`}>/ {project.title}</Link>
                </li>
              ))}
            </ul>

            <p className="works__summary">{category.summary}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
