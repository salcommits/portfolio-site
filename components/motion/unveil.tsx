"use client";

import { useEffect, useRef, type ReactNode } from "react";

type UnveilProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Where the developing edge sits, as a share of the viewport height.
 *
 * The wipe is pinned to this line rather than run on a clock: a picture is drawn
 * in exactly as far as it has climbed past it, so the reveal belongs to the
 * scroll and stops the moment the scroll does. That pinning is what keeps the
 * edge on screen — the clip opens at the same rate the picture rises, so the two
 * cancel out and the edge holds still while the picture grows behind it.
 *
 * Low enough that a picture taller than the line has finished by the time much
 * of it has passed, and high enough that the edge is somewhere you are looking.
 */
const LINE = 0.8;

// One pass for every picture on the page rather than one apiece, and only while
// there is still something left to reveal.
const tracked = new Set<HTMLElement>();
let frame = 0;

function progressFor(node: HTMLElement, line: number) {
  const rect = node.getBoundingClientRect();
  if (rect.height <= 0) return 0;
  return Math.min(1, Math.max(0, (line - rect.top) / rect.height));
}

function update() {
  const line = window.innerHeight * LINE;

  // Every rect is read before anything is written back, so a page of pictures
  // forces one layout rather than one per picture.
  const measured: [HTMLElement, number][] = [];
  for (const node of tracked) measured.push([node, progressFor(node, line)]);

  for (const [node, progress] of measured) {
    node.style.setProperty("--unveil-progress", progress.toFixed(4));
    // One way. Once a picture has arrived there is nothing left to follow, and
    // dropping it is what eventually lets the loop go.
    if (progress === 1) tracked.delete(node);
  }

  frame = tracked.size ? requestAnimationFrame(update) : 0;
}

// Read every frame rather than off the scroll event, because the event is not
// dependable enough to pin a clip to: the browser coalesces it under load and
// skips it entirely for anything that moves a picture without scrolling — a
// late-loading image above it, a font settling, a restored scroll position. Any
// one of those leaves the clip frozen part-open, and there is no second event
// coming to correct it. A frame loop cannot miss the same way, and it costs one
// pass over a handful of boxes until the last picture has arrived.
function start() {
  if (!frame) frame = requestAnimationFrame(update);
}

function track(node: HTMLElement) {
  tracked.add(node);
  start();
}

function untrack(node: HTMLElement) {
  tracked.delete(node);
  if (!tracked.size && frame) {
    cancelAnimationFrame(frame);
    frame = 0;
  }
}

// A downward wipe for the things that aren't text, so a picture arrives rather
// than fades up. RevealText owns per-letter markup and can only take a string,
// so anything with children of its own needs its own way in.
export function Unveil({ children, className }: UnveilProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Left unarmed, which leaves the picture unclipped — there is nothing to
    // reveal if the reveal itself is what has been turned off.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Set before arming rather than left to the first frame, so a picture that
    // is already past the line is never painted shut on its way to being open.
    node.style.setProperty(
      "--unveil-progress",
      progressFor(node, window.innerHeight * LINE).toFixed(4),
    );
    // Marks that the script is live, so the clip only lands where something will
    // arrive to open it.
    node.classList.add("is-armed");
    track(node);

    return () => untrack(node);
  }, []);

  return (
    <div ref={ref} className={`unveil${className ? ` ${className}` : ""}`}>
      {/* The wipe goes on this rather than on the element above it. That one is
          what gets measured, and a box clipped to nothing can measure as
          nothing — which would leave it armed and never reached. */}
      <div className="unveil__inner">{children}</div>
    </div>
  );
}
