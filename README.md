# Como roda a aplicação
  É necessário ter o Docker e Docker-compose no pc, apenas digite no terminal dentro do diretório da pasta raiz:
    docker-compose up
  Serão construídos os containers do backend (rodará no localhost:3001) e do frontend (no localhost:3000).

# Rodar os testes
  Para rodar os testes do backend é necessário entrar na pasta "backend" e de lá rodar os seguintes comandos:
    Testes unitários e de integração: yarn test
    Testes end-to-end: yarn test:e2e
  Importante destacar que os testes unitários dos services e os testes e2e usam a API externa (não foi feito mock como nos testes dos controllers).
  Portanto os últimos testes podem sofrer erros devido ao limite de chamadas da AplhaVantage. Sendo o limite de 5 chamadas por minuto, para fazer todos
  os testes é necessário comentar dois ou mais testes do arquivo, e alterná-los.

  Para os testes do frontend, novamente é preciso estar no diretório da pasta "frontend".
  Além disso é necessário ter a aplicação (back e frontend) funcionando para os testes e2e.
    Testes unitários e de integração: yarn test
    Testes end-to-end: yarn e2e
  Novamente destaco que na a realização do teste end-to-end não foi feito o mock da API externa (AlphaVantage) o que acarreta em possível falha
  nos últimos testes devido ao limite de chamadas. A solução novamente é comentar dois ou mais testes dentro do arquivo e alterná-los.

# Build
  Na raiz do projeto estão os pacotes necessários para realizar o build tanto do frontend quanto do backend.
  Webpack.config está com o mode em development.
  Basta rodar o comando:
  yarn build
