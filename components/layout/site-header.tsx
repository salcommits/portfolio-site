"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Wordmark } from "@/components/layout/wordmark";
import { RollingText } from "@/components/motion/rolling-text";
import { getLenis } from "@/components/motion/smooth-scroll";

// Rooted rather than bare fragments, so they still reach the section when the
// visitor is on a project page.
const navLinks = [
  { label: "About me", href: "/#about" },
  { label: "Works", href: "/#work" },
  { label: "Connect", href: "/#contact" },
];

// Mirrors the `nav` breakpoint, past which the panel becomes an inline row.
const NAV_QUERY = "(min-width: 48.0625rem)";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    // Without this the panel would still be flagged open after a resize past
    // the breakpoint, leaving the page scroll locked with no way to release it.
    const query = window.matchMedia(NAV_QUERY);
    const onBreakpointChange = () => {
      if (query.matches) setOpen(false);
    };

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    getLenis()?.stop();
    document.addEventListener("keydown", onKeyDown);
    query.addEventListener("change", onBreakpointChange);

    return () => {
      document.body.style.overflow = overflow;
      getLenis()?.start();
      document.removeEventListener("keydown", onKeyDown);
      query.removeEventListener("change", onBreakpointChange);
    };
  }, [open]);

  return (
    <header className={`site-header${open ? " site-header--open" : ""}`}>
      <nav aria-label="Primary" className="site-header__nav">
        <Link
          href="/"
          aria-label="Liam Atkins — home"
          className="site-header__home"
          onClick={() => setOpen(false)}
        >
          <Wordmark />
        </Link>

        <div id="site-menu" className="site-header__menu">
          <ul className="site-header__links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-label={link.label}
                  className="site-header__link"
                  onClick={() => setOpen(false)}
                >
                  <RollingText text={link.label} />
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/#contact"
            className="site-header__cta"
            onClick={() => setOpen(false)}
          >
            Contact me
            <ArrowUpRight />
          </Link>
        </div>

        <button
          type="button"
          className="site-header__burger"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="site-header__burger-window">
            <span className="site-header__burger-label" aria-hidden="true">
              Menu
            </span>
            <span
              className="site-header__burger-label site-header__burger-label--close"
              aria-hidden="true"
            >
              Close
            </span>
          </span>
          <span className="visually-hidden">
            {open ? "Close menu" : "Open menu"}
          </span>
        </button>
      </nav>
    </header>
  );
}

function ArrowUpRight() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="square"
      aria-hidden="true"
      className="site-header__cta-icon"
    >
      <path d="M2.5 8h11" />
      <path d="M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}
