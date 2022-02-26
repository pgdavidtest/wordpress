// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import 'cypress-file-upload';
Cypress.Commands.add('readAndWriteFile', (fileName, keyName, value) => {
    cy.readFile(fileName).then((data) => {
        data[keyName] = value;
        cy.writeFile(fileName, data)
    });
});
 
Cypress.Commands.add('Login', (username, password) => {
    cy.session([username, password], () => {
        cy.visit('https://wordpress.com/login');
        cy.get('#usernameOrEmail');
        cy.get('[type="submit"]');
        cy.get('#password');
        cy.get('[type="submit"]');  
    })
});


