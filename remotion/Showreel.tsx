import { AbsoluteFill, interpolate, Sequence, useCurrentFrame } from "remotion"

import { profileData, type ProfileData } from "../lib/profile"
import { ContactOutro } from "./compositions/ContactOutro"
import { Intro } from "./compositions/Intro"
import { ProfileStoryCard } from "./compositions/ProfileStoryCard"

export const SHOWREEL_FPS = 30
export const SHOWREEL_WIDTH = 1080
export const SHOWREEL_HEIGHT = 1920
export const SHOWREEL_DURATION_IN_FRAMES = 420

export type ShowreelProps = {
  profile: ProfileData
}

export const defaultShowreelProps: ShowreelProps = {
  profile: profileData,
}

function buildShowreelSections(profile: ProfileData) {
  return [
    {
      id: "services",
      eyebrow: "Servicos",
      title: "O que eu entrego para clientes e parceiros",
      description: profile.hero.subheadline,
      items: profile.services.slice(0, 4).map((service) => `${service.title}: ${service.description}`),
      accentColor: "#38bdf8",
    },
    {
      id: "stacks",
      eyebrow: "Stacks",
      title: "Base tecnica para sites, sistemas e integracoes",
      description: profile.bio,
      items: profile.techGroups.slice(0, 3).map((group) => `${group.title}: ${group.items.slice(0, 4).join(", ")}`),
      accentColor: "#22c55e",
    },
    {
      id: "credibility",
      eyebrow: "Experiencia",
      title: "Credibilidade tecnica com foco em entrega",
      description: profile.about.paragraphs[0],
      items: profile.experience.slice(0, 3).map((experience) => `${experience.title} • ${experience.company} • ${experience.period}`),
      accentColor: "#f97316",
    },
  ]
}

export const Showreel = ({ profile }: ShowreelProps) => {
  const frame = useCurrentFrame()
  const sections = buildShowreelSections(profile)
  const introFrom = 0
  const introDuration = 105
  const sectionDuration = 72
  const sectionStep = 68
  const sectionStart = 96
  const outroFrom = sectionStart + sections.length * sectionStep
  const ambientShift = interpolate(frame, [0, SHOWREEL_DURATION_IN_FRAMES], [0, -180])

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#020617",
        color: "white",
        fontFamily: "Arial, sans-serif",
        overflow: "hidden",
      }}
    >
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at top left, rgba(56,189,248,0.22), transparent 36%), radial-gradient(circle at bottom right, rgba(249,115,22,0.18), transparent 34%), linear-gradient(180deg, #020617 0%, #0f172a 48%, #111827 100%)",
          transform: `translateY(${ambientShift}px)`,
        }}
      />

      <AbsoluteFill
        style={{
          opacity: 0.16,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <Sequence from={introFrom} durationInFrames={introDuration}>
        <Intro
          name={profile.name}
          eyebrow={profile.hero.eyebrow}
          headline={profile.hero.headline}
          subheadline={profile.hero.subheadline}
          location={profile.location}
          pills={[profile.availability, ...profile.serviceFocus.slice(0, 3)]}
        />
      </Sequence>

      {sections.map((section, index) => (
        <Sequence key={section.id} from={sectionStart + index * sectionStep} durationInFrames={sectionDuration}>
          <ProfileStoryCard
            eyebrow={section.eyebrow}
            title={section.title}
            description={section.description}
            items={section.items}
            accentColor={section.accentColor}
            index={index}
          />
        </Sequence>
      ))}

      <Sequence from={outroFrom} durationInFrames={SHOWREEL_DURATION_IN_FRAMES - outroFrom}>
        <ContactOutro
          name={profile.name}
          title={profile.title}
          email={profile.email}
          website={profile.website}
          linkedin={profile.social.linkedin}
          ctaTitle={profile.finalCta.title}
          ctaDescription={profile.finalCta.description}
        />
      </Sequence>
    </AbsoluteFill>
  )
}
