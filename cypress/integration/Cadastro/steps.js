/// <reference types="cypress" />

let Chance = require('chance');
let chance = new Chance();

When(/^informar meus dados$/, () => {
    // Type
    cy.get('input[placeholder="First Name"]').type(chance.first());
    cy.get('input[ng-model^="Last"]').type(chance.last());
    cy.get('input[ng-model^="Email"]').type(chance.email());
    cy.get('input[ng-model^="Phone"]').type(chance.phone( { formatted: false }));
    // cy.get('textarea[ng-model="Adress"]').type("Teste");

    // Check (Radio e Checkbox)
    cy.get('input[value="FeMale"]').check();
    cy.get('input[type="checkbox"]').check('Cricket');
    cy.get('input[type="checkbox"]').check('Hockey');

    // Select e select 2 (combos)
    cy.get('select#Skills').select('Javascript');
    cy.get('select#countries').select('Argentina');
    cy.get('select#country').select('Australia', {force: true});
    cy.get('select#yearbox').select('1996');
    cy.get('select[ng-model^="monthbox"]').select('February');
    cy.get('select#daybox').select('24');

    // Type
    cy.get('input#firstpassword').type('Agilizei@2020');
    cy.get('input#secondpassword').type('Agilizei@2020');

    // Attach input-file
    cy.get('input#imagesrc').attachFile('dick.jpg');
});

When(/^salvar$/, () => {
    // Click
    cy.get('button#submitbtn').click();
});

Then(/^devo ser cadastrado com sucesso$/, () => {
    // Routes
    cy.wait('@postNewTable').then((resNewTable) => {
        // Chai
        expect(resNewTable.status).to.eq(200)
        // console.log(resNewTable.status)
        // cy.log(resNewTable.status)
    });
    cy.wait('@postUserTable').then((resUserTable) => {
        expect(resUserTable.status).to.eq(200)
    });
    cy.wait('@getNewTable').then((resNewTable) => {
        expect(resNewTable.status).to.eq(200)
    });    
    
    // URL
    cy.url().should('contain', 'WebTable.html');
});
