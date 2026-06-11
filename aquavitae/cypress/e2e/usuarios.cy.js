// SCRUM-277/278/279 · Pruebas E2E de Gestión de Usuarios (Administrador).
// Estilo del equipo: bypass de login por localStorage (window.Cypress en App.js)
// y APIs mockeadas con fixtures. Sin backend ni Firebase reales.

const MOCK_ADMIN_USER = {
  id: 99,
  nombre: 'Admin',
  apellido: 'Prueba',
  email: 'admin@aquavitae.test',
  rol: 'Administrador',
};

function visitarGestionUsuarios() {
  cy.intercept('GET', '**/api/usuarios/resumen', {
    fixture: 'usuarios/resumen.json',
  }).as('getResumen');

  cy.intercept('GET', '**/api/usuarios/roles', {
    fixture: 'usuarios/roles.json',
  }).as('getRoles');

  cy.intercept('GET', '**/api/usuarios/empresas', {
    fixture: 'usuarios/empresas.json',
  }).as('getEmpresas');

  // El listado de usuarios (cuidado: el patrón no debe tragarse /resumen, /roles, /empresas)
  cy.intercept('GET', '**/api/usuarios?*', {
    fixture: 'usuarios/usuarios.json',
  }).as('getUsuarios');

  cy.visit('/', {
    onBeforeLoad(win) {
      win.localStorage.setItem('aquavitae_user', JSON.stringify(MOCK_ADMIN_USER));
      win.localStorage.setItem('aquavitae_token', 'cypress-test-token');
      win.localStorage.setItem('aquavitae_e2e_page', 'gestion-usuarios');
    },
  });

  cy.wait('@getUsuarios');
}

describe('SCRUM-277 · E2E Gestión de Usuarios', () => {
  beforeEach(visitarGestionUsuarios);

  it('muestra la pantalla de gestión de usuarios', () => {
    cy.contains('Usuarios y roles').should('be.visible');
  });

  it('lista los usuarios mockeados en la tabla', () => {
    cy.contains('Juan Pérez').should('be.visible');
    cy.contains('Ana López').should('be.visible');
  });

  it('permite buscar un usuario', () => {
    cy.get('input[placeholder*="Buscar usuario"]').type('Ana');
    cy.contains('Ana López').should('be.visible');
    cy.contains('Juan Pérez').should('not.exist');
  });

  it('ofrece el botón de agregar usuario', () => {
    cy.contains('button', 'Agregar usuario').should('be.visible');
  });
});

describe('SCRUM-278 · E2E Modificar Usuarios', () => {
  beforeEach(visitarGestionUsuarios);

  it('abre el modal de edición desde la tabla', () => {
    cy.get('button[title="Editar"]').first().click();
    cy.contains('Editar usuario').should('be.visible');
  });

  it('el modal de edición precarga el correo del usuario', () => {
    cy.get('button[title="Editar"]').first().click();
    cy.contains('Editar usuario').should('be.visible');
    cy.get('input[type="email"]').first().invoke('val').should('not.be.empty');
  });
});

describe('SCRUM-279 · E2E Definición de Roles', () => {
  beforeEach(visitarGestionUsuarios);

  it('abre el modal de alta de usuario', () => {
    cy.contains('button', 'Agregar usuario').click();
    cy.contains('Agregar usuario').should('be.visible');
  });

  it('el selector de rol ofrece los roles definidos', () => {
    cy.contains('button', 'Agregar usuario').click();
    cy.contains('option', 'Seleccionar rol')
      .parent('select')
      .find('option')
      .its('length')
      .should('be.greaterThan', 1);
  });
});
