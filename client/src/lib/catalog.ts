// Camada de catálogo de produtos.
//
// HOJE: lê de data/produtos.json (estático).
// VERSÃO 2 (Mercado Livre): basta trocar a implementação de getProducts() para
// buscar de um produtos.json gerado por GitHub Action ou de uma função serverless
// que consulta a API do Mercado Livre — a UI (página Produtos) NÃO muda.

import produtosJson from '../data/produtos.json'

export type Product = {
  id: string
  nome: string
  descricao: string
  preco: number
  imagem: string
  categoria: string
  /** Link do anúncio no Mercado Livre. Vazio = ainda sem anúncio (cai no WhatsApp). */
  mlUrl?: string
}

export async function getProducts(): Promise<Product[]> {
  // Mantido async de propósito: a v2 fará fetch() de uma fonte remota.
  return produtosJson as Product[]
}

const formatadorBRL = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export function formatPreco(valor: number): string {
  return formatadorBRL.format(valor)
}
