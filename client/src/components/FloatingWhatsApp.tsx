import { MessageCircle } from 'lucide-react'
import { EMPRESA, linkWhatsApp, WHATSAPP_PRINCIPAL } from '../lib/contatos'

export default function FloatingWhatsApp() {
  const mensagem = `Olá! Vim pelo site da ${EMPRESA.nome} e gostaria de mais informações.`

  return (
    <a
      href={linkWhatsApp(WHATSAPP_PRINCIPAL, mensagem)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-ink-950 shadow-lg shadow-whatsapp/30 transition-all duration-200 hover:bg-whatsapp-deep hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-whatsapp/60"
    >
      <MessageCircle size={26} />
    </a>
  )
}
