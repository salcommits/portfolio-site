"use client";

import { useEffect, useRef, type CSSProperties } from "react";

export type FallingLine = {
  text: string;
  muted?: boolean;
};

type FallingTextProps = {
  lines: FallingLine[];
  className?: string;
};

// How much of the scroll a single letter takes to fall. Under 1, so the letters
// set off in turn instead of the block dropping in one piece.
const SPAN = 0.55;

// A beat at the head of the run where the statement simply sits and reads. The
// pin engages before the block has finished settling, so without this the first
// letters would let go while it was still arriving.
const LEAD = 0.18;

// The statement holds still while the page scrolls past it, and that scroll is
// what pulls it apart: every letter drifts, drops and turns by its own fixed
// amount, scaled by how far through the run the reader is. Driving it from
// scroll position rather than a timer means it breaks as you go, comes back
// together if you scroll up, and never runs on while you are reading.
export function FallingText({ lines, className }: FallingTextProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const pin = pinRef.current;
    if (!track || !pin) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Two reads and one custom property per scroll, which browsers already
    // deliver at most once a frame — so there is nothing here worth deferring,
    // and the letters never lag a frame behind the page.
    const update = () => {
      // While the pin is stuck it slides from the top of its track to the
      // bottom, so its offset within the track *is* the progress — no need to
      // know where the sticky edge sits.
      const span = track.offsetHeight - pin.offsetHeight;
      if (span <= 0) {
        pin.style.setProperty("--p", "0");
        return;
      }

      const offset =
        pin.getBoundingClientRect().top - track.getBoundingClientRect().top;
      const travelled = Math.min(Math.max(offset / span, 0), 1);
      const progress = Math.min(
        Math.max((travelled - LEAD) / (1 - LEAD), 0),
        1,
      );
      pin.style.setProperty("--p", progress.toFixed(4));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [lines]);

  const label = lines.map((line) => line.text).join(" ");
  const lastLine = Math.max(lines.length - 1, 1);
  let letterIndex = 0;

  return (
    <div ref={trackRef} className={`falling${className ? ` ${className}` : ""}`}>
      <div ref={pinRef} className="falling__pin">
        <p className="falling__text" aria-label={label}>
          {lines.map((line, lineIndex) => (
            <span
              key={lineIndex}
              aria-hidden="true"
              className={`falling__line${
                line.muted ? " falling__line--muted" : ""
              }`}
            >
              {[...line.text].map((char, charIndex) => {
                const seed = letterIndex++;

                // The floor gives way from underneath: the bottom line lets go
                // first and the break travels up the block.
                const fromBottom = (lastLine - lineIndex) / lastLine;
                const start =
                  (fromBottom * 0.7 + noise(seed) * 0.3) * (1 - SPAN);

                return (
                  <span
                    key={charIndex}
                    className="falling__letter"
                    style={
                      {
                        "--d": start.toFixed(4),
                        "--dx": (noise(seed + 101) * 2 - 1).toFixed(3),
                        "--dy": (0.6 + noise(seed + 202) * 0.8).toFixed(3),
                        // Signed away from zero, so no letter drops dead
                        // straight while the rest of the line turns.
                        "--dr": (
                          (noise(seed + 303) < 0.5 ? -1 : 1) *
                          (0.35 + noise(seed + 404) * 0.65)
                        ).toFixed(3),
                      } as CSSProperties
                    }
                  >
                    {char === " " ? "\u00a0" : char}
                  </span>
                );
              })}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}

// Fixed per letter rather than random, so the server and the client lay the
// break out identically and it looks the same on every visit.
function noise(seed: number) {
  let x = Math.imul(seed ^ 0x9e3779b9, 0x85ebca6b);
  x ^= x >>> 13;
  x = Math.imul(x, 0xc2b2ae35);
  x ^= x >>> 16;
  return (x >>> 0) / 4294967296;
}
