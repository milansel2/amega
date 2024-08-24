import Utils from "./utils";
import Elements from '../elements';

const utils = new Utils();

export default class Auth {
    login(
		username = Cypress.env('username'),
		password = Cypress.env('password'),
	) {
        utils.visit('/');

		cy
            .intercept('GET', Cypress.env('apiSessionUrl'))
            .as('auth');

        cy
            .get(Elements.username)
            .should('not.be.disabled')
            .type(username, {force: true});

        cy
            .get(Elements.password)
            .should('not.be.disabled')
            .type(password, {force: true});

        cy
            .get(Elements.submit)
            .click({timeout: 10000});

        cy
            .wait('@auth')
            .then((data) => {
                expect(data.response.statusMessage).to.eq('OK');
                expect(data.response.statusCode).to.eq(200);
            });

        cy
            .contains('Welcome to Amega!', { timeout: 25000 })
            .should('be.visible');

        cy
            .getCookie('__Secure-next-auth.session-token')
            .should('exist');       
	}
}