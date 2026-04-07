import { Composition } from "remotion"

import {
  defaultShowreelProps,
  Showreel,
  SHOWREEL_DURATION_IN_FRAMES,
  SHOWREEL_FPS,
  SHOWREEL_HEIGHT,
  SHOWREEL_WIDTH,
} from "./Showreel"

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="Showreel"
        component={Showreel}
        durationInFrames={SHOWREEL_DURATION_IN_FRAMES}
        fps={SHOWREEL_FPS}
        width={SHOWREEL_WIDTH}
        height={SHOWREEL_HEIGHT}
        defaultProps={defaultShowreelProps}
      />
    </>
  )
}
