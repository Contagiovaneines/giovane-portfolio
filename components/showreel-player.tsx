"use client"

import { Player } from "@remotion/player"

import {
  Showreel,
  SHOWREEL_DURATION_IN_FRAMES,
  SHOWREEL_FPS,
  SHOWREEL_HEIGHT,
  SHOWREEL_WIDTH,
  type ShowreelProps,
} from "@/remotion/Showreel"

type ShowreelPlayerProps = {
  inputProps: ShowreelProps
}

export function ShowreelPlayer({ inputProps }: ShowreelPlayerProps) {
  return (
    <Player
      component={Showreel}
      inputProps={inputProps}
      durationInFrames={SHOWREEL_DURATION_IN_FRAMES}
      compositionWidth={SHOWREEL_WIDTH}
      compositionHeight={SHOWREEL_HEIGHT}
      fps={SHOWREEL_FPS}
      acknowledgeRemotionLicense
      controls
      loop
      style={{
        width: "100%",
        aspectRatio: "9 / 16",
        borderRadius: 32,
        overflow: "hidden",
        backgroundColor: "#020617",
      }}
    />
  )
}
