import { Body, Controller, Get, Param, Query } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/stocks/:stock_name/quote')
  async getStockQuote(@Param('stock_name') stock_name: string): Promise<Object> {
    return await this.appService.getStockQuote(stock_name)
  }

  @Get('/stocks/:stock_name/history?')
  async getStockHistory(@Param('stock_name') stock_name: string, @Query('from') from: string, @Query('to') to: string): Promise<Object> {
    return await this.appService.getStockHistory(stock_name, from, to)
  }

  @Get('/stocks/:stock_name/compare')
  async getCompareStocks(@Param('stock_name') stock_name: string, @Body() stocks: string) {
    return await this.appService.getCompareStocks(stock_name, stocks)
  }
}
