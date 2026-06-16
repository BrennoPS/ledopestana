# Como publicar e atualizar o site

Guia rápido para você (ou outra pessoa) voltar depois e mexer no site
**Ledo & Pestana** sem precisar lembrar de tudo.

## 🌐 Onde o site está no ar

- **URL:** https://brennops.github.io/ledopestana/
- **Hospedagem:** GitHub Pages (gratuita)
- **Repositório:** https://github.com/BrennoPS/ledopestana
- **Como funciona:** o GitHub Pages serve os arquivos da pasta `docs/` da branch
  `main`. Esses arquivos são **gerados pelo build** — você nunca edita `docs/` na mão.

## 🛠️ Rodar localmente (testar antes de publicar)

Precisa do [Node.js](https://nodejs.org) instalado.

```bash
cd client
npm install      # só na primeira vez
npm run dev      # abre em http://localhost:5173/ledopestana/
```

O `npm run dev` tem recarregamento automático: salvou o arquivo, a página atualiza.

## 🚀 Publicar uma atualização (o passo a passo)

Sempre que mudar algo e quiser colocar no ar:

```bash
# 1. Gera os arquivos finais na pasta docs/
cd client
npm run build

# 2. Volta para a raiz e envia para o GitHub
cd ..
git add .
git commit -m "Descreva o que mudou"
git push
```

Em ~1 minuto o site no ar já reflete a mudança. **Não esqueça do `npm run build`** —
sem ele, o GitHub Pages continua mostrando a versão antiga.

## ✏️ Onde editar cada coisa

| O quê | Arquivo |
|---|---|
| Telefones, WhatsApp, Instagram, e-mail | `client/src/lib/contatos.ts` |
| Produtos (nome, preço, descrição, imagem) | `client/src/data/produtos.json` |
| Link de compra no Mercado Livre | `client/src/data/produtos.json` (campo `mlUrl`) |
| Fotos dos produtos | `client/public/produtos/` |
| Cores / tema | `client/src/index.css` (bloco `@theme`) |
| Caminho base do GitHub Pages | `client/vite.config.ts` (constante `BASE`) |

### Botão "Comprar" e o Mercado Livre

Cada produto tem um campo `mlUrl` no `produtos.json`:

- **Vazio** (`"mlUrl": ""`) → o botão vira **"Consultar"** e abre o WhatsApp.
- **Preenchido** com o link do anúncio → o botão vira **"Comprar"** (amarelo) e
  leva direto ao anúncio no Mercado Livre.

Ou seja: quando criar o anúncio no ML, é só colar o link no produto correspondente,
fazer o build e dar push.

## 🎨 Cores por ação (já configuradas)

- **Verde** = ações de WhatsApp (orçamento, consultar, botão flutuante, contatos)
- **Rosa** = Instagram
- **Azul** = telefone fixo / navegação / identidade do site
- **Amarelo** = toques do Mercado Livre (badge de categoria, botão Comprar)

## 📝 Modal de orçamento

O botão "Solicitar orçamento" abre um formulário (tipo de imóvel, serviço, produto,
quantidade, prazo, local e descrição livre). Todos os campos são opcionais — ao enviar,
ele monta a mensagem e abre o WhatsApp já preenchido. O cliente revisa antes de enviar.

## 🌍 (Opcional) Usar um domínio próprio depois

1. No repositório do GitHub: **Settings → Pages → Custom domain**, digite o domínio.
2. No seu provedor de domínio, aponte o DNS para o GitHub Pages.
3. No `client/vite.config.ts`, troque `const BASE = '/ledopestana/'` por `const BASE = '/'`,
   rode `npm run build` e dê push.

## 🆘 Resolução de problemas

- **Mudei algo e o site não atualizou:** faltou `npm run build` antes do `git push`,
  ou aguarde ~1 min e force atualização (Ctrl+F5).
- **Página em branco / caminhos quebrados:** confira se `BASE` no `vite.config.ts`
  bate com o nome do repositório.
- **Onde ligar/desligar o GitHub Pages:** repositório → **Settings → Pages**
  (source: branch `main`, pasta `/docs`).
