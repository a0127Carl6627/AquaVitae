/**
 * Pruebas E2E para la pantalla de Auditoría.
 *
 * Estrategia:
 *  - Se simula una sesión activa de Administrador mediante localStorage.
 *  - No se depende de Firebase porque el login ya se prueba en login.cy.js.
 *  - Se fuerza la pantalla auditoria únicamente durante Cypress.
 *  - Se interceptan los endpoints reales del backend relacionados con auditoría.
 *  - Se valida renderizado, KPIs, tabla y detalle.
 */

describe('Auditoría — E2E', () => {
  const adminUser = {
    uid: 'firebase-uid-123',
    email: 'admin@aquavitae.com',
    nombre: 'Carlos',
    apellido: 'Olivarez',
    rol: 'Administrador',
    permisos: ['USUARIOS', 'APIS', 'AUDITORIA'],
  };

  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();

    cy.intercept('GET', '**/admin/auditoria/resumen', {
      statusCode: 200,
      body: {
        eventosHoy: 18,
        cambiosCriticos: 4,
        usuariosAuditados: 7,
        registrosInmutables: 60,
      },
    }).as('auditoriaResumen');

    cy.intercept('GET', '**/admin/auditoria/logs/101', {
      statusCode: 200,
      body: {
        id: 101,
        idUsuario: 'firebase-uid-123',
        usuario: 'Carlos Olivarez',
        accion: 'LOGIN',
        modulo: 'AUTH',
        entidad: 'Usuario',
        descripcion: 'Detalle completo: inicio de sesión validado por Firebase',
        ip: '127.0.0.1',
        severidad: 'Media',
        valorAnterior: null,
        valorNuevo: 'Sesión iniciada',
        fecha: '2026-05-29T10:00:00',
      },
    }).as('auditoriaDetail');

    cy.intercept('GET', '**/admin/auditoria/logs?*', {
      statusCode: 200,
      body: [
        {
          id: 101,
          idUsuario: 'firebase-uid-123',
          usuario: 'Carlos Olivarez',
          accion: 'LOGIN',
          modulo: 'AUTH',
          entidad: 'Usuario',
          descripcion: 'Inicio de sesión exitoso',
          ip: '127.0.0.1',
          severidad: 'Media',
          valorAnterior: null,
          valorNuevo: 'Sesión iniciada',
          fecha: '2026-05-29T10:00:00',
        },
        {
          id: 102,
          idUsuario: 'admin-uid',
          usuario: 'Admin',
          accion: 'ROTATE_KEY',
          modulo: 'APIS',
          entidad: 'ApiKey',
          descripcion: 'Rotación de llave externa',
          ip: '127.0.0.2',
          severidad: 'Alta',
          valorAnterior: 'key-antigua',
          valorNuevo: 'key-nueva',
          fecha: '2026-05-29T11:00:00',
        },
      ],
    }).as('auditoriaLogs');

    cy.visit('/', {
      onBeforeLoad(win) {
        if (!win.Cypress) {
          win.Cypress = {};
        }

        win.localStorage.setItem('aquavitae_token', 'fake-cypress-token');
        win.localStorage.setItem('aquavitae_user', JSON.stringify(adminUser));
        win.localStorage.setItem('aquavitae_e2e_page', 'auditoria');
      },
    });
  });

  it('muestra KPIs, logs y detalle de auditoría', () => {
    cy.contains('Auditoría', { timeout: 10000 }).should('be.visible');
    cy.contains('Monitoreo y trazabilidad de eventos del sistema').should('be.visible');

    cy.wait('@auditoriaResumen', { timeout: 10000 });
    cy.wait('@auditoriaLogs', { timeout: 10000 });

    cy.contains('60').should('be.visible');
    cy.contains('7').should('be.visible');
    cy.contains('18').should('be.visible');
    cy.contains('4').should('be.visible');

    cy.contains('LOGIN').should('be.visible');
    cy.contains('AUTH').should('be.visible');
    cy.contains('Usuario').should('be.visible');
    cy.contains('Media').should('be.visible');
    cy.contains('127.0.0.1').should('be.visible');

    cy.contains('ROTATE_KEY').should('be.visible');
    cy.contains('APIS').should('be.visible');
    cy.contains('ApiKey').should('be.visible');
    cy.contains('Alta').should('be.visible');
    cy.contains('127.0.0.2').should('be.visible');

    cy.contains('LOGIN').click({ force: true });

    cy.wait('@auditoriaDetail', { timeout: 10000 });

    cy.contains('Detalle completo: inicio de sesión validado por Firebase').should(
      'be.visible'
    );
  });
});