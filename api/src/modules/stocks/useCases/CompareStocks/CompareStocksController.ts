import { Request, Response } from "express";
import { container } from "tsyringe";
import { CompareStocksUseCase } from "./CompareStocksUseCase";

export class CompareStocksController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { stock_name } = request.params;
        const { stocks } = request.body;

        const compareStocksUseCase = container.resolve(CompareStocksUseCase);

        const lastPrices = await compareStocksUseCase.execute({stock_name, stocks})

        return response.status(201).json(lastPrices)
    }
}