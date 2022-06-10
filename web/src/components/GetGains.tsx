import axios from "axios";
import { SyntheticEvent, useState } from "react";

interface IDataResponse {
  name: string;
  purchasedAmount: number;
  purchasedAt: string;
  priceAtDate: number;
  lastPrice: number;
  capitalGains: number;
}

export default function GetGains({ placeholder }: any) {
  const [stockName, setStockName] = useState("");
  const [purchasedAmount, setPurchasedAmount] = useState("");
  const [purchasedAt, setPurchasedAt] = useState("");
  const [data, setData] = useState<IDataResponse>("");

  function handleChange(event: any) {
    setStockName(event.target.value);
  }

  function handlePurchasedAmount(event: any) {
    setPurchasedAmount(event.target.value);
  }

  function handlePurchasedAt(event: any) {
    setPurchasedAt(event.target.value);
  }

  async function getStocksGains(event: SyntheticEvent) {
    event.preventDefault();
    const stockGainsResponse = await axios
      .get(
        `http://localhost:3333/stocks/${stockName}/gains?purchasedAmount=${purchasedAmount}&purchasedAt=${purchasedAt}`
      )
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });

    return setData(stockGainsResponse);
  }

  return (
    <div className="bg-cover bg-9FB1BC bg-center  h-auto text-black py-12 px-10 object-fill">
      <div className="md:w-1/2">
        <p className="font-bold text-lg mb-6 uppercase">
          Projeção de lucro das ações
        </p>
        <label>Digite o nome da ação</label>
        <br />
        <input
          className="rounded-lg align-middle focus:outline-none pl-2"
          type="search"
          maxLength={14}
          placeholder={placeholder}
          onChange={handleChange}
        />
        <br />
        <br />
        <label>Digite a quantidade de ações compradas</label>
        <br />
        <input
          className="rounded-lg align-middle focus:outline-none pl-2"
          type="search"
          maxLength={14}
          placeholder={placeholder}
          onChange={handlePurchasedAmount}
        />
        <br />
        <br />
        <label>Digite a data da compra das ações</label>
        <br />
        <input
          className="rounded-lg align-middle focus:outline-none pl-2"
          type="search"
          maxLength={14}
          placeholder={placeholder}
          onChange={handlePurchasedAt}
        />
        <br />
        <br />
        <button
          className="bg-2E5266 rounded-lg px-3 h-12 text-white flex items-center group hover:bg-6E8898"
          onClick={getStocksGains}
        >
          Buscar
        </button>
        <br />
        <br />
        <p className="text-sm mb-2 leading-none">Ação: {data.name}</p>
        <p className="text-sm mb-2 leading-none">
          Quantidade comprada: {data.purchasedAmount}
        </p>
        <p className="text-sm mb-2 leading-none">
          Data da compra: {data.purchasedAt}
        </p>
        <p className="text-sm mb-2 leading-none">
          Preço da ação na data da compra: {data.priceAtDate}
        </p>
        <p className="text-sm mb-2 leading-none">
          Preço atual da ação: {data.lastPrice}
        </p>
        <p className="text-sm mb-2 leading-none">
          Balanço: {data.capitalGains}
        </p>
      </div>
      <br />
      <br />
      <br />
      <hr />
    </div>
  );
}
