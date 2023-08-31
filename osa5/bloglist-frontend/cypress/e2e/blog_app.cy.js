describe('Blog ', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    
    const user = {
      name: 'Test User',
      username: 'test user',
      password: 'secret'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.visit('http://localhost:5173')
  })
  
  it('front page can be opened', function() {
    cy.contains('Log in to application')
  })

  it('login form can be opened', function() {
    cy.get('#username').type('test user')
    cy.get('#password').type('secret')
    cy.get('#login-button').click()

    cy.contains('Test User logged in')
  })


})