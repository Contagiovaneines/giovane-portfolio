# Giovane Portfolio

Portfólio interativo construído em `Next.js` que simula a experiência de um smartphone na tela.

Em vez de uma landing page tradicional, o projeto apresenta informações profissionais, projetos e atalhos externos dentro de uma interface inspirada em sistema mobile.

## Visão geral

O objetivo deste projeto é apresentar o perfil de Giovane de forma mais visual e memorável, combinando:

- identidade pessoal
- navegação em formato de apps
- tema customizável
- transições e telas sobrepostas
- experiência focada em portfólio e apresentação profissional

O usuário entra em uma tela de boot, acessa uma home com ícones de apps e navega por seções como perfil, projetos, clima, calendário, notas, e-mail e links externos.

## Funcionalidades

- tela inicial com animação de boot
- interface principal em formato de celular
- modo claro e escuro
- personalização de cor principal e tamanho de fonte
- painel de notificações
- busca de apps
- tela de perfil profissional
- listagem de projetos
- app de notas com persistência em `localStorage`
- clima e calendário simulados
- atalhos para GitHub, LinkedIn e Instagram
- integração visual com componentes baseados em Radix UI

## Stack

- `Next.js 15`
- `React 19`
- `TypeScript`
- `Tailwind CSS`
- `Radix UI`
- `Lucide React`

## Estrutura principal

```text
app/
  layout.tsx
  page.tsx

components/
  app-screen.tsx
  boot-screen.tsx
  home-screen.tsx
  notification-panel.tsx
  profile-screen.tsx
  search-overlay.tsx
  settings-panel.tsx
  status-bar.tsx
  apps/

lib/
  app-data.ts
  storage.ts

public/
  images/
  perfil.jpg
```

## Apps e áreas do portfólio

Hoje o projeto já inclui telas ou atalhos para:

- `Instagram`
- `GitHub`
- `LinkedIn`
- `Spotify`
- `Notes`
- `Calendar`
- `Weather`
- `Projects`
- `Mail`

Alguns ícones extras existem como base para futuras expansões da interface.

## Como rodar o projeto

### Requisitos

- `Node.js`
- `npm`

### Instalação

Neste projeto, o caminho mais estável é usar `npm` com `--legacy-peer-deps`.

```bash
npm install --legacy-peer-deps
```

Isso é necessário porque há um conflito de `peer dependency` entre `react-day-picker` e `date-fns` no estado atual do repositório.

### Desenvolvimento

```bash
npm run dev
```

Depois, abra:

```text
http://localhost:3000
```

### Build de produção

```bash
npm run build
npm run start
```

## Scripts disponíveis

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Decisões do projeto

### Interface em formato de celular

O layout principal foi pensado para destacar o portfólio como experiência, não apenas como vitrine estática. Isso ajuda a diferenciar a apresentação visual do projeto.

### Persistência local

Configurações de tema e notas são armazenadas no navegador com `localStorage`, permitindo que a experiência permaneça personalizada entre acessos.

### Estrutura modular

Cada tela foi separada em componentes próprios, o que facilita manutenção, testes visuais e evolução futura.

## Próximas melhorias possíveis

- buscar projetos diretamente do GitHub em vez de manter tudo manualmente
- adicionar animações mais refinadas com `motion`
- criar uma rota de showreel com `Remotion`
- melhorar SEO e compartilhamento social
- substituir imagens placeholder por thumbnails reais dos projetos
- corrigir textos com problemas de encoding em alguns componentes

## Status

O projeto está funcional como portfólio interativo e serve bem como base para evoluções visuais e integrações futuras.
