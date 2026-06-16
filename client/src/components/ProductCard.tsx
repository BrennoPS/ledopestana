import { useState } from 'react'
import { Box, ShoppingCart, MessageCircle } from 'lucide-react'
import type { Product } from '../lib/catalog'
import { formatPreco } from '../lib/catalog'
import { EMPRESA, linkWhatsApp, WHATSAPP_PRINCIPAL } from '../lib/contatos'

export default function ProductCard({ produto }: { produto: Product }) {
  const [imgOk, setImgOk] = useState(true)

  const mensagem = `Olá! Tenho interesse no produto *${produto.nome}* (${formatPreco(
    produto.preco,
  )}) do site da ${EMPRESA.nome}.`

  return (
    <div className="card-glass flex flex-col overflow-hidden rounded-2xl transition-all duration-200 hover:-translate-y-1 hover:border-sky-soft/40">
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-ink-700 to-ink-800">
        {imgOk ? (
          <img
            src={produto.imagem}
            alt={produto.nome}
            loading="lazy"
            onError={() => setImgOk(false)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="grid h-full w-full place-items-center">
            <Box size={56} className="text-sky-soft/40" />
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-ink-950/70 px-2.5 py-1 text-[11px] font-medium text-ml-yellow ring-1 ring-ml-yellow/25">
          {produto.categoria}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-bold text-frost">{produto.nome}</h3>
        <p className="mt-1.5 flex-1 text-sm leading-relaxed text-mist">{produto.descricao}</p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-xl font-extrabold text-gradient">{formatPreco(produto.preco)}</span>
          {produto.mlUrl ? (
            <a
              href={produto.mlUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Comprar no Mercado Livre"
              className="inline-flex items-center gap-2 rounded-xl bg-ml-yellow px-4 py-2.5 text-sm font-semibold text-ink-950 transition-all hover:-translate-y-0.5 hover:bg-ml-yellow-deep"
            >
              <ShoppingCart size={16} /> Comprar
            </a>
          ) : (
            <a
              href={linkWhatsApp(WHATSAPP_PRINCIPAL, mensagem)}
              target="_blank"
              rel="noopener noreferrer"
              title="Consultar no WhatsApp"
              className="inline-flex items-center gap-2 rounded-xl bg-whatsapp px-4 py-2.5 text-sm font-semibold text-ink-950 transition-all hover:-translate-y-0.5 hover:bg-whatsapp-deep"
            >
              <MessageCircle size={16} /> Consultar
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
