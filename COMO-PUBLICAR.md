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
| Produtos (nome, nota, categoria, imagem) | `client/src/data/produtos.json` |
| Categorias de produtos | `client/src/lib/catalog.ts` (lista `CATEGORIAS`) |
| Fotos dos produtos | `client/public/produtos/` (opcional) |
| Cores / tema | `client/src/index.css` (bloco `@theme`) |
| Caminho base do GitHub Pages | `client/vite.config.ts` (constante `BASE`) |

### Produtos e a lista

Os produtos ficam em `produtos.json`, cada um com `id`, `nome`, `categoria`
(id de uma categoria de `CATEGORIAS`), `nota` (texto de preço/condição, ex.:
"Sob consulta") e, opcional, `imagem`. **Não há preço fixo** — os valores são
combinados no WhatsApp.

Na página de Produtos o cliente escolhe a categoria, monta uma **lista** (adiciona
itens e ajusta a quantidade) e envia tudo de uma vez ao **Rodrigo Pestana**. Os
produtos são vendidos mediante serviço ou, para cidades próximas, mediante frete —
esse aviso já aparece na página.

## 🎨 Cores por ação (já configuradas)

- **Verde** = ações de WhatsApp (orçamento, enviar lista, botão flutuante, contatos)
- **Rosa** = Instagram
- **Azul** = telefone fixo / navegação / identidade do site
- **Prazo do orçamento**: verde (não urgente), amarelo (urgente), vermelho (emergencial)

## 📝 Modal de orçamento

O botão "Solicitar orçamento" abre um formulário (nome, endereço, cidade, bairro,
tipo de imóvel, serviço, motivo e prazo de atendimento). Todos os campos são
opcionais — ao enviar, ele monta a mensagem e abre o WhatsApp do Rodrigo já
preenchido. O cliente revisa antes de enviar.

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
