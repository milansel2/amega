import Elements from '../elements';

export default class Payment {
    /**
     * Click on payment details
     */
    clickPaymentDetails() {
        cy
            .intercept(`${Cypress.env('apiAmegaFinance')}/_next/data/**/payment-details.json`)
            .as('paymentDetails');

        cy
            .contains('Payment Details')
            .click();

        cy
            .wait('@paymentDetails');

        cy
            .location('pathname')
            .should('contain', 'payment-details');
    }
    
    /**
     * Click on new payment detail
     */
    clcikNewPaymentDetail() {
        cy
            .get(Elements.newPaymentDetail)
            .click();

        cy
            .contains('Add Payment Details')
            .should('be.visible');
    }

    /**
     * Select payment provider
     * @param provider - payment provider
     */
    selectPaymentProvider(provider) {
        cy
            .contains(provider)
            .click();

        cy
            .contains('Continue')
            .click();
    }

    /**
     * Fill payment details form
     * @param data - object with data: holderName, iban, recBankName, recBankAddress, recBankSwift
     */
    fillPaymentDetailsForm(data) {
        cy
            .get(Elements.bankAccountHolderName)
            .type(data.holderName);

        cy
            .get(Elements.iban)
            .type(data.iban);

        cy
            .get(Elements.recBankName)
            .type(data.recBankName);

        cy
            .get(Elements.recBankAddress)
            .type(data.recBankAddress);

        cy
            .get(Elements.recBankSwift)
            .type(data.recBankSwift)
    }

    /**
     * Click add payment provider
     */
    clickAddPaymentProvider() {
        cy
            .intercept(`${Cypress.env('apiFinance')}/client-api/payment-details/upload`)
            .as('upload');

        cy
            .intercept(`${Cypress.env('apiAmegaFinance')}/**/en/payment-details.json`)
            .as('paymentDetails');

        cy
            .get(Elements.addPaymentProvider)
            .click();

        cy
            .wait('@upload');

        cy
            .wait('@paymentDetails');
    }

    /**
     * Fill crypto to fiat form
     * @param data - object with data: clientFullName, cryptoWalletAddress
     */
    fillCryptoToFiatForm(data) {
        cy
            .get(Elements.clientFullName)
            .type(data.clientFullName);

        cy
            .selectRandomOption('cryptoCurrency');

        cy
            .get(Elements.cryptoWalletAddress)
            .type(data.cryptoWalletAddress);

        cy
            .get(Elements.uploadPaymentDocs)
            .selectFile('cypress/fakePayment.jpg', {force: true});
    }

    /**
     * Delete crypto to fiat provider
     */
    deleteCryptoToFiatProvider() {
        // arrow expand drop down
        cy
            .contains('Crypto To Fiat')
            .parent()
            .next()
            .next()
            .click();

        cy
            .intercept(`${Cypress.env('apiFinance')}/client-api/payment-details/**`)
            .as('deleteCrypto');

        // trash icon
        cy
            .contains('Crypto To Fiat')    
            .parent()
            .next()
            .click();

        // delete confirmation
        cy
            .contains('Delete Crypto To Fiat payment details?')
            .next()
            .within(() => {
                cy
                    .contains('Delete')
                    .click();
            })
        
        cy
            .wait('@deleteCrypto');

        cy
            .contains('Payment details have been successfully deleted')
            .should('exist')
            .and('be.visible');
    }
}