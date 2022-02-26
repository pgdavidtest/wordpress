///<reference types = "cypress"/>
import loginPage from "./login";


class myProfilePage {
    
    //Page Elements
    elements = {
        myProfileIcon: () => cy.get('.gravatar'),
        //myProfileSideBarBtn: () => cy.get('[data-e2e-sidebar="My Profile"]'),
        sideImage: () => cy.get('[alt="My Profile]'),
        pageTitle: () => cy.get('.formatted-header__title.wp-brand-font'),
        userDisplayName: () => cy.get('.profile-gravatar__user-display-name'),
        userDisplayNameSec: () => cy.get('.profile-gravatar__user-secondary-info'),
        logOut: () => cy.get('.button.sidebar__me-signout-button.is-compact'),
        gravatarUnverifiied: () => cy.get('.edit-gravatar.is-unverified > div').find('div').first(),
        firstNameTxtBx: () => cy.get('#first_name'),
        lastNameTxtBx: () => cy.get('#last_name'),
        displayNameTxtBx: () => cy.get('#display_name'),
        aboutMeTxtBx: () => cy.get('#description'),
        toggleBtn: () => cy.get('#inspector-toggle-control-0'),
        submitBtn: () => cy.get('[type="submit"]'),
        addBtn: () => cy.get('.gridicon.gridicons-add-outline'),
        profileLnkTxt: () => cy.get('.profile-links__no-links'),
        addWPSite: () => cy.contains('Add WordPress Site'),
        addURL: () => cy.contains('Add URL'),
        addWdSiteTxt: () => cy.get('div > div > form > p').first(),
        createWdSiteBtn: () => cy.get('.button.form-button.is-primary'),
        cancelWPBtn: () => cy.get('.button.profile-links-add-wordpress__cancel.form-button'),
        URLTxtBx: () => cy.get('[name="value"]'),
        URLDescTxtBx: () => cy.get('[name="title"]'),
        addSiteBtn: () => cy.get('.button.profile-links-add-other__add.form-button.is-primary'),
        cancelURLBtn: () => cy.contains('Cancel'),
    }
    // ==================================== Page Methods =======================================

    //Method to Generate TestData
    generateTestData() {
        var firstName = cy.faker.name.firstName();
        cy.readAndWriteFile('cypress/fixtures/userData.json', 'firstname', firstName);
        var lastName = cy.faker.name.lastName();
        cy.readAndWriteFile('cypress/fixtures/userData.json', 'lastname', lastName);
        var displayName = cy.faker.internet.userName();
        cy.readAndWriteFile('cypress/fixtures/userData.json', 'displayname', displayName);
        var aboutMe = cy.faker.lorem.sentence();
        cy.readAndWriteFile('cypress/fixtures/userData.json', 'aboutme', aboutMe);
        var URL = cy.faker.internet.url();
        cy.readAndWriteFile('cypress/fixtures/userData.json', 'url', URL);
        var urlDescription = cy.faker.internet.domainWord();
        cy.readAndWriteFile('cypress/fixtures/userData.json', 'urldescription', urlDescription);
    
    };

   

    //Method To Enter Profile Details
    enterProfileDetails(firstname, lastname, displayname, aboutme,) {
        this.elements.firstNameTxtBx().should('be.visible').clear()
        this.elements.firstNameTxtBx().should('be.visible').type(firstname);
        this.elements.lastNameTxtBx().should('be.visible').clear()
        this.elements.lastNameTxtBx().should('be.visible').type(lastname);
        this.elements.displayNameTxtBx().should('be.visible').clear()
        this.elements.displayNameTxtBx().should('be.visible').type(displayname);
        this.elements.aboutMeTxtBx().should('be.visible').clear()
        this.elements.aboutMeTxtBx().should('be.visible').type(aboutme);
        this.elements.toggleBtn().check();
        this.elements.submitBtn().click()
    };

    //Method To Attempt Adding WordPress Profile Link
    chkWPProfileLink() {
        this.elements.addBtn().click()
        this.elements.addWPSite().click()
    };

    //Method To Add URL Profile Link
    addURLProfileLink(url, desc) {
        this.elements.addBtn().click();
        this.elements.addURL().click();
        this.elements.URLTxtBx().type(url)
        this.elements.URLDescTxtBx().type(desc)

    }

    getDomain(url) {
        var myurl = url;
        if (url.includes('http://')) {
        myurl = url.replace('http://', '')
        } else if (url.includes('https://')) {
        myurl = url.replace('https://', '')
        }
        return myurl
    }

    //Method To Delete All URL Profile Link
    deleteAllURLProfileLink() {
        cy.get(".card")
          .find('.button.profile-link__remove.is-borderless', { timeout: 10000 })
            
          .should("be.visible")
          .each(function ($el, index, $list) {
            let tele = $el;
            for (const ele of tele) {
              cy.get('.button.profile-link__remove.is-borderless')
                .first()
                .should("be.visible")
                .click();
            }
          });
      }



    
    


}
export default myProfilePage