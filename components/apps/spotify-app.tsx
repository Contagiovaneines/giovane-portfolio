"use client"

import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle } from "lucide-react"
import { useState } from "react"

interface SpotifyAppProps {
  isDarkMode: boolean
}

export default function SpotifyApp({ isDarkMode }: SpotifyAppProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(35)
  const totalDuration = 214 // 3:34 em segundos

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const playlists = [
    { id: 1, name: "Michael Jackson Essentials", cover: "https://i.discogs.com/ZJT4uZxoX6-jN6C90pKGHhgjMG5KIX-Y12BHvHIkymI/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTYyNDA4/MjktMTQxNDUyNjgw/OS0xNDIyLmpwZWc.jpeg" },
    { id: 2, name: "Elvis Presley Greatest Hits", cover: "https://i.discogs.com/u-pLp1eZt9fk4GBKYV-f5QMXWM7F0RhB-wjjDFNST0w/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTkyNDM2/MTctMTQ3NzI0ODE0/Ni03NjIwLmpwZWc.jpeg" },
    { id: 3, name: "Queen Collection", cover: "https://i.discogs.com/1Xk4nj6a0FFyqjFUWMFW8jChrEYl6vc4KEfezL0izmk/rs:fit/g:sm/q:90/h:520/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTM4MzUy/ODctMTQxMTgzODcx/My0yNjQzLmpwZWc.jpeg" },
    { id: 4, name: "Rock Classics", cover: "https://i.discogs.com/nzwKhsZqB1wC0XiC-QnM7hE43wDCbuhP1_7tylVprlY/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTc3ODEz/NzAtMTQ0ODY5MDcw/NS03MzU4LmpwZWc.jpeg" },
  ]

  const recentlyPlayed = [
    { id: 1, title: "Thriller", artist: "Michael Jackson", album: "Thriller", cover: "https://i.discogs.com/1Xk4nj6a0FFyqjFUWMFW8jChrEYl6vc4KEfezL0izmk/rs:fit/g:sm/q:90/h:520/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTM4MzUy/ODctMTQxMTgzODcx/My0yNjQzLmpwZWc.jpeg" },
    { id: 2, title: "Billie Jean", artist: "Michael Jackson", album: "Thriller", cover: "https://i.discogs.com/ZJT4uZxoX6-jN6C90pKGHhgjMG5KIX-Y12BHvHIkymI/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTYyNDA4/MjktMTQxNDUyNjgw/OS0xNDIyLmpwZWc.jpeg" },
    { id: 3, title: "Bohemian Rhapsody", artist: "Queen", album: "A Night at the Opera", cover: "https://i.discogs.com/nzwKhsZqB1wC0XiC-QnM7hE43wDCbuhP1_7tylVprlY/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTc3ODEz/NzAtMTQ0ODY5MDcw/NS03MzU4LmpwZWc.jpeg" },
  ]
  return (
    <div className={`h-full overflow-auto ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      {/* Spotify embed */}
      <div className="p-4">
        <iframe
          style={{ borderRadius: 12 }}
          src="https://open.spotify.com/embed/playlist/5yKkmhToKpFmnhHRkoyNim?utm_source=generator"
          width="100%"
          height="152"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </div>

      {/* Main content */}
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Boa tarde</h2>

        {/* Playlists */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className={`flex items-center rounded-md overflow-hidden ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}
            >
              <img src={playlist.cover || "/placeholder.svg"} alt={playlist.name} className="w-12 h-12" />
              <span className="ml-3 font-medium text-sm truncate pr-2">{playlist.name}</span>
            </div>
          ))}
        </div>

        <h3 className="text-lg font-bold mb-3">Reproduzidos recentemente</h3>

        {/* Recently played */}
        <div className="space-y-3 mb-16">
          {recentlyPlayed.map((song) => (
            <div key={song.id} className="flex items-center">
              <img src={song.cover || "/placeholder.svg"} alt={song.title} className="w-12 h-12 rounded" />
              <div className="ml-3">
                <div className="font-medium text-sm">{song.title}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{song.artist} - {song.album}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Player */}
      <div
        className={`fixed bottom-0 left-0 right-0 p-3 ${isDarkMode ? "bg-gray-900" : "bg-gray-100"} border-t ${
          isDarkMode ? "border-gray-800" : "border-gray-300"
        }`}
      >
        <div className="flex items-center mb-2">
          <img src="https://i.discogs.com/ZJT4uZxoX6-jN6C90pKGHhgjMG5KIX-Y12BHvHIkymI/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTYyNDA4/MjktMTQxNDUyNjgw/OS0xNDIyLmpwZWc.jpeg" alt="Música atual" className="w-12 h-12 rounded" />
          <div className="ml-3 flex-1">
            <div className="font-medium text-sm">Thriller</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Michael Jackson</div>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-4 mb-2">
          <button className="text-gray-500 dark:text-gray-400">
            <Shuffle className="w-4 h-4" />
          </button>
          <button className="text-gray-500 dark:text-gray-400">
            <SkipBack className="w-5 h-5" />
          </button>
          <button
            className={`p-2 rounded-full ${isDarkMode ? "bg-white text-black" : "bg-black text-white"}`}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          <button className="text-gray-500 dark:text-gray-400">
            <SkipForward className="w-5 h-5" />
          </button>
          <button className="text-gray-500 dark:text-gray-400">
            <Repeat className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center text-xs">
          <span className="w-10 text-right">{formatTime(currentTime)}</span>
          <div className="mx-2 flex-1 bg-gray-300 dark:bg-gray-700 rounded-full h-1">
            <div
              className="bg-gray-800 dark:bg-white h-1 rounded-full"
              style={{ width: `${(currentTime / totalDuration) * 100}%` }}
            ></div>
          </div>
          <span className="w-10">{formatTime(totalDuration)}</span>
        </div>
      </div>
    </div>
  )
}
