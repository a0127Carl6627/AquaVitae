/**
 * Pruebas E2E para Login.
 *
 * Estrategia:
 *  - Se abre la aplicación completa en navegador.
 *  - Se mockean las llamadas de Firebase necesarias para evitar usar credenciales reales.
 *  - Se mockea /auth/me para simular la respuesta del backend.
 *  - El login exitoso se deja al final para evitar que Firebase deje sesión persistida
 *    y afecte los demás casos de prueba.
 */

describe('Login — E2E', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();

    cy.intercept(
      'POST',
      '**/identitytoolkit.googleapis.com/v1/accounts:signInWithPassword*',
      {
        statusCode: 200,
        body: {
          kind: 'identitytoolkit#VerifyPasswordResponse',
          localId: 'firebase-uid-123',
          email: 'admin@aquavitae.com',
          displayName: 'Carlos Olivarez',
          idToken: 'fake-firebase-token',
          registered: true,
          refreshToken: 'fake-refresh-token',
          expiresIn: '3600',
        },
      }
    ).as('firebaseLogin');

    cy.intercept(
      'POST',
      '**/securetoken.googleapis.com/v1/token*',
      {
        statusCode: 200,
        body: {
          access_token: 'fake-firebase-token',
          expires_in: '3600',
          token_type: 'Bearer',
          refresh_token: 'fake-refresh-token',
          id_token: 'fake-firebase-token',
          user_id: 'firebase-uid-123',
          project_id: 'aquavitae-test',
        },
      }
    ).as('firebaseToken');

    cy.intercept(
      'POST',
      '**/identitytoolkit.googleapis.com/v1/accounts:lookup*',
      {
        statusCode: 200,
        body: {
          users: [
            {
              localId: 'firebase-uid-123',
              email: 'admin@aquavitae.com',
              emailVerified: true,
              displayName: 'Carlos Olivarez',
              validSince: '1700000000',
              disabled: false,
              lastLoginAt: '1700000000000',
              createdAt: '1700000000000',
            },
          ],
        },
      }
    ).as('firebaseLookup');

    cy.intercept('GET', '**/auth/me*', {
      statusCode: 200,
      body: {
        uid: 'firebase-uid-123',
        email: 'admin@aquavitae.com',
        nombre: 'Carlos',
        apellido: 'Olivarez',
        rol: 'Administrador',
        permisos: ['USUARIOS', 'APIS', 'AUDITORIA'],
      },
    }).as('authMe');
  });

  it('muestra la pantalla de login', () => {
    cy.visit('/');

    cy.contains('AquaVitae').should('be.visible');
    cy.contains('Inicio de sesión').should('be.visible');
    cy.get('input[placeholder="correo@empresa.com"]').should('be.visible');
    cy.get('input[placeholder="••••••••"]').should('be.visible');
    cy.contains('button', 'Iniciar sesión').should('be.visible');
  });

  it('permite escribir correo y contraseña', () => {
    cy.visit('/');

    cy.get('input[placeholder="correo@empresa.com"]')
      .type('admin@aquavitae.com')
      .should('have.value', 'admin@aquavitae.com');

    cy.get('input[placeholder="••••••••"]')
      .type('Password123')
      .should('have.value', 'Password123');
  });

  it('permite mostrar y ocultar contraseña', () => {
    cy.visit('/');

    cy.get('input[placeholder="••••••••"]').should('have.attr', 'type', 'password');

    cy.contains('button', 'Ver').click();

    cy.get('input[placeholder="••••••••"]').should('have.attr', 'type', 'text');

    cy.contains('button', 'Ocultar').click();

    cy.get('input[placeholder="••••••••"]').should('have.attr', 'type', 'password');
  });

  it('muestra validación cuando se intenta iniciar sesión sin correo', () => {
    cy.visit('/');

    cy.contains('button', 'Iniciar sesión').click();

    cy.contains('Ingresa tu correo electrónico').should('be.visible');

    cy.window().then((win) => {
      expect(win.localStorage.getItem('aquavitae_token')).to.be.null;
      expect(win.localStorage.getItem('aquavitae_user')).to.be.null;
    });
  });

  it('inicia sesión correctamente como administrador', () => {
    cy.visit('/');

    cy.get('input[placeholder="correo@empresa.com"]').type('admin@aquavitae.com');
    cy.get('input[placeholder="••••••••"]').type('Password123');

    cy.contains('button', 'Iniciar sesión').click();

    cy.wait('@firebaseLogin');
    cy.wait('@authMe', { timeout: 10000 });

    cy.window().then((win) => {
      expect(win.localStorage.getItem('aquavitae_token')).to.eq('fake-firebase-token');
      expect(win.localStorage.getItem('aquavitae_user')).to.contain('Administrador');
    });
  });
});