import { useState } from "react"
import api from "../services/api"

export default function Compare() {
    const [mainStock, setMainStock] = useState('')
    const [stocks, setStocks] = useState('')
    const [data, setData] = useState([])

    async function handleCompareStocks(e: any): Promise<void> {
        e.preventDefault()

        const data = {
            stocks: stocks.split(',')
        }

        try {
            const response = await api.post(`/stocks/${mainStock}/compare`, data)
            setData(response.data.lastPrices)

        } catch (err) {
            alert(err)
        }
    }


    return (
        <div className="container">
            <form id="compareStocks" onSubmit={handleCompareStocks}>
                <label >Main Stock</label> <br />
                <input type="text" value={mainStock} placeholder="PETR4.SA" onChange={e => setMainStock(e.target.value)} /> <br />
                <label >Other stocks</label> <br />
                <input type="text" value={stocks} placeholder="BBAS3.SA,IBM,VALE3.SA" onChange={e => setStocks(e.target.value)} /> <br />
                <input type="submit" value="Submit" form="compareStocks" />
            </form>
            <br />
            <br />

            <div >
                {data
                    ?<div className="items-container">
                        {data.map((stock: any) => (
                            <ul>
                                <li>Stock: {stock.name}</li>
                                <li>Price: {stock.lastPrice}</li>
                                <li>Priced at: {stock.pricedAt}</li>
                            </ul>
                        ))}
                    </div>
                    :null}
            </div>
        </div>
    )
}