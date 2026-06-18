import { useState } from 'react'
import { Box, Plus, Check } from 'lucide-react'
import type { Product } from '../lib/catalog'

type Props = {
  produto: Product
  onAdd: (produto: Product) => void
  quantidadeNaLista?: number
}

export default function ProductCard({ produto, onAdd, quantidadeNaLista = 0 }: Props) {
  const [imgOk, setImgOk] = useState(true)
  const naLista = quantidadeNaLista > 0

  // Usa a foto do produto, se houver; senão a ilustração da categoria.
  const arquivo = (produto.imagem ?? `produtos/${produto.categoria}.svg`).replace(/^\//, '')
  const src = import.meta.env.BASE_URL + arquivo

  return (
    <div className="card-glass flex flex-col overflow-hidden rounded-2xl transition-all duration-200 hover:-translate-y-1 hover:border-sky-soft/40">
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-ink-700 to-ink-800">
        {imgOk ? (
          <img
            src={src}
            alt={produto.nome}
            loading="lazy"
            onError={() => setImgOk(false)}
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
