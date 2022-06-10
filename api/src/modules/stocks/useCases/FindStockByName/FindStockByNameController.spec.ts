import { app } from "../../../../shared/http/app";
import request from "supertest";

jest.useRealTimers();

describe("Find a stock by name", () => {
    it("Should be able to find a stock", async () => {
        const response = await request(app).get("/stocks/IBM/quote");
        
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("name");
        expect(typeof response.body.name).toBe("string");
        expect(response.body).toHaveProperty("lastPrice");
        expect(typeof response.body.lastPrice).toBe("number");
        expect(typeof response.body.pricedAt).toBe("string");
    }, 10000)
})