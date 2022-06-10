# Astran-challenge - backend

## Description

An API to search for information and the history of stocks, as well as having the functionality to compare and project the profit from the sale of stocks.

<br>

# Installation

Install all dependencies.

```bash
$ yarn
```

<br>

# API

## Running for the first time

The project can be runned with Docker.

First, build the project from the docker-compose file.

```bash
# build project
$ yarn docker-compose up
```

## Running the API

```bash
# development
$ yarn docker-compose up
```

## Test

```bash
# unit tests
$ yarn test
```
<br>

# API routes and examples

## Find stock by name

```
// get http://localhost:3333/stocks/:stock_name/quote

input:

"stock_name": "IBM"
```

## Get stock historic
```
// get http://localhost:3333/stocks/:stock_name/history?from=<string>&to=<string>

input:

"stock_name": "IBM"
"from": "2017-04-01" 
"to": "2017-04-15"
```

## Compare stocks
```
// post http://localhost:3333/stocks/:stock_name/compare

input:

"stock_name": "IBM"

Payload JSON:

{
  "stocks": ["PETR4.SA", "VALE5.SA"]
}
```

## Get gains projection
```
// get http://localhost:3333/stocks/:stock_name/gains?purchasedAmount=<number>&purchasedAt=<string>

input:

"stock_name": "IBM"
"purchasedAmount": 100
"purchasedAt": "2017-04-01"
```