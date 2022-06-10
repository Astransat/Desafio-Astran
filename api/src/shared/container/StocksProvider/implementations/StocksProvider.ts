import { IFindStockResponseDTO, IMultipleQuotesDTO, IStockHistoricResponseDTO } from "../../../../modules/stocks/dtos/IStockDTO";
import { IStocksProvider } from "../IStocksProvider";

const alpha = require('alphavantage')({ key: `${process.env.API_KEY}` })

class StocksProvider implements IStocksProvider {
    public async fetchQuote(stock_name: string): Promise<IFindStockResponseDTO> {
        const stock = await alpha.data.quote(stock_name);

        return stock;
    }

    public async fetchHistoric(stock_name: string): Promise<IStockHistoricResponseDTO> {
        const stockHistoric = await alpha.data.daily(stock_name, "full")

        return stockHistoric;
    }
}

export { StocksProvider }