import axios from "axios";
import { SyntheticEvent, useState } from "react";

export default function GetHistoric({ placeholder }: any) {
  const [stockName, setStockName] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [stockData, setStockData] = useState("");

  function handleStockName(event: any) {
    setStockName(event.target.value);
  }

  function handleFrom(event: any) {
    setFrom(event.target.value);
  }

  function handleTo(event: any) {
    setTo(event.target.value);
  }

  async function getHistoric(event: SyntheticEvent) {
    event.preventDefault();
    const stockResponse = await axios
      .get(
        `http://localhost:3333/stocks/${stockName}/history?from=${from}&to=${to}`
      )
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });

    return setStockData(stockResponse);
  }

  function createHistoryRecord() {
    const stockArrayResponse = Object.entries(stockData);

    const a = stockArrayResponse;
    console.log(a);

    for (const data of stockArrayResponse) {
      return (
        <div className="col-span-12 sm:col-span-6 md:col-span-3">
          <div className="flex flex-row bg-white shadow-sm rounded p-4">
            <div className="flex flex-col flex-grow ml-4">
              <div className="text-sm text-gray-500">
                <div className="col-span-12 lg:col-span-8">
                  <a
                    href="#"
                    className="inline-block rounded-full text-black
                text-xs font-bold "
                  >
                    {/* stockData comes here */}
                  </a>
                </div>
              </div>
              <div className="font-bold text-lg">{data[1]}</div>
            </div>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="bg-cover bg-9FB1BC bg-center  h-auto text-black py-12 px-10 object-fill">
      <div className="md:w-1/2">
        <p className="font-bold text-lg mb-6 uppercase">
          Buscar histórico de ações
        </p>
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
        <label>Digite a data de início do intervalo de tempo</label>
        <br />
        <input
          className="rounded-lg align-middle focus:outline-none pl-2"
          type="search"
          maxLength={14}
          placeholder={placeholder}
          onChange={handleFrom}
        />
        <br />
        <br />
        <label>Digite a data de final do intervalo de tempo</label>
        <br />
        <input
          className="rounded-lg align-middle focus:outline-none pl-2"
          type="search"
          maxLength={14}
          placeholder={placeholder}
          onChange={handleTo}
        />
        <br /> <br />
        <button
          className="bg-2E5266 rounded-lg px-3 h-12 text-white flex items-center group hover:bg-6E8898"
          onClick={getHistoric}
        >
          Buscar
        </button>
        <br />
        <br />
        <div className="flex items-center bg-9FB1BC  text-gray-800">
          <div className="p-4 w-full">
            <div className="grid grid-cols-12 gap-4">
              {createHistoryRecord()}
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <hr />
    </div>
  );
}
