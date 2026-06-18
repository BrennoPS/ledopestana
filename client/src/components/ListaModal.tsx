import { useEffect } from 'react'
import { X, Minus, Plus, Trash2, MessageCircle } from 'lucide-react'
import type { Product } from '../lib/catalog'
import { EMPRESA, linkWhatsApp, WHATSAPP_PRINCIPAL } from '../lib/contatos'

export type ItemLista = { produto: Product; qtd: string }

type Props = {
  open: boolean
  itens: ItemLista[]
  onClose: () => void
  onStep: (id: string, delta: number) => void
  onSetQtd: (id: string, valor: string) => void
  onRemove: (id: string) => void
  onClear: () => void
}

const AVISO =
  'Os produtos são vendidos mediante contratação de serviço ou, para cidades próximas, mediante frete.'

export default function ListaModal({
  open,
  itens,
  onClose,
  onStep,
  onSetQtd,
  onRemove,
  onClear,
}: Props) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  if (!open) return null

  function montarMensagem(): string {
    const linhas: string[] = [`*Lista de produtos* — site ${EMPRESA.nome}`, '']
    itens.forEach((it) => {
      const n = parseInt(it.qtd, 10)
      const qtdTxt = it.qtd.trim() === '' || isNaN(n) || n <= 0 ? 'qtd a combinar' : `qtd: ${n}`
      linhas.push(`• ${it.produto.nome} — ${qtdTxt}`)
    })
    linhas.push('', `Obs.: ${AVISO}`, 'Pode me passar valores e condições?')
    return linhas.join('\n')
  }

  function enviar() {
    window.open(
      linkWhatsApp(WHATSAPP_PRINCIPAL, montarMensagem()),
      '_blank',
      'noopener,noreferrer',
    )
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-ink-950/70 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="lista-title"
        onClick={(e) => e.stopPropagation()}
        className="card-glass flex max-h-[92vh] w-full flex-col rounded-t-3xl sm:max-w-lg sm:rounded-3xl"
      >
        <div className="flex items-center justify-between gap-4 border-b border-white/10 p-5">
          <h2 id="lista-title" className="text-lg font-bold text-frost">
            Minha lista de produtos
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-mist transition-colors hover:bg-white/5 hover:text-frost"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {itens.length === 0 ? (
            <p className="py-8 text-center text-sm text-mist">
              Sua lista está vazia. Adicione produtos pelo botão “Adicionar à lista”.
            </p>
          ) : (
            <ul className="space-y-3">
              {itens.map((it) => (
                <li
                  key={it.produto.id}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-ink-800/50 p-3"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-frost">{it.produto.nome}</p>
                    <p className="truncate text-xs text-mist">{it.produto.nota}</p>
                  </div>

                  <div className="flex items-center gap-1 rounded-lg bg-ink-900/70 p-1 ring-1 ring-white/10">
                    <button
                      type="button"
                      aria-label="Diminuir"
                      onClick={() => onStep(it.produto.id, -1)}
                      className="grid h-7 w-7 place-items-center rounded-md text-mist transition-colors hover:bg-white/10 hover:text-frost"
                    >
                      <Minus size={15} />
                    </button>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={it.qtd}
                      onChange={(e) => onSetQtd(it.produto.id, e.target.value.replace(/[^\d]/g, ''))}
                      placeholder="—"
                      aria-label={`Quantidade de ${it.produto.nome}`}
                      className="w-10 bg-transparent text-center text-sm font-semibold text-frost placeholder:text-mist/50 focus:outline-none"
                    />
                    <button
                      type="button"
                      aria-label="Aumentar"
                      onClick={() => onStep(it.produto.id, 1)}
                      className="grid h-7 w-7 place-items-center rounded-md text-mist transition-colors hover:bg-white/10 hover:text-frost"
                    >
                      <Plus size={15} />
                    </button>
                  </div>

                  <button
                    type="button"
                    aria-label="Remover"
                    onClick={() => onRemove(it.produto.id)}
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-mist transition-colors hover:bg-red-soft/10 hover:text-red-soft"
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
          )}

          <p className="mt-4 rounded-xl border border-amber-soft/20 bg-amber-soft/5 p-3 text-xs leading-relaxed text-amber-soft">
            ⚠️ {AVISO} Deixe a quantidade em branco (—) se preferir combinar depois.
          </p>
        </div>

        <div className="flex items-center gap-3 border-t border-white/10 p-5">
          {itens.length > 0 && (
            <button
              type="button"
              onClick={onClear}
              className="text-sm font-medium text-mist transition-colors hover:text-frost"
            >
              Limpar
            </button>
          )}
          <button
            type="button"
            onClick={enviar}
            disabled={itens.length === 0}
            className="ml-auto inline-flex items-center justify-center gap-2 rounded-xl bg-whatsapp px-5 py-3 text-sm font-semibold text-ink-950 shadow-lg shadow-whatsapp/20 transition-all hover:-translate-y-0.5 hover:bg-whatsapp-deep disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
          >
            <MessageCircle size={18} /> Enviar no WhatsApp
          </button>
        </div>
      </div>
    </div>
  )
}
