import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import QuoteModal from './QuoteModal'

/** Dados opcionais para abrir o modal já pré-preenchido (ex.: a partir de um card de produto). */
export type QuotePrefill = {
  servico?: string
  produtoNome?: string
  quantidade?: number
  tipoImovel?: string
}

type QuoteContextValue = {
  openQuote: (prefill?: QuotePrefill) => void
}

const QuoteContext = createContext<QuoteContextValue | null>(null)

export function useQuote(): QuoteContextValue {
  const ctx = useContext(QuoteContext)
  if (!ctx) throw new Error('useQuote precisa estar dentro de <QuoteProvider>')
  return ctx
}

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [prefill, setPrefill] = useState<QuotePrefill | undefined>(undefined)

  const openQuote = useCallback((p?: QuotePrefill) => {
    setPrefill(p)
    setOpen(true)
  }, [])

  const closeQuote = useCallback(() => setOpen(false), [])

  return (
    <QuoteContext.Provider value={{ openQuote }}>
      {children}
      <QuoteModal open={open} prefill={prefill} onClose={closeQuote} />
    </QuoteContext.Provider>
  )
}
