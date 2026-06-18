// Fotos de exemplo locais (uma por categoria), baixadas de bancos livres
// (Wikimedia Commons) — ver CREDITS.md. Ficam em /public/produtos/cat-<id>.jpg.
//
// Para usar fotos próprias de um produto específico, preencha o campo `imagem`
// dele em produtos.json — ela tem prioridade sobre a foto da categoria.

import { CATEGORIAS, type Product } from './catalog'

function comBase(arquivo?: string): string | null {
  return arquivo ? import.meta.env.BASE_URL + arquivo.replace(/^\//, '') : null
}

export function fotoCategoria(id: string): string | null {
  return comBase(CATEGORIAS.find((c) => c.id === id)?.imagem)
}

export function fotoProduto(p: Pick<Product, 'categoria'>): string | null {
  return fotoCategoria(p.categoria)
}
