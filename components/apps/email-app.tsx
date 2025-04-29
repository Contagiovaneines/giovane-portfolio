import { useState } from "react"
import { Search, Star, Trash, Mail, Send, Archive } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface EmailAppProps {
  isDarkMode: boolean
}

interface Email {
  id: number
  from: string
  fromEmail: string
  subject: string
  preview: string
  time: string
  read: boolean
  starred: boolean
  labels: string[]
  avatar?: string
}

export default function EmailApp({ isDarkMode }: EmailAppProps) {
  const [activeTab, setActiveTab] = useState<"inbox" | "sent" | "drafts" | "trash">("inbox")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null)

  // Seu e-mail para contato
  const yourEmail = "giovaneinesdev@gmail.com"

  const emails: Email[] = [
    {
      id: 1,
      from: "GitHub",
      fromEmail: "noreply@github.com",
      subject: "Notificação de Pull Request",
      preview: "Um novo pull request foi aberto no repositório mobile-interface.",
      time: "10:30",
      read: false,
      starred: true,
      labels: ["trabalho"],
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      from: "LinkedIn",
      fromEmail: "notifications@linkedin.com",
      subject: "5 novas conexões para você",
      preview: "Veja quem se conectou com você esta semana e expanda sua rede profissional.",
      time: "Ontem",
      read: true,
      starred: false,
      labels: ["social"],
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      from: "Vercel",
      fromEmail: "support@vercel.com",
      subject: "Sua aplicação foi implantada com sucesso",
      preview: "Sua aplicação mobile-interface foi implantada com sucesso na Vercel.",
      time: "Seg",
      read: true,
      starred: false,
      labels: ["trabalho"],
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      from: "Contato",
      fromEmail: "cliente@empresa.com",
      subject: "Proposta de projeto",
      preview: "Olá, gostaria de discutir um novo projeto de desenvolvimento web...",
      time: "25 Abr",
      read: false,
      starred: true,
      labels: ["importante", "cliente"],
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const sentEmails: Email[] = [
    {
      id: 101,
      from: "Você",
      fromEmail: yourEmail,
      subject: "Orçamento para projeto web",
      preview: "Segue em anexo o orçamento para o desenvolvimento do site conforme solicitado...",
      time: "Hoje",
      read: true,
      starred: false,
      labels: ["cliente"],
    },
    {
      id: 102,
      from: "Você",
      fromEmail: yourEmail,
      subject: "Atualização do portfólio",
      preview: "Adicionei os novos projetos ao meu portfólio online. Confira em...",
      time: "Ontem",
      read: true,
      starred: false,
      labels: ["trabalho"],
    },
  ]

  const filteredEmails = () => {
    let emailList: Email[] = []

    switch (activeTab) {
      case "inbox":
        emailList = emails
        break
      case "sent":
        emailList = sentEmails
        break
      case "drafts":
        emailList = []
        break
      case "trash":
        emailList = []
        break
    }

    if (searchTerm) {
      return emailList.filter(
        (email) =>
          email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          email.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
          email.preview.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    return emailList
  }

  const handleEmailClick = (email: Email) => {
    setSelectedEmail(email)
  }

  const handleBackToList = () => {
    setSelectedEmail(null)
  }

  const handleComposeEmail = () => {
    const subject = encodeURIComponent("Projeto e propostas de emprego")
    const body = encodeURIComponent("Olá, gostaria de entrar em contato com você sobre projetos e propostas de emprego.")
    const mailtoLink = `mailto:giovaneinesdev@gmail.com?subject=${subject}&body=${body}`

    window.location.href = mailtoLink
  }

  return (
    <div className={`h-full overflow-auto ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      {selectedEmail ? (
        <div className="p-4">
          <button
            onClick={handleBackToList}
            className={`mb-4 px-3 py-1 rounded-md ${isDarkMode ? "bg-gray-800" : "bg-gray-200"}`}
          >
            Voltar
          </button>
          <div className="mb-4">
            <h2 className="text-xl font-bold">{selectedEmail.subject}</h2>
            <div className="flex items-center mt-2">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src={selectedEmail.avatar || "/placeholder.svg?height=32&width=32"} />
                <AvatarFallback>{selectedEmail.from[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center">
                  <span className="font-medium">{selectedEmail.from}</span>
                  <span className="text-xs ml-2 text-gray-500">&lt;{selectedEmail.fromEmail}&gt;</span>
                </div>
                <div className="text-xs text-gray-500">Para: {yourEmail}</div>
              </div>
              <div className="ml-auto text-sm text-gray-500">{selectedEmail.time}</div>
            </div>
          </div>
          <div className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}>
            <p className="whitespace-pre-line">
              {selectedEmail.preview}
            </p>
          </div>
          <div className="mt-4 flex space-x-2">
            <button className={`p-2 rounded-md ${isDarkMode ? "bg-gray-800" : "bg-gray-200"}`}>
              <Send className="h-5 w-5" />
            </button>
            <button className={`p-2 rounded-md ${isDarkMode ? "bg-gray-800" : "bg-gray-200"}`}>
              <Archive className="h-5 w-5" />
            </button>
            <button className={`p-2 rounded-md ${isDarkMode ? "bg-gray-800" : "bg-gray-200"}`}>
              <Trash className="h-5 w-5" />
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="p-4 border-b border-gray-200 dark:border-gray-800">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Pesquisar emails"
                className={`pl-9 ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-gray-100 border-gray-200"}`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex border-b border-gray-200 dark:border-gray-800">
            <button
              className={`flex-1 py-2 text-center ${activeTab === "inbox" ? (isDarkMode ? "border-b-2 border-white" : "border-b-2 border-black") : ""}`}
              onClick={() => setActiveTab("inbox")}
            >
              Caixa de Entrada
            </button>
            <button
              className={`flex-1 py-2 text-center ${activeTab === "sent" ? (isDarkMode ? "border-b-2 border-white" : "border-b-2 border-black") : ""}`}
              onClick={() => setActiveTab("sent")}
            >
              Enviados
            </button>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-800">
            {filteredEmails().length > 0 ? (
              filteredEmails().map((email) => (
                <div
                  key={email.id}
                  className={`p-3 ${!email.read ? (isDarkMode ? "bg-gray-900" : "bg-blue-50") : ""} cursor-pointer`}
                  onClick={() => handleEmailClick(email)}
                >
                  <div className="flex items-start">
                    <Avatar className="h-8 w-8 mr-2 mt-1">
                      <AvatarImage src={email.avatar || "/placeholder.svg?height=32&width=32"} />
                      <AvatarFallback>{email.from[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline">
                        <h3 className={`font-medium truncate ${!email.read ? "font-bold" : ""}`}>{email.from}</h3>
                        <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">{email.time}</span>
                      </div>
                      <p className="text-sm font-medium truncate">{email.subject}</p>
                      <p className="text-xs text-gray-500 truncate">{email.preview}</p>
                      {email.labels.length > 0 && (
                        <div className="flex mt-1 space-x-1">
                          {email.labels.map((label) => (
                            <Badge key={label} variant="outline" className="text-xs">
                              {label}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    {email.starred && <Star className="h-4 w-4 text-yellow-500 ml-2 flex-shrink-0" />}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">
                {activeTab === "inbox" ? "Sua caixa de entrada está vazia." : "Você não tem e-mails enviados."}
              </div>
            )}
          </div>
        </>
      )}

      {/* Adicionando o botão para compor o email */}
      <div className="fixed bottom-8 right-8">
        <button
          onClick={handleComposeEmail}
          className={`p-4 rounded-full shadow-lg ${isDarkMode ? "bg-gray-800" : "bg-gray-200"}`}
        >
          <Mail className="h-6 w-6 text-white" />
        </button>
      </div>
    </div>
  )
}
