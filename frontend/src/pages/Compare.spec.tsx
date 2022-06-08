import { BrowserRouter as Router } from "react-router-dom";
import { render } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import Compare from "./Compare";
import { server } from '../mocks/server'


describe('Compare', () => {
    // Mock the API functionality
    beforeAll(() => server.listen({
        onUnhandledRequest: 'error'
    }))

    beforeEach(() => server.resetHandlers())

    afterAll(() => server.close())


    it('should not have rendered any stock information', () => {
        const { queryByText, getByPlaceholderText, getByDisplayValue } = render(
            <Router>
                <Compare />
            </Router>
        )

        expect(getByPlaceholderText('PETR4.SA')).toBeInTheDocument()
        expect(getByPlaceholderText('BBAS3.SA,IBM,VALE3.SA')).toBeInTheDocument()
        expect(getByDisplayValue('Submit')).toBeInTheDocument()
        expect(queryByText('Stock:')).not.toBeInTheDocument()
    })

    it('should render stocks informations after fetching api data', async () => {
        const { getByDisplayValue, findByText, getByPlaceholderText } = render(
            <Router>
                <Compare />
            </Router>
        )

        const inputStock = getByPlaceholderText('PETR4.SA')
        const inputStocks = getByPlaceholderText('BBAS3.SA,IBM,VALE3.SA')
        const button = getByDisplayValue('Submit')

        userEvent.type(inputStock, 'IBM')
        userEvent.type(inputStocks, 'BBAS3.SA,PETR4.SA')
        userEvent.click(button)

        expect(await findByText('Stock: IBM')).toBeInTheDocument()
        expect(await findByText('Stock: PETR4.SA')).toBeInTheDocument()
        expect(await findByText('Stock: BBAS3.SA')).toBeInTheDocument()
    })
})