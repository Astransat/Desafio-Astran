export interface IGetHistoricDTO { 
    stock_name: string, 
    from: string, 
    to: string,
}

export interface IMultipleQuotesDTO {
    stock_name: string,
    stocks: string[]
}

interface ITimeSeries {
    '1. open': number,
    '2. high': number,
    '3. low': number,
    '4. close': number,
    '5. volume': number
}

export interface IStockHistoricResponseDTO {
    'Meta Data': {
      '1. Information': string,
      '2. Symbol': string,
      '3. Last Refreshed': string,
      '4. Output Size': string,
      '5. Time Zone': string,
    },
    'Time Series (Daily)': ITimeSeries 
}

export interface IFindStockResponseDTO {
    'Global Quote': {
        '01. symbol': string,
        '02. open': string,
        '03. high': string,
        '04. low': string,
        '05. price': string,
        '06. volume': string,
        '07. latest trading day': string,
        '08. previous close': string,
        '09. change': string,
        '10. change percent': string
    }
}

export interface IGainsProjectionDTO {
    stock_name: string, 
    purchasedAmount: string, 
    purchasedAt: string,
}

