import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetGainsProjectionUseCase } from "./GetGainsProjectionUseCase";

export class GetGainsProjectionController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { stock_name } = request.params;
        const { purchasedAmount , purchasedAt } = request.query;

        const getGainsProjectionUseCase = container.resolve(GetGainsProjectionUseCase);

        const gainsProjection = await getGainsProjectionUseCase.execute({ stock_name, purchasedAmount: purchasedAmount as string, purchasedAt: purchasedAt as string });

        return response.status(201).json(gainsProjection);
    }
}