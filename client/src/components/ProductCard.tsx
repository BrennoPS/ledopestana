import { useMemo, useState } from 'react'
import { Box, Plus, Check } from 'lucide-react'
import type { Product } from '../lib/catalog'

type Props = {
  produto: Product
  onAdd: (produto: Product) => void
  quantidadeNaLista?: number
}

export default function ProductCard({ produto, onAdd, quantidadeNaLista = 0 }: Props) {
  const naLista = quantidadeNaLista > 0

  // Fonte preferida → fallback: foto própria do produto, ilustração SVG, ícone.
  const candidatos = useMemo(() => {
    const base = import.meta.env.BASE_URL
    const arr: string[] = []
    if (produto.imagem) arr.push(base + produto.imagem.replace(/^\//, ''))
    arr.push(base + `produtos/${produto.categoria}.svg`)
    return arr
  }, [produto])
  const [idx, setIdx] = useState(0)

  return (
    <div className="card-glass flex flex-col overflow-hidden rounded-2xl transition-all duration-200 hover:-translate-y-1 hover:border-sky-soft/40">
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-ink-700 to-ink-800">
        {idx < candidatos.length ? (
          <img
            src={candidatos[idx]}
            alt={produto.nome}
            loading="lazy"
            onError={() => setIdx((i) => i + 1)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="grid h-full w-full place-items-center">
            <Box size={48} className="text-sky-soft/40" />
          </div>
        )}
        {naLista && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-whatsapp px-2.5 py-1 text-[11px] font-bold text-ink-950">
            <Check size={12} /> {quantidadeNaLista} na lista
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-bold text-frost">{produto.nome}</h3>
        <p className="mt-1.5 flex-1 text-sm leading-relaxed text-mist">{produto.nota}</p>

        <button
          type="button"
          onClick={() => onAdd(produto)}
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-sky-mid px-4 py-2.5 text-sm font-semibold text-ink-950 transition-all hover:-translate-y-0.5 hover:bg-sky-soft"
        >
          <Plus size={16} /> {naLista ? 'Adicionar mais' : 'Adicionar à lista'}
        </button>
      </div>
    </div>
  )
}
