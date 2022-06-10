import { strict } from "assert";
import { StocksProvider } from "../../../../shared/container/StocksProvider/implementations/StocksProvider";
import { TestStockProvider } from "../../../../shared/container/StocksProvider/implementations/TestStockProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { FindStockByNameUseCase } from "./FindStockByNameUseCase"

let stocksProvider: StocksProvider;
let testStockProvider: TestStockProvider;
let findStockByNameUseCase: FindStockByNameUseCase;


describe("Find stock by name", () => {
    beforeEach(() => {
        stocksProvider = new StocksProvider();
        testStockProvider = new TestStockProvider();
        findStockByNameUseCase = new FindStockByNameUseCase(testStockProvider);
    })

    it("should be able to get data of a stock", async () => {
        const stock = await findStockByNameUseCase.execute("IBM")

        expect(stock).toHaveProperty("name");
        expect(stock.name).toBe("IBM");
        expect(stock).toHaveProperty("pricedAt");
        expect(typeof stock.pricedAt).toBe("string");
        expect(stock).toHaveProperty("lastPrice");
        expect(typeof stock.lastPrice).toBe("number");
    })

    it("Should not be able to get data if the stock name is invalid", async () => {
       await expect(findStockByNameUseCase.execute("testError")).rejects.toEqual(new AppError("Stock not found!", 404));
    })
}) 