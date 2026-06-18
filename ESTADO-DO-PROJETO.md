# Estado do projeto — checkpoint

> Última atualização: 18/06/2026 · Site no ar: https://brennops.github.io/ledopestana/
> Repositório: https://github.com/BrennoPS/ledopestana

Resumo de tudo que já está pronto e o que falta, para retomar daqui sem perder contexto.

## ✅ O que já está pronto

**Site institucional** — React + Vite + TypeScript + Tailwind, publicado de graça no
GitHub Pages (pasta `docs/` da branch `main`).

### Páginas
- **Início (Home)** — hero, seção **Nossos Produtos** (categorias) logo no topo,
  serviços, diferenciais e CTA.
- **Produtos** — lista todos os produtos com **busca por nome** (ignora acento) e
  **filtro por categoria** (chips). Monta-se uma **lista** (carrinho) e envia tudo
  de uma vez ao Rodrigo no WhatsApp. Aviso fixo: *venda mediante serviço ou frete
  para cidades próximas*.
- **Serviços** e **Contato**.

### Cores por ação
- 🟢 Verde = WhatsApp (orçamento, enviar lista, botão flutuante, contatos)
- 🩷 Rosa = Instagram · 🔵 Azul = telefone/navegação/identidade
- Prazo do orçamento em 3 níveis: verde (não urgente), amarelo (urgente), vermelho (emergencial)

### Funcionalidades
- **Botão flutuante** de WhatsApp em todas as páginas.
- **Modal de orçamento** (campos: nome, endereço, cidade, bairro, tipo de imóvel,
  serviço, motivo, prazo) — gera mensagem pronta e abre o WhatsApp do Rodrigo.
- **Lista de produtos** com quantidade flexível (steppers, editável, pode ficar em branco).
- Contato único: **Rodrigo Pestana**. E-mail: **ledoepestanasolucoeseletricas@gmail.com**.
- **Sem** integração com Mercado Livre.

### Produtos e imagens
- 30 produtos do documento do cliente, em 7 subcategorias (ver `produtos.json`).
- Imagens atuais: **ilustrações SVG por categoria** (`client/public/produtos/<categoria>.svg`).
- Ordem de exibição da imagem: **foto própria → ilustração SVG → ícone**.

## ⏳ Pendente / próximo passo

- **Imagens dos produtos**: o cliente (Brenno) vai enviar as fotos que quer usar.
  Quando chegarem, é só:
  - **Por produto** → preencher `imagem` em `client/src/data/produtos.json`
    (ex.: `"imagem": "produtos/caixa-tipo-2.jpg"`) e colocar o arquivo em
    `client/public/produtos/`.
  - **Por categoria (capa)** → preencher `imagem` na lista `CATEGORIAS` em
    `client/src/lib/catalog.ts`.
  - A foto sempre tem prioridade sobre a ilustração SVG.

## 🗂️ Arquivos-chave

| O quê | Onde |
|---|---|
| Contatos (WhatsApp, e-mail, Instagram) | `client/src/lib/contatos.ts` |
| Produtos | `client/src/data/produtos.json` |
| Categorias | `client/src/lib/catalog.ts` (`CATEGORIAS`) |
| Cores / tema | `client/src/index.css` (`@theme`) |
| Modal de orçamento | `client/src/components/quote/QuoteModal.tsx` |
| Lista/carrinho | `client/src/components/ListaModal.tsx` + página `pages/Produtos.tsx` |
| Ilustrações SVG | `client/public/produtos/*.svg` |

## 🚀 Como publicar uma mudança

```bash
cd client
npm run build      # gera os arquivos em ../docs
cd ..
git add .
git commit -m "descreva a mudança"
git push
```

O GitHub Pages atualiza em ~1 min. Guia completo em **COMO-PUBLICAR.md**.

## 📜 Histórico (commits principais)

1. Site institucional v1
2. Cores por ação + botão flutuante de WhatsApp
3. Modal de orçamento
4. Reformulação de produtos (do documento), lista/carrinho, prazo colorido,
   contato único Rodrigo, novo e-mail, remoção do Mercado Livre
5. Imagens (testes com fotos reais) → **revertido para ilustrações SVG**
   (a pedido; fotos próprias entram depois)
