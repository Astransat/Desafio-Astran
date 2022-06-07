import { render } from "@testing-library/react";
import App from "../App";

describe('Home', () => {
    it('should render links list', () => {
        const { getByText } = render(<App />)

        expect(getByText(`Quote: Stock's most recent information`)).toBeTruthy()
    })
})