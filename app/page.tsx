"use client"

import dynamic from "next/dynamic"

const MobilePortfolio = dynamic(
  () => import("@/components/mobile-portfolio").then((module) => module.MobilePortfolio),
  { ssr: false },
)

export default function HomePage() {
  return <MobilePortfolio />
}
