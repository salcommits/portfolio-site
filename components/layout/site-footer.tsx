import Link from "next/link";

import { LocalTime } from "@/components/layout/local-time";

const PHONE = "+44 7531219924";
const EMAIL = "liamatkins24@gmail.com";
const NAME = "Liam Atkins";

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/liam-robert-atkins/" },
  { label: "GitHub", href: "https://github.com/salcommits" },
  // Telegram has no username-to-profile page of its own; t.me is the handle's
  // canonical link, and it opens the app where one is installed.
  { label: "Telegram", href: "https://t.me/liamatki" },
];

const pages = [
  { label: "About me", href: "/#about" },
  { label: "Works", href: "/#work" },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="site-footer__tel">
        {PHONE}
      </a>
      <a href={`mailto:${EMAIL}`} className="site-footer__email">
        {EMAIL}
      </a>

      <ul className="site-footer__social">
        {socials.map((social) => (
          <li key={social.label}>
            <a href={social.href} target="_blank" rel="noreferrer noopener">
              {social.label}
              <ArrowUpRight />
            </a>
          </li>
        ))}
      </ul>

      <ul className="site-footer__pages">
        {pages.map((page) => (
          <li key={page.href}>
            <Link href={page.href}>{page.label}</Link>
          </li>
        ))}
      </ul>

      <p className="site-footer__wordmark">{NAME}</p>

      <div className="site-footer__meta">
        <p className="site-footer__time">
          London, UK: <LocalTime />
        </p>

        <p className="site-footer__credit">Development &mdash; {NAME}</p>

        <p className="site-footer__legal">
          {new Date().getFullYear()} All rights reserved. {NAME}. Any
          reproduction, distribution, or use of the materials without permission
          is prohibited.
        </p>
      </div>
    </footer>
  );
}

// Drawn pointing right and rotated up, so hovering just unwinds it — the same
// arrow the header CTA uses.
function ArrowUpRight() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="square"
      aria-hidden="true"
      className="site-footer__arrow"
    >
      <path d="M2.5 8h11" />
      <path d="M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}
