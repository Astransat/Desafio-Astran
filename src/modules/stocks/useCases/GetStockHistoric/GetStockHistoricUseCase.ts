import { inject, injectable } from "tsyringe";
import { IStocksProvider } from "../../../../shared/container/StocksProvider/IStocksProvider";
import { IGetHistoricDTO } from "../../dtos/IStockDTO";

interface IPricing {
    opening: number,
    low: number,
    high: number,
    closing: number,
    pricedAt: string,
}

interface IStockHistoricData {
    name: string,
    prices: IPricing[]
}

@injectable()
export class GetStockHistoricUseCase {
    constructor(
        @inject("StocksProvider")
        private stocksProvider: IStocksProvider
    ) {}

    async execute({stock_name, from, to}: IGetHistoricDTO): Promise<IStockHistoricData> {
        const stockHistoric = await this.stocksProvider.fetchHistoric(stock_name)

        const stockHistoricData: IStockHistoricData = {
            name: stockHistoric["Meta Data"]["2. Symbol"],
            prices: []
        }

        const priceArray = Object.entries(stockHistoric["Time Series (Daily)"])
        
        const filteredByData = priceArray.filter(([data]) => data >= from && data <= to);

        for (const value of filteredByData) {

            const pricing = {
                opening: parseFloat(value[1]['1. open']),
                low: parseFloat(value[1]['3. low']),
                high: parseFloat(value[1]['2. high']),
                closing: parseFloat(value[1]['4. close']),
                pricedAt: value[0]
            }
            stockHistoricData.prices.push(pricing)
        }

        return stockHistoricData;

    }
}