import Auth from '../support/classes/auth';
import Profile from '../support/classes/profile';

const auth = new Auth();
const profile = new Profile();

describe('Profile verification', () => {
  it('I can make profile verification', () => {    
      auth.login();

      profile.clickDepositButton();
      profile.clickCompleteVerification();
      profile.clickContinueButton();

      profile.fillPersonalAndFinancialDetails();
      profile.clickContinueButton();

      profile.fillProfileVerification();
      profile.clickContinueButton();
      
      profile.fillGoalsWithAmega();
      profile.clickContinueButton();

      profile.selectCountryOfResidence();
      profile.clickContinueButton();
  });
});