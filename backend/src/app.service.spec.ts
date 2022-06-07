import { AppService } from './app.service';

describe('AppService', () => {
    let appService: AppService

    beforeEach(() => {
        appService = new AppService()
    })

    // It should be noted that I'm not mocking/stub the api's funcionality so some tests may not pass because of the limit calls the free API can receive!
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