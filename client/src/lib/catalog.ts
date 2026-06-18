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

// Subcategorias exibidas como grade de cards. Sem `imagem`, usam a ilustração
// SVG da categoria (client/public/produtos/<id>.svg). Para usar foto própria,
// basta preencher `imagem` (ex.: 'produtos/cat-postes.jpg').
export const CATEGORIAS: Categoria[] = [
  { id: 'postes', nome: 'Postes & Padrão de Entrada' },
  { id: 'caixas', nome: 'Caixas de Padrão' },
  { id: 'projetos', nome: 'Projetos Elétricos' },
  { id: 'protecao', nome: 'Disjuntores & Proteção' },
  { id: 'conduites', nome: 'Conduítes & Caixas' },
  { id: 'cabos', nome: 'Cabos & Fios' },
  { id: 'tomadas', nome: 'Tomadas & Interruptores' },
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
