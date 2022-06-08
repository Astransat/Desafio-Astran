import { useState } from "react"
//import api from "../services/api"
import axios from 'axios'

export default function History() {
    const [stock, setStock] = useState('')
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [data, setData] = useState([])

    async function handleGetStockHistory(e: any): Promise<void> {
        e.preventDefault()

        try{
            //const response = await api.get(`/stocks/${stock}/history?from=${from}&to=${to}`)
            const response = await axios.get(`http://localhost:3001/stocks/${stock}/history?from=${from}&to=${to}`)
            setData(response.data.prices)
        } catch (err) {
            alert(JSON.stringify(err))
        }
    }

    return (
        <div className="container">
            <p>Get stock's historic informations</p>
                <form id="getStockHistory" onSubmit={handleGetStockHistory}>
                    <label htmlFor="">Stock's code name</label> <br />
                    <input type="text" className="inputStock" value={stock} placeholder="PETR4.SA" onChange={e => setStock(e.target.value)} /> <br />
                    <label htmlFor="">From</label> <br />
                    <input type="text" className="inputFrom" data-testid="from" value={from} placeholder="YYYY-MM-DD" onChange={e => setFrom(e.target.value)}/> <br />
                    <label htmlFor="">To</label> <br />
                    <input type="text" className="inputTo" data-testid="to" value={to} placeholder="YYYY-MM-DD" onChange={e => setTo(e.target.value)}/> <br />
                    <input type="submit" className="submitButton" value="Submit" form="getStockHistory" />
                </form>
                <br />
                <br />

                {
                    data.length != 0
                        ?<div data-testid="history-lists">
                            {data.map((stock: any, index: number) => (
                                <ul className="items-container" key={index}>
                                    <li key={stock.pricedAt}>Priced at: {stock.pricedAt}</li>
                                    <li key={stock.opening}>Opening: {stock.opening}</li>
                                    <li key={stock.low}>Low: {stock.low}</li>
                                    <li key={stock.high}>High: {stock.high}</li>
                                    <li key={stock.closing}>Closing: {stock.closing}</li>
                                </ul>
                            ))}
                        </div>
                        :null
                }
        </div>
    )
}