import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, ShoppingBag, X } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import ListaModal, { type ItemLista } from '../components/ListaModal'
import { getProducts, CATEGORIAS, type Product } from '../lib/catalog'

const normalizar = (s: string) =>
  s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()

export default function Produtos() {
  const [searchParams] = useSearchParams()
  const catParam = searchParams.get('cat')
  const [produtos, setProdutos] = useState<Product[] | null>(null)
  const [categoriaSel, setCategoriaSel] = useState<string | null>(
    catParam && CATEGORIAS.some((c) => c.id === catParam) ? catParam : null,
  )
  const [busca, setBusca] = useState('')
  const [itens, setItens] = useState<ItemLista[]>([])
  const [listaAberta, setListaAberta] = useState(false)

  useEffect(() => {
    getProducts().then(setProdutos)
  }, [])

  const visiveis = useMemo(() => {
    const termo = normalizar(busca.trim())
    return (produtos ?? []).filter((p) => {
      const okCat = categoriaSel ? p.categoria === categoriaSel : true
      const okBusca = termo ? normalizar(p.nome).includes(termo) : true
      return okCat && okBusca
    })
  }, [produtos, categoriaSel, busca])

  const totalItens = itens.reduce((acc, it) => {
    const n = parseInt(it.qtd, 10)
    return acc + (isNaN(n) || n <= 0 ? 1 : n)
  }, 0)

  function addItem(p: Product) {
    setItens((cur) => {
      const existe = cur.find((it) => it.produto.id === p.id)
      if (existe) {
        const n = parseInt(existe.qtd, 10)
        const novo = isNaN(n) || n <= 0 ? 1 : n + 1
        return cur.map((it) => (it.produto.id === p.id ? { ...it, qtd: String(novo) } : it))
      }
      return [...cur, { produto: p, qtd: '1' }]
    })
    setListaAberta(true)
  }

  function step(id: string, delta: number) {
    setItens((cur) =>
      cur.map((it) => {
        if (it.produto.id !== id) return it
        const n = parseInt(it.qtd, 10)
        const base = isNaN(n) ? 0 : n
        return { ...it, qtd: String(Math.max(1, base + delta)) }
      }),
    )
  }

  function setQtd(id: string, valor: string) {
    setItens((cur) => cur.map((it) => (it.produto.id === id ? { ...it, qtd: valor } : it)))
  }

  function remove(id: string) {
    setItens((cur) => cur.filter((it) => it.produto.id !== id))
  }

  function qtdNaLista(id: string): number {
    const it = itens.find((x) => x.produto.id === id)
    if (!it) return 0
    const n = parseInt(it.qtd, 10)
    return isNaN(n) || n <= 0 ? 1 : n
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-8 text-center animate-in">
        <h1 className="text-4xl font-extrabold tracking-tight text-frost">Nossos Produtos</h1>
        <p className="mx-auto mt-4 max-w-2xl text-mist">
          Busque o produto, monte sua lista e envie para a gente — retornamos com valores e
          condições.
        </p>
      </div>

      {/* Aviso de venda */}
      <div className="mx-auto mb-8 max-w-3xl rounded-2xl border border-amber-soft/25 bg-amber-soft/5 px-5 py-4 text-center text-sm leading-relaxed text-amber-soft">
        ⚠️ Os produtos são vendidos <strong>mediante contratação de serviço</strong> ou, para
        <strong> cidades próximas, mediante frete</strong>.
      </div>

      {/* Busca */}
      <div className="relative mx-auto mb-5 max-w-xl">
        <Search size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-mist" />
        <input
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar produto (ex.: poste, disjuntor, caixa…)"
          className="w-full rounded-xl border border-white/10 bg-ink-800/70 py-3 pl-11 pr-10 text-sm text-frost placeholder:text-mist/60 transition-colors focus:border-sky-soft/50 focus:outline-none focus:ring-2 focus:ring-sky-soft/20"
        />
        {busca && (
          <button
            type="button"
            onClick={() => setBusca('')}
            aria-label="Limpar busca"
            className="absolute right-2.5 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-lg text-mist transition-colors hover:bg-white/10 hover:text-frost"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Filtro por categoria */}
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={() => setCategoriaSel(null)}
          className={`rounded-full px-3.5 py-1.5 text-xs font-semibold ring-1 transition-all ${
            categoriaSel === null
              ? 'bg-sky-soft text-ink-950 ring-sky-soft'
              : 'bg-ink-800/60 text-mist ring-white/10 hover:bg-sky-soft/10 hover:text-sky-soft'
          }`}
        >
          Todas
        </button>
        {CATEGORIAS.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setCategoriaSel(c.id)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold ring-1 transition-all ${
              categoriaSel === c.id
                ? 'bg-sky-soft text-ink-950 ring-sky-soft'
                : 'bg-ink-800/60 text-mist ring-white/10 hover:bg-sky-soft/10 hover:text-sky-soft'
            }`}
          >
            {c.nome}
          </button>
        ))}
      </div>

      {/* Lista de produtos */}
      {produtos === null ? (
        <p className="text-center text-mist">Carregando…</p>
      ) : visiveis.length === 0 ? (
        <p className="text-center text-mist">Nenhum produto encontrado para a sua busca.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visiveis.map((p) => (
            <ProductCard key={p.id} produto={p} onAdd={addItem} quantidadeNaLista={qtdNaLista(p.id)} />
          ))}
        </div>
      )}

      {/* Barra fixa da lista */}
      {itens.length > 0 && (
        <button
          type="button"
          onClick={() => setListaAberta(true)}
          className="fixed bottom-5 left-1/2 z-40 inline-flex -translate-x-1/2 items-center gap-2 rounded-full bg-sky-mid px-5 py-3 text-sm font-bold text-ink-950 shadow-xl shadow-sky-mid/30 transition-all hover:-translate-x-1/2 hover:-translate-y-0.5 hover:bg-sky-soft"
        >
          <ShoppingBag size={18} /> Minha lista
          <span className="grid h-6 min-w-6 place-items-center rounded-full bg-ink-950 px-1.5 text-xs text-frost">
            {totalItens}
          </span>
        </button>
      )}

      <ListaModal
        open={listaAberta}
        itens={itens}
        onClose={() => setListaAberta(false)}
        onStep={step}
        onSetQtd={setQtd}
        onRemove={remove}
        onClear={() => setItens([])}
      />
    </section>
  )
}
