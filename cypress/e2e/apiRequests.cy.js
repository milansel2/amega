import ApiRequests from '../support/classes/api/apiRequests';

const apiRequests = new ApiRequests();

describe('API requests', () => {
    it('I can update profile sms notification', () => {
        apiRequests
            .login()
            .then((token) => {
                apiRequests
                    .updateProfileSmsNotification(token);
        });
    });

    it('I can send bank payment details', () => {
        apiRequests
            .login()
            .then((token) => {
                apiRequests
                    .sendPaymentDetails(token)
            })
    });
  });
