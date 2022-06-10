import { Router } from "express";
import { CompareStocksController } from "../../../modules/stocks/useCases/CompareStocks/CompareStocksController";
import { FindStockByNameController } from "../../../modules/stocks/useCases/FindStockByName/FindStockByNameController";
import { GetGainsProjectionController } from "../../../modules/stocks/useCases/GetGainsProjection/GetGainsProjectionController";
import { GetStockHistoricController } from "../../../modules/stocks/useCases/GetStockHistoric/GetStockHistoricController";

const stocksRoutes = Router();

const findStockByNameController = new FindStockByNameController();
const getStockHistoricController = new GetStockHistoricController();
const compareStocksController = new CompareStocksController();
const getGainsProjectionController = new GetGainsProjectionController();

stocksRoutes.get("/:stock_name/quote", findStockByNameController.handle);
stocksRoutes.get("/:stock_name/history", getStockHistoricController.handle);
stocksRoutes.post("/:stock_name/compare", compareStocksController.handle);
stocksRoutes.get("/:stock_name/gains", getGainsProjectionController.handle);

export { stocksRoutes };
