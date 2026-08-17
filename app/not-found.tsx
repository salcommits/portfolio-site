import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Not found — Liam Atkins",
};

export default function NotFound() {
  return (
    <main className="not-found">
      {/* Decorative: the status is already in the heading and the response
          code, so the numerals are only here as a watermark. */}
      <p className="not-found__figure" aria-hidden="true">
        404
      </p>

      <div className="not-found__body">
        <h1 className="not-found__title">Nothing built here</h1>

        <p className="not-found__note">
          The page you were after has either moved, or was never built in the
          first place.
        </p>

        <p className="not-found__prompt">Try starting again</p>

        <Link href="/" className="not-found__link">
          Return home
        </Link>
      </div>
    </main>
  );
}
