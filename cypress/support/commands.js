// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import Utils from "./classes/utils";
const utils = new Utils();

Cypress.Keyboard.defaults({
	keystrokeDelay: 1
});

Cypress.Commands.add('selectRandomOption', (selector) => {
    cy
        .get(`[name="${selector}"]`)
        .then($select => {
            const options = $select.find('option');
            let maxIndex = options.length - 1;

            if (selector === 'sourceOfFunds' || selector === 'industry') {
                maxIndex -= 1;
            }
            const randomIndex = Cypress._.random(1, maxIndex);
            const randomValue = options[randomIndex].value;

    cy
        .get(`[name="${selector}"]`)
        .select(randomValue)
    });
});

Cypress.Commands.add('selectRandomRadioByName', (name) => {
    cy
        .get(`[name="${name}"]`)
        .then($radioButtons => {
            const randomIndex = Cypress._.random(0, $radioButtons.length - 1);
            const selectedRadioButton = $radioButtons[randomIndex];
        
            cy
                .wrap(selectedRadioButton)
                .check({ force: true })
                .then(() => {
                    if (name === 'government' && selectedRadioButton.id.includes('yes')) {
                        cy
                            .contains('provide details')
                            .next()
                            .type(utils.generateRandomData().string.alphanumeric(15));
                    }                    
                });
    });
});
