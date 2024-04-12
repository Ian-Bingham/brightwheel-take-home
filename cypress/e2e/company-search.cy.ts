describe("Company Search", () => {
	const waitForInitialUI = () => {
		cy.wait("@getStarredCompanies");
		cy.wait("@getAllCompanies");
		cy.get('[data-cy="search-results-loader"]', { timeout: 10000 }).should(
			"not.exist"
		);
		cy.get('[data-cy="total-stars-badge-loader"]', { timeout: 10000 }).should(
			"not.exist"
		);
	};

	beforeEach(() => {
		cy.intercept("GET", "http://localhost:3001/search?starred=true", {
			fixture: "starred_companies.json",
		}).as("getStarredCompanies");

		cy.intercept("GET", "http://localhost:3001/search?_page=1&_limit=10&q=", {
			fixture: "all_companies.json",
		}).as("getAllCompanies");
	});

	it("renders the first 10 results and total star count", () => {
		cy.visit("/");
		waitForInitialUI();

		cy.get('[data-cy="company-card-container"').should("have.length", 10);
		cy.get('[data-cy="total-stars-badge"]').within(() => {
			cy.get(".MuiBadge-badge").contains(3);
		});
	});

	it("filters the results when the user types", () => {
		cy.intercept(
			"GET",
			"http://localhost:3001/search?_page=1&_limit=10&q=foobar",
			{
				fixture: "searched_companies.json",
			}
		).as("getSearchedCompanies");

		cy.visit("/");
		waitForInitialUI();

		cy.get('[data-cy="company-card-container"').should("have.length", 10);
		cy.get('[data-cy="total-stars-badge"]').within(() => {
			cy.get(".MuiBadge-badge").contains(3);
		});

		cy.get('[data-cy="search-input"]').type("foobar");
		cy.wait("@getSearchedCompanies");

		cy.get('[data-cy="company-card-container"').should("have.length", 3);
		cy.get('[data-cy="total-stars-badge"]').within(() => {
			cy.get(".MuiBadge-badge").contains(3);
		});
	});

	it("updates the starred status for a company", () => {
		cy.intercept("PATCH", "http://localhost:3001/search/company.40", {
			fixture: "patched_company.json",
		}).as("getPatchedCompany");

		cy.visit("/");
		waitForInitialUI();

		cy.get('[data-cy="company-card-star-icon-filled"]').should(
			"have.length",
			0
		);

		cy.get('[data-cy="company-card-container"').first().as("firstCompany");
		cy.get("@firstCompany").click();
		cy.wait("@getPatchedCompany");

		cy.get('[data-cy="company-card-star-icon-filled"]').should(
			"have.length",
			1
		);
	});
});
