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

  it('login form is shown', function() {
    cy.contains('Log in to application')

    cy.get('#username')
    cy.get('#password')
  })

  describe('Login', function () {
    it('user can be logged in', function() {
      cy.get('#username').type('test user')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()

      cy.contains('Test User logged in')
    })

    it('login fails with wrong password', function() {

      cy.get('#username').type('test user')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)' )

      cy.contains('Test User logged in').should('not.exist')
    })

    it('login fails with wrong username', function() {

      cy.get('#username').type('wrong user')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)' )

      cy.contains('Test User logged in').should('not.exist')
    })


  })
  describe('when logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('test user')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()
    })
  })

})