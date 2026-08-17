type SectionIndexProps = {
  /** Where the section falls in the run set out in `app/page.tsx`, from 1. */
  n: number;
  /** The section's own class, which places it. */
  className?: string;
};

// The count the reference keeps in the corner of every section, so a long
// scroll still reads as a numbered sequence rather than one continuous drop.
//
// Decorative: the sections are already announced by their headings, and read
// aloud this would only interrupt them.
export function SectionIndex({ n, className }: SectionIndexProps) {
  return (
    <span
      className={`section-index${className ? ` ${className}` : ""}`}
      aria-hidden="true"
    >
      / dsgn {n}
    </span>
  );
}
