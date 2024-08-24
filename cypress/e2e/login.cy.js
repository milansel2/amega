import Auth from '../support/classes/auth';
import Navigation from '../support/classes/navigation';

const auth = new Auth();
const navigation = new Navigation();

describe('Login and navigation', () => {
  it('I can login and navigate to hub, cashback and home page', () => {    
    auth.login();

    navigation.navigateTo('hub');
    navigation.navigateTo('cashback');
    navigation.navigateTo('home');
  });
});