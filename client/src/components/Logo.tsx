import { Zap } from 'lucide-react'
import { EMPRESA } from '../lib/contatos'

export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-ink-700 to-ink-600 ring-1 ring-sky-soft/20">
        <Zap size={18} className="text-sky-soft" fill="currentColor" />
      </span>
      <span className="leading-tight">
        <span className="block text-sm font-extrabold tracking-tight text-frost">
          {EMPRESA.nome}
        </span>
        {!compact && (
          <span className="block text-[10px] font-medium uppercase tracking-[0.18em] text-mist">
            Soluções Elétricas
          </span>
        )}
      </span>
    </span>
  )
}
