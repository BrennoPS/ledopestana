# Ledo & Pestana — Soluções Elétricas

Site institucional da **Ledo & Pestana Soluções Elétricas** — React + Vite + TypeScript + Tailwind CSS, publicado de graça no GitHub Pages.

## Rodar localmente

```bash
cd client
npm install
npm run dev
```

## Gerar o build (publicação)

```bash
cd client
npm run build      # gera os arquivos em ../docs
```

Depois, com o GitHub Pages configurado para servir da branch `main` pasta `/docs`, é só commitar e dar push.

## Onde editar as coisas

| O quê | Arquivo |
|---|---|
| Telefones, WhatsApp, Instagram, e-mail | `client/src/lib/contatos.ts` |
| Produtos (nome, nota, categoria, imagem) | `client/src/data/produtos.json` |
| Categorias de produtos | `client/src/lib/catalog.ts` (lista `CATEGORIAS`) |
| Cores / tema | `client/src/index.css` (bloco `@theme`) |
| Caminho base do GitHub Pages | `client/vite.config.ts` (constante `BASE`) |

## Produtos e lista

Cada produto em `produtos.json` tem: `id`, `nome`, `categoria` (id de uma categoria
em `CATEGORIAS`), `nota` (rótulo de preço/condição, ex.: "Sob consulta") e, opcional,
`imagem`. Não há preço fixo — os valores são combinados via WhatsApp.

Na página de Produtos o cliente escolhe a categoria, **monta uma lista** (adicionando
itens e ajustando quantidade) e envia tudo de uma vez ao Rodrigo Pestana pelo WhatsApp.
Os produtos são vendidos mediante serviço ou, para cidades próximas, mediante frete —
aviso exibido na própria página.

## Imagens dos produtos

Por padrão, os cards usam **ilustrações SVG** por categoria
(`client/public/produtos/<categoria>.svg`). A ordem de fallback é:
foto própria → ilustração SVG da categoria → ícone.

Para usar **fotos próprias**, coloque o arquivo em `client/public/produtos/` e
preencha o campo `imagem` do produto em `produtos.json`
(ex.: `"imagem": "produtos/caixa-tipo-2.jpg"`) — a foto tem prioridade sobre a
ilustração. Para a capa de uma categoria, preencha `imagem` na lista
`CATEGORIAS` em `client/src/lib/catalog.ts`.
