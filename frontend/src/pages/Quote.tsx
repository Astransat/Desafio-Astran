import { useState } from "react"
//import api from "../services/api"
import axios from 'axios'

export default function Quote() {
    const [stock, setStock] = useState('')
    const [data, setData] = useState({})

    async function handleGetStockQuote(e: any): Promise<void> {
        e.preventDefault()

        try {
            //const response = await api.get(`stocks/${stock}/quote`)
            const response = await axios.get(`http://localhost:3001/stocks/${stock}/quote`)
            setData(response.data)
            
        } catch (err) {
            alert(JSON.stringify(err))
        }
    }
    
    return (
        <div className="container">
            <p>Get stock's most recent informations</p>

            <form id="getStockQuote" onSubmit={handleGetStockQuote}>
                <label htmlFor="">Stock's code name</label> <br />
                <input type="text" value={stock} placeholder="PETR4.SA" onChange={e => setStock(e.target.value)} /> <br />
                <input type="submit" value="Submit" form="getStockQuote" />
            </form>
            <br />
            <br />

            {
                Object.keys(data).length != 0
                    ?<ul data-testid="stock_list">
                        <li>Stock: {data.name}</li>
                        <li>Price: {data.lastPrice}</li>
                        <li>Date: {data.pricedAt}</li>
                    </ul>
                    :null
            }
        </div>
    )
}