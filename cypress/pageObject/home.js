///<reference types ="cypress"/>

class homePage {

    //Page Objects
    elements = {

    
        loginBtn: () => cy.get('[title="Log In"]').contains('Log In'),
        getStartedBtn: () => cy.get('[title="Get Started"]'),
    };

    //========================= Page Methods =================

    //Method to Navigate to login screen
    clickLogin() {
        this.elements.loginBtn().click();
    };

    // Method to Navigate to register screen
    clickGetStarted() {
        this.elements.getStartedBtn().click()
    }

}
export default homePage