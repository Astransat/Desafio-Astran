import { useState } from "react"
import api from "../services/api"

export default function History() {
    const [stock, setStock] = useState('')
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')

    async function handleGetStockHistory(e: any): Promise<void> {
        e.preventDefault()

        try{
            const response = await api.get(`/stocks/${stock}/history?from=${from}&to=${to}`)

            alert(JSON.stringify(response.data))
        } catch (err) {
            alert(JSON.stringify(err))
        }
    }

    return (
        <div>
            <p>Get stock's historic informations</p>
                <form id="getStockHistory" onSubmit={handleGetStockHistory}>
                    <label htmlFor="">Stock's code name</label> <br />
                    <input type="text" value={stock} placeholder="PETR4.SA" onChange={e => setStock(e.target.value)} /> <br />
                    <label htmlFor="">From</label> <br />
                    <input type="text" value={from} placeholder="YYYY-MM-DD" onChange={e => setFrom(e.target.value)}/> <br />
                    <label htmlFor="">To</label> <br />
                    <input type="text" value={to} placeholder="YYYY-MM-DD" onChange={e => setTo(e.target.value)}/> <br />
                    <input type="submit" value="Submit" form="getStockHistory" />
                </form>
        </div>
    )
}