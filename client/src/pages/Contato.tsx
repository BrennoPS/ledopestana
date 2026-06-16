import { Instagram, Mail, Phone, MessageCircle } from 'lucide-react'
import { CONTATOS, EMPRESA, linkWhatsApp } from '../lib/contatos'

export default function Contato() {
  const msg = `Olá! Vim pelo site da ${EMPRESA.nome} e gostaria de mais informações.`

  return (
    <section className="mx-auto max-w-4xl px-4 py-16">
      <div className="mb-10 text-center animate-in">
        <h1 className="text-4xl font-extrabold tracking-tight text-frost">Contato</h1>
        <p className="mx-auto mt-4 max-w-xl text-mist">
          Estamos prontos para atender você. Entre em contato pelo canal de sua preferência.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {CONTATOS.map((c) => (
          <a
            key={c.whatsapp}
            href={linkWhatsApp(c.whatsapp, msg)}
            target="_blank"
            rel="noopener noreferrer"
            className="card-glass flex items-center gap-4 rounded-2xl p-5 transition-all hover:-translate-y-1 hover:border-whatsapp/40"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-whatsapp/10 ring-1 ring-whatsapp/20">
              <MessageCircle className="text-whatsapp" size={22} />
            </span>
            <span>
              <span className="block text-sm font-semibold text-frost">{c.nome}</span>
              <span className="block text-sm text-mist">{c.telefone}</span>
              <span className="block text-xs text-whatsapp">WhatsApp</span>
            </span>
          </a>
        ))}

        <a
          href={`tel:${EMPRESA.telefoneLoja.replace(/\D/g, '')}`}
          className="card-glass flex items-center gap-4 rounded-2xl p-5 transition-all hover:-translate-y-1 hover:border-sky-soft/40"
        >
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-sky-soft/10 ring-1 ring-sky-soft/20">
            <Phone className="text-sky-soft" size={22} />
          </span>
          <span>
            <span className="block text-sm font-semibold text-frost">Loja</span>
            <span className="block text-sm text-mist">{EMPRESA.telefoneLoja}</span>
            <span className="block text-xs text-sky-soft">Telefone fixo</span>
          </span>
        </a>

        <a
          href={EMPRESA.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="card-glass flex items-center gap-4 rounded-2xl p-5 transition-all hover:-translate-y-1 hover:border-instagram/40"
        >
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-instagram/10 ring-1 ring-instagram/20">
            <Instagram className="text-instagram" size={22} />
          </span>
          <span>
            <span className="block text-sm font-semibold text-frost">Instagram</span>
            <span className="block text-sm text-mist">{EMPRESA.instagramHandle}</span>
            <span className="block text-xs text-instagram">Siga a gente</span>
          </span>
        </a>

        <a
          href={`mailto:${EMPRESA.email}`}
          className="card-glass flex items-center gap-4 rounded-2xl p-5 transition-all hover:-translate-y-1 hover:border-sky-soft/40 sm:col-span-2"
        >
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-sky-soft/10 ring-1 ring-sky-soft/20">
            <Mail className="text-sky-soft" size={22} />
          </span>
          <span>
            <span className="block text-sm font-semibold text-frost">E-mail</span>
            <span className="block text-sm text-mist">{EMPRESA.email}</span>
          </span>
        </a>
      </div>
    </section>
  )
}
