import { useMemo, useState } from 'react'
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
import { fotoCategoria } from '../lib/imagens'

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
  const Icon = ICONES[c.id] ?? Box

  // Foto própria → foto de exemplo → ilustração SVG → ícone.
  const candidatos = useMemo(() => {
    const base = import.meta.env.BASE_URL
    const arr: string[] = []
    if (c.imagem) arr.push(base + c.imagem.replace(/^\//, ''))
    arr.push(fotoCategoria(c.id))
    arr.push(base + `produtos/${c.id}.svg`)
    return arr
  }, [c])
  const [idx, setIdx] = useState(0)

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative aspect-[4/3] overflow-hidden rounded-2xl border text-left transition-all hover:-translate-y-1 ${
        ativa ? 'border-sky-soft ring-2 ring-sky-soft/40' : 'border-white/10 hover:border-sky-soft/40'
      }`}
    >
      {idx < candidatos.length ? (
        <img
          src={candidatos[idx]}
          alt={c.nome}
          loading="lazy"
          onError={() => setIdx((i) => i + 1)}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-ink-700 to-ink-900">
          <Icon size={88} className="absolute -bottom-3 -right-3 text-sky-soft/15" />
        </div>
      )}
      {/* leve escurecimento p/ legibilidade da etiqueta sobre a foto */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/50 via-transparent to-ink-950/10" />
      <span className="absolute left-3 top-3 rounded-lg bg-frost px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-ink-950 shadow-sm">
        {c.nome}
      </span>
    </button>
  )
}
