import { BrowserRouter as Router } from "react-router-dom";
import { render } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import Gains from "./Gains";
import { server } from '../mocks/server'


describe('Gains', () => {
    // Mock the API functionality
    beforeAll(() => server.listen({
        onUnhandledRequest: 'error'
    }))

    beforeEach(() => server.resetHandlers())

    afterAll(() => server.close())

    
    it('should not have rendered stock information list', () => {
        const { queryByTestId, getByPlaceholderText, getByDisplayValue } = render(
            <Router>
                <Gains />
            </Router>
        )

        expect(getByPlaceholderText('PETR4.SA')).toBeInTheDocument()
        expect(getByPlaceholderText('10')).toBeInTheDocument()
        expect(getByPlaceholderText('YYYY-MM-DD')).toBeInTheDocument()
        expect(getByDisplayValue('Submit')).toBeInTheDocument()
        expect(queryByTestId('stock_list')).not.toBeInTheDocument()
    })

    it('should render stock information list after fetching api data', async () => {
        const { getByDisplayValue, findByText, getByPlaceholderText } = render(
            <Router>
                <Gains />
            </Router>
        )

        const inputStock = getByPlaceholderText('PETR4.SA')
        const inputAmount = getByPlaceholderText('10')
        const inputDate = getByPlaceholderText('YYYY-MM-DD')
        const button = getByDisplayValue('Submit')

        await userEvent.type(inputStock, 'IBM')
        await userEvent.type(inputAmount, '100')
        await userEvent.type(inputDate, '2022-02-10')
        await userEvent.click(button)

        expect(await findByText('Stock: IBM')).toBeInTheDocument()
        expect(await findByText('Purchased amount: 100')).toBeInTheDocument()
        expect(await findByText('Purchased at: 2022-02-10')).toBeInTheDocument()
        expect(await findByText('Price at purchase: 131.25')).toBeInTheDocument()
        expect(await findByText('Last price: 141.15')).toBeInTheDocument()
        expect(await findByText('Capital gains: 990')).toBeInTheDocument()
    })
})