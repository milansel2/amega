import { faker } from '@faker-js/faker';

export default class Utils {
	/**
	 * Generic helper function to visit page
	 * @param url - The url to visit
	 */
	visit(url) {
		cy.visit(url);
	}

    /**
     * Generate random data of all sorts
     * @see https://fakerjs.dev/guide/usage.html
     * @returns Faker - Lib to generate fake data
     */
	generateRandomData() {
		return faker;
	}
}