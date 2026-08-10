import type { CSSProperties } from "react";

type RollingTextProps = {
  text: string;
};

/**
 * Splits text into characters so each can roll independently on hover.
 * Purely presentational — mark the interactive ancestor with an accessible
 * name, since this output is hidden from assistive tech.
 */
export function RollingText({ text }: RollingTextProps) {
  const chars = [...text];

  return (
    <span className="roll" aria-hidden="true">
      {chars.map((char, index) => (
        <span
          key={index}
          className="roll__char"
          style={{ "--i": chars.length - 1 - index } as CSSProperties}
        >
          <span className="roll__inner">
            <span className="roll__face">{char}</span>
            <span className="roll__face">{char}</span>
          </span>
        </span>
      ))}
    </span>
  );
}
