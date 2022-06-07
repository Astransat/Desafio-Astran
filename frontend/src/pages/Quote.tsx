import { useState } from "react"
import api from "../services/api"

export default function Quote() {
    const [stock, setStock] = useState('')

    async function handleGetStockQuote(e: any): Promise<void> {
        e.preventDefault()

        try {
            const response = await api.get(`stocks/${stock}/quote`)
            alert(JSON.stringify(response.data))
            
        } catch (err) {
            alert(JSON.stringify(err))
        }
    }
    
    return (
        <div>
            <p>Get stock's most recent informations</p>
                <form id="getStockQuote" onSubmit={handleGetStockQuote}>
                    <label htmlFor="">Stock's code name</label> <br />
                    <input type="text" value={stock} placeholder="PETR4.SA" onChange={e => setStock(e.target.value)} /> <br />
                    <input type="submit" value="Submit" form="getStockQuote" />
                </form>
        </div>
    )
}