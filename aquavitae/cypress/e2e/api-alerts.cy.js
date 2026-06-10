/**
 * Pruebas E2E para la pantalla de Alertas de API.
 *
 * Estrategia:
 *  - Se simula una sesión activa de Administrador mediante localStorage.
 *  - No se depende de Firebase porque el login ya se prueba en login.cy.js.
 *  - Se fuerza la pantalla api-alerts únicamente durante Cypress.
 *  - Se interceptan los endpoints reales del backend relacionados con APIs.
 *  - Se valida renderizado, métricas, tabla de alertas y actualización manual.
 */

describe('Alertas de API — E2E', () => {
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

    cy.intercept('GET', '**/admin/apis/status', {
      statusCode: 200,
      body: [
        {
          nombreApi: 'Open-Meteo',
          endpoint: '/v1/forecast',
          estado: 'OK',
          ultimoCodigo: 200,
          erroresActivos: 0,
        },
        {
          nombreApi: 'SMN',
          endpoint: '/pronostico',
          estado: 'ERROR',
          ultimoCodigo: 404,
          erroresActivos: 2,
        },
      ],
    }).as('apiStatus');

    cy.intercept('GET', '**/admin/apis/alerts', {
      statusCode: 200,
      body: [
        {
          nombreApi: 'SMN',
          endpoint: '/pronostico',
          codigoError: 404,
          mensaje: 'Endpoint no encontrado',
          severidad: 'Alta',
        },
        {
          nombreApi: 'NASA POWER',
          endpoint: '/api/temporal/daily/point',
          codigoError: 401,
          mensaje: 'No autorizado',
          severidad: 'Critica',
        },
      ],
    }).as('apiAlerts');

    cy.intercept('POST', '**/admin/apis/check', {
      statusCode: 200,
      body: {},
    }).as('apiCheck');

    cy.visit('/', {
      onBeforeLoad(win) {
        // Asegura que App.js detecte que está corriendo con Cypress.
        if (!win.Cypress) {
          win.Cypress = {};
        }

        win.localStorage.setItem('aquavitae_token', 'fake-cypress-token');
        win.localStorage.setItem('aquavitae_user', JSON.stringify(adminUser));
        win.localStorage.setItem('aquavitae_e2e_page', 'api-alerts');
      },
    });
  });

  it('muestra monitoreo, métricas, alertas y permite actualizar APIs', () => {
    cy.contains(/Alertas de API|Alertas API/i, { timeout: 10000 }).should('be.visible');

    cy.wait('@apiStatus', { timeout: 10000 });
    cy.wait('@apiAlerts', { timeout: 10000 });

    cy.contains('Monitorea errores de integración').should('be.visible');

    cy.contains('Errores 401').should('be.visible');
    cy.contains('Errores 404').should('be.visible');
    cy.contains('Total de errores').should('be.visible');
    cy.contains('APIs afectadas').should('be.visible');

    cy.contains('Open-Meteo').should('be.visible');
    cy.contains('SMN').should('be.visible');
    cy.contains('/v1/forecast').should('be.visible');
    cy.contains('/pronostico').should('be.visible');

    cy.contains('Alertas recientes').should('be.visible');
    cy.contains('Endpoint no encontrado').should('be.visible');
    cy.contains('No autorizado').should('be.visible');
    cy.contains('Alta').should('be.visible');
    cy.contains('Critica').should('be.visible');

    cy.contains('button', 'Actualizar APIs').click();

    cy.wait('@apiCheck', { timeout: 10000 });
  });
});