import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';


describe('AppController', () => {
  let appController: AppController;
  let appService: AppService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appService = app.get<AppService>(AppService)
    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return the information from IBM stock', async () => {
      const stock_name = 'IBM'
      const result = {
        name: stock_name,
        lastPrice: 141.05,
        pricedAt: '2022-06-07'
      }

      jest.spyOn(appService, "getStockQuote").mockImplementation(async () => result)

      expect(await appController.getStockQuote(stock_name)).toBe(result);
    });

    it('should return the history from IBM stock', async () => {
      const stock_name = 'IBM'
      const from = '2022-06-01'
      const to = '2022-06-02'
      const result = {
        name: stock_name,
        prices: [
          {
            opening: 140,
            low: 139,
            high: 142,
            closing: 141.1,
            pricedAt: '2022-06-02'
          },
          {
            opening: 140,
            low: 139,
            high: 142,
            closing: 141.1,
            pricedAt: '2022-06-01'
          }
        ]
      }

      jest.spyOn(appService, "getStockHistory").mockImplementation(async () => result)

      expect(await appController.getStockHistory(stock_name, from, to)).toBe(result);
    });

    it('should return the informations from stocks', async () => {
      const stock_name = 'IBM'
      const stocks = ['PETR4,SA', 'VALE3.SA']
      const result = {
        lastPrices: [
          {
            name: stock_name,
            lastPrice: 141.05,
            pricedAt: '2022-06-07'
          },
          {
            name: stocks[0],
            lastPrice: 31.15,
            pricedAt: '2022-06-07'
          },
          {
            name: stocks[1],
            lastPrice: 81.05,
            pricedAt: '2022-06-07'
          },
        ]
      }

      jest.spyOn(appService, "getCompareStocks").mockImplementation(async () => result)

      expect(await appController.getCompareStocks(stock_name, stocks)).toBe(result);
    });

    it('should return the gains from stocks bought at date', async () => {
      const stock_name = 'IBM'
      const purchasedAmount = 10
      const purchasedAt = '2022-05-20'
      const result = {
        name: stock_name,
        purchasedAmount,
        purchasedAt,
        priceAtDate: 138,
        lastPrice: 141.05,
        capitalGains: 30.5
      }

      jest.spyOn(appService, "getGains").mockImplementation(async () => result)

      expect(await appController.getGains(stock_name, purchasedAmount, purchasedAt)).toBe(result);
    });
  });
});
