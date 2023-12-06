# Battlebit Arsenal

O objetivo é criar uma aplicação web que permita a criação e compartilhamento de builds e loadouts para Battlebit Remastered.

A intenção é permitir que o usuário possa definir seus armamentos, tomar decisões informadas sobre seu equipamento e compartilhar com seus amigos ou membros de squad.

## To Do

- [x] Exibir uma listagem das armas e seus vários atributos.

- [x] Alterar atributos da arma selecionada, ao equipar um acessório em Gunsmith.

Ao selecionar um acessório, os seus modificadores de atributos serão aplicados (positivos ou negativos).

Os mesmos afetam os valores exibidos em "Stats", porém alguns acessórios não possuem modificador.

- [x] Permitir ordenação dos itens presentes na listagem de armas, a partir de um determinado stat.

- [x] Elaborar um gráfico demonstrando a distância efetiva das armas, usando Highcharts, ChartJS ou semelhante.

- [x] Simplificar GunsmithComponent e quebrar em partes menores, se possível.

- [x] Licença Apache.

- [x] Implementar cálculo do "Time To Kill" (TTK).

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

4. Desativar verificação de erros na tipagem, durante o build do Next.js: https://nextjs.org/docs/app/api-reference/next-config-js/typescript

5. Obter propriedades de um objeto dinamicamente: https://stackoverflow.com/questions/13760186/how-to-pass-an-object-property-as-a-parameter-javascript

6. Ordenar por propriedade: https://byby.dev/js-sort-by-object-property

7. Boas práticas com TypeScript e nomeando interfaces: https://docs.aws.amazon.com/prescriptive-guidance/latest/best-practices-cdk-typescript-iac/typescript-best-practices.html

8. Commits semânticos de acordo com as guidelines do Angular (usado a partir de 27/11/2023): https://www.conventionalcommits.org/

9. Armazenamento de estado na URL: https://www.youtube.com/watch?v=ukpgxEemXsk&t

10. "Remover" (ou desconsiderar) propriedades específicas em um objeto: https://bobbyhadz.com/blog/react-remove-key-from-state-object
