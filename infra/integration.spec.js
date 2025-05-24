describe('Contact Form Submission', () => {
  it('should successfully submit the contact form', () => {
    cy.visit('/contact');

    cy.get('input[formControlName=name]').type('John Doe');
    cy.get('input[formControlName=email]').type('john.doe@example.com');
    cy.get('textarea[formControlName=message]').type('This is a test message from Cypress.');

    cy.get('button[type=submit]').click();

    // Verify that the success message is displayed
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Message sent successfully!');
    })
  });

  it('should display an error message when a required field is missing', () => {
    cy.visit('/contact');

    cy.get('button[type=submit]').click();

    // Verify that the error message is displayed
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Please fill out all required fields correctly.');
    })
  });
})