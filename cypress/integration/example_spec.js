describe('Game Night', function() {
  it('works', function() {
    cy.visit('/')
    cy.get('h1').should('have.text', 'Game Night')
    cy.get('h2').should('have.text', 'Games')
    cy.get('option').should('have.length', 5)

    const formFields = [
      'input[name=game]',
      'input[name=number]',
      'input[name=time]',
      'input[name=complexity]',
      'input[name=category]'
    ]

    formFields.forEach(formField => {
      cy.get(formField).should('be.empty')
    })

    cy.get('input[name=game]').type('game')
    cy.get('input[name=number]').type('2')
    cy.get('input[name=time]').type('60')
    cy.get('input[name=complexity]').type('2/5')
    cy.get('input[name=category]').type('hard')

    formFields.forEach(formField => {
      cy.get(formField).should('be.empty')
    })

    // cy.get('input[type=submit]').click()
  })
})
