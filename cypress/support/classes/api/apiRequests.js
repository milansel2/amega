import { cookie } from '../../../fixtures/cookie';
import Utils from '../utils';

const utils = new Utils();

export default class ApiRequests {
    /**
     * Login to system via api request
     */
    login() {
        return  cy
            .request({
                method: 'GET',
                url: Cypress.env('apiSessionUrl'),
                headers: {
                    'Cookie': cookie
                }
            })
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response).to.have.property('headers');
                expect(response).to.have.property('duration');
                expect(response.body).to.have.property('user');
                expect(response.body.user).to.have.property('accessToken');
                expect(response.body.user.accessToken).to.be.a('string').and.not.be.empty;
                expect(response.body.user.client).to.have.property('status').and.eq('login');

                return response.body.user.accessToken;
            });
    }

    /**
     * Update profile sms notification
     * @param token - acces token
     */
    updateProfileSmsNotification(token) {
            cy
                .request({
                    method: 'PUT',
                    url: `${Cypress.env('apiFinance')}/client-api/profile`,
                    auth: {
                        'bearer': token
                    },
                    body: {
                        "smsNotificationEnabled": true
                    }
                })
                .then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response).to.have.property('headers');
                    expect(response).to.have.property('duration');
                    expect(response.body).to.have.property('smsNotificationEnabled').and.be.true;
                })
    }

    /**
     * Send bank payment details
     */
    sendPaymentDetails(token) {
        const randomPayloadData = [
            {
                "key": "Bank Account Holder Name",
                "value": utils.generateRandomData().person.fullName()
            },
            {
                "key": "IBAN",
                "value": utils.generateRandomData().finance.iban()
            },
            {
                "key": "Recipient Bank Name",
                "value": utils.generateRandomData().company.name() + ' Bank'
            },
            {
                "key": "Recipient Bank Address",
                "value": utils.generateRandomData().location.streetAddress()
            },
            {
                "key": "Recipient Bank Swift",
                "value": utils.generateRandomData().finance.bic()
            }
        ];

        cy
                .request({
                    method: 'POST',
                    url: `${Cypress.env('apiFinance')}/client-api/payment-details/upload`,
                    auth: {
                        'bearer': token
                    },
                    body: {
                        "data": randomPayloadData,
                        "configId": 6
                    }
                })
                .then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response).to.have.property('headers');
                    expect(response).to.have.property('duration');
                    expect(response.body.data["Bank Account Holder Name"].value).to.eql(randomPayloadData[0].value);
                    expect(response.body.data["IBAN"].value).to.eql(randomPayloadData[1].value);
                    expect(response.body.data["Recipient Bank Name"].value).to.eql(randomPayloadData[2].value);
                    expect(response.body.data["Recipient Bank Address"].value).to.eql(randomPayloadData[3].value);
                    expect(response.body.data["Recipient Bank Swift"].value).to.eql(randomPayloadData[4].value);
                })
    }
}