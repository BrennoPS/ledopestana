# Créditos das imagens

As fotos de exemplo são imagens genéricas obtidas gratuitamente do
**Wikimedia Commons**, usadas como placeholder até que fotos próprias sejam
adicionadas:

- `client/public/produtos/p-<id-do-produto>.jpg` — uma foto por produto
- `client/public/produtos/cat-<categoria>.jpg` — capa de cada categoria

São referências genéricas (não são os produtos reais da empresa). Abaixo, a
fonte por categoria:

| Categoria | Arquivo | Fonte (Wikimedia Commons) |
|---|---|---|
| Postes & Padrão de Entrada | `cat-postes.jpg` | Residence service drop |
| Caixas de Padrão | `cat-caixas.jpg` | Fuse box (Hager) |
| Projetos Elétricos | `cat-projetos.jpg` | Schematic wiring diagram of electrical stove |
| Disjuntores & Proteção | `cat-protecao.jpg` | RCCB and Miniature Circuit Breaker |
| Conduítes & Caixas | `cat-conduites.jpg` | Bending conduit in the new LIRR Terminal |
| Cabos & Fios | `cat-cabos.jpg` | Electric guide 3×2.5 mm |
| Tomadas & Interruptores | `cat-tomadas.jpg` | Power Outlets |

Para substituir por fotos próprias, basta trocar o arquivo correspondente em
`client/public/produtos/` (mantendo o nome) ou preencher o campo `imagem` do
produto em `client/src/data/produtos.json`.
