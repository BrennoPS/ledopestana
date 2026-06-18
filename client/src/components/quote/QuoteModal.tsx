import { useEffect, useState } from 'react'
import { X, ClipboardList, MessageCircle } from 'lucide-react'
import { EMPRESA, linkWhatsApp, WHATSAPP_PRINCIPAL } from '../../lib/contatos'
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

// Do menos para o mais urgente — cada nível com sua cor.
type Cor = 'green' | 'amber' | 'red'
const PRAZOS: { label: string; detalhe: string; cor: Cor }[] = [
  { label: 'Não urgente', detalhe: 'em até 5 dias', cor: 'green' },
  { label: 'Urgente', detalhe: 'em até 2 dias', cor: 'amber' },
  { label: 'Emergencial', detalhe: 'no mesmo dia', cor: 'red' },
]

const CORES: Record<Cor, { base: string; ativo: string }> = {
  green: {
    base: 'text-green-soft ring-green-soft/40 hover:bg-green-soft/15',
    ativo: 'bg-green-soft text-ink-950 ring-green-soft',
  },
  amber: {
    base: 'text-amber-soft ring-amber-soft/40 hover:bg-amber-soft/15',
    ativo: 'bg-amber-soft text-ink-950 ring-amber-soft',
  },
  red: {
    base: 'text-red-soft ring-red-soft/40 hover:bg-red-soft/15',
    ativo: 'bg-red-soft text-ink-950 ring-red-soft',
  },
}

const inputClass =
  'w-full rounded-xl border border-white/10 bg-ink-800/70 px-3 py-3 text-base text-frost placeholder:text-mist/50 transition-colors focus:border-sky-soft/50 focus:outline-none focus:ring-2 focus:ring-sky-soft/20 sm:py-2.5 sm:text-sm'
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
      className={`rounded-full px-3 py-1.5 text-xs font-semibold ring-1 transition-all ${
        active
          ? 'bg-sky-soft text-ink-950 ring-sky-soft'
          : 'bg-ink-800/60 text-mist ring-white/10 hover:bg-sky-soft/10 hover:text-sky-soft'
      }`}
    >
      {children}
    </button>
  )
}

export default function QuoteModal({ open, prefill, onClose }: Props) {
  const [nome, setNome] = useState('')
  const [endereco, setEndereco] = useState('')
  const [cidade, setCidade] = useState('')
  const [bairro, setBairro] = useState('')
  const [tipoImovel, setTipoImovel] = useState('')
  const [servico, setServico] = useState('')
  const [servicoOutro, setServicoOutro] = useState('')
  const [motivo, setMotivo] = useState('')
  const [prazo, setPrazo] = useState('')

  // Ao abrir: reseta e aplica o pré-preenchimento (se houver).
  useEffect(() => {
    if (!open) return
    setNome('')
    setEndereco('')
    setCidade('')
    setBairro('')
    setTipoImovel(prefill?.tipoImovel ?? '')
    setServico(prefill?.servico ?? '')
    setServicoOutro('')
    setMotivo('')
    setPrazo('')
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
    if (endereco.trim()) linhas.push(`• Endereço: ${endereco.trim()}`)
    if (cidade.trim()) linhas.push(`• Cidade: ${cidade.trim()}`)
    if (bairro.trim()) linhas.push(`• Bairro: ${bairro.trim()}`)
    if (tipoImovel) linhas.push(`• Tipo de imóvel: ${tipoImovel}`)
    const servicoFinal = servico === 'Outro' ? servicoOutro.trim() : servico
    if (servicoFinal) linhas.push(`• Serviço: ${servicoFinal}`)
    if (prazo) linhas.push(`• Prazo: ${prazo}`)
    if (motivo.trim()) linhas.push('', 'Motivo:', motivo.trim())
    return linhas.join('\n')
  }

  function enviar(e: React.FormEvent) {
    e.preventDefault()
    window.open(linkWhatsApp(WHATSAPP_PRINCIPAL, montarMensagem()), '_blank', 'noopener,noreferrer')
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
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-sky-soft/15 ring-1 ring-sky-soft/30">
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
            className="grid h-10 w-10 shrink-0 place-items-center rounded-lg text-mist transition-colors hover:bg-white/5 hover:text-frost"
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
            <label className={labelClass} htmlFor="q-endereco">
              Endereço
            </label>
            <input
              id="q-endereco"
              className={inputClass}
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              placeholder="Rua e número"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass} htmlFor="q-cidade">
                Cidade
              </label>
              <input
                id="q-cidade"
                className={inputClass}
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="q-bairro">
                Bairro
              </label>
              <input
                id="q-bairro"
                className={inputClass}
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
              />
            </div>
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

          <div>
            <label className={labelClass} htmlFor="q-motivo">
              Qual o motivo / o que você precisa
            </label>
            <textarea
              id="q-motivo"
              rows={4}
              className={`${inputClass} resize-y`}
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              placeholder="Descreva livremente: o que precisa, medidas, fotos que vai enviar, dúvidas…"
            />
          </div>

          <div>
            <span className={labelClass}>Prazo para atendimento</span>
            <div className="grid grid-cols-3 gap-2">
              {PRAZOS.map((p) => {
                const value = `${p.label} (${p.detalhe})`
                const active = prazo === value
                const cor = CORES[p.cor]
                return (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => setPrazo((cur) => (cur === value ? '' : value))}
                    className={`flex flex-col items-start rounded-xl px-3 py-2 text-left ring-1 transition-all ${
                      active ? cor.ativo : `bg-ink-800/60 ${cor.base}`
                    }`}
                  >
                    <span className="text-sm font-bold">{p.label}</span>
                    <span className={`text-[11px] ${active ? 'text-ink-950/80' : 'opacity-80'}`}>
                      {p.detalhe}
                    </span>
                  </button>
                )
              })}
            </div>
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
