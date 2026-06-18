// Camada de catálogo de produtos.
//
// Lê de data/produtos.json (estático). Os preços não são fixos — cada item traz
// uma "nota" (ex.: "Sob consulta", "A partir de — consultar", "Instalação completa…").
// Os produtos do site são vendidos mediante serviço ou, para cidades próximas,
// mediante frete (ver aviso na página de Produtos).

import produtosJson from '../data/produtos.json'

export type Product = {
  id: string
  nome: string
  /** id da categoria (ver CATEGORIAS) */
  categoria: string
  /** rótulo de preço/condição, ex.: "Sob consulta" */
  nota: string
  /** imagem opcional do produto (em /public/produtos/) */
  imagem?: string
}

export type Categoria = {
  id: string
  nome: string
  /** imagem opcional de capa (em /public/categorias/) — cai no ícone se faltar */
  imagem?: string
}

/** Subcategorias exibidas como grade de cards na página de Produtos. */
export const CATEGORIAS: Categoria[] = [
  { id: 'postes', nome: 'Postes & Padrão de Entrada', imagem: 'produtos/cat-postes.jpg' },
  { id: 'caixas', nome: 'Caixas de Padrão', imagem: 'produtos/cat-caixas.jpg' },
  { id: 'projetos', nome: 'Projetos Elétricos', imagem: 'produtos/cat-projetos.jpg' },
  { id: 'protecao', nome: 'Disjuntores & Proteção', imagem: 'produtos/cat-protecao.jpg' },
  { id: 'conduites', nome: 'Conduítes & Caixas', imagem: 'produtos/cat-conduites.jpg' },
  { id: 'cabos', nome: 'Cabos & Fios', imagem: 'produtos/cat-cabos.jpg' },
  { id: 'tomadas', nome: 'Tomadas & Interruptores', imagem: 'produtos/cat-tomadas.jpg' },
]

export async function getProducts(): Promise<Product[]> {
  return produtosJson as Product[]
}

export function getCategorias(): Categoria[] {
  return CATEGORIAS
}

export function nomeCategoria(id: string): string {
  return CATEGORIAS.find((c) => c.id === id)?.nome ?? id
}
