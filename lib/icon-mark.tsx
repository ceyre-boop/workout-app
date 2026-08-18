/** Shared brand mark used by every generated icon route — one drawing, every size. */
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: size * 0.62,
          height: size * 0.62,
          borderRadius: "50%",
          border: `${Math.max(2, size * 0.045)}px solid white`,
        }}
      >
        <span
          style={{
            fontSize: size * 0.42,
            fontWeight: 800,
            color: "white",
            letterSpacing: -1,
            lineHeight: 1,
            fontFamily: "sans-serif",
          }}
        >
          B
        </span>
      </div>
    </div>
  );
}
