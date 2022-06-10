import { app } from "../../../../shared/http/app";
import request from "supertest";

jest.useRealTimers();

describe("Project the earnings of a stock", () => {
    it("Should be able to project the earnings of a stock stock", async () => {
        const response = await request(app).get("/stocks/IBM/gains").query({purchasedAmount: "150", purchasedAt: "2017-05-25"});
        
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("name");
        expect(typeof response.body.name).toBe("string");
        expect(response.body.name).toBe("IBM");
        expect(response.body).toHaveProperty("purchasedAmount");
        expect(typeof response.body.purchasedAmount).toBe("number");
        expect(response.body).toHaveProperty("purchasedAt");
        expect(typeof response.body.purchasedAt).toBe("string");
        expect(response.body).toHaveProperty("priceAtDate");
        expect(typeof response.body.priceAtDate).toBe("number");
        expect(response.body).toHaveProperty("lastPrice");
        expect(typeof response.body.lastPrice).toBe("number");
        expect(response.body).toHaveProperty("capitalGains");
        expect(typeof response.body.capitalGains).toBe("number");
    }, 10000);

})