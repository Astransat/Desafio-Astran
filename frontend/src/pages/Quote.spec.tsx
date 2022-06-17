import { BrowserRouter as Router } from "react-router-dom";
import { render } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import Quote from "./Quote";
import { server } from '../mocks/server'


describe('Quote', () => {
    // Mock the API functionality
    beforeAll(() => server.listen({
        onUnhandledRequest: 'error'
    }))

    beforeEach(() => server.resetHandlers())

    afterAll(() => server.close())

    
    it('should not have rendered stock_list ul', () => {
        const { queryByTestId, getByPlaceholderText, getByDisplayValue } = render(
            <Router>
                <Quote />
            </Router>
        )

        expect(getByPlaceholderText('PETR4.SA')).toBeInTheDocument()
        expect(getByDisplayValue('Submit')).toBeInTheDocument()
        expect(queryByTestId('stock_list')).not.toBeInTheDocument()
    })

    it('should render ul stock_list after fetching api data', async () => {
        const { getByDisplayValue, findByText, getByPlaceholderText } = render(
            <Router>
                <Quote />
            </Router>
        )

        const inputStock = getByPlaceholderText('PETR4.SA')
        const button = getByDisplayValue('Submit')

        await userEvent.type(inputStock, 'IBM')
        await userEvent.click(button)

        expect(await findByText('Stock: IBM')).toBeInTheDocument()
        expect(await findByText('Price: 140.15')).toBeInTheDocument()
        expect(await findByText('Date: 2022-06-08')).toBeInTheDocument()
    })
})