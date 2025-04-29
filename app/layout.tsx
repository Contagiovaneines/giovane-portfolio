import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Giovane Ines',
  description: 'Desenvolvedor Fullstack | Criado por Giovane Ines',
  generator: 'Giovane Ines',
  applicationName: 'Giovane Ines',
  authors: [{ name: 'Giovane Ines', url: 'https://github.com/giovaneines' }],
  keywords: ['Desenvolvedor Fullstack', 'Giovane Ines', 'Tecnologia', 'Software', 'Programação'],
  viewport: 'width=device-width, initial-scale=1.0',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  )
}
