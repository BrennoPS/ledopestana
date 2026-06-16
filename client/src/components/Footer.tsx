import { Link } from 'react-router-dom'
import { Instagram, Mail, Phone, MessageCircle } from 'lucide-react'
import Logo from './Logo'
import { CONTATOS, EMPRESA, linkWhatsApp } from '../lib/contatos'

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/5 bg-ink-950/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-mist">
            Soluções elétricas completas em baixa e média tensão para residências,
            comércios e indústrias.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-frost">Serviços</h3>
          <ul className="mt-4 space-y-2 text-sm text-mist">
            <li>Instalação de padrão de entrada</li>
            <li>Manutenção elétrica</li>
            <li>Baixa e média tensão</li>
            <li>Projetos elétricos</li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-frost">Contato</h3>
          <ul className="mt-4 space-y-3 text-sm text-mist">
            {CONTATOS.map((c) => (
              <li key={c.whatsapp}>
                <a
                  className="inline-flex items-center gap-2 text-whatsapp transition-colors hover:text-whatsapp-deep"
                  href={linkWhatsApp(c.whatsapp, `Olá! Vim pelo site da ${EMPRESA.nome}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle size={15} /> {c.nome} — {c.telefone}
                </a>
              </li>
            ))}
            <li>
              <a className="inline-flex items-center gap-2 text-sky-soft transition-colors hover:text-sky-mid" href={`tel:${EMPRESA.telefoneLoja.replace(/\D/g, '')}`}>
                <Phone size={15} /> Loja: {EMPRESA.telefoneLoja}
              </a>
            </li>
            <li>
              <a
                className="inline-flex items-center gap-2 text-instagram transition-colors hover:opacity-80"
                href={EMPRESA.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={15} /> {EMPRESA.instagramHandle}
              </a>
            </li>
            <li>
              <a className="inline-flex items-center gap-2 transition-colors hover:text-frost" href={`mailto:${EMPRESA.email}`}>
                <Mail size={15} /> {EMPRESA.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-mist sm:flex-row">
          <span>
            © {new Date().getFullYear()} {EMPRESA.nomeCompleto}. Todos os direitos reservados.
          </span>
          <div className="flex gap-4">
            <Link to="/produtos" className="hover:text-sky-soft">Produtos</Link>
            <Link to="/servicos" className="hover:text-sky-soft">Serviços</Link>
            <Link to="/contato" className="hover:text-sky-soft">Contato</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
