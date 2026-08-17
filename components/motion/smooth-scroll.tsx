"use client";

import Lenis from "lenis";
import { useEffect } from "react";

// The wheel no longer moves the page directly — it moves a target, and the page
// eases toward it every frame. That gap is the whole effect: the page reads as
// having some weight behind it rather than snapping to the input.
//
// Lower lerp is a longer catch-up. Below about 0.06 it stops feeling heavy and
// starts feeling broken, and above 0.1 the delay disappears.
const LERP = 0.075;

let instance: Lenis | null = null;

/**
 * The running instance, for the two places that lock scrolling — the preloader
 * and the mobile menu. Hiding the document's overflow stops the browser
 * scrolling but not Lenis, which would keep banking wheel input and release it
 * the moment the lock lifted.
 */
export function getLenis() {
  return instance;
}

export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: LERP,
      // Touch already has momentum of its own. Easing on top of it reads as the
      // page lagging your finger, so phones keep the native behaviour.
      syncTouch: false,
      autoRaf: true,
    });

    instance = lenis;

    // Lenis has an `anchors` option, but it runs alongside the router rather
    // than instead of it: the router jumps to the section first and Lenis then
    // eases from wherever that landed, which overshoots. Taking the click in
    // the capture phase stops the router seeing it at all, so the eased scroll
    // is the only one that runs.
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      // Left alone so the browser can open these in a new tab or window.
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const anchor = (event.target as Element | null)?.closest?.("a[href]");
      if (!anchor) return;

      const url = new URL((anchor as HTMLAnchorElement).href);
      // Only links landing somewhere on the page already open. Anything that
      // changes the route still belongs to the router.
      if (url.origin !== window.location.origin) return;
      if (url.pathname !== window.location.pathname) return;
      if (!url.hash) return;

      const target = document.querySelector(url.hash);
      if (!target) return;

      event.preventDefault();
      event.stopPropagation();
      // Kept in the URL so a section stays linkable, as it would have been if
      // the browser had handled the jump.
      window.history.pushState(null, "", url.hash);
      lenis.scrollTo(target as HTMLElement);
    };

    document.addEventListener("click", onClick, true);

    return () => {
      document.removeEventListener("click", onClick, true);
      lenis.destroy();
      instance = null;
    };
  }, []);

  return null;
}
