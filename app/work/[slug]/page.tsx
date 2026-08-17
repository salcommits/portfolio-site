import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { RevealText } from "@/components/motion/reveal-text";
import { Unveil } from "@/components/motion/unveil";
import { Barcode } from "@/components/ui/barcode";
import { getCategoryFor, getProject, projects } from "@/lib/projects";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(
  props: PageProps<"/work/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);

  if (!project) return {};

  const title = `${project.title} — ${site.name}`;
  const path = `/work/${slug}`;

  // Spelled out rather than left to inherit. A page that sets no openGraph of
  // its own takes the layout's whole block, so a project would otherwise share
  // as the site's title, description and URL. Setting one replaces it entirely,
  // which is why the image has to be named again here.
  const openGraph = {
    siteName: site.name,
    title,
    description: project.summary,
    url: path,
    locale: "en_GB",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: site.title }],
  };

  return {
    title,
    description: project.summary,
    alternates: { canonical: path },
    openGraph: { ...openGraph, type: "article" },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.summary,
      images: openGraph.images,
    },
  };
}

export default async function ProjectPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);

  if (!project) notFound();

  // The service is the category the project was listed under, rather than
  // something the project restates for itself.
  const meta = [
    { label: "Service", value: getCategoryFor(slug)?.title ?? project.meta.service },
    { label: "Industry", value: project.meta.industry },
    { label: "Year", value: project.meta.year },
  ];

  return (
    <article className="project">
      {/* Back to the section the project was opened from, rather than the top
          of the home page. Named in full for anyone who meets the link on its
          own, out of the run of the page. */}
      <Link href="/#work" className="project__back" aria-label="Back to work">
        <ArrowLeft />
        Back
      </Link>

      {/* The mount is always drawn, and holds either the capture or the flat
          block that stands in for one, so a project without a shot yet still
          opens on the same plate rather than on a different arrangement. */}
      <div className="project__cover">
        {project.cover ? (
          <Image
            src={project.cover.src}
            width={project.cover.width}
            height={project.cover.height}
            alt=""
            priority
            className="project__cover-image"
          />
        ) : (
          <div className="project__cover-image" aria-hidden="true" />
        )}
      </div>

      <RevealText as="h1" className="project__title" text={project.title} />

      <dl className="project__meta">
        {meta.map((item) => (
          <div key={item.label}>
            <dt>
              {item.label}
              <ArrowDownRight className="project__meta-icon" />
            </dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>

      {project.country ? (
        <p className="project__country">{`( ${project.country} )`}</p>
      ) : null}

      <Barcode seed={project.slug} className="project__barcode" />

      <div className="project__block">
        <Label text="The challenge" />
        <p className="project__note">{project.challenge}</p>
      </div>

      <div className="project__block">
        <Label text="The approach" />
        <p className="project__note">{project.approach}</p>
      </div>

      <div className="project__block">
        <Label text="Solution" />
        <p className="project__note">{project.solution}</p>
      </div>

      {project.url ? (
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer noopener"
          className="project__visit"
        >
          View website
          <ArrowUpRight className="project__visit-icon" />
        </a>
      ) : null}

      {/* Captioned, so the run reads as a tour of the thing rather than a
          contact sheet. The caption carries the alt text — repeating it on the
          image would have every screen announced twice. */}
      {/* The count travels with the screen rather than the name, because it
          marks where the screen sits in the run and the two are on opposite
          sides of the plate. */}
      {project.gallery?.map((shot, index) => (
        <figure
          key={shot.src}
          className={`project__shot${
            shot.display ? " project__shot--display" : ""
          }`}
        >
          <RevealText
            as="figcaption"
            text={shot.caption}
            className="project__shot-caption"
          />
          <Unveil className="project__shot-frame">
            <span className="project__shot-index" aria-hidden="true">
              / dsgn {index + 1}
            </span>
            <Image
              src={shot.src}
              width={shot.width}
              height={shot.height}
              alt=""
              className="project__shot-image"
            />
          </Unveil>
        </figure>
      ))}

      {/* Closes the run, and deliberately outside its count: the plates above
          number pages, and this is those same pages at another size. */}
      {project.mobile ? (
        <figure className="project__devices">
          <span className="project__devices-index" aria-hidden="true">
            / mobile
          </span>
          <RevealText
            as="figcaption"
            text="Adaptive design"
            className="project__devices-caption"
          />
          <Unveil className="project__devices-frame">
            <Image
              src={project.mobile.src}
              width={project.mobile.width}
              height={project.mobile.height}
              alt=""
              className="project__devices-image"
            />
          </Unveil>
        </figure>
      ) : null}

      {/* The system the pages were assembled from, one module per family. Set on
          the ground the sheets were drawn on, so the modules read as cut from an
          artboard rather than as more screens of the finished site. */}
      {project.system ? (
        <section className="project__system">
          <span className="project__system-index" aria-hidden="true">
            / system
          </span>
          <RevealText
            as="h2"
            text="Interchangeable modules"
            className="project__system-title"
          />
          <p className="project__system-note">{project.system.note}</p>

          <ul className="project__families">
            {project.system.families.map((family) => (
              <li key={family.caption} className="project__family">
                <p className="project__family-name">
                  {family.caption}
                  <ArrowDownRight className="project__family-icon" />
                </p>

                <ul className="project__variants">
                  {family.variants.map((variant) => (
                    <li key={variant.src} className="project__variant">
                      <Unveil>
                        <Image
                          src={variant.src}
                          width={variant.width}
                          height={variant.height}
                          // A third of the plate inside its gutters once the row
                          // splits, and the whole of it below that.
                          sizes="(min-width: 48.0625rem) 30vw, 92vw"
                          alt=""
                          className="project__variant-image"
                        />
                      </Unveil>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* Directions, not figures. Set as a list because the only thing being
          said about each of these is that it went the same way as the rest. */}
      {project.results ? (
        <section className="project__results">
          <Label text="After 90 days" />
          <p className="project__note">{project.results.note}</p>

          <ul className="project__results-list">
            {project.results.measures.map((result) => (
              <li key={result}>
                <ArrowUpRight className="project__results-icon" />
                {result}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="project__detail">
        <div className="project__detail-text">
          <Label text="In detail" />
          {project.detail.map((paragraph, index) => (
            <p key={index} className="project__note">
              {paragraph}
            </p>
          ))}
        </div>
      </section>
    </article>
  );
}

// Drawn pointing right and turned up by whichever class it is given, so the one
// on a link can unwind on hover — the same outbound arrow the header and footer
// links carry — while the ones marking a rise just stay put.
function ArrowUpRight({ className }: { className: string }) {
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

// Points from a label down into whatever it introduces, which is the only reason
// it leans that way rather than out of the page like the links' arrows do.
function ArrowDownRight({ className }: { className: string }) {
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
      <path d="M3.5 3.5 12.5 12.5" />
      <path d="M12.5 6v6.5H6" />
    </svg>
  );
}

// The heading over each block of prose. Ranged left against a centred column and
// trailing the same glyph as the meta row, so the two sets of labels on the page
// read as one kind of thing.
function Label({ text }: { text: string }) {
  return (
    <p className="project__label">
      {text}
      <ArrowDownRight className="project__label-icon" />
    </p>
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
      className="project__back-icon"
    >
      <path d="M13.5 8h-11" />
      <path d="M7 3.5 2.5 8 7 12.5" />
    </svg>
  );
}
