import axios from "axios";
import { SyntheticEvent, useState } from "react";

interface ILastPrices {
  name: string;
  lastPrice: number;
  pricedAt: string;
}

interface IDataResponse {
  lastPrices: ILastPrices[];
}

export default function GetComparison({ placeholder }: any) {
  const [stockName, setStockName] = useState("");
  const [stockData, setStockData] = useState("");
  const [data, setData] = useState<IDataResponse>("");

  function handleSetStockName(event: any) {
    setStockName(event.target.value);
  }

  function handleSetStockData(event: any) {
    setStockData(event.target.value);
  }

  async function getComparison(event: SyntheticEvent) {
    const dataArray = stockData.split(",");

    event.preventDefault();
    const stockResponse = await axios
      .post(`http://localhost:3333/stocks/${stockName}/compare`, {
        stocks: dataArray,
      })
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });

    return setData(stockResponse);
  }

  function createStocks() {
    // for (const value of data) {
    //   <ul>
    //     <li>
    //       <p className="text-sm mb-2 leading-none">Ação: {value.name}</p>
    //       <p className="text-sm mb-2 leading-none">
    //         Ações para comparação: {value[1]}
    //       </p>
    //     </li>
    //   </ul>;
    // }
  }

  return (
    <div className="bg-cover bg-9FB1BC bg-center  h-auto text-black py-12 px-10 object-fill">
      <div className="md:w-1/2">
        <p className="font-bold text-lg mb-6 uppercase">Comparação de ações</p>
        <label>Ação:</label>
        <br />
        <input
          className="rounded-lg align-middle focus:outline-none pl-2"
          type="search"
          maxLength={14}
          placeholder={placeholder}
          onChange={handleSetStockName}
        />
        <br />
        <label>Ações para comparação: </label>
        <br />
        <input
          className="rounded-lg align-middle focus:outline-none pl-2"
          type="search"
          placeholder={placeholder}
          onChange={handleSetStockData}
        />
        <br />
        <br />
        <button
          className="bg-2E5266 rounded-lg px-3 h-12 text-white flex items-center group hover:bg-6E8898"
          onClick={getComparison}
        >
          Buscar
        </button>
        <br />
        <br />
        {createStocks()}
      </div>
    </div>
  );
}
