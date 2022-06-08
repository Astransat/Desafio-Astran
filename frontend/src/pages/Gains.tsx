import { useState } from "react"
//import api from "../services/api"
import axios from 'axios'

export default function Gains() {
    const [stock, setStock] = useState('')
    const [amount, setAmount] = useState('')
    const [date, setDate] = useState('')
    const [data, setData] = useState({})

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
                <input type="text" className="inputStock" value={stock} placeholder="PETR4.SA" onChange={e => setStock(e.target.value)} /> <br />
                <label >Amount</label> <br />
                <input type="integer" className="inputAmount" value={amount} placeholder="10" onChange={e => setAmount(e.target.value)} /> <br />
                <label >Date</label> <br />
                <input type="text" className="inputDate" value={date} placeholder="YYYY-MM-DD" onChange={e => setDate(e.target.value)}/> <br />
                <input type="submit" className="submitButton" value="Submit" form="Gains" />
            </form>
            <br />
            <br />

            {
                Object.keys(data).length != 0
                    ?<ul className="gains" data-testid="stock_list" key={Object.keys(data).length}>
                        <li key={data.name}>Stock: {data.name}</li>
                        <li key={data.purchasedAmount}>Purchased amount: {data.purchasedAmount}</li>
                        <li key={data.purchasedAt}>Purchased at: {data.purchasedAt}</li>
                        <li key={data.priceAtDate}>Price at purchase: {data.priceAtDate}</li>
                        <li key={data.lastPrice}>Last price: {data.lastPrice}</li>
                        <li key={data.capitalGains}>Capital gains: {data.capitalGains}</li>
                    </ul>
                    :null
            }
        </div>
    )
}