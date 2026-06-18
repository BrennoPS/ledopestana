import { useState } from 'react'
import {
  RadioTower,
  Box,
  PencilRuler,
  ShieldCheck,
  SquareStack,
  Cable,
  Plug,
  type LucideIcon,
} from 'lucide-react'
import type { Categoria } from '../lib/catalog'

export const ICONES: Record<string, LucideIcon> = {
  postes: RadioTower,
  caixas: Box,
  projetos: PencilRuler,
  protecao: ShieldCheck,
  conduites: SquareStack,
  cabos: Cable,
  tomadas: Plug,
}

type Props = {
  c: Categoria
  ativa?: boolean
  onClick: () => void
}

export default function CategoriaCard({ c, ativa = false, onClick }: Props) {
  const [imgOk, setImgOk] = useState(true)
  const Icon = ICONES[c.id] ?? Box
  const src = (c.imagem ?? `produtos/${c.id}.svg`).replace(/^\//, '')

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative aspect-[4/3] overflow-hidden rounded-2xl border text-left transition-all hover:-translate-y-1 ${
        ativa ? 'border-sky-soft ring-2 ring-sky-soft/40' : 'border-white/10 hover:border-sky-soft/40'
      }`}
    >
      {imgOk ? (
        <img
          src={import.meta.env.BASE_URL + src}
          alt={c.nome}
          loading="lazy"
          onError={() => setImgOk(false)}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-ink-700 to-ink-900">
          <Icon size={88} className="absolute -bottom-3 -right-3 text-sky-soft/15" />
        </div>
      )}
      <span className="absolute left-3 top-3 rounded-lg bg-frost px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-ink-950 shadow-sm">
        {c.nome}
      </span>
    </button>
  )
}
