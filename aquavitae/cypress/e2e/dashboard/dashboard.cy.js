// Pruebas E2E del Dashboard Inicio (Resumen Ejecutivo Hídrico).
// Cubre 5 flujos principales sin incluir el flujo de autenticación.

const MOCK_DIRECTOR_USER = {
  id: 1,
  nombre: 'Director',
  apellido: 'Prueba',
  email: 'director@aquavitae.test',
  rol: 'Director',
};

describe('Dashboard Inicio – Resumen Ejecutivo Hídrico', () => {
  beforeEach(() => {
    // Interceptar las tres peticiones de datos del dashboard
    cy.intercept('GET', '**/api/dashboard', {
      fixture: 'dashboard/dashboard.json',
    }).as('getDashboard');

    cy.intercept('GET', '**/api/alertas**', {
      fixture: 'dashboard/alertas.json',
    }).as('getAlertas');

    cy.intercept('GET', '**/api/evolucion**', {
      fixture: 'dashboard/evolucion.json',
    }).as('getEvolucion');

    // Visitar la app inyectando el usuario Director en localStorage
    // antes de que React se monte (window.Cypress bypass en App.js)
    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('aquavitae_user', JSON.stringify(MOCK_DIRECTOR_USER));
        win.localStorage.setItem('aquavitae_token', 'cypress-test-token');
      },
    });

    // Esperar a que las tres peticiones de datos se completen
    cy.wait(['@getDashboard', '@getAlertas', '@getEvolucion']);
  });

  // ─────────────────────────────────────────────────────────────
  // FLUJO 1: Carga y estructura general del Dashboard
  // ─────────────────────────────────────────────────────────────
  describe('Flujo 1: Carga y estructura general del Dashboard', () => {
    it('muestra el título y subtítulo del resumen ejecutivo', () => {
      cy.contains('h1', 'Resumen ejecutivo hídrico').should('be.visible');
      cy.contains('Visión general del riesgo hídrico').should('be.visible');
    });

    it('muestra el encabezado con fecha, hora e iniciales del director', () => {
      cy.contains('DR').should('be.visible');
      cy.contains('Última actualización:').should('be.visible');
    });

    it('muestra el botón de actualización de datos habilitado', () => {
      cy.get('button[aria-label="Actualizar datos"]')
        .should('be.visible')
        .and('not.be.disabled');
    });

    it('muestra la barra lateral de navegación con la opción Dashboard activa', () => {
      cy.get('aside').should('be.visible');
      // El ítem activo tiene la clase de color azul
      cy.get('aside button.bg-\\[\\#eaf1fe\\]').should('exist');
    });
  });

  // ─────────────────────────────────────────────────────────────
  // FLUJO 2: Tarjetas de estadísticas del resumen (StatCards)
  // ─────────────────────────────────────────────────────────────
  describe('Flujo 2: Tarjetas de estadísticas del resumen (StatCards)', () => {
    it('muestra las cuatro tarjetas con sus etiquetas correctas', () => {
      cy.contains('Crisis activas').should('be.visible');
      cy.contains('Plantas en riesgo alto').should('be.visible');
      cy.contains('Plantas en riesgo medio').should('be.visible');
      cy.contains('Plantas en riesgo bajo').should('be.visible');
    });

    it('muestra el valor numérico 1 en la tarjeta de plantas en riesgo alto', () => {
      // Mock: resumen.alto = 1
      cy.contains('Plantas en riesgo alto')
        .closest('div.flex.flex-col')
        .contains('span', '1')
        .should('be.visible');
    });

    it('muestra el subtítulo con el total correcto de plantas', () => {
      // Mock: alto=1 + medio=1 + bajo=1 = 3 plantas totales
      cy.contains('De 3 plantas totales').should('be.visible');
    });

    it('muestra las descripciones de estado en cada tarjeta', () => {
      cy.contains('Requieren atención inmediata').should('be.visible');
      cy.contains('Requieren seguimiento').should('be.visible');
      cy.contains('Condiciones normales').should('be.visible');
    });
  });

  // ─────────────────────────────────────────────────────────────
  // FLUJO 3: Lista de plantas y selección interactiva
  // ─────────────────────────────────────────────────────────────
  describe('Flujo 3: Lista de plantas y selección interactiva', () => {
    it('muestra la tabla con todas las plantas del fixture', () => {
      cy.contains('Plantas por nivel de riesgo').should('be.visible');
      cy.contains('td', 'Planta Monterrey Norte').should('be.visible');
      cy.contains('td', 'Planta Guadalajara Sur').should('be.visible');
      cy.contains('td', 'Planta CDMX Centro').should('be.visible');
    });

    it('muestra los encabezados de columna correctos en la tabla', () => {
      cy.contains('th', 'Planta').should('be.visible');
      cy.contains('th', 'Ubicación').should('be.visible');
      cy.contains('th', 'Nivel de riesgo').should('be.visible');
      cy.contains('th', 'Tendencia').should('be.visible');
    });

    it('resalta visualmente la fila al seleccionar una planta', () => {
      cy.contains('tr', 'Planta Monterrey Norte').click();
      cy.contains('tr', 'Planta Monterrey Norte')
        .should('have.class', 'bg-[#eaf1fe]');
    });

    it('cambia la selección al hacer clic en otra planta', () => {
      cy.contains('tr', 'Planta Monterrey Norte').click();
      cy.contains('tr', 'Planta Guadalajara Sur').click();

      cy.contains('tr', 'Planta Guadalajara Sur')
        .should('have.class', 'bg-[#eaf1fe]');
      cy.contains('tr', 'Planta Monterrey Norte')
        .should('not.have.class', 'bg-[#eaf1fe]');
    });
  });

  // ─────────────────────────────────────────────────────────────
  // FLUJO 4: Filtrado y búsqueda de plantas
  // ─────────────────────────────────────────────────────────────
  describe('Flujo 4: Filtrado y búsqueda de plantas', () => {
    it('filtra la tabla para mostrar solo plantas en riesgo ALTO', () => {
      cy.get('select').select('ALTO');

      cy.contains('td', 'Planta Monterrey Norte').should('be.visible');
      cy.contains('td', 'Planta Guadalajara Sur').should('not.exist');
      cy.contains('td', 'Planta CDMX Centro').should('not.exist');
    });

    it('filtra la tabla para mostrar solo plantas en riesgo MEDIO', () => {
      cy.get('select').select('MEDIO');

      cy.contains('td', 'Planta Guadalajara Sur').should('be.visible');
      cy.contains('td', 'Planta Monterrey Norte').should('not.exist');
      cy.contains('td', 'Planta CDMX Centro').should('not.exist');
    });

    it('busca y muestra solo la planta que coincide con el texto ingresado', () => {
      cy.get('input[placeholder="Buscar por nombre..."]').type('Guadalajara');

      cy.contains('td', 'Planta Guadalajara Sur').should('be.visible');
      cy.contains('td', 'Planta Monterrey Norte').should('not.exist');
      cy.contains('td', 'Planta CDMX Centro').should('not.exist');
    });

    it('muestra el botón "Limpiar filtros" y restaura todas las plantas al pulsarlo', () => {
      cy.get('select').select('ALTO');
      cy.contains('button', 'Limpiar filtros').should('be.visible').click();

      cy.contains('td', 'Planta Monterrey Norte').should('be.visible');
      cy.contains('td', 'Planta Guadalajara Sur').should('be.visible');
      cy.contains('td', 'Planta CDMX Centro').should('be.visible');
    });
  });

  // ─────────────────────────────────────────────────────────────
  // FLUJO 5: Alertas, evolución del riesgo y notificaciones
  // ─────────────────────────────────────────────────────────────
  describe('Flujo 5: Alertas recientes, evolución del riesgo y notificaciones', () => {
    it('muestra la sección de alertas recientes con los títulos del fixture', () => {
      cy.contains('h2', 'Alertas recientes').should('be.visible');
      cy.contains('Nivel crítico de agua detectado').should('be.visible');
      cy.contains('Tendencia de riesgo en aumento').should('be.visible');
      cy.contains('Revisión programada completada').should('be.visible');
    });

    it('muestra la sección de evolución del riesgo con su período de 7 días', () => {
      cy.contains('h3', 'Evolución del riesgo hídrico').should('be.visible');
      cy.contains('(últimos 7 días)').should('be.visible');
    });

    it('muestra la sección de notificaciones activas por correo', () => {
      cy.contains('Notificaciones activas por correo').should('be.visible');
      cy.contains('Recibe alertas inmediatas').should('be.visible');
    });

    it('lanza una nueva petición al backend al pulsar el botón de actualizar', () => {
      cy.intercept('GET', '**/api/dashboard').as('refetch');
      cy.get('button[aria-label="Actualizar datos"]').click();
      cy.wait('@refetch');
    });
  });
});
