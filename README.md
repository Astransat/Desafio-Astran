# Como roda a aplicação
  Apenas digite no terminal dentro do diretório da pasta raiz: docker-compose up
  Serão construídos os containers com o backend (rodará no localhost:3001) e outro com o frontend (no localhost:3000)

# Rodar os testes
  Para rodar os testes do backend é necessário entrar na pasta "backend" e de lá rodar os seguintes comandos.
    Testes unitários e de integração: yarn test
    Testes end-to-end: yarn test:e2e
  Importante destacar que os testes unitários dos services e os testes e2e usam a API externa (não foi feito mock como nos testes dos controllers),
  portanto os últimos testes podem sofrer erros devido ao limite de chamadas da AplhaVantage. Para reparar isso é necessário apenas comentar alguns dos
  testes anteriores do mesmo arquivo.

  Para os testes do frontend, novamente é necessário estar no diretório da pasta "frontend".
  Além disso é necessário ter a aplicação (back e frontend) funcionando para os testes e2e.
    Testes unitários e de integração: yarn test
    Testes end-to-end: yarn e2e
  Novamente destaco que na a realização do teste end-to-end não foi feito o mock da API externa (AlphaVantage) o que acarreta em possível falha
  nos últimos testes devido ao limite de chamadas. A solução novamente é comentar alguns dos testes dentro do arquivo.


# Background

Uma corretora de ações está desenvolvendo um sistema para permitir que pequenos investidores possam tomar decisões melhores sobre seu portfólio. Uma das funcionalidades importantes é a de verificar o desempenho de uma ação em cinco cenários:

   - Preço atual;
   - Preço histórico;
   - Preço atual em comparação a outras ações;
   - Projeção de ganhos com compra em data específica.
   
Para isso, a equipe de software da empresa optou por desenvolver duas aplicações: um serviço de backend especializado nesses requisitos (que permitirá que essas funcionalidades sejam reutilizadas em outros produtos da empresa) e um dashboard configurável que dará visibilidade aos dados. Sua missão para este teste é implementar ambas as partes.

# Requisitos técnicos da solução

O serviço deverá ser implementado via HTTP, e o formato de serialização das requisições e respostas será JSON. O backend deverá ser implementado em node.js, seja com `http` puro, seja com framework de sua escolha. O frontend será uma single-page application (SPA), e poderá ser implementado com a solução de sua escolha: Angular, Angular 2/4, Vue.js, React, você decide. Forneça, em conjunto, uma configuração de build com Webpack, rollup, browserify ou outra solução de sua escolha, e um comando único para subir sua aplicação. 

Sua solução deverá ter testes automatizados, tanto no frontend quanto no backend.

