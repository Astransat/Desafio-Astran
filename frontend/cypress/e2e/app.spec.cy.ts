describe('App', () => {
    /*
    To run these tests its needed to start back & frontend
    As these tests are not mocking the api some may fail due to the api's limited calls.
    */
    it('should visit & verify Home', () => {
        cy.visit('/')

        cy.contains("Quote: Stock's most recent information").should('have.attr', 'href', '/quote')
        cy.contains("History: Stock's history informations").should('have.attr', 'href', '/history')
        cy.contains("Compare: Compare informations for more than one stocks").should('have.attr', 'href', '/compare')
        cy.contains("Gains: How much you'de profit if invested in X stock at YYYY-MM-DD").should('have.attr', 'href', '/gains')
    })

    it('should visit & verify Quote', () => {
        cy.visit('/quote')

        cy.get(".inputStock").type('IBM')
        cy.get('.submitButton').click()

        cy.get(".stockData").contains('IBM')
    })

    it('should visit & verify History', () => {
        cy.visit('/history')

        cy.get(".inputStock").type('IBM')
        cy.get(".inputFrom").type('2022-06-01')
        cy.get(".inputTo").type('2022-06-03')
        cy.get('.submitButton').click()

        cy.get(".items-container").contains('2022-06-01')
        cy.get(".items-container").contains('2022-06-02')
        cy.get(".items-container").contains('2022-06-03')
    })

    it('should visit & verify Compare', () => {
        cy.visit('/compare')

        cy.get(".inputStock").type('IBM')
        cy.get(".inputStocks").type('PETR4.SA,BBAS3.SA')
        cy.get('.submitButton').click()

        cy.get(".items-container").contains('Stock: IBM')
        cy.get(".items-container").contains('Stock: PETR4.SA')
        cy.get(".items-container").contains('Stock: BBAS3.SA')
    })

    it('should visit & verify Gains', () => {
        cy.visit('/gains')

        cy.get(".inputStock").type('IBM')
        cy.get(".inputAmount").type('100')
        cy.get('.inputDate').type('2022-02-10')
        cy.get('.submitButton').click()

        cy.get(".gains").contains('IBM')
        cy.get(".gains").contains('Capital gains:')
    })
})