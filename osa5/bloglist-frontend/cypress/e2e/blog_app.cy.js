describe('Blog ', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)

    const user = {
      name: 'Test User',
      username: 'test user',
      password: 'secret'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
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
     cy.login({username: 'test user', password: 'secret'})
    })
  
    it('a new blog can be created', function() {
      cy.contains('Add blog').click()
      cy.get('.title').type('a new blog')
      cy.get('.author').type('blogger')
      cy.get('.url').type('www.blog.fi')
      cy.contains('create').click()

      cy.get('.success')
      .should('contain', 'You added a new blog: a new blog by blogger')
      .and('have.css', 'color', 'rgb(0, 128, 0)')
      cy.contains('a new blog - blogger')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Another blog post',
          author: 'Big Blogger',
          url: 'www.com'
        })
      })

      it.only('a blog can be liked', function() {
        cy.contains('view').click()
        cy.contains('like').click()
        
        cy. get('.blogInfo')
          .should('contain', 1)
          .and('not.contain', 0)
        
      })
  })
})

})