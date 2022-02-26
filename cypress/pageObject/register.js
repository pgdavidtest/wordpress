///<reference types ="cypress"/>
import homePage from "./home";
const myhomePage = new homePage();

class registerPage {

    //Page Objects
    elements = {

    
        emailTxtBox: () => cy.get('#email'),
        usernameTxtBox: () => cy.get('#username'),
        passwordTxtBox: () => cy.get('#password'),
        createAccTxtBox: () => cy.get('[type="submit"'),

    }

    //============================ Page method =====================

    //Method to register
    registerUser(email, username, password) {
        myhomePage.elements.getStartedBtn().click();
        this.elements.emailTxtBox().type(email);
        this.elements.usernameTxtBox().type(username);
        this.elements.passwordTxtBox().type(password);
        this.elements.createAccTxtBox().click();
    }

}
export default registerPage