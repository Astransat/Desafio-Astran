import { BrowserRouter as Router } from "react-router-dom";
import { render } from "@testing-library/react";
import Home from "./Home";

describe('Home', () => {
    it('should render links list', () => {
        const { getByText } = render(
            <Router>
                <Home />
            </Router>
        )

        expect(getByText(`Quote: Stock's most recent information`)).toBeTruthy()
        expect(getByText(`History: Stock's history informations`)).toBeTruthy()
        expect(getByText(`Compare: Compare informations for more than one stocks`)).toBeTruthy()
        expect(getByText(`Gains: How much you'de profit if invested in X stock at YYYY-MM-DD`)).toBeTruthy()
    })
})