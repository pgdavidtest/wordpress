///<reference types = "cypress"/>
import myProfilePage from "../../pageObject/myProfile";
import loginPage from "../../pageObject/login";
import loggedInHomePage from "../../pageObject/loggedInHome";
const myTestProfilePage = new myProfilePage();
const myLoginPage = new loginPage();
const myLoggedInHomePage = new loggedInHomePage


describe('Validate MyProfilePage', function () {
    before(function () {
        myTestProfilePage.generateTestData();
    })

    this.beforeEach(function () {
        cy.readFile('cypress/fixtures/userData.json').then(function (user) {
            this.username = user.username;
            this.password = user.password;
            this.firstname = user.firstname;
            this.lastname = user.lastname;
            this.displayname = user.displayname;
            this.aboutme = user.aboutme;
            this.url = user.url;
            this.urldescription = user.urldescription;
            cy.visit('https://wordpress.com')

        });
    });

   it('Sign In And Navigates to my profile', function () {
        myLoginPage.signIn(this.username, this.password);
        myLoggedInHomePage.goToMyProfile();
        expect(cy.url().should('include', '/me'))
    })

    it('Update Profile Details', function () {
        myLoginPage.signIn(this.username, this.password);
        myLoggedInHomePage.goToMyProfile();
        myTestProfilePage.enterProfileDetails(this.firstname, this.lastname, this.displayname, this.aboutme);
        expect(myTestProfilePage.elements.firstNameTxtBx().should('be.visible').should('have.value', this.firstname));
        expect(myTestProfilePage.elements.lastNameTxtBx().should('be.visible').should('have.value', this.lastname));
        expect(myTestProfilePage.elements.displayNameTxtBx().should('be.visible').should('have.value', this.displayname));
        expect(myTestProfilePage.elements.aboutMeTxtBx().should('be.visible').should('have.value', this.aboutme));
        expect(myTestProfilePage.elements.toggleBtn().should('be.checked'));
        expect(myTestProfilePage.elements.userDisplayName().should('be.visible').should('have.text', this.displayname));
        expect(myTestProfilePage.elements.userDisplayNameSec().should('be.visible').should('have.text', `@${this.username}`));
    }); 

    it('It Validates Attempt To Add Word Press Site Profile Link',function () {
        myLoginPage.signIn(this.username, this.password);
        myLoggedInHomePage.goToMyProfile();
        expect(myTestProfilePage.elements.profileLnkTxt().should('be.visible').should('have.text', `You have no sites in your profile links. You may add sites if you'd like.`));
        myTestProfilePage.chkWPProfileLink()
        myTestProfilePage.elements.addWdSiteTxt().should('have.text', 'You have no public sites on WordPress.com yet, but if you like you can create one now. You may also add self-hosted WordPress sites here after installing Jetpack on them.');
        myTestProfilePage.elements.createWdSiteBtn().should('exist');
        myTestProfilePage.elements.cancelWPBtn().should('exist');
        myTestProfilePage.elements.cancelWPBtn().click();
        expect(myTestProfilePage.elements.profileLnkTxt().should('be.visible').should('have.text', `You have no sites in your profile links. You may add sites if you'd like.`));
    }); 

    it('Validates Adding URL Profile Link', function () {
        myLoginPage.signIn(this.username, this.password);
        myLoggedInHomePage.goToMyProfile();
        myTestProfilePage.addURLProfileLink(this.url, this.urldescription);
        myTestProfilePage.elements.cancelURLBtn().click({ timeout: 2000 });
        myTestProfilePage.addURLProfileLink(this.url, this.urldescription);
        myTestProfilePage.elements.addSiteBtn().click();
       const dom = myTestProfilePage.getDomain(this.url)
       expect(cy.get('.profile-link__url').should('have.text', dom))
       expect(cy.get('.profile-link__title').should('have.text', this.urldescription));
    }); 

    it('Validate URL Profile Link Deletion', function () {
        myLoginPage.signIn(this.username, this.password);
        myLoggedInHomePage.goToMyProfile();
        myTestProfilePage.deleteAllURLProfileLink();
        expect(myTestProfilePage.elements.profileLnkTxt().should('be.visible').should('have.text', `You have no sites in your profile links. You may add sites if you'd like.`));
    }) 

    it('test file upload', function () {
        console.log('THIS IS OUT OF SCOPE AS THE SITE USES 3RD PARTY APPLICATION FOR UPLOADING PROFILE PICTURE')
       /*  myLoginPage.signIn(this.username, this.password);
        myLoggedInHomePage.goToMyProfile();
        const filePath = '../../cypress/fixtures/DayCare-02.jpg';
        cy.get('.animate__appear > .gravatar').click()
        cy.get('.animate__appear > .gravatar').attachFile(filePath);
        cy.get('[data-e2e-button="done"]').click({force: true}) */
    })

    


})