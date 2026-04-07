import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion"

type ProfileStoryCardProps = {
  eyebrow: string
  title: string
  description: string
  items: string[]
  accentColor: string
  index: number
}

export const ProfileStoryCard = ({
  eyebrow,
  title,
  description,
  items,
  accentColor,
  index,
}: ProfileStoryCardProps) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const entrance = spring({
    fps,
    frame,
    config: {
      damping: 18,
      stiffness: 150,
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
          opacity: interpolate(entrance, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(entrance, [0, 1], [70, 0])}px) scale(${interpolate(entrance, [0, 1], [0.95, 1])})`,
          borderRadius: 52,
          background: "rgba(15, 23, 42, 0.9)",
          border: "1px solid rgba(148, 163, 184, 0.18)",
          boxShadow: "0 30px 90px rgba(2, 6, 23, 0.35)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: 18,
            background: `linear-gradient(90deg, ${accentColor}, rgba(255,255,255,0.08))`,
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
            padding: 56,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24 }}>
            <div
              style={{
                borderRadius: 999,
                padding: "12px 20px",
                fontSize: 22,
                background: `${accentColor}22`,
                border: `1px solid ${accentColor}44`,
                color: accentColor,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              {eyebrow}
            </div>
            <div style={{ fontSize: 22, color: "rgba(226, 232, 240, 0.6)" }}>
              Bloco {String(index + 1).padStart(2, "0")}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ fontSize: 58, fontWeight: 800, lineHeight: 1.04 }}>{title}</div>
            <div style={{ fontSize: 28, lineHeight: 1.5, color: "rgba(226, 232, 240, 0.86)" }}>{description}</div>
          </div>

          <div style={{ display: "grid", gap: 16 }}>
            {items.map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  gap: 16,
                  alignItems: "flex-start",
                  borderRadius: 28,
                  padding: "22px 24px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div
                  style={{
                    marginTop: 4,
                    height: 12,
                    width: 12,
                    borderRadius: 999,
                    flex: "0 0 auto",
                    background: accentColor,
                    boxShadow: `0 0 0 8px ${accentColor}18`,
                  }}
                />
                <div style={{ fontSize: 26, lineHeight: 1.45, color: "#f8fafc" }}>{item}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  )
}
