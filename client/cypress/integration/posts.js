describe("posts: write, update and delete", () => {
    beforeEach(() => {
        cy.visit("/")
        if(cy.contains("LOGOUT")){ 
            cy.get('.topList > :nth-child(5)').click();
            cy.get('.topRight > .topList > :nth-child(1) > .link').click();
        }

        // Login
        cy.visit("/login")
        cy.get('[type="text"]').clear();
        cy.get('[type="text"]').type('test');
        cy.get('[type="password"]').clear();
        cy.get('[type="password"]').type('test');
        cy.get('.loginButton').click();
    })
    
    it("write post correctly", () => {
        // write a post
        cy.get(':nth-child(4) > .link').click();
        cy.get(':nth-child(1) > .writeInput').clear();
        cy.get(':nth-child(1) > .writeInput').type('test-abc');
        cy.get(':nth-child(2) > .writeInput').clear();
        cy.get(':nth-child(2) > .writeInput').type('Test---abc...');
        cy.get('.writeSubmit').click();
        
        cy.contains("Author:")
        cy.contains("test-abc")
    })

    it("writing a post should fail", () => {
        // write a post that fails
        cy.get(':nth-child(4) > .link').click();
        cy.get(':nth-child(1) > .writeInput').clear();
        cy.get(':nth-child(1) > .writeInput').type('ABC');
        cy.get('.writeSubmit').click();
        
        cy.contains("Author:").should("not.exist")
        cy.contains("ABC").should("not.exist")
    })

    it("update post correctly", () => {
        // update a post
        cy.get('.postTitle').contains('test-abc').click();
        cy.get('.fa-edit').click();
        
        cy.get('.singlePostDescInput').clear();
        cy.get('.singlePostDescInput').type('Test---abc...123---abc');
        cy.get('.singlePostButton').click();

        cy.get('.topList > :nth-child(1) > .link').click();
        cy.contains("Test---abc...123---abc").should("exist")
    })

    it("delete post correctly", () => {
        // delete a post
        cy.get('.postTitle').contains('test-abc').click();
        cy.get('.fa-trash-alt').click();
        
        cy.contains("test-abc").should("not.exist")
    })
})