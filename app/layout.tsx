import type { Metadata } from "next";
import { Sofia_Sans_Condensed, Spline_Sans_Mono } from "next/font/google";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import "@/styles/main.scss";

const sofiaSansCondensed = Sofia_Sans_Condensed({
  variable: "--font-condensed",
  subsets: ["latin"],
});

const splineSansMono = Spline_Sans_Mono({
  variable: "--font-mono-face",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Liam Atkins — Hands-on technologist",
  description:
    "Solutions architect, developer and project lead based in London.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sofiaSansCondensed.variable} ${splineSansMono.variable}`}
    >
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
