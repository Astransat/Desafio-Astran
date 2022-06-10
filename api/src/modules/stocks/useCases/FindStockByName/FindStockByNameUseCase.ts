import { inject, injectable } from "tsyringe"
import { IStocksProvider } from "../../../../shared/container/StocksProvider/IStocksProvider"
import { AppError } from "../../../../shared/errors/AppError";

export interface IResponse { 
    name: string;
    lastPrice: number;
    pricedAt: string;
}

@injectable()
export class FindStockByNameUseCase {
    constructor(
        @inject("StocksProvider")
        private stocksProvider: IStocksProvider
    ) {}

    async execute(stock_name: string): Promise<IResponse>{
            const stock = await this.stocksProvider.fetchQuote(stock_name)

            if(Object.keys(stock["Global Quote"]).length === 0) {
                throw new AppError("Stock not found!", 404)
            } 

            const stockData = {
                name: stock["Global Quote"]["01. symbol"],
                lastPrice: parseFloat(stock["Global Quote"]["05. price"]),
                pricedAt: (new Date()).toISOString()
            }

            return stockData;
    }
}