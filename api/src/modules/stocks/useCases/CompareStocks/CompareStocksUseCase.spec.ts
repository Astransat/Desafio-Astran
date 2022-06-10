import { StocksProvider } from "../../../../shared/container/StocksProvider/implementations/StocksProvider";
import { TestStockProvider } from "../../../../shared/container/StocksProvider/implementations/TestStockProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { CompareStocksUseCase } from "./CompareStocksUseCase";

let stocksProvider: StocksProvider;
let testStockProvider: TestStockProvider;
let compareStocksUseCase: CompareStocksUseCase;


describe("Compare stock", () => {
    beforeEach(() => {
        stocksProvider = new StocksProvider();
        testStockProvider = new TestStockProvider()
        compareStocksUseCase = new CompareStocksUseCase(testStockProvider);
    })

    it("Should be able to compare stocks", async () => {
        const comparative = await compareStocksUseCase.execute({stock_name: "IBM", stocks: ["PETR4.SA", "VALE5.SA"]})

        expect(comparative).toHaveProperty("lastPrices");
        expect(comparative.lastPrices.length).toBe(3);
        expect(comparative.lastPrices[0]).toHaveProperty("name");
        expect(comparative.lastPrices[0].name).toBe("IBM");
        expect(typeof comparative.lastPrices[0].name).toBe("string");
        expect(comparative.lastPrices[0]).toHaveProperty("lastPrice");
        expect(typeof comparative.lastPrices[0].lastPrice).toBe("number");
        expect(comparative.lastPrices[0]).toHaveProperty("pricedAt");
        expect(typeof comparative.lastPrices[0].pricedAt).toBe("string");
        expect(comparative.lastPrices[1]).toHaveProperty("name");
        expect(comparative.lastPrices[1].name).toBe("PETR4.SA");
        expect(typeof comparative.lastPrices[1].name).toBe("string");
        expect(comparative.lastPrices[1]).toHaveProperty("lastPrice");
        expect(typeof comparative.lastPrices[1].lastPrice).toBe("number");
        expect(comparative.lastPrices[1]).toHaveProperty("pricedAt");
        expect(typeof comparative.lastPrices[1].pricedAt).toBe("string");
        expect(comparative.lastPrices[2]).toHaveProperty("name");
        expect(comparative.lastPrices[2].name).toBe("VALE5.SA");
        expect(typeof comparative.lastPrices[2].name).toBe("string");
        expect(comparative.lastPrices[2]).toHaveProperty("lastPrice");
        expect(typeof comparative.lastPrices[2].lastPrice).toBe("number");
        expect(comparative.lastPrices[2]).toHaveProperty("pricedAt");
        expect(typeof comparative.lastPrices[2].pricedAt).toBe("string");
    })

    it("Should not be able to get data if the stock name is invalid", async () => {
        await expect(compareStocksUseCase.execute({stock_name: "testError", stocks: ["PETR4.SA", "VALE5.SA"]})).rejects.toEqual(new AppError("Stock not found!", 404));
    })

    it("Should not be able to get data if there is not stocks to compare", async () => {
        await expect(compareStocksUseCase.execute({stock_name: "IBM", stocks: []})).rejects.toEqual(new AppError("Stocks for comparison cannot be empty"));
    })
}) 