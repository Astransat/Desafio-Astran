import { container } from "tsyringe";
import { IStocksProvider } from "./StocksProvider/IStocksProvider";
import { StocksProvider } from "./StocksProvider/implementations/StocksProvider";

container.register<IStocksProvider>("StocksProvider",StocksProvider)