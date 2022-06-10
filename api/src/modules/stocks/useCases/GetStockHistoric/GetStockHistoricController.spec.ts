import { app } from "../../../../shared/http/app";
import request from "supertest";

jest.useRealTimers();

describe("Get a historic", () => {
    it("Should be able to find the historic of a stock", async () => {
        const response = await request(app).get("/stocks/IBM/history").query({from: "2019-01-01", to: "2019-01-03"});
        
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("name");
        expect(response.body.name).toBe("IBM");
        expect(response.body).toHaveProperty("prices");
        expect(response.body.prices.length).toBe(2);
        expect(response.body.prices[0]).toHaveProperty("opening");
        expect(typeof response.body.prices[0].opening).toBe("number");
        expect(response.body.prices[0]).toHaveProperty("low");
        expect(typeof response.body.prices[0].low).toBe("number");
        expect(response.body.prices[0]).toHaveProperty("high");
        expect(typeof response.body.prices[0].high).toBe("number");
        expect(response.body.prices[0]).toHaveProperty("closing");
        expect(typeof response.body.prices[0].closing).toBe("number");
        expect(response.body.prices[0]).toHaveProperty("pricedAt");
        expect(typeof response.body.prices[0].pricedAt).toBe("string");
    }, 10000);

})