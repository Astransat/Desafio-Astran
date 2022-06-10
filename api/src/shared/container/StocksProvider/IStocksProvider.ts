import { IFindStockResponseDTO, IStockHistoricResponseDTO } from "../../../modules/stocks/dtos/IStockDTO";

export interface IStocksProvider {
    fetchQuote(stock_name: string): Promise<IFindStockResponseDTO>,
    fetchHistoric(stock_name: string): Promise<IStockHistoricResponseDTO>,
}