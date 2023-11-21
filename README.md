# Battlebit Arsenal

O objetivo é criar uma aplicação web que permita a criação e compartilhamento de builds e loadouts para Battlebit Remastered.

A intenção é permitir que o usuário possa definir seus armamentos, tomar decisões informadas sobre seu equipamento e compartilhar com seus amigos ou membros de squad.

## To Do

- [x] Exibir uma listagem das armas e seus vários atributos.
- [x] Alterar atributos da arma selecionada, ao equipar um acessório em Gunsmith.

## Getting Started

### Dev

```bash

pnpm i

pnpm dev

```

### Build

```bash

pnpm build

```

## Tecnologias

- React
- TypeScript
- Next.js (App Router)
- Tailwind
- Shadcn
- uuid
- Geist

### APIs

- Battlebit API (oficial, porém em estado inicial; fornece apenas dados dos servidores atualmente ativos).
- Steam Web API (para obter informações do jogo e notícias; implementação a considerar).

### Aprendizado

1. URL Capitalization & SEO: https://www.searchenginejournal.com/url-capitalization-seo/343369/

2. Tailwind não permite geração dinâmica de classes: https://stackoverflow.com/questions/72889068/template-literal-not-working-correctly-with-tailwind-css

3. Uso de uma função como o valor inicial de um state: https://stackoverflow.com/questions/60120261/when-to-use-usestate-initial-value-as-function
