import Sidebar from "./Sidebar";

describe('Sidebar component', () => {
  // beforeEach(() => {
  //   cy.window().then((win) => {
  //     win.localStorage.setItem('token', 'fakeToken');
  //   });
  //   cy.visit('/posts'); // visit the route where Sidebar component is rendered
  // });

  it('should render correctly', () => {
    cy.mount(<Sidebar />);
    
    cy.get('.sidebar').should('be.visible');
    cy.get('.dropdown').should('be.visible');
    cy.get('.study-groups').should('be.visible');
  });

  it('should go to Home page when Home button is clicked', () => {
    window.localStorage('token', 'fakeToken')
    cy.visit('/posts');
    cy.get('.side-bar-item').contains('Home').click();
    cy.url("/posts").should('include', '/posts'); 
  });

  // it('should go to Profile page when Profile button is clicked', () => {
  //   cy.get('.side-bar-item').contains('Profile').click();
  //   cy.url().should('include', '/profile'); // replace with the expected url when Profile is clicked
  // });

  // it('should logout when Logout button is clicked', () => {
  //   cy.get('.side-bar-item').contains('Logout').click();
  //   // replace with the expected behaviour when Logout is clicked, for example you may want to assert that certain elements are not visible anymore
  // });


});
