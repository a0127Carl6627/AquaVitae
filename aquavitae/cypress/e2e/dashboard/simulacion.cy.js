// SCRUM-273 · Pruebas E2E del Dashboard de Simulación.
// Mismo estilo que el equipo: se mockea Firebase inyectando el usuario en
// localStorage (bypass window.Cypress en App.js) y se mockean las APIs con
// fixtures. No requiere backend ni Firebase reales.

const MOCK_DIRECTOR_USER = {
  id: 1,
  nombre: 'Director',
  apellido: 'Prueba',
  email: 'director@aquavitae.test',
  rol: 'Director',
};

describe('Dashboard Simulación – Simulación y recuperación hídrica', () => {
  beforeEach(() => {
    // Mockear las APIs que consume la pantalla de simulación
    cy.intercept('GET', '**/api/dashboard', {
      fixture: 'dashboard/dashboard.json',
    }).as('getDashboard');

    // La pantalla de simulación toma KPIs y proyección de las predicciones ARIMA
    cy.intercept('GET', '**/api/predicciones/kpis**', {
      fixture: 'simulacion/kpis.json',
    }).as('getKpis');

    cy.intercept('GET', '**/api/predicciones/proyeccion**', {
      fixture: 'simulacion/proyeccion.json',
    }).as('getProyeccion');

    cy.intercept('GET', '**/api/simulacion/recuperacion**', {
      fixture: 'simulacion/recuperacion.json',
    }).as('getRecuperacion');

    // Visitar inyectando el usuario Director y forzando la pantalla de simulación
    // (la navegación es por estado; App.js lee aquavitae_e2e_page bajo Cypress)
    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('aquavitae_user', JSON.stringify(MOCK_DIRECTOR_USER));
        win.localStorage.setItem('aquavitae_token', 'cypress-test-token');
        win.localStorage.setItem('aquavitae_e2e_page', 'simulacion');
      },
    });

    cy.wait('@getDashboard');
  });

  describe('Flujo 1: Carga y estructura', () => {
    it('muestra el título de la pantalla de simulación', () => {
      cy.contains('Simulación y recuperación hídrica').should('be.visible');
    });

    it('muestra el selector de planta', () => {
      cy.contains('PLANTA:').should('be.visible');
      cy.get('select').should('exist');
    });
  });

  describe('Flujo 2: KPIs de simulación', () => {
    it('muestra las tarjetas de KPIs con los datos mockeados', () => {
      cy.wait('@getKpis');
      cy.contains('Índice hídrico actual').should('be.visible');
      cy.contains('Días hasta umbral crítico').should('be.visible');
      cy.contains('Probabilidad evento crítico').should('be.visible');
      cy.contains('Pérdida económica proyectada').should('be.visible');
    });
  });

  describe('Flujo 3: Cambio de planta', () => {
    it('permite seleccionar otra planta en el selector', () => {
      cy.get('select').find('option').then(($opts) => {
        if ($opts.length > 1) {
          cy.get('select').select($opts.eq(1).val());
          cy.get('select').should('have.value', $opts.eq(1).val());
        }
      });
    });
  });
});
