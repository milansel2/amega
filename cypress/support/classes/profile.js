import Elements from '../elements';

export default class Profile {
    /**
	 * Click on a deposit button
	 */
	clickDepositButton() {
		cy
			.contains('Deposit')
			.click();
		
		this.assertMakeDepositVisible();
	}

	/**
	 * Assert make deposit is visible
	 */
	assertMakeDepositVisible() {
		cy
			.contains('Make a Deposit', {timeout: 15000})
			.should('be.visible');
	}

	/**
	 * Click on complete verification button
	 */
	clickCompleteVerification() {
		cy
			.contains('Complete Verification')
			.click();

		this.assertProfileVerificationVisible();
	}

	/**
	 * Assert profile verification is visible
	 */
	assertProfileVerificationVisible() {
		cy
			.contains('Profile Verification', {timeout: 15000})
			.should('be.visible');
	}

	/**
	 * Click continue button
	 */
	clickContinueButton() {
		cy
			.contains('Continue')
			.click();
	}

	/**
	 * Fill personal and financial details form
	 */
	fillPersonalAndFinancialDetails() {
		cy
			.selectRandomOption('employmentStatus');

		cy
			.selectRandomOption('industry');

		cy
			.selectRandomOption('sourceOfFunds');

		cy
			.selectRandomOption('annualIncome');

		cy
			.selectRandomOption('netWorth');

		cy
			.selectRandomOption('cashAndLiquidAssets');

		cy
			.selectRandomRadioByName('usResident');

		cy
			.selectRandomRadioByName('tin');

		cy
			.selectRandomRadioByName('government');
	}

	/**
	 * Fill profile verification
	 */
	fillProfileVerification() {
		cy
			.selectRandomOption('financialKnowledge');

		cy
			.selectRandomRadioByName('experienceOverLastYear');

		cy
			.get(Elements.expOverLastYear)
			.wait(200)
			.invoke('css', 'color')
			.then($color => {
				if ($color === 'rgb(0, 193, 64)') {

					const questions = [
						'invested in stocks and/or ETFs?',
						'Contracts for Difference or other Leverage Products',
						'invested in Cryptocurrencies'
					]

					questions
						.forEach(question => {					
							cy
								.contains(question)
								.parent()
								.as('question')
								.find('option')
								.then($options => {
									const maxIndex = $options.length - 1;
									const randomIndex = Cypress._.random(1, maxIndex);
									const randomValue = $options[randomIndex].value;

									cy
										.get('@question')
										.find('select')
										.select(randomValue);
								})
					})
				}
			})

		cy
			.selectRandomOption('knowledgeLeverage');

		cy
			.selectRandomOption('knowledgeRequiredMargin');

		cy
			.selectRandomOption('knowledgeLimitLosses');

		cy
			.selectRandomOption('knowledgeMarginUsed');

		cy
			.selectRandomOption('knowledgeStopOut');
	}

	/**
	 * Assert goals with amega
	 */
	assertGoalsWithAmega() {
		cy
			.contains('Goals with Amega')
			.should('be.visible');
	}

	/**
	 * Fill goals with amega
	 */
	fillGoalsWithAmega() {
		this.assertGoalsWithAmega();

		cy
			.selectRandomOption('planToDepositAmount');

		cy
			.selectRandomOption('depositChannel');

		cy
			.get(Elements.assetsToTrade)
			.next()
			.find('div')
			.each(($checkbox) => {
				cy
					.wrap($checkbox)
					.click();
			})

		cy
			.selectRandomOption('tradingGoal');
	}

	/**
	 * Select country of residence
	 */
	selectCountryOfResidence() {
		cy
			.get(Elements.typeRadio)
			.check();

		Cypress._.times(2, () => {		
			cy
				.contains('Next')
				.click();
		})
	}

	/**
	 * Upload identity document
	 */
	uploadIdentityDocument() {
		cy
			.get(Elements.iDocType)
			.eq(0)
			.click();

		cy
			.contains('Next')
			.click();

		cy
			.contains('Upload manually')
			.click();

		cy
			.get(Elements.uploadItem)
			.eq(0)
			.selectFile('cypress/profile.jpg');

		cy
			.get(Elements.uploadItem)
			.eq(1)
			.selectFile('cypress/fakeId.png');
	}
}