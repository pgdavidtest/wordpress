///<reference types ="cypress"/>
import homePage from "./home";
const myhomePage = new homePage();

class loginPage {

    //Page Objects
    elements = {

    
        usernameTxtBox: () => cy.get('#usernameOrEmail'),
        continueBtn: () => cy.get('[type="submit"]'),
        passwordTxtBox: () => cy.get('#password'),
        loginBtn: () => cy.get('[type="submit"]'),
    };

    //============================ Page Methods =====================

    //Method to Sign in
    signIn(username, password) {
        myhomePage.clickLogin();
        this.elements.usernameTxtBox().type(username);
        this.elements.continueBtn().click()
        this.elements.passwordTxtBox().type(password)
        this.elements.loginBtn().click();
    }
}
export default loginPage