import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

/*
As end-to-end tests it runs every function without mocks.
The same problem that happens in the service unit tests also happens here.
As the API can take a limit of 5 calls for minute, if ran all the tests the last one will fail, as the API response will be:
Note: 'Thank you for using Alpha Vantage! Our standard API call frequency is 5 calls per minute and 500 calls per day. Please visit https://www.alphavantage.co/premium/ if you would like to target a higher API call frequency.'
*/

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close()
  })

  it('/stocks/:stock_name/quote (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/stocks/IBM/quote')

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('lastPrice');
  });

  it('/stocks/:stock_name/history?from=<string>&to=<string> (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/stocks/IBM/history?from=2022-06-01&to=2022-06-02')
      
      expect(response.status).toEqual(200)
      expect(response.body).toHaveProperty('prices')
  });

  it('/stocks/IBM/compare (POST)', async () => {
    const stocks = ['PETR4.SA', 'VALE3.SA']
    
    const response = await request(app.getHttpServer())
      .post('/stocks/IBM/compare')
      .send({ stocks })
      
      expect(response.status).toEqual(201)
      expect(response.body).toHaveProperty('lastPrices')
  })

  it('/stocks/:stock_name/gains?purchasedAmount=<number>&purchasedAt=<string> (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/stocks/IBM/gains?purchasedAmount=10&purchasedAt=2022-06-01')
      
      expect(response.status).toEqual(200)
      expect(response.body).toHaveProperty('capitalGains')
  })
})
