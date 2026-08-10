import { notFound } from "next/navigation";

import { Barcode } from "@/components/ui/barcode";
import { getCategoryFor, getProject, projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);

  if (!project) return {};

  return {
    title: `${project.title} — Liam Atkins`,
    description: project.summary,
  };
}

export default async function ProjectPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);

  if (!project) notFound();

  // The service is the category the project was listed under, rather than
  // something the project restates for itself.
  const meta = [
    { label: "Challenge", value: project.meta.challenge },
    { label: "Service", value: getCategoryFor(slug)?.title ?? project.meta.service },
    { label: "Industry", value: project.meta.industry },
    { label: "Year", value: project.meta.year },
  ];

  return (
    <article className="project">
      <div className="project__cover" aria-hidden="true" />

      <h1 className="project__title">{project.title}</h1>

      <dl className="project__meta">
        {meta.map((item) => (
          <div key={item.label}>
            <dt>{item.label}</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>

      <Barcode seed={project.slug} className="project__barcode" />

      <div className="project__block">
        <p className="project__label">My philosophy</p>
        <p className="project__note">{project.approach}</p>
      </div>

      <div className="project__block">
        <p className="project__label">Solution</p>
        <p className="project__note">{project.solution}</p>
      </div>

      {project.url ? (
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer noopener"
          className="project__visit"
        >
          Visit
        </a>
      ) : null}

      <section className="project__detail">
        <div className="project__detail-text">
          <p className="project__label">Solution</p>
          {project.detail.map((paragraph, index) => (
            <p key={index} className="project__note">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="project__detail-media" aria-hidden="true" />
      </section>
    </article>
  );
}
