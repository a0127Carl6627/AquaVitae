// Comando para iniciar sesión como Director sin pasar por Firebase.
// Requiere que App.js detecte window.Cypress y lea localStorage directamente.
Cypress.Commands.add('loginAsDirector', (overrides = {}) => {
  const user = {
    id: 1,
    nombre: 'Director',
    apellido: 'Prueba',
    email: 'director@aquavitae.test',
    rol: 'Director',
    ...overrides,
  };

  cy.window().then((win) => {
    win.localStorage.setItem('aquavitae_user', JSON.stringify(user));
    win.localStorage.setItem('aquavitae_token', 'cypress-test-token');
  });
});
