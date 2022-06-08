import { rest } from 'msw'

export const handlers = [
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
    })
]