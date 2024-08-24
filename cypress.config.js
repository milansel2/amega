const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-multi-reporters',
	reporterOptions: {
		configFile: 'reporter-config.json'
	},
  e2e: {
		responseTimeout: 15000,
		requestTimeout: 15000,	
		viewportWidth: 1920,
		viewportHeight: 1080,
		baseUrl: 'https://client.amega.finance/login',
		supportFile: 'cypress/support/e2e.js',
		video: true,
		trashAssetsBeforeRuns: true,
		retries: {
			runMode: 1
		},
		env: {
			username: 'milansel@gmail.com',
			password: 'P@ssw0rd2024',
			apiSessionUrl: 'https://client.amega.finance/api/auth/session',
			apiAmegaFinance: 'https://client.amega.finance',
      		apiFinance: 'https://my.amega.finance'
		},
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);      
    },
  },
});
