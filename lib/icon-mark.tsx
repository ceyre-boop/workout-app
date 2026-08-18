/**
 * Shared brand mark used by every generated icon route — one drawing, every
 * size. Simplified 2026-08-18 to match the reference board's actual
 * treatment: a plain bold letterform on the brand maroon, no added ring —
 * the earlier version invented a circle-outline detail that isn't on the
 * boards.
 */
export function IconMark({ size }: { size: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#6B1F2B",
        borderRadius: size * 0.22,
      }}
    >
      <span
        style={{
          fontSize: size * 0.56,
          fontWeight: 800,
          color: "white",
          letterSpacing: -1,
          lineHeight: 1,
          fontFamily: "sans-serif",
        }}
      >
        A
      </span>
    </div>
  );
}
