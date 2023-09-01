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
      cy.login({ username: 'test user', password: 'secret' })
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
          title: 'Blog post',
          author: 'Big Blogger',
          url: 'www.com'
        })
      })

      it('a blog can be liked', function() {
        cy.contains('view').click()
        cy.contains('like').click()

        cy. get('.blogInfo')
          .should('contain', 1)
          .and('not.contain', 0)

      })

      it('a blog can be deleted by the user who added it', function() {
        cy.contains('view').click()
        cy.contains('remove').click()

        cy.contains('a new blog - blogger').should('not.exist')
      })

      it('remove button can only be seen by the user who has added the blog', function() {
        cy.contains('logout').click()

        const user = {
          name: 'Another Test User',
          username: 'another test user',
          password: 'topsecret'
        }
        cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
        cy.visit('')

        cy.get('#username').type('another test user')
        cy.get('#password').type('topsecret')
        cy.get('#login-button').click()
        
        cy.contains('view').click()
        cy.contains('remove').should('not.exist')

      })

      it.only('the blogs are shown in order according to the amount of likes', function() {
        cy.createBlog({
          title: 'More popular blog post',
          author: 'Blogger Star',
          url: 'www.bestblog.com', 
          likes: 3
        })

        cy.createBlog({
          title:  'The most popular blog post',
          author: 'John Blogston',
          url: 'www.blog.com', 
          likes: 5
        })

        cy.get('.blog').eq(0).should('contain', 'The most popular blog post')
        cy.get('.blog').eq(1).should('contain', 'More popular blog post')
        cy.get('.blog').eq(2).should('contain', 'Blog post')
        
        cy.get('.blog')
          .eq(1)
          .contains('view')
          .click()
        
          cy.get('.blog')
          .eq(1)
          .contains('like')
          .click()
          .click()
          .click()

          cy.get('.blog').eq(0).should('contain', 'More popular blog')
          cy.get('.blog').eq(1).should('contain', 'The most popular blog post')

        
      

      })
    })
  })

})