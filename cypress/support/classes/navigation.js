export default class Navigation {
    /**
	 * Navigate to: home, cashback or hub
     * @param navigationItem - home, cashback or hub
	 */
	navigateTo(navigationItem) {
        cy
            .intercept(`${Cypress.env('apiAmegaFinance')}/_next/data/**/hub.json`)
            .as('hub');

        cy
            .intercept(`${Cypress.env('apiAmegaFinance')}/_next/data/**/cashback.json`)
            .as('cashback');

        cy
            .intercept(`${Cypress.env('apiAmegaFinance')}/_next/data/**/en.json`)
            .as('home')
        
        cy
            .get(`[id="button-${navigationItem}"]`)
            .click();

        switch (navigationItem) {
            case 'hub':
                cy
                    .wait('@hub');

                cy
                    .contains('Manage linked accounts')
                    .should('be.visible');
                break;

            case 'cashback':
                cy
                    .wait('@cashback')
                
                cy
                    .contains('Recent Cashbacks')
                    .should('be.visible');
                break;

            case 'home':
                cy
                    .wait('@home');

                cy
                    .contains('Welcome to Amega!')
                    .should('be.visible');
                break;
        }
	}
}