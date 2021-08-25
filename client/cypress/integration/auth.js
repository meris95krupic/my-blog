describe("login and register", () => {
    beforeEach(() => {
        cy.visit("/")
        if(cy.contains("LOGOUT")){ 
            cy.get('.topList > :nth-child(5)').click();
            cy.get('.topRight > .topList > :nth-child(1) > .link').click();
        }
    })

    it("login should fail", () => {
        cy.visit("/login")
        cy.get('[type="text"]').clear();
        cy.get('[type="text"]').type('test');
        cy.get('[type="password"]').clear();
        cy.get('[type="password"]').type('testtest');
        cy.get('.loginButton').click();
        cy.get(".home").should("not.exist")
    })

    it("login correctly", () => {
        cy.visit("/login")
        cy.get('[type="text"]').clear();
        cy.get('[type="text"]').type('test');
        cy.get('[type="password"]').clear();
        cy.get('[type="password"]').type('test');
        cy.get('.loginButton').click();
        cy.get(".home").should("exist")
    })

    it("register should fail", () => {
        cy.visit("/register")
        cy.get('[placeholder="Enter your username..."]').clear();
        cy.get('[placeholder="Enter your username..."]').type('test222');
        cy.get('[placeholder="Enter your email..."]').clear();
        cy.get('[type="password"]').clear();
        cy.get('[type="password"]').type('test222');
        cy.get('.registerButton').click();
        cy.contains("Something went wrong!")
    })
})