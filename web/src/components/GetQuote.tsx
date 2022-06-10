import axios from "axios";
import { SyntheticEvent, useState } from "react";

interface IDataResponse {
  name: string;
  lastPrice: number;
  pricedAt: string;
}

export default function GetQuote({ placeholder }: any) {
  const [stockName, setStockName] = useState("");
  const [stockData, setStockData] = useState<IDataResponse>("");

  function handleStockName(event: any) {
    setStockName(event.target.value);
  }

  async function getStockName(event: SyntheticEvent) {
    event.preventDefault();
    const stockResponse = await axios
      .get(`http://localhost:3333/stocks/${stockName}/quote`)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });

    return setStockData(stockResponse);
  }

  return (
    <div className="bg-cover bg-9FB1BC bg-center  h-auto text-black py-12 px-10 object-fill">
      <div className="md:w-1/2">
        <p className="font-bold text-lg mb-6 uppercase">Cotação de ações</p>
        <label>Digite o nome da ação</label>
        <br />
        <input
          className="rounded-lg align-middle focus:outline-none pl-2"
          type="search"
          maxLength={14}
          placeholder={placeholder}
          onChange={handleStockName}
        />
        <br />
        <br />
        <button
          className="bg-2E5266 rounded-lg px-3 h-12 text-white flex items-center group hover:bg-6E8898"
          onClick={getStockName}
        >
          Buscar
        </button>
        <br />
        <br />
        <p className="text-sm mb-2 leading-none">Ação: {stockData.name}</p>
        <p className="text-sm mb-2 leading-none">
          Última cotação: {stockData.lastPrice}
        </p>
        <p className="text-sm mb-2 leading-none">
          Data da cotação: {stockData.pricedAt}
        </p>
      </div>
      <br />
      <br />
      <br />
      <hr />
    </div>
  );
}
