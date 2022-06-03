import { Injectable } from '@nestjs/common'
import { resourceLimits } from 'worker_threads'
import callExternalApi from './utils'


@Injectable()
export class AppService {
  async getStockQuote(stock_name: string): Promise<Object> {
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock_name}&apikey=${process.env.ALPHAVANTAGE_KEY}`

    const json = await callExternalApi(url).then((data) => {
      const response = {
        body: data
      }
      return response
    })

    //Working with integers so that we don't encounter rounding problems from language's way of storaging floating numbers
    const price = parseInt(json["body"]["Global Quote"]["05. price"].replace('.',''))
    const result = {
      name: json["body"]["Global Quote"]["01. symbol"],
      lastPrice: price / 10000, //Restoring the number's dimension
      // Formatar data e hora UTC
      pricedAt: json["body"]["Global Quote"]["07. latest trading day"]
    }

    return result
  }


  async getStockHistory(stock_name: string, from: string, to: string): Promise<Object> {
    // Adding a second on each date so that getDate returns the wright date
    const startDate = new Date(`${from} 00:00:01`)
    const endDate = new Date(`${to} 00:00:01`)

    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock_name}&outputsize=full&apikey=${process.env.ALPHAVANTAGE_KEY}`


    const allDates = await callExternalApi(url).then((data) => {
      const response = {
        body: data
      }
      return response
    })

    var prices = []
    
    for (var i = startDate; i <= endDate; i.setDate(i.getDate() + 1 )) {
      // Handling month
      if (`${i.getMonth()}`.length == 1) {
        var month = `0${ i.getMonth() + 1 }`
      } else {
        var month = `${ i.getMonth() + 1 }`
      }
      
      // Handling day
      if (`${i.getDate()}`.length == 1) {
        var day = `0${i.getDate()}`
      } else {
        var day = `${i.getDate()}`
      }

      const date = `${i.getFullYear()}-${month}-${day}`

      // Checking if the date exists in the data so it goes to the prices array
      if (allDates["body"]["Time Series (Daily)"][date]) {
        //Working with integers so that we don't encounter rounding problems from language's way of storaging floating numbers
        const opening = (parseInt(allDates["body"]["Time Series (Daily)"][date]['1. open'].replace('.',''))) / 10000
        const low = (parseInt(allDates["body"]["Time Series (Daily)"][date]['3. low'].replace('.',''))) / 10000
        const high = (parseInt(allDates["body"]["Time Series (Daily)"][date]['2. high'].replace('.',''))) / 10000
        const closing = (parseInt(allDates["body"]["Time Series (Daily)"][date]['4. close'].replace('.',''))) / 10000
  
        const price = {
          opening,
          low,
          high,
          closing,
          // Formatar para UTC
          pricedAt: date
        }
  
        prices.push(price)
      }     
    }

    const result = {
      name: stock_name,
      prices
    }

    return result
  }

  async getCompareStocks(stock_name, stocks): Promise<Object> {
    const resultArray = []

    const allStocks = [stock_name].concat(stocks.stocks)

    // Sweeping stocks array to get infos
    for (var stock in allStocks) {
      const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${allStocks[stock]}&apikey=${process.env.ALPHAVANTAGE_KEY}`
  
      const json = await callExternalApi(url).then((data) => {
        const response = {
          body: data
        }
        return response
      })
  
      //Working with integers so that we don't encounter rounding problems from language's way of storaging floating numbers
      const price = parseInt(json["body"]["Global Quote"]["05. price"].replace('.',''))
      const stockInfo = {
        name: json["body"]["Global Quote"]["01. symbol"],
        lastPrice: price / 10000, //Restoring the number's dimension
        // Formatar data e hora UTC
        pricedAt: json["body"]["Global Quote"]["07. latest trading day"]
      }

      resultArray.push(stockInfo)
    }

    const result = {
      lastPrices: resultArray
    }

    return result
  }
}

