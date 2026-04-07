"use client"

import { useEffect, useRef, useState } from "react"
import { Camera, Loader2, RefreshCw, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"

interface CameraAppProps {
  isDarkMode: boolean
}

function getCameraErrorMessage(error: unknown) {
  if (!(error instanceof DOMException)) {
    return "Nao foi possivel abrir a camera."
  }

  switch (error.name) {
    case "NotAllowedError":
      return "Permita o acesso a camera para ver a imagem ao vivo."
    case "NotFoundError":
      return "Nenhuma camera foi encontrada neste dispositivo."
    case "NotReadableError":
      return "A camera esta em uso por outro aplicativo."
    default:
      return "Nao foi possivel abrir a camera."
  }
}

export default function CameraApp({ isDarkMode }: CameraAppProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isReady, setIsReady] = useState(false)

  const stopStream = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = null

    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
  }

  const startCamera = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setError("Seu navegador nao suporta acesso a camera.")
      setIsLoading(false)
      setIsReady(false)
      return
    }

    setIsLoading(true)
    setError(null)
    setIsReady(false)
    stopStream()

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: "user",
        },
      })

      streamRef.current = stream

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play().catch(() => undefined)
      }

      setIsReady(true)
    } catch (cameraError) {
      setError(getCameraErrorMessage(cameraError))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void startCamera()

    return () => {
      stopStream()
    }
  }, [])

  return (
    <div className={`flex h-full flex-col ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      <div className={`border-b p-4 ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}>
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold">Camera</h2>
            <p className={`mt-1 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              So abre a visualizacao. Nada e gravado ou enviado.
            </p>
          </div>

          <Button type="button" variant="outline" size="icon" onClick={() => void startCamera()} aria-label="Recarregar camera">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 p-4">
        <div
          className={`relative flex h-full min-h-80 items-center justify-center overflow-hidden rounded-3xl border ${
            isDarkMode ? "border-gray-800 bg-gray-950" : "border-gray-200 bg-gray-100"
          }`}
        >
          {isReady ? (
            <video ref={videoRef} className="h-full w-full object-cover" autoPlay muted playsInline />
          ) : null}

          {!isReady ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
              {isLoading ? (
                <>
                  <Loader2 className="h-10 w-10 animate-spin" />
                  <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>Abrindo a camera...</p>
                </>
              ) : error ? (
                <>
                  <Camera className="h-10 w-10" />
                  <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>{error}</p>
                  <Button type="button" onClick={() => void startCamera()}>
                    Tentar novamente
                  </Button>
                </>
              ) : null}
            </div>
          ) : null}
        </div>

        <div
          className={`mt-4 rounded-2xl p-4 text-sm ${
            isDarkMode ? "bg-gray-900 text-gray-300" : "bg-gray-100 text-gray-700"
          }`}
        >
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 h-5 w-5 text-green-500" />
            <p>
              O navegador vai pedir permissao para a camera. Esse app so mostra o preview ao vivo e encerra o acesso
              quando voce fecha a tela.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
