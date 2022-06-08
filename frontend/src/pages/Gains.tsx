import { useState } from "react"
//import api from "../services/api"
import axios from 'axios'

export default function Gains() {
    const [stock, setStock] = useState('')
    const [amount, setAmount] = useState('')
    const [date, setDate] = useState('')
    const [data, setData] = useState()

    async function handleGains(e: any): Promise<void> {
        e.preventDefault()

        try {
            //const response = await api.get(`/stocks/${stock}/gains?purchasedAmount=${amount}&purchasedAt=${date}`)
            const response = await axios.get(`http://localhost:3001/stocks/${stock}/gains?purchasedAmount=${amount}&purchasedAt=${date}`)
            setData(response.data)
        } catch (err) {
            alert(err)
        }
    }

    return (
        <div className="container">
            <form id="Gains" onSubmit={handleGains}>
                <label >Stock's code name</label> <br />
                <input type="text" value={stock} placeholder="PETR4.SA" onChange={e => setStock(e.target.value)} /> <br />
                <label >Amount</label> <br />
                <input type="integer" value={amount} placeholder="10" onChange={e => setAmount(e.target.value)} /> <br />
                <label >Date</label> <br />
                <input type="text" value={date} placeholder="YYYY-MM-DD" onChange={e => setDate(e.target.value)}/> <br />
                <input type="submit" value="Submit" form="Gains" />
            </form>
            <br />
            <br />

            {
                data
                    ?<ul>
                        <li>Stock: {data.name}</li>
                        <li>Purchased Amount: {data.purchasedAmount}</li>
                        <li>Purchased At: {data.purchasedAt}</li>
                        <li>Price at Purchase: {data.priceAtDate}</li>
                        <li>Last Price: {data.lastPrice}</li>
                        <li>Capital Gains: {data.capitalGains}</li>
                    </ul>
                    :null
            }
        </div>
    )
}