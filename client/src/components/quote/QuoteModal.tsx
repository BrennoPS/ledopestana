import { useEffect, useState } from 'react'
import { X, ClipboardList, MessageCircle } from 'lucide-react'
import { EMPRESA, linkWhatsApp, WHATSAPP_PRINCIPAL } from '../../lib/contatos'
import { getProducts, type Product } from '../../lib/catalog'
import type { QuotePrefill } from './QuoteModalContext'

type Props = {
  open: boolean
  prefill?: QuotePrefill
  onClose: () => void
}

// Sugestões — escopo aberto: são atalhos, não limites. Tudo é opcional e há "Outro".
const TIPOS_IMOVEL = ['Residencial', 'Comercial', 'Industrial', 'Predial']
const SERVICOS = [
  'Instalação de padrão de entrada',
  'Manutenção em baixa tensão',
  'Manutenção em média tensão',
  'Projeto elétrico',
  'Outro',
]
const PRAZOS = ['Sem pressa', 'Próximos dias', 'Urgente']

const inputClass =
  'w-full rounded-xl border border-white/10 bg-ink-800/70 px-3 py-2.5 text-sm text-frost placeholder:text-mist/50 transition-colors focus:border-sky-soft/50 focus:outline-none focus:ring-2 focus:ring-sky-soft/20'
