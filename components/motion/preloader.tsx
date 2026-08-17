"use client";

import { useEffect, useState, type CSSProperties } from "react";

import { getLenis } from "@/components/motion/smooth-scroll";

// Two concentric bands, as in the reference: the name on the rim and the roles
// set smaller inside it. Each phrase goes round exactly once, and the trailing
// separator is what keeps the join from reading as a seam.
const RINGS = [
  { text: "Liam Atkins — Always building — ", modifier: "lead" },
  {
    text: "Technical design / Full-stack builds / Client-side delivery / ",
    modifier: "trail",
  },
];
const DURATION = 1900;
const EXIT = 700;

// Module scope rather than state: the intro belongs to the page load, so a
// client-side navigation back to the home page shouldn't replay it.
let hasPlayed = false;

type Phase = "counting" | "leaving" | "gone";

export function Preloader() {
  const [phase, setPhase] = useState<Phase>(hasPlayed ? "gone" : "counting");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // `is-ready` is what releases the hero's entrance, so it has to be set
    // even when the intro is skipped.
    const finish = () => {
      hasPlayed = true;
      document.documentElement.classList.add("is-ready");
    };

    if (hasPlayed) {
      finish();
      return;
    }

    // Reduced motion resolves on the first frame rather than short-circuiting
    // up front, which would mean setting state during the effect.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    const duration = reduced ? 0 : DURATION;
    const exit = reduced ? 0 : EXIT;

    let frame = 0;
    let exitTimer = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const ratio = duration ? Math.min((now - start) / duration, 1) : 1;
      setProgress(Math.round(ratio * 100));

      if (ratio < 1) {
        frame = requestAnimationFrame(tick);
        return;
      }

      finish();
      setPhase("leaving");
      exitTimer = window.setTimeout(() => setPhase("gone"), exit);
    };

    frame = requestAnimationFrame(tick);

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    getLenis()?.stop();

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(exitTimer);
      document.body.style.overflow = overflow;
      getLenis()?.start();
    };
  }, []);

  useEffect(() => {
    if (phase !== "gone") return;
    document.body.style.overflow = "";
    getLenis()?.start();
  }, [phase]);

  if (phase === "gone") return null;

  return (
    <div
      className={`preloader${phase === "leaving" ? " preloader--leaving" : ""}`}
      role="status"
    >
      <div className="preloader__stage" aria-hidden="true">
        {RINGS.map((ring) => {
          const characters = [...ring.text];
          const step = 360 / characters.length;

          return (
            <p
              key={ring.modifier}
              className={`preloader__ring preloader__ring--${ring.modifier}`}
            >
              {characters.map((char, index) => (
                <span
                  key={index}
                  className="preloader__char"
                  style={{ "--a": `${index * step}deg` } as CSSProperties}
                >
                  {char}
                </span>
              ))}
            </p>
          );
        })}
      </div>

      <p className="preloader__count" aria-hidden="true">
        {String(progress).padStart(2, "0")}%
      </p>

      {/* Static, because a per-frame percentage would be announced on loop. */}
      <span className="visually-hidden">Loading</span>
    </div>
  );
}
