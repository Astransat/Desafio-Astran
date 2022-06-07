import { useState } from "react"
import api from "../services/api"

export default function Compare() {
    const [mainStock, setMainStock] = useState('')
    const [stocks, setStocks] = useState('')

    async function handleCompareStocks(e: any): Promise<void> {
        e.preventDefault()

        const data = stocks.split(',')

        try {
            const response = await api.get(`/stocks/${mainStock}/compare`, {
                data: {
                    stocks: data
                }
            })

            alert(JSON.stringify(response.data))

        } catch (err) {
            alert(err)
        }
    }

    return (
        <div>
            <form id="compareStocks" onSubmit={handleCompareStocks}>
                <label >Main Stock</label> <br />
                <input type="text" value={mainStock} placeholder="PETR4.SA" onChange={e => setMainStock(e.target.value)} /> <br />
                <label >Other stocks</label> <br />
                <input type="text" value={stocks} placeholder="BBAS3.SA,IBM,VALE5.SA" onChange={e => setStocks(e.target.value)} /> <br />
                <input type="submit" value="Submit" form="compareStocks" />
            </form>
        </div>
    )
}