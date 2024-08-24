import Auth from '../support/classes/auth';
import Navigation from '../support/classes/navigation';
import Payment from '../support/classes/payment';
import Utils from '../support/classes/utils';

const auth = new Auth();
const navigation = new Navigation();
const payment = new Payment();
const utils = new Utils();

describe('Payment provider details', () => {
  beforeEach(() => {
        auth.login();
        navigation.navigateTo('hub');

        payment.clickPaymentDetails();
        payment.clcikNewPaymentDetail();
	});

  it('I can add payment provider Bank detail', () => {
        payment.selectPaymentProvider('Bank Details');

        payment.fillPaymentDetailsForm(
          {
            holderName: utils.generateRandomData().person.fullName(),
            iban: utils.generateRandomData().finance.iban(),
            recBankName: utils.generateRandomData().company.name() + ' Bank',
            recBankAddress: utils.generateRandomData().location.streetAddress(),
            recBankSwift: utils.generateRandomData().finance.bic()
          }
        );

        payment.clickAddPaymentProvider();
  });

  it('I can add payment provider Crypto To Fiat', () => {
        payment.selectPaymentProvider('Crypto To Fiat');

        payment.fillCryptoToFiatForm(
          {
            clientFullName: utils.generateRandomData().person.fullName(),
            cryptoWalletAddress: utils.generateRandomData().finance.bitcoinAddress()
          }
        );

        payment.clickAddPaymentProvider();
  });

  it('I can remove payment provider Crypto To Fiat', () => {
        payment.selectPaymentProvider('Crypto To Fiat');

        payment.fillCryptoToFiatForm(
          {
            clientFullName: utils.generateRandomData().person.fullName(),
            cryptoWalletAddress: utils.generateRandomData().finance.bitcoinAddress()
          }
        );

        payment.clickAddPaymentProvider();

        payment.deleteCryptoToFiatProvider();
  });
});