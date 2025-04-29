"use client"
import { Avatar } from "@/components/ui/avatar"
import { AvatarImage, AvatarFallback } from "@/components/ui/avatar"

interface YoutubeAppProps {
  isDarkMode: boolean
}

export default function YoutubeApp({ isDarkMode }: YoutubeAppProps) {
  const videos = [
    {
      id: 1,
      title: "How to Build a Mobile Interface with React",
      channel: "CodeTutorials",
      views: "245K views",
      timeAgo: "2 weeks ago",
      duration: "15:42",
      thumbnail: "/placeholder.svg?height=200&width=360",
      channelAvatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      title: "Learn Angular in 30 Minutes",
      channel: "WebDev Simplified",
      views: "1.2M views",
      timeAgo: "1 month ago",
      duration: "32:18",
      thumbnail: "/placeholder.svg?height=200&width=360",
      channelAvatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      title: "Building Responsive UIs - Best Practices",
      channel: "UI Mastery",
      views: "567K views",
      timeAgo: "3 weeks ago",
      duration: "22:05",
      thumbnail: "/placeholder.svg?height=200&width=360",
      channelAvatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  return (
    <div className={`h-full overflow-auto ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      <div className="p-4 space-y-4">
        {videos.map((video) => (
          <div key={video.id} className="pb-4">
            <div className="relative">
              <img src={video.thumbnail || "/placeholder.svg"} alt={video.title} className="w-full rounded-lg" />
              <div
                className={`absolute bottom-2 right-2 px-1 py-0.5 text-xs rounded ${
                  isDarkMode ? "bg-black text-white" : "bg-black text-white"
                }`}
              >
                {video.duration}
              </div>
            </div>

            <div className="mt-2 flex">
              <Avatar className="w-9 h-9 mt-1 mr-3">
                <AvatarImage src={video.channelAvatar || "/placeholder.svg"} alt={video.channel} />
                <AvatarFallback>{video.channel.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>

              <div>
                <h3 className="font-medium text-sm line-clamp-2">{video.title}</h3>
                <p className={`text-xs mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{video.channel}</p>
                <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {video.views} • {video.timeAgo}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
