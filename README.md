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
| Produtos (nome, preço, descrição, imagem) | `client/src/data/produtos.json` |
| Link de compra no Mercado Livre | `client/src/data/produtos.json` (campo `mlUrl`) |
| Cores / tema | `client/src/index.css` (bloco `@theme`) |
| Caminho base do GitHub Pages | `client/vite.config.ts` (constante `BASE`) |

## Imagens dos produtos

Coloque as fotos em `client/public/produtos/` com os nomes referenciados em
`produtos.json` (ex.: `monofasico.jpg`). Enquanto não houver foto, o card mostra
um placeholder com ícone automaticamente.

## Integração futura com o Mercado Livre (v2)

A página de Produtos consome **apenas** a função `getProducts()` em
`client/src/lib/catalog.ts`. Hoje ela lê o `produtos.json` local. Para refletir
os anúncios do Mercado Livre, basta trocar a implementação dessa função para
buscar de um `produtos.json` gerado por uma GitHub Action agendada ou de uma
função serverless — **sem alterar a interface do site**. Credenciais do ML nunca
devem ir para o código do front (ficam no servidor/Action).

O botão **Comprar** de cada produto já está preparado: se o campo `mlUrl` estiver
preenchido com o link do anúncio, o botão leva direto ao Mercado Livre (em amarelo).
Enquanto `mlUrl` estiver vazio, o botão vira **Consultar** e cai no WhatsApp.
