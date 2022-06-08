import { rest } from 'msw'

export const handlers = [
    //GetStockQuote
    rest.get(`http://localhost:3001/stocks/IBM/quote`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                name: "IBM",
                lastPrice: 140.15,
                pricedAt: "2022-06-08"
            })
        )
    }),

    //GetStockHistory
    rest.get('http://localhost:3001/stocks/IBM/history', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                name: 'IBM',
                prices: [
                    {
                        opening: 131,
                        low: 130,
                        high: 135,
                        closing: 133,
                        pricedAt: '2022-06-01'
                    },
                    {
                        opening: 132,
                        low: 130,
                        high: 134,
                        closing: 133,
                        pricedAt: '2022-06-02'
                    },
                    {
                        opening: 130,
                        low: 129,
                        high: 135,
                        closing: 132,
                        pricedAt: '2022-06-03'
                    }
                ]
            })
        )
    }),

    //GetStockCompare
    rest.post(`http://localhost:3001/stocks/IBM/compare`, (req, res, ctx) => {
        return res(
            ctx.status(201),
            ctx.json({
                lastPrices: [
                    {
                        name: "IBM",
                        lastPrice: 140.15,
                        pricedAt: "2022-06-08"
                    },
                    {
                        name: "BBAS3.SA",
                        lastPrice: 80.15,
                        pricedAt: "2022-06-08"
                    },
                    {
                        name: "PETR4.SA",
                        lastPrice: 32.05,
                        pricedAt: "2022-06-08"
                    },
                ]
            })
        )
    }),

    //GetStockGains
    rest.get('http://localhost:3001/stocks/IBM/gains', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                name: 'IBM',
                purchasedAmount: 100,
                purchasedAt: '2022-02-10',
                priceAtDate: 131.25,
                lastPrice: 141.15,
                capitalGains: 990
            })
        )
    })
]