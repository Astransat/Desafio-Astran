import { AppService } from './app.service';

describe('AppService', () => {
    let appService: AppService

    beforeEach(() => {
        appService = new AppService()
    })

    /*
    It should be noted that I'm not mocking/stub the api's funcionality so some tests may not pass because of the limit calls the free API can receive!
    The limit causes an error that the object returned from the API is:
    Note: 'Thank you for using Alpha Vantage! Our standard API call frequency is 5 calls per minute and 500 calls per day. Please visit https://www.alphavantage.co/premium/ if you would like to target a higher API call frequency.'
    */
    it('should return IBM stock informations', async () => {
        const stock_name = 'IBM'

        expect(await appService.getStockQuote(stock_name)).toHaveProperty("lastPrice")
    })

    it('should return IBM stock historic informations', async () => {
        const stock_name = 'IBM'
        const from = '2022-06-01'
        const to = '2022-06-02'

        expect(await appService.getStockHistory(stock_name, from, to)).toHaveProperty('prices')
    })

    it('should return stocks informations', async () => {
        const stock_name = 'IBM'
        const stocks = {
            stocks: ['PETR4.SA', 'OIBR4.SA']
        }

        expect(await appService.getCompareStocks(stock_name, stocks)).toHaveProperty("lastPrices")
    })

    it('should return Gains from stock bought at date', async () => {
        const stock_name = 'IBM'
        const purchasedAmount = 10
        const purchasedAt = '2022-06-01'

        expect(await appService.getGains(stock_name, purchasedAmount, purchasedAt)).toHaveProperty("capitalGains")
    })
})