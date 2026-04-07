import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion"

type ContactOutroProps = {
  name: string
  title: string
  email: string
  website: string
  linkedin: string
  ctaTitle: string
  ctaDescription: string
}

export const ContactOutro = ({ name, title, email, website, linkedin, ctaTitle, ctaDescription }: ContactOutroProps) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const reveal = spring({
    fps,
    frame,
    config: {
      damping: 17,
      stiffness: 140,
    },
  })

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        padding: 84,
      }}
    >
      <div
        style={{
          opacity: interpolate(reveal, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(reveal, [0, 1], [60, 0])}px)`,
          display: "flex",
          flexDirection: "column",
          gap: 30,
          borderRadius: 54,
          padding: "70px 60px",
          background: "linear-gradient(145deg, rgba(8,47,73,0.92), rgba(30,41,59,0.94))",
          border: "1px solid rgba(125, 211, 252, 0.24)",
          boxShadow: "0 30px 90px rgba(2, 6, 23, 0.35)",
        }}
      >
        <div style={{ fontSize: 22, letterSpacing: "0.22em", textTransform: "uppercase", color: "#7dd3fc" }}>
          Vamos construir
        </div>
        <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 0.96, maxWidth: 760 }}>
          {ctaTitle}
        </div>
        <div style={{ fontSize: 34, lineHeight: 1.45, color: "rgba(226, 232, 240, 0.92)" }}>{ctaDescription}</div>

        <div style={{ display: "grid", gap: 16 }}>
          {[email, website, linkedin].map((item) => (
            <div
              key={item}
              style={{
                borderRadius: 28,
                padding: "20px 24px",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.1)",
                fontSize: 28,
              }}
            >
              {item}
            </div>
          ))}
        </div>

        <div style={{ fontSize: 24, color: "rgba(226, 232, 240, 0.76)" }}>
          {name} • {title}
        </div>
      </div>
    </AbsoluteFill>
  )
}
