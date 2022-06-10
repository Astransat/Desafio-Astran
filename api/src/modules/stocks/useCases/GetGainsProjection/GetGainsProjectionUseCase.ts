import { inject, injectable } from "tsyringe";
import { IStocksProvider } from "../../../../shared/container/StocksProvider/IStocksProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { IGainsProjectionDTO } from "../../dtos/IStockDTO";

interface IResponse {
    name: string,
    purchasedAmount: number,
    purchasedAt: string,
    priceAtDate: number,
    lastPrice: number
    capitalGains: number,
}

@injectable()
export class GetGainsProjectionUseCase {
    constructor(
        @inject("StocksProvider")
        private stocksProvider: IStocksProvider
    ) {}
    
    async execute({stock_name, purchasedAmount , purchasedAt}: IGainsProjectionDTO): Promise<IResponse> {
        const stockNow = await this.stocksProvider.fetchQuote(stock_name)

        if(Object.keys(stockNow["Global Quote"]).length === 0) {
            throw new AppError("Stock not found!", 404)
        } 

        const stockHistoric = await this.stocksProvider.fetchHistoric(stock_name)

        const priceArray = Object.entries(stockHistoric["Time Series (Daily)"])

        try {
            const filteredByData = priceArray.filter(([data]) => data === purchasedAt);

            const stockHistoricData = {
                name: stockHistoric["Meta Data"]["2. Symbol"],
                purchasedAmount: parseFloat(purchasedAmount),
                purchasedAt: filteredByData[0][0],
                priceAtDate: parseFloat(filteredByData[0][1]["4. close"]),
                lastPrice: parseFloat(stockNow["Global Quote"]["05. price"]),
                capitalGains: parseFloat(((parseFloat(stockNow["Global Quote"]["05. price"]) - parseFloat(filteredByData[0][1]["4. close"]))*parseFloat(purchasedAmount)).toFixed(2)),
            }

            return stockHistoricData;
        } catch (error) {
            throw new AppError("Date not found!", 404)
        }
    }
}