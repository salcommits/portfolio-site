import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { site } from "@/lib/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Satori needs the real font files; it cannot use the ones next/font resolves
// for the browser. Read once at module scope, since neither depends on the
// request.
const condensed = await readFile(
  join(process.cwd(), "assets/SofiaSansCondensed-Bold.ttf"),
);
const mono = await readFile(
  join(process.cwd(), "assets/SplineSansMono-Light.ttf"),
);

const disciplines = [
  "/ Technical design",
  "/ Full-stack builds",
  "/ Client-side delivery",
];

// The hero, reduced to what survives at thumbnail size in a timeline.
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 64px",
          background: "#f7f7f7",
          color: "#101010",
          fontFamily: "Sofia Sans Condensed",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "Spline Sans Mono",
            fontSize: 24,
            letterSpacing: "0.042em",
          }}
        >
          <span>LIAM ATKINS</span>
          <span>BASED IN LONDON</span>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 190,
            lineHeight: 0.82,
            letterSpacing: "-0.05em",
            // Set to fill the frame edge to edge, as the hero does, so a break
            // would leave the line short rather than improve it.
            whiteSpace: "nowrap",
          }}
        >
          ALWAYS BUILDING
        </div>

        <div
          style={{
            display: "flex",
            gap: 56,
            fontFamily: "Spline Sans Mono",
            fontSize: 22,
            letterSpacing: "0.042em",
            textTransform: "uppercase",
            color: "#585858",
          }}
        >
          {disciplines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Sofia Sans Condensed",
          data: condensed,
          style: "normal",
          weight: 700,
        },
        {
          name: "Spline Sans Mono",
          data: mono,
          style: "normal",
          weight: 300,
        },
      ],
    },
  );
}