const labelClass = 'mb-1.5 block text-sm font-medium text-frost'

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
        active
          ? 'bg-sky-soft/20 text-sky-soft ring-1 ring-sky-soft/40'
          : 'bg-ink-800/60 text-mist ring-1 ring-white/10 hover:text-frost'
      }`}
    >
      {children}
    </button>
  )
}

export default function QuoteModal({ open, prefill, onClose }: Props) {
  const [produtos, setProdutos] = useState<Product[]>([])

  const [nome, setNome] = useState('')
  const [tipoImovel, setTipoImovel] = useState('')
  const [servico, setServico] = useState('')
  const [servicoOutro, setServicoOutro] = useState('')
  const [produtoNome, setProdutoNome] = useState('')
  const [quantidade, setQuantidade] = useState(1)
  const [prazo, setPrazo] = useState('')
  const [local, setLocal] = useState('')
  const [detalhes, setDetalhes] = useState('')

  // Carrega catálogo uma vez (mesma fonte da página de Produtos — pronto para a v2 do ML).
  useEffect(() => {
    getProducts().then(setProdutos)
  }, [])

  // Ao abrir: reseta e aplica o pré-preenchimento (se houver).
  useEffect(() => {
    if (!open) return
    setNome('')
    setTipoImovel(prefill?.tipoImovel ?? '')
    setServico(prefill?.servico ?? '')
    setServicoOutro('')
    setProdutoNome(prefill?.produtoNome ?? '')
    setQuantidade(prefill?.quantidade ?? 1)
    setPrazo('')
    setLocal('')
    setDetalhes('')
  }, [open, prefill])

  // Esc fecha + trava o scroll do fundo enquanto aberto.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose])

  if (!open) return null

  function montarMensagem(): string {
    const linhas: string[] = [`*Solicitação de orçamento* — site ${EMPRESA.nome}`, '']
    if (nome.trim()) linhas.push(`• Nome: ${nome.trim()}`)
    if (tipoImovel) linhas.push(`• Tipo de imóvel: ${tipoImovel}`)
    const servicoFinal = servico === 'Outro' ? servicoOutro.trim() : servico
    if (servicoFinal) linhas.push(`• Serviço: ${servicoFinal}`)
    if (produtoNome) {
      const q = quantidade > 0 ? ` (x${quantidade})` : ''
      linhas.push(`• Produto: ${produtoNome}${q}`)
    }
    if (prazo) linhas.push(`• Prazo: ${prazo}`)
    if (local.trim()) linhas.push(`• Local: ${local.trim()}`)
    if (detalhes.trim()) {
      linhas.push('', 'Detalhes:', detalhes.trim())
    }
    return linhas.join('\n')
  }

  function enviar(e: React.FormEvent) {
    e.preventDefault()
    const url = linkWhatsApp(WHATSAPP_PRINCIPAL, montarMensagem())
    window.open(url, '_blank', 'noopener,noreferrer')
    onClose()
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
        aria-labelledby="quote-title"
        onClick={(e) => e.stopPropagation()}
        className="card-glass max-h-[92vh] w-full overflow-y-auto rounded-t-3xl p-6 sm:max-w-lg sm:rounded-3xl"
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-sky-soft/10 ring-1 ring-sky-soft/20">
              <ClipboardList className="text-sky-soft" size={20} />
            </span>
            <div>
              <h2 id="quote-title" className="text-lg font-bold text-frost">
                Solicitar orçamento
              </h2>
              <p className="text-xs text-mist">
                Preencha o que quiser — todos os campos são opcionais.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-mist transition-colors hover:bg-white/5 hover:text-frost"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={enviar} className="space-y-5">
          <div>
            <label className={labelClass} htmlFor="q-nome">
              Seu nome
            </label>
            <input
              id="q-nome"
              className={inputClass}
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Como podemos te chamar?"
            />
          </div>

          <div>
            <span className={labelClass}>Tipo de imóvel</span>
            <div className="flex flex-wrap gap-2">
              {TIPOS_IMOVEL.map((t) => (
                <Chip
                  key={t}
                  active={tipoImovel === t}
                  onClick={() => setTipoImovel((cur) => (cur === t ? '' : t))}
                >
                  {t}
                </Chip>
              ))}
            </div>
          </div>

          <div>
            <label className={labelClass} htmlFor="q-servico">
              Serviço de interesse
            </label>
            <select
              id="q-servico"
              className={inputClass}
              value={servico}
              onChange={(e) => setServico(e.target.value)}
            >
              <option value="">Selecione (opcional)</option>
              {SERVICOS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {servico === 'Outro' && (
              <input
                className={`${inputClass} mt-2`}
                value={servicoOutro}
                onChange={(e) => setServicoOutro(e.target.value)}
                placeholder="Descreva o serviço que você precisa"
              />
            )}
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className={labelClass} htmlFor="q-produto">
                Produto
              </label>
              <select
                id="q-produto"
                className={inputClass}
                value={produtoNome}
                onChange={(e) => setProdutoNome(e.target.value)}
              >
                <option value="">Nenhum / só serviço</option>
                {produtos.map((p) => (
                  <option key={p.id} value={p.nome}>
                    {p.nome}
                  </option>
                ))}
                <option value="Outro / não listado">Outro / não listado</option>
              </select>
            </div>
            <div>
              <label className={labelClass} htmlFor="q-qtd">
                Qtd.
              </label>
              <input
                id="q-qtd"
                type="number"
                min={1}
                className={inputClass}
                value={quantidade}
                onChange={(e) => setQuantidade(Math.max(1, Number(e.target.value) || 1))}
                disabled={!produtoNome}
              />
            </div>
          </div>

          <div>
            <span className={labelClass}>Prazo desejado</span>
            <div className="flex flex-wrap gap-2">
              {PRAZOS.map((p) => (
                <Chip key={p} active={prazo === p} onClick={() => setPrazo((cur) => (cur === p ? '' : p))}>
                  {p}
                </Chip>
              ))}
            </div>
          </div>

          <div>
            <label className={labelClass} htmlFor="q-local">
              Cidade / bairro
            </label>
            <input
              id="q-local"
              className={inputClass}
              value={local}
              onChange={(e) => setLocal(e.target.value)}
              placeholder="Onde será o serviço?"
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="q-detalhes">
              Detalhes do que você precisa
            </label>
            <textarea
              id="q-detalhes"
              rows={4}
              className={`${inputClass} resize-y`}
              value={detalhes}
              onChange={(e) => setDetalhes(e.target.value)}
              placeholder="Descreva livremente: o que precisa, medidas, fotos que vai enviar, dúvidas…"
            />
          </div>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-whatsapp px-5 py-3 text-sm font-semibold text-ink-950 shadow-lg shadow-whatsapp/20 transition-all hover:-translate-y-0.5 hover:bg-whatsapp-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-whatsapp/60"
          >
            <MessageCircle size={18} /> Enviar no WhatsApp
          </button>
          <p className="text-center text-xs text-mist">
            Abre o WhatsApp com a mensagem já montada — você revisa antes de enviar.
          </p>
        </form>
      </div>
    </div>
  )
}
