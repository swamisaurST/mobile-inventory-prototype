import { ICON_MAP } from "./iconMap";

const TONE_COLORS = {
  white: "#FFFFFF",
  brand: "#00847C",
  muted: "#707577",
  dark: "#1D2D34",
};

/**
 * Renders STACK utility icons via alpha-mask recoloring.
 * Avoids CSS filter artifacts (white/black boxes) from Standard icon tile backgrounds.
 */
export default function StackIcon({
  name,
  size = 24,
  tone = "dark",
  alt = "",
  style = {},
  className = "",
}) {
  const entry = ICON_MAP[name];
  if (!entry) {
    if (import.meta.env?.DEV) {
      console.warn(`[StackIcon] Unknown icon "${name}"`);
    }
    return null;
  }

  const color = TONE_COLORS[tone] ?? TONE_COLORS.dark;

  return (
    <span
      className={`st-icon${className ? ` ${className}` : ""}`}
      role={alt ? "img" : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : "true"}
      style={{
        width: size,
        height: size,
        flexShrink: 0,
        display: "inline-block",
        verticalAlign: "middle",
        backgroundColor: color,
        WebkitMaskImage: `url("${entry.src}")`,
        maskImage: `url("${entry.src}")`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskMode: "alpha",
        maskMode: "alpha",
        ...style,
      }}
    />
  );
}
