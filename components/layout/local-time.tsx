"use client";

import { useEffect, useState } from "react";

const ZONE = "Europe/London";

// Reads the clock in London rather than wherever the visitor happens to be.
// Nothing renders until the component mounts: the page is built ahead of time,
// so a time rendered on the server would be baked into the HTML and sit there
// wrong — and it would disagree with the client on hydration.
export function LocalTime() {
  const [now, setNow] = useState("");

  useEffect(() => {
    const tick = () => setNow(format(new Date()));
    tick();

    // Comfortably under a minute, so the minute on show is never stale for long
    // without polling every second for a figure that changes every sixtieth.
    const id = window.setInterval(tick, 20_000);
    return () => window.clearInterval(id);
  }, []);

  return <span className="site-footer__clock">{now}</span>;
}

function format(date: Date) {
  const time = new Intl.DateTimeFormat("en-GB", {
    timeZone: ZONE,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(date);

  // Summer time reports as "GMT+1", but winter reports a bare "GMT". Spelled
  // out either way, so the line doesn't change shape twice a year.
  const offset =
    new Intl.DateTimeFormat("en-GB", {
      timeZone: ZONE,
      timeZoneName: "shortOffset",
    })
      .formatToParts(date)
      .find((part) => part.type === "timeZoneName")?.value ?? "GMT";

  return `(${offset === "GMT" ? "GMT+0" : offset}) ${time}`;
}
