///<reference types ="cypress"/>

class loggedInHomePage {

    //Page Objects
    elements = {

    
        myProfileIcon: () => cy.get('img[alt="My Profile"]'),
        myProfileSideBarBtn: () => cy.get('[data-e2e-sidebar="My Profile"]'),
        
    };

    //========================= Page Methods =================

    //Method to Navigate to login screen
    goToMyProfile() {
        this.elements.myProfileIcon().should('be.visible', { timeout: 10000 }).click({ force: true });
        cy.wait(1000)
        this.elements.myProfileIcon().click({ force: true });
    
    };

}
export default loggedInHomePage