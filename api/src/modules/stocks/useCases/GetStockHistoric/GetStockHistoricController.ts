import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetStockHistoricUseCase } from "./GetStockHistoricUseCase";

export class GetStockHistoricController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { stock_name } = request.params;
        const { from , to } = request.query;

        const getStockHistoricUseCase = container.resolve(GetStockHistoricUseCase)

        const stockHistoric = await getStockHistoricUseCase.execute({stock_name, from: from as string, to: to as string})

        return response.status(201).json(stockHistoric)
    }
}