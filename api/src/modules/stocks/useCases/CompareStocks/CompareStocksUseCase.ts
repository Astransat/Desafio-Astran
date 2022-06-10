import { inject, injectable } from "tsyringe";
import { IStocksProvider } from "../../../../shared/container/StocksProvider/IStocksProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { IMultipleQuotesDTO } from "../../dtos/IStockDTO"

export interface ILastPrices {
    name: string,
    lastPrice: number,
    pricedAt: string,
}

interface IResponse {
    lastPrices: ILastPrices[]
}

@injectable()
export class CompareStocksUseCase {
    constructor(
        @inject("StocksProvider")
        private stocksProvider: IStocksProvider
    ) {}

    async execute({stock_name, stocks}: IMultipleQuotesDTO): Promise<IResponse> {
        const lastPricesResponse: IResponse = {
            lastPrices: []
        };
        
        const stock = await this.stocksProvider.fetchQuote(stock_name)

        if(Object.keys(stock["Global Quote"]).length === 0) {
            throw new AppError("Stock not found!", 404)
        }

        const stockData = {
            name: stock["Global Quote"]["01. symbol"],
            lastPrice: parseFloat(stock["Global Quote"]["05. price"]),
            pricedAt: (new Date()).toISOString()
        }

        lastPricesResponse.lastPrices.push(stockData)
        
        if(stocks.length === 0) {
            throw new AppError("Stocks for comparison cannot be empty")
        }

        if(stocks.length === 1) {
            const stock = await this.stocksProvider.fetchQuote(stocks[0])

            const pricing = {
                name: stock["Global Quote"]["01. symbol"],
                lastPrice: parseFloat(stock["Global Quote"]["05. price"]),
                pricedAt: (new Date()).toISOString()
            }
            lastPricesResponse.lastPrices.push(pricing)

        } else {
            for (const value of stocks) {
                const stock = await this.stocksProvider.fetchQuote(value)

                const pricing = {
                    name: stock["Global Quote"]["01. symbol"],
                    lastPrice: parseFloat(stock["Global Quote"]["05. price"]),
                    pricedAt: (new Date()).toISOString()
                }
                lastPricesResponse.lastPrices.push(pricing)
            }
        }
        
        
        return lastPricesResponse;
    }
}