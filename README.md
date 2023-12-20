# Battlebit Arsenal

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![PNPM](https://img.shields.io/badge/pnpm-%234a4a4a.svg?style=for-the-badge&logo=pnpm&logoColor=f69220)
![cypress](https://img.shields.io/badge/-cypress-%23E5E5E5?style=for-the-badge&logo=cypress&logoColor=058a5e)
![Steam](https://img.shields.io/badge/steam-%23000000.svg?style=for-the-badge&logo=steam&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

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

- [x] Desenvolver um script que irá analisar as propriedades da arma seleciona e sugerir a classe mais apropriada.

- [x] Permitir que o usuário salve suas blueprints, defina um nome e salve no localStorage.

  Ex.: Lion's Den => AK-74 com "Extended-A" e "Vertical Grip".

- [x] PWA.

- [x] Mover imagens dos armamentos para uma pasta própria, ainda dentro de public.

- [x] Remover GunsmithAttachmentContainer e mover seu conteúdo para o principal.

- [ ] Criar um before e usar como fundo, com os estilos a seguir:

  position: absolute;
  z-index: -1;
  content: "";
  top: 0%;
  bottom: 10%;
  width: 150%;
  left: -25%;
  background: linear-gradient(83.21deg,#3245ff 0%,#bc52ee 100%);
  -webkit-mask-image: radial-gradient(rgba(0,0,0,.45),transparent 70%);
  mask-image: radial-gradient(rgba(0,0,0,.45),transparent 70%);

- [ ] Em "ttkcalculator", mover o estado para a url.

- [ ] Modal para exibir os dados do loadout atual, como uma preview rápida dos equipamentos selecionados.

- [ ] Mover os dados das blueprints salvas para a URL, permitindo o compartilhamento entre usuários.

- [ ] Animar as barras em GunsmithStats, ao entrar no viewport do usuário.

- [ ] Salvar informações do state na URL, permitindo o compartilhamento da URL.

- [ ] Aplicar um minificador na URL, caso ela fique muito grande.

- [ ] Ao alterar o acessório no Gunsmith, comparar o valor novo (modificado pelo attachment) com o valor original e exibir o modificado em verde (caso melhore) ou vermelho (caso piore) (refs podem ser úteis).

- [ ] Aplicar efeito sutil de partículas em Gunsmith, semelhante ao de Polygon.

- [ ] Permitir o comparativo de duas ou mais armas, analisando suas estatísticas.

- [ ] Permitir visualização da arma em 2D ou 3D (semelhante à wiki do Team Fortress 2; porém, é para o longo prazo, pois não há ferramentas de IA atualmente).

- [ ] Criar uma tela 'loadout', onde eu possuo:

- Na horizontal:

Dois blocos grandes: um para arma primária, outro para secundária.

Três blocos menores logo abaixo: gadget primário, secundário e throwables.

- Na vertical, à direita:

Após o nome da classe, são exibidos três blocos em uma coluna: capacete, armadura e mochila.

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
