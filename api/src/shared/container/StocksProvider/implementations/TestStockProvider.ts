import { IFindStockResponseDTO, IStockHistoricResponseDTO } from "../../../../modules/stocks/dtos/IStockDTO";
import { IStocksProvider } from "../IStocksProvider";

export class TestStockProvider implements IStocksProvider {
    
    async fetchQuote(stock_name: string): Promise<any> {
        const test = {
            'Global Quote': {
                '01. symbol': `${stock_name}`,
                '02. open': '000.0000',
                '03. high': '00.0000',
                '04. low': '00.0000',
                '05. price': '00.0000',
                '06. volume': '00.0000',
                '07. latest trading day': '00.0000',
                '08. previous close': '00.0000',
                '09. change': '00.0000',
                '10. change percent': '00.0000'
            }
        };

        const testErrorResponse = {
            'Global Quote': {}
        }

        if(stock_name === "testError") {
            return testErrorResponse;
        } else {
            return test;
        }
    }
    async fetchHistoric(stock_name: string): Promise<any> {
        const test = {
            "Meta Data": {
                "1. Information": "Daily Prices (open, high, low, close) and Volumes",
                "2. Symbol": `${stock_name}`,
                "3. Last Refreshed": "2019-02-15",
                "4. Output Size": "Full size",
                "5. Time Zone": "US/Eastern"
            },
            "Time Series (Daily)": {
                "2019-01-01": {
                    "1. open": 0,
                    "2. high": 0,
                    "3. low": 0,
                    "4. close": 0,
                    "5. volume": 0,
                },
                "2019-01-02": {
                    "1. open": 0,
                    "2. high": 0,
                    "3. low": 0,
                    "4. close": 0,
                    "5. volume": 0,
                },
                "2019-01-03": {
                    "1. open": 0,
                    "2. high": 0,
                    "3. low": 0,
                    "4. close": 0,
                    "5. volume": 0,
                }
            }
        }

        const testErrorResponse = {
            'Global Quote': {}
        }

        if(stock_name === "testError") {
            return testErrorResponse;
        } else {
            return test;
        }
    }
}