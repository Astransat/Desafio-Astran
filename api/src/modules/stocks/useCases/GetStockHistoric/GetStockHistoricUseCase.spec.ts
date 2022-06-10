import { StocksProvider } from "../../../../shared/container/StocksProvider/implementations/StocksProvider";
import { TestStockProvider } from "../../../../shared/container/StocksProvider/implementations/TestStockProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { GetStockHistoricUseCase } from "./GetStockHistoricUseCase";


let stocksProvider: StocksProvider;
let testStockProvider: TestStockProvider;
let getStockHistoricUseCase: GetStockHistoricUseCase;


describe("Get stock historic", () => {
    beforeEach(() => {
        stocksProvider = new StocksProvider();
        testStockProvider = new TestStockProvider();
        getStockHistoricUseCase = new GetStockHistoricUseCase(testStockProvider);
    })

    it("Should be able to get the historic of a stock", async () => {
        const historic = await getStockHistoricUseCase.execute({stock_name: "IBM", from: "2019-01-01", to: "2019-01-02"})

        expect(historic).toHaveProperty("name");
        expect(historic.name).toBe("IBM");
        expect(historic).toHaveProperty("prices");
        expect(historic.prices.length).toBe(2);
    })

    it("Should not be able to get the historic if the stock name is invalid", async () => {
       await expect(getStockHistoricUseCase.execute({stock_name: "testError", from: "2019-01-01", to: "2019-01-02"})).rejects.toEqual(new AppError("Stock not found!", 404))
    })
}) 