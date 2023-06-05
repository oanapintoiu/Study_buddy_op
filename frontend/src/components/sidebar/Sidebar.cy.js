import Sidebar from "./Sidebar";
const navigate = () => {};

describe('Sidebar component', () => {
  it('should render correctly', () => {
    cy.mount(<Sidebar navigate={navigate} />);
    
    cy.get('.sidebar').should('be.visible');
    cy.get('.dropdown').should('be.visible');
    cy.get('.study-groups').should('be.visible');
    cy.get('.group-title').should('be.visible');
  });

  it('should have a home button', () => {
    cy.mount(<Sidebar navigate={navigate} />);
    cy.get('.side-bar-item').contains('Home');
  });
  it('should have a profile button', () => {
    cy.mount(<Sidebar navigate={navigate} />);
    cy.get('.side-bar-item').contains('Profile');
  });
  it('should have a tools button dropping', () => {
    cy.mount(<Sidebar navigate={navigate} />);
    cy.get('.dropdown').contains('Tools');
    
  });
  it('should have a study groups button', () => {
    cy.mount(<Sidebar navigate={navigate} />);
    cy.get('.group-title').contains('Study Groups');
  })
  it('should have a logout button', () => {
    cy.mount(<Sidebar navigate={navigate} />);
    cy.get('.side-bar-item').contains('Logout');
  });
});
