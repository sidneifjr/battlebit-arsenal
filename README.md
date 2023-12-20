# Battlebit Arsenal

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![PNPM](https://img.shields.io/badge/pnpm-%234a4a4a.svg?style=for-the-badge&logo=pnpm&logoColor=f69220)
![cypress](https://img.shields.io/badge/-cypress-%23E5E5E5?style=for-the-badge&logo=cypress&logoColor=058a5e)
![Steam](https://img.shields.io/badge/steam-%23000000.svg?style=for-the-badge&logo=steam&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

Uma aplicação web para criação e compartilhamento de loadouts para Battlebit Remastered.

Defina seus armamentos, faça decisões informadas sobre seu equipamento e compartilhe com seus amigos ou esquadrão.

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

- [x] Desenvolver um script que irá analisar as propriedades da arma seleciona e sugerir a classe mais apropriada.

- [x] Permitir que o usuário salve suas blueprints, defina um nome e salve no localStorage.

  Ex.: Lion's Den => AK-74 com "Extended-A" e "Vertical Grip".

- [x] PWA.

- [x] Mover imagens dos armamentos para uma pasta própria, ainda dentro de public.

- [x] Remover GunsmithAttachmentContainer e mover seu conteúdo para o principal.

- [x] Armazenar as informações do loadout definido pelo usuário em um context.

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

## Tech

- React
- TypeScript
- Next.js (App Router)
- Tailwind
- Shadcn
- uuid
- Geist

### APIs

- Battlebit API (oficial, porém fornece apenas dados dos servidores atualmente ativos).
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
