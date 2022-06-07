import { useState } from "react"
import api from "../services/api"

export default function Gains() {
    const [stock, setStock] = useState('')
    const [amount, setAmount] = useState('')
    const [date, setDate] = useState('')

    async function handleGains(e: any): Promise<void> {
        e.preventDefault()

        try {
            const response = await api.get(`/stocks/${stock}/gains?purchasedAmount=${amount}&purchasedAt=${date}`)
    
            alert(JSON.stringify(response.data))
        } catch (err) {
            alert(err)
        }

    }

    return (
        <div>
            <form id="Gains" onSubmit={handleGains}>
                <label >Stock's code name</label> <br />
                <input type="text" value={stock} placeholder="PETR4.SA" onChange={e => setStock(e.target.value)} /> <br />
                <label >Amount</label> <br />
                <input type="integer" value={amount} placeholder="10" onChange={e => setAmount(e.target.value)} /> <br />
                <label >Date</label> <br />
                <input type="text" value={date} placeholder="YYYY-MM-DD" onChange={e => setDate(e.target.value)}/> <br />
                <input type="submit" value="Submit" form="Gains" />
            </form>
        </div>
    )
}