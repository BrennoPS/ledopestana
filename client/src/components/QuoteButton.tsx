import { ClipboardList } from 'lucide-react'
import { useQuote, type QuotePrefill } from './quote/QuoteModalContext'

type Props = {
  children?: React.ReactNode
  prefill?: QuotePrefill
  className?: string
}

export default function QuoteButton({
  children = 'Solicitar orçamento',
  prefill,
  className = '',
}: Props) {
  const { openQuote } = useQuote()

  return (
    <button
      type="button"
      onClick={() => openQuote(prefill)}
      className={`inline-flex items-center justify-center gap-2 rounded-xl bg-whatsapp px-5 py-3 text-sm font-semibold text-ink-950 shadow-lg shadow-whatsapp/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-whatsapp-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-whatsapp/60 ${className}`}
    >
      <ClipboardList size={18} />
      {children}
    </button>
  )
}
