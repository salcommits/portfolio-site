"use client";

import { useEffect, useState } from "react";

type CountUpProps = {
  to: number;
  duration?: number;
};

export function CountUp({ to, duration = 1400 }: CountUpProps) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    const start = performance.now();

    // Reduced motion resolves on the first frame rather than skipping the
    // animation up front, which would mean setting state during the effect.
    const tick = (now: number) => {
      const progress = reduced ? 1 : Math.min((now - start) / duration, 1);
      // Cubic ease-out, so the number decelerates into its final value.
      setValue(Math.round(to * (1 - (1 - progress) ** 3)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [to, duration]);

  return <>{value}</>;
}
