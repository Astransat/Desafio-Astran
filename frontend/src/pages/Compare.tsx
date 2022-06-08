import { useState } from "react"
//import api from "../services/api"
import axios from 'axios'

export default function Compare() {
    const [mainStock, setMainStock] = useState('')
    const [stocks, setStocks] = useState('')
    const [returnData, setReturnData] = useState([])

    async function handleCompareStocks(e: any): Promise<void> {
        e.preventDefault()

        const data = { stocks: stocks.split(',') }

        try {
            //const response = await api.post(`/stocks/${mainStock}/compare`, data)
            const response = await axios.post(`http://localhost:3001/stocks/${mainStock}/compare`, data)
            setReturnData(response.data.lastPrices)

        } catch (err) {
            alert(err)
        }
    }


    return (
        <div className="container">
            <form id="compareStocks" onSubmit={handleCompareStocks}>
                <label >Main Stock</label> <br />
                <input type="text" className="inputStock" value={mainStock} placeholder="PETR4.SA" onChange={e => setMainStock(e.target.value)} /> <br />
                <label >Other stocks</label> <br />
                <input type="text" className="inputStocks" value={stocks} placeholder="BBAS3.SA,IBM,VALE3.SA" onChange={e => setStocks(e.target.value)} /> <br />
                <input type="submit" className="submitButton" value="Submit" form="compareStocks" />
            </form>
            <br />
            <br />
            
            {
                returnData.length != 0
                    ?<div  data-testid="stocks-lists" className="items-container">
                        {returnData.map((stock: any, index: number) => (
                            <ul key={index}>
                                <li key={stock.name}>Stock: {stock.name}</li>
                                <li key={stock.lastPrice}>Price: {stock.lastPrice}</li>
                                <li key={stock.pricedAt}>Priced at: {stock.pricedAt}</li>
                            </ul>
                        ))}
                    </div>
                    :null
            }
        </div>
    )
}