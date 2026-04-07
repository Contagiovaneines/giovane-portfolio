export interface ProfileService {
  id: string
  title: string
  description: string
}

export interface ProfileHighlight {
  title: string
  description: string
}

export interface ProfileExperience {
  title: string
  company: string
  period: string
  description: string
  highlights: string[]
}

export interface ProfileEducation {
  degree: string
  institution: string
  year: string
}

export interface ProfileTechGroup {
  title: string
  items: string[]
}

export interface ProfileData {
  name: string
  shortName: string
  title: string
  location: string
  availability: string
  email: string
  phone: string
  website: string
  bio: string
  hero: {
    eyebrow: string
    headline: string
    subheadline: string
    availabilityNote: string
  }
  proofPoints: string[]
  serviceFocus: string[]
  services: ProfileService[]
  about: {
    heading: string
    paragraphs: string[]
    highlights: ProfileHighlight[]
  }
  skills: string[]
  techGroups: ProfileTechGroup[]
  experience: ProfileExperience[]
  education: ProfileEducation[]
  credentials: string[]
  featuredProjectIds: string[]
  finalCta: {
    title: string
    description: string
  }
  social: {
    github: string
    linkedin: string
    instagram: string
  }
}

export const profileData: ProfileData = {
  name: "Giovane Ines da Silva",
  shortName: "Giovane Ines",
  title: "Desenvolvedor full stack para sites, landing pages e sistemas web",
  location: "Caçapava, SP",
  availability: "Atendimento remoto para todo o Brasil",
  email: "giovaneinesdev@gmail.com",
  phone: "Contato inicial por e-mail",
  website: "https://contagiovaneines.github.io",
  bio: "Desenvolvo sites, landing pages, sistemas web, APIs e integrações com foco em clareza, performance e evolução do produto. Uno base técnica em Java, Angular, Spring Boot, FlutterFlow e operações para entregar soluções confiáveis, fáceis de usar e fáceis de manter.",
  hero: {
    eyebrow: "Sites, landing pages, sistemas e integrações",
    headline: "Soluções digitais sob medida para empresas que precisam vender melhor e operar com mais clareza.",
    subheadline:
      "Atuo como desenvolvedor full stack criando experiências web, integrações e produtos sob medida com foco comercial, organização técnica e entrega confiável. Posso apoiar desde páginas de conversão até projetos white label e sistemas mais estruturados.",
    availabilityNote: "Disponível para freelas, parcerias e projetos white label.",
  },
  proofPoints: [
    "Sites institucionais com apresentação mais profissional",
    "Landing pages com foco em oferta, clareza e CTA",
    "Sistemas web para organizar processos e operações",
    "APIs e integrações para conectar ferramentas e fluxos",
  ],
  serviceFocus: [
    "Sites institucionais",
    "Landing pages",
    "Sistemas web",
    "APIs e integrações",
    "Soluções white label",
  ],
  services: [
    {
      id: "sites",
      title: "Sites institucionais",
      description:
        "Páginas profissionais para apresentar sua empresa com mais clareza, autoridade e boa experiência em desktop e mobile.",
    },
    {
      id: "landing-pages",
      title: "Landing pages",
      description:
        "Estruturas focadas em campanhas, captação e apresentação de oferta, com copy organizada e CTA bem distribuído.",
    },
    {
      id: "sistemas-web",
      title: "Sistemas web",
      description:
        "Painéis, fluxos internos e ferramentas sob medida para organizar dados, processos e rotinas do negócio.",
    },
    {
      id: "apis-integracoes",
      title: "APIs e integrações",
      description:
        "Conexão entre sistemas, consumo de APIs externas e automações que reduzem retrabalho e melhoram o fluxo operacional.",
    },
    {
      id: "white-label",
      title: "Soluções white label",
      description:
        "Apoio técnico para agências e parceiros que precisam entregar projetos sob sua marca com base consistente e boa manutenção.",
    },
  ],
  about: {
    heading: "Credibilidade técnica com foco em solução",
    paragraphs: [
      "Meu trabalho é transformar necessidade de negócio em produto digital claro, funcional e pronto para evoluir. Hoje atuo como desenvolvedor na Kaspper, onde sigo amadurecendo em projetos práticos, colaboração em equipe e boas práticas de desenvolvimento.",
      "Além da base em front-end, back-end e FlutterFlow, trago experiência com suporte e DevOps. Isso me ajuda a olhar para o projeto além da interface: penso em estrutura, integração, confiabilidade, manutenção e experiência final para quem vai usar.",
      "Para clientes e parceiros, isso significa uma entrega mais objetiva, comunicação clara e soluções pensadas para resolver o problema sem perder qualidade técnica.",
    ],
    highlights: [
      {
        title: "Entrega ponta a ponta",
        description: "Posso atuar da interface ao back-end, passando por APIs, integrações, dados e publicação.",
      },
      {
        title: "Visão técnica e operacional",
        description: "Minha trajetória combina desenvolvimento, suporte e automação de entrega, o que ajuda a prever gargalos mais cedo.",
      },
      {
        title: "Estrutura para crescer",
        description: "Busco construir soluções que funcionam bem agora e continuem fáceis de evoluir depois.",
      },
      {
        title: "Parceria para white label",
        description: "Consigo apoiar times e agências em entregas sob demanda, com organização e responsabilidade técnica.",
      },
    ],
  },
  skills: [
    "Java",
    "Spring Boot",
    "Angular",
    "TypeScript",
    "FlutterFlow",
    "APIs REST",
    "Supabase",
    "Firebase",
    "Git/GitHub",
    "Docker",
  ],
  techGroups: [
    {
      title: "Front-end",
      items: ["Angular", "TypeScript", "HTML", "CSS", "Tailwind CSS", "Interfaces responsivas"],
    },
    {
      title: "Back-end e APIs",
      items: ["Java", "Spring Boot", "APIs REST", "Integrações", "Supabase", "Firebase"],
    },
    {
      title: "Mobile e validação rápida",
      items: ["FlutterFlow", "Flutter", "Protótipos funcionais", "Experiências mobile"],
    },
    {
      title: "Entrega e operação",
      items: ["Git/GitHub", "GitLab CI/CD", "Docker", "Kubernetes", "Helm", "Vercel"],
    },
  ],
  experience: [
    {
      title: "Desenvolvedor Fullstack",
      company: "Kaspper",
      period: "março de 2025 - atual",
      description:
        "Atuação no desenvolvimento de aplicativos e fluxos digitais com FlutterFlow, enquanto aprofundo a base em Java, APIs e boas práticas de desenvolvimento orientado a objetos.",
      highlights: [
        "Participação em entregas com foco em produto e experiência do usuário.",
        "Evolução prática em back-end, organização de código e integrações.",
        "Vivência em projetos reais, mentorias e rotina colaborativa de time.",
      ],
    },
    {
      title: "Auxiliar de Suporte Técnico",
      company: "AG Distribuidora",
      period: "novembro de 2024 - março de 2025",
      description:
        "Suporte técnico em sistemas, redes e infraestrutura, com foco em ERP WinThor e diagnósticos que impactavam a operação do negócio.",
      highlights: [
        "Atendimento voltado à resolução rápida de problemas operacionais.",
        "Contato com contexto de ERP, infraestrutura e rotinas empresariais.",
        "Visão prática sobre gargalos que afetam o dia a dia do cliente final.",
      ],
    },
    {
      title: "Estagiário DevOps",
      company: "Jack Experts",
      period: "dezembro de 2023 - agosto de 2024",
      description:
        "Trabalho com automação de pipelines, padronização de deploys e melhoria de confiabilidade usando GitLab CI/CD, Docker, Kubernetes e Helm.",
      highlights: [
        "Apoio na redução de atrito entre desenvolvimento e entrega.",
        "Contato direto com esteiras, containers e ambientes mais previsíveis.",
        "Base importante para construir soluções com mais segurança e manutenção.",
      ],
    },
  ],
  education: [
    {
      degree: "Tecnólogo em Sistemas para Internet",
      institution: "UniCesumar",
      year: "em andamento",
    },
    {
      degree: "Técnico em Desenvolvimento de Sistemas",
      institution: "ETEC",
      year: "2022",
    },
    {
      degree: "Kaspper Academy",
      institution: "Formação prática em desenvolvimento",
      year: "2025",
    },
    {
      degree: "Intercâmbio em Inglês",
      institution: "Twin English Centre, London",
      year: "2023",
    },
  ],
  credentials: [
    "Atuação atual na Kaspper",
    "Formação técnica em Desenvolvimento de Sistemas",
    "Sistemas para Internet em andamento",
    "Base em inglês com intercâmbio internacional",
  ],
  featuredProjectIds: [
    "StreamixSite",
    "Recibo-emadec",
    "disney-api",
    "Sistema-de-Gerenciamento-de-Estoque",
    "AudioBook-flutterflow",
    "flutter-techtaste",
  ],
  finalCta: {
    title: "Vamos transformar sua ideia em uma solução digital mais forte?",
    description:
      "Se você precisa de um site profissional, uma landing page mais estratégica, um sistema web sob medida ou apoio técnico em integrações e white label, vamos conversar sobre o que faz sentido para o seu cenário.",
  },
  social: {
    github: "https://github.com/contagiovaneines",
    linkedin: "https://www.linkedin.com/in/giovane-ines",
    instagram: "https://www.instagram.com/giovane_ines/",
  },
}
