import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { getProducts, type Product } from '../lib/catalog'

export default function Produtos() {
  const [produtos, setProdutos] = useState<Product[] | null>(null)

  useEffect(() => {
    getProducts().then(setProdutos)
  }, [])

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-10 text-center animate-in">
        <h1 className="text-4xl font-extrabold tracking-tight text-frost">Nossos Produtos</h1>
        <p className="mx-auto mt-4 max-w-2xl text-mist">
          Caixas de padrão de entrada homologadas com os melhores preços. Entre em contato
          para fazer seu pedido.
        </p>
      </div>

      {produtos === null ? (
        <p className="text-center text-mist">Carregando produtos…</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {produtos.map((p) => (
            <ProductCard key={p.id} produto={p} />
          ))}
        </div>
      )}
    </section>
  )
}
