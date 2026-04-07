import Link from "next/link"

import { ShowreelPlayer } from "@/components/showreel-player"
import { profileData } from "@/lib/profile"

export default function ShowreelPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_28%),linear-gradient(180deg,_#020617_0%,_#0f172a_50%,_#111827_100%)] px-4 py-12 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="space-y-6">
          <div className="inline-flex items-center rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-2 text-sm uppercase tracking-[0.3em] text-sky-200">
            Remotion showreel
          </div>

          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              Video portfolio pronto para apresentar posicionamento, stacks e contato.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Esta pagina usa <span className="font-semibold text-white">Remotion</span> para reproduzir um showreel
              baseado no que esta escrito no seu perfil. O objetivo e transformar o portfolio em uma peca
              visual pronta para apresentar servicos, experiencia, stacks e contato sem depender de listagens externas.
            </p>
          </div>

          <ShowreelPlayer
            inputProps={{
              profile: profileData,
            }}
          />

          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-full bg-white px-5 py-3 font-semibold text-slate-950 transition hover:bg-slate-200"
            >
              Voltar ao portfolio
            </Link>
            <a
              href={profileData.website}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-slate-600 px-5 py-3 font-semibold transition hover:border-slate-400 hover:bg-slate-900"
            >
              Abrir site
            </a>
            <a
              href={profileData.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-slate-600 px-5 py-3 font-semibold transition hover:border-slate-400 hover:bg-slate-900"
            >
              Abrir LinkedIn
            </a>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="text-sm uppercase tracking-[0.24em] text-slate-400">Narrativa do showreel</div>
            <div className="mt-4 grid gap-4">
              <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Abertura</div>
                <div className="mt-2 text-lg font-semibold">{profileData.hero.headline}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Perfil</div>
                <div className="mt-2 text-lg font-semibold">{profileData.shortName}</div>
                <p className="mt-2 text-sm text-slate-400">{profileData.title}</p>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="text-sm uppercase tracking-[0.24em] text-slate-400">Blocos mostrados no video</div>
            <div className="mt-5 space-y-4">
              {[
                {
                  title: "Servicos",
                  description: "Sites, landing pages, sistemas web, APIs, integracoes e white label.",
                },
                {
                  title: "Stacks",
                  description: "Base tecnica com Java, Spring Boot, Angular, TypeScript, FlutterFlow e operacao.",
                },
                {
                  title: "Experiencia",
                  description: "Vivencia atual em desenvolvimento, suporte e DevOps aplicada a entrega real.",
                },
                {
                  title: "Contato",
                  description: "Fechamento com e-mail, site e LinkedIn para converter o interesse em conversa.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-lg font-semibold">{item.title}</div>
                      <div className="mt-1 text-sm text-slate-400">{profileData.shortName}</div>
                    </div>
                    <div className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-sky-200">
                      Perfil
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}
