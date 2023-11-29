# Battlebit Arsenal

O objetivo é criar uma aplicação web que permita a criação e compartilhamento de builds e loadouts para Battlebit Remastered.

A intenção é permitir que o usuário possa definir seus armamentos, tomar decisões informadas sobre seu equipamento e compartilhar com seus amigos ou membros de squad.

## To Do

- [x] Exibir uma listagem das armas e seus vários atributos.

- [x] Alterar atributos da arma selecionada, ao equipar um acessório em Gunsmith.

Ao selecionar um attachment em uma categoria, os seus modificadores de atributos serão aplicados (positivos ou negativos).

1. Afeta os valores exibidos em "Stats".

2. Alguns attachments não possuem modificador.

- [x] Permitir ordenação dos itens presentes na listagem de armas, a partir de um determinado stat.

- [x] Elaborar um gráfico demonstrando a distância efetiva das armas, usando Highcharts, ChartJS ou semelhante.

- [ ] Ao alterar o acessório no Gunsmith, comparar o valor novo (modificado pelo attachment) com o valor original e exibir o modificado em verde (caso melhore) ou vermelho (caso piore).

- [ ] Implementar cálculo do "Time To Kill" (TTK), comparando o dano da arma com o HP de cada classe e tipo de armadura.

- [ ] Aplicar efeito sutil de partículas em Gunsmith, semelhante ao de Polygon.

- [ ] Salvar informações do state na URL, permitindo o compartilhamento da URL.

- [ ] Aplicar um minificador na URL, caso ela fique muito grande.

- [ ] Menu na parte inferior da página, no qual o usuário pode adicionar uma parte de seu equipamento e salvá-lo, servindo como uma preview rápida de seu loadout (armas primárias, secundárias, etc.)

- [ ] Permitir nomeação das builds como uma "blueprint", recebendo um nome pelo usuário (inicialmente, salvar no LocalStorage e, depois, salvar na URL).

- [ ] Permitir o comparativo de duas ou mais armas, analisando suas estatísticas.

- [ ] Permitir visualização da arma em 2D ou 3D (semelhante à wiki do Team Fortress 2; porém, é para o longo prazo, pois não há ferramentas de IA atualmente).

- [ ] Gerar um script que irá analisar as propriedades de uma arma e designar a classe mais apropriada.

Exemplo: Assault possui bônus em reload speed e ADS, assim armas fracas em tais categorias se beneficiam mais.

Posso calcular o valor médio de cada atributo para uma categoria de armas; para as armas abaixo da média, Assault seria recomendado.

Armas como SMGs e a ACR seriam recomendadas para um Medic, pois o bônus de agilidade ajudaria em emergências, esquiva dos inimigos e chegar mais rapidamente aos companheiros para revivê-los.

- [ ] Implementar um backend com Node.js ou Firebase no futuro.

- [ ] Licença Apache: assim, outros podem colaborar com atualizações nos valores de cada arma, com o passar do tempo.

Assim, não dependem apenas de mim para manter a ferramenta em paridade com a versão mais recente do jogo.

(Lembrando que o jogo ainda está em Early Access).

- [ ] Considerar uma forma de monetização não-predatória (propaganda, web scraper, etc.). Buscar a melhor opção e se isso poderia se tornar um problema com os devs do jogo.

Patreon é uma opção, para que os próprios players e streamers possam doar para o desenvolvimento contínuo da ferramenta com o tempo.

Assim, evito lucrar diretamente com o IP de outros e a quebra de layout causada pelas propagandas (o site fica mais "cheap" e pode passar uma má impressão de ganância).

É importante notar que o sym.gg não usa propagandas.

- [ ] Permitir que o usuário acesse a sua conta, através da API da Steam; porém, analisar o valor prático e o que posso acessar. (aprendizado de Next Auth)

- [ ] Considerar se o SteamDB pode ser útil: exibir dados sobre o jogo, contagem de usuários, notícias relevantes (updates) e etc; isso é informação relevante para o produto.

- [ ] "Fatiar" programaticamente as imagens das armas, para que eu possa aplicar position: relative nas mesmas e os boxes do attachment possam usar position: absolute.

- [ ] Um sistema de votação, onde os usuários/comunidade poderiam votar sobre quais armas são as mais apropriadas para determinado mapa.

Por exemplo:

- M200, melhor usada em:

- Valley;
- Namak;
- Tensatown;

Assim, facilita a compreensão do game sense do jogo; tentativa e erro em cada partida com um mapa e com determinada arma não é mais obrigatório.

Por exemplo: L96 com small magazine e 6x scope => Lion's Den.

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
