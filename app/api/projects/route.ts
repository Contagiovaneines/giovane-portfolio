import { NextResponse } from "next/server"

import { getPortfolioProjectsResponse } from "@/lib/github"

export const revalidate = 3600

export async function GET() {
  const payload = await getPortfolioProjectsResponse()

  return NextResponse.json(payload)
}
