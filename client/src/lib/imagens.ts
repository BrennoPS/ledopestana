// Fotos de exemplo (banco de imagens gratuito, por palavra-chave).
//
// São EXEMPLOS — genéricas por categoria. Para usar fotos próprias, basta preencher
// o campo `imagem` do produto em produtos.json (ela tem prioridade sobre estas).
// Se o serviço externo falhar, os componentes caem na ilustração SVG local.

import type { Product } from './catalog'

const PALAVRAS: Record<string, string> = {
  postes: 'powerline',
  caixas: 'switchboard',
  projetos: 'blueprint',
  protecao: 'circuitbreaker',
  conduites: 'conduit',
  cabos: 'cables',
  tomadas: 'socket',
}

// Hash estável (0–999) para fixar a mesma foto por id.
function lock(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return h % 1000
}

function url(palavra: string, semente: string): string {
  return `https://loremflickr.com/600/450/${palavra}?lock=${lock(semente)}`
}

export function fotoCategoria(id: string): string {
  return url(PALAVRAS[id] ?? 'electrical', `cat-${id}`)
}

export function fotoProduto(p: Pick<Product, 'id' | 'categoria'>): string {
  return url(PALAVRAS[p.categoria] ?? 'electrical', p.id)
}
