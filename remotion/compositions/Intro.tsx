import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion"

type IntroProps = {
  name: string
  eyebrow: string
  headline: string
  subheadline: string
  location: string
  pills: string[]
}

export const Intro = ({ name, eyebrow, headline, subheadline, location, pills }: IntroProps) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const reveal = spring({
    fps,
    frame,
    config: {
      damping: 16,
      stiffness: 140,
      mass: 0.9,
    },
  })

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        padding: 96,
      }}
    >
      <div
        style={{
          opacity: interpolate(reveal, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(reveal, [0, 1], [90, 0])}px)`,
          display: "flex",
          flexDirection: "column",
          gap: 28,
        }}
      >
        <div
          style={{
            width: "fit-content",
            padding: "14px 22px",
            borderRadius: 999,
            border: "1px solid rgba(148, 163, 184, 0.3)",
            background: "rgba(15, 23, 42, 0.65)",
            fontSize: 22,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#7dd3fc",
          }}
        >
          {eyebrow}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 82,
              fontWeight: 800,
              lineHeight: 0.92,
              maxWidth: 860,
            }}
          >
            {headline}
          </div>
          <div
            style={{
              maxWidth: 760,
              fontSize: 32,
              lineHeight: 1.25,
              color: "rgba(226, 232, 240, 0.92)",
            }}
          >
            {subheadline}
          </div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              width: "fit-content",
              borderRadius: 999,
              background: "rgba(56, 189, 248, 0.14)",
              border: "1px solid rgba(125, 211, 252, 0.24)",
              padding: "14px 22px",
              fontSize: 26,
              color: "#e2e8f0",
            }}
          >
            <span style={{ color: "#38bdf8" }}>{name}</span>
            <span>{location}</span>
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 18 }}>
          {pills.map((pill) => (
            <div
              key={pill}
              style={{
                borderRadius: 999,
                padding: "14px 22px",
                fontSize: 28,
                background: "rgba(15, 23, 42, 0.7)",
                border: "1px solid rgba(148, 163, 184, 0.22)",
                color: "#f8fafc",
              }}
            >
              {pill}
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  )
}
