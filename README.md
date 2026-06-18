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

São opcionais. Coloque as fotos em `client/public/produtos/` e referencie no campo
`imagem` do produto. Sem foto, o card mostra um placeholder com ícone automaticamente.
Para capas das categorias, use `client/public/categorias/` e o campo `imagem` em
`CATEGORIAS` (sem capa, aparece um ícone temático).
