type BarcodeProps = {
  /** Any stable string; the same seed always draws the same bars. */
  seed: string;
  className?: string;
};

const BAR_COUNT = 120;
const HEIGHT = 60;

export function Barcode({ seed, className }: BarcodeProps) {
  let x = 0;
  const bars: { x: number; width: number }[] = [];
  // xorshift over a seeded hash, so the pattern is varied but reproducible
  // between server and client renders.
  let state = hash(seed);

  for (let i = 0; i < BAR_COUNT; i += 1) {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    const width = 1 + (Math.abs(state) % 3);
    if (i % 2 === 0) bars.push({ x, width });
    x += width;
  }

  return (
    <svg
      viewBox={`0 0 ${x} ${HEIGHT}`}
      preserveAspectRatio="none"
      role="presentation"
      className={className}
    >
      {bars.map((bar, index) => (
        <rect
          key={index}
          x={bar.x}
          y={0}
          width={bar.width}
          height={HEIGHT}
          fill="currentColor"
        />
      ))}
    </svg>
  );
}

function hash(value: string) {
  let out = 0x811c9dc5;
  for (let i = 0; i < value.length; i += 1) {
    out ^= value.charCodeAt(i);
    out = Math.imul(out, 0x01000193);
  }
  return out || 1;
}
