import { PortfolioHome } from "@/components/portfolio-home"
import { getPortfolioProjectsResponse } from "@/lib/github"

export const revalidate = 3600

export default async function SitePage() {
  const { projects, source } = await getPortfolioProjectsResponse()

  return <PortfolioHome projects={projects} source={source} />
}
