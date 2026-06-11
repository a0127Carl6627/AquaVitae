// SCRUM-274 · Pruebas E2E del Dashboard de Alternativas de Ubicación.
// Mismo estilo que el equipo: bypass de login por localStorage (window.Cypress
// en App.js) y APIs mockeadas con fixtures. Sin backend ni Firebase reales.

const MOCK_DIRECTOR_USER = {
  id: 1,
  nombre: 'Director',
  apellido: 'Prueba',
  email: 'director@aquavitae.test',
  rol: 'Director',
};

describe('Dashboard Alternativas – Alternativas de ubicación', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/dashboard', {
      fixture: 'dashboard/dashboard.json',
    }).as('getDashboard');

    // Datos propios de la pantalla de alternativas
    cy.intercept('GET', '**/api/alternativas/alerta**', {
      fixture: 'alternativas/alerta.json',
    }).as('getAlerta');

    cy.intercept('GET', '**/api/alternativas/ubicaciones**', {
      fixture: 'alternativas/ubicaciones.json',
    }).as('getUbicaciones');

    cy.intercept('GET', '**/api/alternativas/factores**', {
      fixture: 'alternativas/factores.json',
    }).as('getFactores');

    // KPIs y proyección vienen de predicciones (reutilizamos fixtures de simulación)
    cy.intercept('GET', '**/api/predicciones/kpis**', {
      fixture: 'simulacion/kpis.json',
    }).as('getKpis');

    cy.intercept('GET', '**/api/predicciones/proyeccion**', {
      fixture: 'simulacion/proyeccion.json',
    }).as('getProyeccion');

    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('aquavitae_user', JSON.stringify(MOCK_DIRECTOR_USER));
        win.localStorage.setItem('aquavitae_token', 'cypress-test-token');
        win.localStorage.setItem('aquavitae_e2e_page', 'alternativas');
      },
    });

    cy.wait('@getDashboard');
  });

  describe('Flujo 1: Carga y estructura', () => {
    it('muestra el título de la pantalla de alternativas', () => {
      cy.contains('Alternativas de ubicación').should('be.visible');
    });

    it('termina de cargar (no se queda en "Cargando datos...")', () => {
      cy.contains('Cargando datos...').should('not.exist');
    });
  });

  describe('Flujo 2: Datos de alternativas mockeados', () => {
    it('muestra la tabla de ubicaciones alternativas', () => {
      cy.wait(['@getAlerta', '@getUbicaciones', '@getFactores']);
      cy.contains('Saltillo').should('be.visible');
    });

    it('muestra los factores de evaluación', () => {
      cy.wait('@getFactores');
      cy.contains('Disponibilidad de agua').should('be.visible');
    });
  });
});
