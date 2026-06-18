import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ArrowLeft, ShoppingBag } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import CategoriaCard from '../components/CategoriaCard'
import ListaModal, { type ItemLista } from '../components/ListaModal'
import { getProducts, CATEGORIAS, nomeCategoria, type Product } from '../lib/catalog'

export default function Produtos() {
  const [searchParams] = useSearchParams()
  const catParam = searchParams.get('cat')
  const [produtos, setProdutos] = useState<Product[] | null>(null)
  const [categoriaSel, setCategoriaSel] = useState<string | null>(
    catParam && CATEGORIAS.some((c) => c.id === catParam) ? catParam : null,
  )
  const [itens, setItens] = useState<ItemLista[]>([])
  const [listaAberta, setListaAberta] = useState(false)

  useEffect(() => {
    getProducts().then(setProdutos)
  }, [])

  const visiveis = useMemo(
    () => (categoriaSel ? (produtos ?? []).filter((p) => p.categoria === categoriaSel) : []),
    [produtos, categoriaSel],
  )

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
          Materiais elétricos e padrões de entrada. Escolha a categoria, monte sua lista e
          envie para a gente — retornamos com valores e condições.
        </p>
      </div>

      {/* Aviso de venda */}
      <div className="mx-auto mb-10 max-w-3xl rounded-2xl border border-amber-soft/25 bg-amber-soft/5 px-5 py-4 text-center text-sm leading-relaxed text-amber-soft">
        ⚠️ Os produtos são vendidos <strong>mediante contratação de serviço</strong> ou, para
        <strong> cidades próximas, mediante frete</strong>.
      </div>

      {/* Grade de categorias */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {CATEGORIAS.map((c) => (
          <CategoriaCard
            key={c.id}
            c={c}
            ativa={categoriaSel === c.id}
            onClick={() => setCategoriaSel(categoriaSel === c.id ? null : c.id)}
          />
        ))}
      </div>

      {/* Produtos da categoria escolhida */}
      {categoriaSel && (
        <div className="mt-12">
          <div className="mb-6 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setCategoriaSel(null)}
              className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm text-mist transition-colors hover:bg-white/5 hover:text-frost"
            >
              <ArrowLeft size={16} /> Categorias
            </button>
            <h2 className="text-xl font-bold text-frost">{nomeCategoria(categoriaSel)}</h2>
          </div>

          {produtos === null ? (
            <p className="text-center text-mist">Carregando…</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visiveis.map((p) => (
                <ProductCard key={p.id} produto={p} onAdd={addItem} quantidadeNaLista={qtdNaLista(p.id)} />
              ))}
            </div>
          )}
        </div>
      )}

      {!categoriaSel && (
        <p className="mt-10 text-center text-sm text-mist">
          👆 Toque em uma categoria para ver os produtos e montar sua lista.
        </p>
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
