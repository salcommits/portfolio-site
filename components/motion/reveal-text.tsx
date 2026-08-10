"use client";

import { useEffect, useRef, type CSSProperties, type ElementType } from "react";

type RevealTextProps = {
  text: string;
  className?: string;
  as?: ElementType;
  /** Offsets the stagger, so stacked lines can run as one sweep. */
  start?: number;
};

// Splits a heading into letters that rise out of a clipped word box once the
// heading is scrolled to. Words stay whole so the line still wraps normally.
export function RevealText({
  text,
  className,
  as: Tag = "span",
  start = 0,
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Marks that the observer is live, so the hidden starting state only
    // applies where something will arrive to reveal it.
    node.classList.add("is-armed");

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        node.classList.add("is-in-view");
        observer.disconnect();
      },
      { threshold: 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  let index = start;

  return (
    <Tag ref={ref} className={`reveal${className ? ` ${className}` : ""}`}>
      {text.split(" ").map((word, wordIndex) => (
        <span key={wordIndex}>
          {wordIndex > 0 ? " " : null}
          <span className="reveal__word">
            {[...word].map((char) => (
              <span
                key={index}
                className="reveal__letter"
                style={{ "--i": index++ } as CSSProperties}
              >
                {char}
              </span>
            ))}
          </span>
        </span>
      ))}
    </Tag>
  );
}