Para obter dados de ações, você poderá usar o Alpha Vantage (https://www.alphavantage.co). Caso queira utilizar bibliotecas prontas para isso — sinta-se livre para utilizá-las.

O tratamento de erros não será explicitado nos endpoints. O candidato ou candidata poderá inferir casos que poderão gerar erros ou duplicidades nos dados, e tratá-los de acordo. A ausência de tratamento não desqualifica a proposta; a presença, no entanto, contará pontos a favor.

## Projeção de ganhos

A ideia é implementar algo simples, sem preocupações com dividendos, taxas administrativas ou outras incumbências que afetariam o montante total. Em sendo assim, pressuponha que a compradora investiu seu dinheiro numa determinada quantidade de ações de uma empresa em alguma data no passado, e que deseja saber quanto teria ganhado ou perdido caso o fizesse.

# Como enviar sua proposta

- Crie um fork deste repositório;
- Implemente sua solução, fazendo commits da maneira que faria em um projeto profissional;
- Substitua este README com um específico para sua aplicação, indicando como rodá-la, e como executar os testes (fique à vontade para inserir mais detalhes técnicos, caso deseje);
- Abra um pull request para este repositório.

# Detalhamento

## Frontend

O importante nesta parte do desafio é que saibamos como você lida com os componentes que formam as técnicas contemporâneas de desenvolvimento client-side, no que tange processamento de assets, transpilers, separação de responsabilidades, minificação, armazenamento local, etc. Por isso, estética não é primordial.

As funcionalidades esperadas são:

- Incluir ações no portifólio;
- Ver situação atual das ações (último preço e data e hora da atualização);
- Ver histórico de preços de uma ação, podendo delimitar datas de início e fim;
- Fazer projeção de ganhos de uma ação, determinando o número de ações compradas e a data de compra no passado.

Se você não tiver ideia de como organizar essas funcionalidades, não há problema nenhum em se inspirar no Yahoo Finance, ou fazer uma arquitetura master-detail simples.

## Backend

### Endpoints

#### `/stocks/:stock_name/quote` - Retorna a cotação mais recente para a ação ####

Entrada:

- `stock_name` - parâmetro passado na URI indicando o nome da ação (PETR4.SA, VALE5.SA)

Retorno:

```js
{
  "name": string,
  "lastPrice": number,
  "pricedAt": string // data e hora no formato ISO 8601, UTC
}
```

Exemplo de uso:

```
$ curl -H "Accept: application/json" http://coolfinancialservice.com/stock/PETR4.SA/quote
{ "name": "PETR4.SA", "lastPrice": 25.11, "pricedAt": "2017-06-23T14:15:16Z" }
```

#### `/stocks/:stock_name/history?from=<string>&to=<string>` - Retorna preço histórico da ação num intervalo inclusivo ####

Entrada:

- `stock_name` - parâmetro passado na URI indicando o nome da ação (PETR4.SA, VALE5.SA)
- `from` - string com data em formato ISO 8601
- `to` - string com data em format ISO 8601

```js
{
  "name": string,
  "prices": [<pricing>, <pricing>, ...]
}
```

O schema de `pricing` segue abaixo:

```js
{
  "opening": number,
  "low": number,
  "high": number,
  "closing": number,
  "pricedAt": string // data no formato ISO 8601, UTC
}
```

Exemplo de uso:

```
$ curl -H "Accept: application/json" http://coolfinancialservice.com/stock/PETR4.SA/history?from=2017-04-04&to=2017-04-05
{ "name": "PETR4.SA", "prices": [{ "opening": 14.67, "low": 14.57, "high": 14.89, "closing": 14.85, "pricedAt": "2017-04-04" }, { "opening": 15.05, "low": 14.50, "high": 15.16, "closing": 14.57, "pricedAt": "2017-04-05" }
```

#### `/stocks/:stock_name/compare` - Compara uma ação com uma ou mais ações ####

Entrada:

- `stock_name` - parâmetro passado na URI indicando o nome da ação (PETR4.SA, VALE5.SA)
- Payload JSON com uma lista de ações:

```js
{
  "stocks": [<string>, <string>, ...]
}
```

Retorno:

```js
{
  "lastPrices": [<lastPrice>, <lastPrice>...]
}
```

`lastPrice` tem o seguinte schema:

```js
{
  "name": string,
  "lastPrice": number,
  "pricedAt": string // data e hora no formato ISO 8601, UTC
}
```
  
Exemplo de uso:

```
$ curl -H "Accept: application/json" -H "Content-Type: application/json" -d '{ "stocks": ["TIMP3.SA", "VIVT4.SA"] }' http://coolfinancialservice.com/stock/OIBR4.SA/compare
{ "lastPrices": [{ "name": "OIBR4.SA", "lastPrice": 3.41, "pricedAt": "2017-05-18T14:15:16Z" }, { "name": "TIMP3.SA", "lastPrice": 9.93, "pricedAt": "2017-05-18T14:15:16Z" }, { "name": "VIVT4.SA", "lastPrice": 45.92 }]}
```
  
#### `/stocks/:stock_name/gains?purchasedAmount=<number>&purchasedAt=<string>` - Projeta ganhos com compra em uma data específica ####

Entrada:

- `stock_name` - parâmetro passado na URI indicando o nome da ação (PETR4.SA, VALE5.SA)
- `purchasedAmount` - `number` com o número de ações
- `purchasedAt` - `string` com data de compra em formato ISO 8601

Retorno:

```js
{
  "name": string,
  "purchasedAmount": number,
  "purchasedAt": string, // data em formato ISO 8601,
  "priceAtDate": number, // preço na data de compra
  "lastPrice": number,   // preço mais recente
  "capitalGains": number // ganhos ou perdas com a ação, em reais
}
```

Exemplo de uso:

```
$ curl -H "Accept: application/json" http://coolfinancialservice.com/stock/USIM5.SA?purchasedAmount=100&purchasedAt=2016-05-31
{ "name": "USIM5.SA", "purchasedAmount": 100, "purchasedAt": "2016-05-31", "priceAtDate": 3.97, "lastPrice": 4.33, "capitalGains": 36.0 }
```


https://www.alphavantage.co
