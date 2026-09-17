import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Intellimindz Foundation — FinTech Education for a Digital Tomorrow";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(140deg, #0b1230, #111a45 55%, #16225a)",
          padding: 72,
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ display: "flex", fontSize: 40, fontWeight: 800, letterSpacing: -1 }}>
            <span style={{ color: "#fff" }}>Intelli</span>
            <span style={{ color: "#00b3ae" }}>mindz</span>
          </div>
          <div
            style={{
              fontSize: 15,
              letterSpacing: 8,
              color: "rgba(255,255,255,0.65)",
              paddingTop: 10,
            }}
          >
            FOUNDATION
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div
            style={{
              fontSize: 74,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2.5,
              maxWidth: 940,
            }}
          >
            Empowering India through FinTech education
          </div>
          <div style={{ fontSize: 28, color: "rgba(255,255,255,0.7)", maxWidth: 820 }}>
            A Section 8 Company building a digitally literate, financially aware and
            future-ready India.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 64, height: 4, background: "#00b3ae" }} />
          <div style={{ fontSize: 22, color: "rgba(255,255,255,0.6)" }}>intellimindz.in</div>
        </div>
      </div>
    ),
    size
  );
}
