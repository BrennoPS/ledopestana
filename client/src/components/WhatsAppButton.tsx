import { MessageCircle } from 'lucide-react'
import { linkWhatsApp, WHATSAPP_PRINCIPAL } from '../lib/contatos'

type Props = {
  mensagem: string
  numero?: string
  children?: React.ReactNode
  variant?: 'solid' | 'ghost'
  className?: string
}

export default function WhatsAppButton({
  mensagem,
  numero = WHATSAPP_PRINCIPAL,
  children = 'Falar no WhatsApp',
  variant = 'solid',
  className = '',
}: Props) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-whatsapp/60'
  const styles =
    variant === 'solid'
      ? 'bg-whatsapp text-ink-950 hover:bg-whatsapp-deep hover:-translate-y-0.5 shadow-lg shadow-whatsapp/20'
      : 'card-glass text-frost hover:border-whatsapp/40 hover:-translate-y-0.5'

  return (
    <a
      href={linkWhatsApp(numero, mensagem)}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${styles} ${className}`}
    >
      <MessageCircle size={18} />
      {children}
    </a>
  )
}
