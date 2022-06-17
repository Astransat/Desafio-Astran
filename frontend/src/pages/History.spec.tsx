import { BrowserRouter as Router } from "react-router-dom";
import { render } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import History from "./History";
import { server } from '../mocks/server'


describe('History', () => {
    // Mock the API functionality
    beforeAll(() => server.listen({
        onUnhandledRequest: 'error'
    }))

    beforeEach(() => server.resetHandlers())

    afterAll(() => server.close())


    it('should not have rendered any stock information', () => {
        const { queryByTestId, getByPlaceholderText, getByDisplayValue, getByTestId } = render(
            <Router>
                <History />
            </Router>
        )

        expect(getByPlaceholderText('PETR4.SA')).toBeInTheDocument()
        expect(getByTestId('from')).toBeInTheDocument()
        expect(getByTestId('to')).toBeInTheDocument()
        expect(getByDisplayValue('Submit')).toBeInTheDocument()
        expect(queryByTestId('history-lists')).not.toBeInTheDocument()
    })

    it('should render stocks informations after fetching api data', async () => {
        const { getByDisplayValue, findByText, getByPlaceholderText, getByTestId } = render(
            <Router>
                <History />
            </Router>
        )

        const inputStock = getByPlaceholderText('PETR4.SA')
        const inputFrom = getByTestId('from')
        const inputTo = getByTestId('to')
        const button = getByDisplayValue('Submit')

        await userEvent.type(inputStock, 'IBM')
        await userEvent.type(inputFrom, '2022-06-01')
        await userEvent.type(inputTo, '2022-06-03')
        await userEvent.click(button)

        expect(await findByText('Priced at: 2022-06-01')).toBeInTheDocument()
        expect(await findByText('Priced at: 2022-06-02')).toBeInTheDocument()
        expect(await findByText('Priced at: 2022-06-03')).toBeInTheDocument()
    })
})