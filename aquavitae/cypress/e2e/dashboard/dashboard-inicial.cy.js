// Pruebas E2E del DashboardInicio (Resumen Ejecutivo Hídrico).
// Cubre todos los elementos visibles de la vista: estructura, tarjetas,
// mapa/tabla, tendencias, filtros, alertas, gráficas y notificaciones.

const MOCK_DIRECTOR_USER = {
  id: 1,
  nombre: 'Director',
  apellido: 'Prueba',
  email: 'director@aquavitae.test',
  rol: 'Director',
};

// FLUJO 1: Estado de carga y manejo de errores
describe('DashboardInicio – Estado de carga', () => {
  it('muestra el texto de carga mientras la API no ha respondido', () => {
    cy.intercept('GET', '**/api/dashboard', (req) => {
      req.reply({ delay: 800, fixture: 'dashboard/dashboard.json' });
    }).as('getDashboardLento');
    cy.intercept('GET', '**/api/alertas**', { fixture: 'dashboard/alertas.json' });
    cy.intercept('GET', '**/api/evolucion**', { fixture: 'dashboard/evolucion.json' });

    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('aquavitae_user', JSON.stringify(MOCK_DIRECTOR_USER));
        win.localStorage.setItem('aquavitae_token', 'cypress-test-token');
      },
    });

    cy.contains('Cargando resumen ejecutivo…').should('be.visible');
    cy.wait('@getDashboardLento');
  });

  it('reemplaza el spinner con el dashboard tras recibir los datos', () => {
    cy.intercept('GET', '**/api/dashboard', (req) => {
      req.reply({ delay: 500, fixture: 'dashboard/dashboard.json' });
    }).as('getDashboardLento');
    cy.intercept('GET', '**/api/alertas**', { fixture: 'dashboard/alertas.json' });
    cy.intercept('GET', '**/api/evolucion**', { fixture: 'dashboard/evolucion.json' });

    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('aquavitae_user', JSON.stringify(MOCK_DIRECTOR_USER));
        win.localStorage.setItem('aquavitae_token', 'cypress-test-token');
      },
    });

    cy.wait('@getDashboardLento');
    cy.contains('Cargando resumen ejecutivo…').should('not.exist');
    cy.contains('h1', 'Resumen ejecutivo hídrico').should('be.visible');
  });

  it('muestra el mensaje de error cuando el endpoint del dashboard responde con 500', () => {
    // retry:1 en queryClient -> 2 intentos; se espera ambos antes de afirmar
    cy.intercept('GET', '**/api/dashboard', {
      statusCode: 500,
      body: { message: 'Internal Server Error' },
    }).as('getDashboardError');
    cy.intercept('GET', '**/api/alertas**', { fixture: 'dashboard/alertas.json' });
    cy.intercept('GET', '**/api/evolucion**', { fixture: 'dashboard/evolucion.json' });

    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('aquavitae_user', JSON.stringify(MOCK_DIRECTOR_USER));
        win.localStorage.setItem('aquavitae_token', 'cypress-test-token');
      },
    });

    cy.wait('@getDashboardError');
    cy.wait('@getDashboardError');
    cy.contains('Error:', { timeout: 8000 }).should('be.visible');
    cy.contains('h1', 'Resumen ejecutivo hídrico').should('not.exist');
  });
});

// Configuración compartida: interceptar las 3 APIs y cargar el
// dashboard completo antes de cada prueba de contenido.
describe('DashboardInicio – Contenido y funcionalidades', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/dashboard', {
      fixture: 'dashboard/dashboard.json',
    }).as('getDashboard');

    cy.intercept('GET', '**/api/alertas**', {
      fixture: 'dashboard/alertas.json',
    }).as('getAlertas');

    cy.intercept('GET', '**/api/evolucion**', {
      fixture: 'dashboard/evolucion.json',
    }).as('getEvolucion');

    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('aquavitae_user', JSON.stringify(MOCK_DIRECTOR_USER));
        win.localStorage.setItem('aquavitae_token', 'cypress-test-token');
      },
    });

    cy.wait(['@getDashboard', '@getAlertas', '@getEvolucion']);
  });

  // FLUJO 2: Estructura general del encabezado y título
  describe('Flujo 2: Estructura general del Dashboard', () => {
    it('muestra el título y subtítulo del resumen ejecutivo', () => {
      cy.contains('h1', 'Resumen ejecutivo hídrico').should('be.visible');
      cy.contains('Visión general del riesgo hídrico').should('be.visible');
    });

    it('muestra el encabezado con fecha, hora e iniciales del director', () => {
      cy.contains('DR').should('be.visible');
      cy.contains('Última actualización:').should('be.visible');
    });

    it('muestra el botón de actualización habilitado', () => {
      cy.get('button[aria-label="Actualizar datos"]')
        .should('be.visible')
        .and('not.be.disabled');
    });

    it('muestra la barra lateral de navegación', () => {
      cy.get('aside').should('be.visible');
    });
  });

  //  FLUJO 3: Tarjetas de estadísticas (StatCards)
  describe('Flujo 3: Tarjetas de estadísticas del resumen', () => {
    it('muestra las cuatro tarjetas con sus etiquetas correctas', () => {
      cy.contains('Crisis activas').should('be.visible');
      cy.contains('Plantas en riesgo alto').should('be.visible');
      cy.contains('Plantas en riesgo medio').should('be.visible');
      cy.contains('Plantas en riesgo bajo').should('be.visible');
    });

    it('muestra el valor 1 en la tarjeta de plantas en riesgo alto', () => {
      cy.contains('Plantas en riesgo alto')
        .closest('div.flex.flex-col')
        .contains('span', '1')
        .should('be.visible');
    });

    it('muestra el total correcto de plantas en el subtítulo', () => {
      // alto=1 + medio=1 + bajo=1 = 3 plantas totales
      cy.contains('De 3 plantas totales').should('be.visible');
    });

    it('muestra las descripciones de estado en cada tarjeta', () => {
      cy.contains('Requieren atención inmediata').should('be.visible');
      cy.contains('Requieren seguimiento').should('be.visible');
      cy.contains('Condiciones normales').should('be.visible');
    });
  });

  // FLUJO 4: Tabla de plantas — visualización y selección
  describe('Flujo 4: Tabla de plantas y selección interactiva', () => {
    it('muestra el título de la sección y las tres plantas del fixture', () => {
      cy.contains('Plantas por nivel de riesgo').should('be.visible');
      cy.contains('td', 'Planta Monterrey Norte').should('be.visible');
      cy.contains('td', 'Planta Guadalajara Sur').should('be.visible');
      cy.contains('td', 'Planta CDMX Centro').should('be.visible');
    });

    it('muestra los encabezados de columna correctos', () => {
      cy.contains('th', 'Planta').should('be.visible');
      cy.contains('th', 'Ubicación').should('be.visible');
      cy.contains('th', 'Nivel de riesgo').should('be.visible');
      cy.contains('th', 'Tendencia').should('be.visible');
    });

    it('muestra la ubicación de cada planta', () => {
      cy.contains('tr', 'Planta Monterrey Norte')
        .contains('Monterrey, Nuevo León').should('be.visible');
      cy.contains('tr', 'Planta Guadalajara Sur')
        .contains('Guadalajara, Jalisco').should('be.visible');
      cy.contains('tr', 'Planta CDMX Centro')
        .contains('Ciudad de México, CDMX').should('be.visible');
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

  // FLUJO 5: Indicadores de tendencia e índice hídrico
  describe('Flujo 5: Indicadores de tendencia e índice hídrico', () => {
    it('muestra los badges de nivel de riesgo para cada planta', () => {
      cy.contains('tr', 'Planta Monterrey Norte').contains('ALTO').should('be.visible');
      cy.contains('tr', 'Planta Guadalajara Sur').contains('MEDIO').should('be.visible');
      cy.contains('tr', 'Planta CDMX Centro').contains('BAJO').should('be.visible');
    });

    it('muestra el porcentaje del índice hídrico en la columna Tendencia', () => {
      // indiceHidrico * 100 redondeado: 0.85→85%, 0.50→50%, 0.20→20%
      cy.contains('tr', 'Planta Monterrey Norte').contains('85%').should('be.visible');
      cy.contains('tr', 'Planta Guadalajara Sur').contains('50%').should('be.visible');
      cy.contains('tr', 'Planta CDMX Centro').contains('20%').should('be.visible');
    });

    it('muestra el ícono SVG de tendencia en cada fila', () => {
      cy.contains('tr', 'Planta Monterrey Norte').find('svg').should('exist');
      cy.contains('tr', 'Planta Guadalajara Sur').find('svg').should('exist');
      cy.contains('tr', 'Planta CDMX Centro').find('svg').should('exist');
    });
  });

  // FLUJO 6: Filtrado y búsqueda de plantas
  describe('Flujo 6: Filtrado y búsqueda de plantas', () => {
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

    it('filtra la tabla para mostrar solo plantas en riesgo BAJO', () => {
      cy.get('select').select('BAJO');

      cy.contains('td', 'Planta CDMX Centro').should('be.visible');
      cy.contains('td', 'Planta Monterrey Norte').should('not.exist');
      cy.contains('td', 'Planta Guadalajara Sur').should('not.exist');
    });

    it('busca y muestra solo la planta que coincide con el texto ingresado', () => {
      cy.get('input[placeholder="Buscar por nombre..."]').type('Guadalajara');

      cy.contains('td', 'Planta Guadalajara Sur').should('be.visible');
      cy.contains('td', 'Planta Monterrey Norte').should('not.exist');
      cy.contains('td', 'Planta CDMX Centro').should('not.exist');
    });

    it('muestra el botón Limpiar filtros y restaura todas las plantas al pulsarlo', () => {
      cy.get('select').select('ALTO');
      cy.contains('button', 'Limpiar filtros').should('be.visible').click();

      cy.contains('td', 'Planta Monterrey Norte').should('be.visible');
      cy.contains('td', 'Planta Guadalajara Sur').should('be.visible');
      cy.contains('td', 'Planta CDMX Centro').should('be.visible');
    });

    it('el botón Limpiar filtros no aparece cuando no hay filtros activos', () => {
      cy.contains('button', 'Limpiar filtros').should('not.exist');
    });

    it('muestra mensaje vacío cuando la búsqueda no tiene coincidencias', () => {
      cy.get('input[placeholder="Buscar por nombre..."]').type('Planta XYZ Inexistente 9999');

      cy.contains('No se encontraron plantas con los criterios seleccionados.').should('be.visible');
    });

    it('combinar filtro ALTO con búsqueda "Guadalajara" no muestra ninguna planta', () => {
      cy.get('select').select('ALTO');
      cy.get('input[placeholder="Buscar por nombre..."]').type('Guadalajara'); // Guadalajara es MEDIO

      cy.contains('td', 'Planta Guadalajara Sur').should('not.exist');
      cy.contains('No se encontraron plantas con los criterios seleccionados.').should('be.visible');
    });

    it('combinar filtro ALTO con búsqueda "Monterrey" muestra solo la planta correcta', () => {
      cy.get('select').select('ALTO');
      cy.get('input[placeholder="Buscar por nombre..."]').type('Monterrey');

      cy.contains('td', 'Planta Monterrey Norte').should('be.visible');
      cy.contains('td', 'Planta Guadalajara Sur').should('not.exist');
      cy.contains('td', 'Planta CDMX Centro').should('not.exist');
    });
  });

  //FLUJO 7: Alertas recientes
  describe('Flujo 7: Sección de alertas recientes', () => {
    it('muestra el encabezado de la sección de alertas', () => {
      cy.contains('h2', 'Alertas recientes').should('be.visible');
    });

    it('muestra los títulos de las tres alertas del fixture', () => {
      cy.contains('Nivel crítico de agua detectado').should('be.visible');
      cy.contains('Tendencia de riesgo en aumento').should('be.visible');
      cy.contains('Revisión programada completada').should('be.visible');
    });

    it('muestra la descripción de la alerta crítica', () => {
      cy.contains(
        'La Planta Monterrey Norte ha alcanzado el umbral de emergencia hídrica.',
      ).should('be.visible');
    });

    it('muestra la descripción de la alerta de advertencia', () => {
      cy.contains(
        'La Planta Guadalajara Sur muestra una tendencia creciente de estrés hídrico.',
      ).should('be.visible');
    });

    it('muestra la descripción de la alerta informativa', () => {
      cy.contains(
        'La Planta CDMX Centro completó su revisión mensual de manera satisfactoria.',
      ).should('be.visible');
    });
  });

  // FLUJO 8: Gráfica de evolución del riesgo hídrico
  describe('Flujo 8: Gráfica de evolución del riesgo hídrico', () => {
    it('muestra el encabezado y período de la gráfica de evolución', () => {
      cy.contains('h3', 'Evolución del riesgo hídrico').should('be.visible');
      cy.contains('(últimos 7 días)').should('be.visible');
    });

    it('renderiza el contenedor de la gráfica de evolución', () => {
      cy.contains('h3', 'Evolución del riesgo hídrico')
        .parent()
        .find('svg')
        .should('exist');
    });
  });

  // FLUJO 9: Banner de notificaciones por correo
  describe('Flujo 9: Banner de notificaciones por correo electrónico', () => {
    it('muestra el título del banner de notificaciones', () => {
      cy.contains('Notificaciones activas por correo').should('be.visible');
    });

    it('muestra la descripción del banner de notificaciones', () => {
      cy.contains('Recibe alertas inmediatas').should('be.visible');
    });
  });

  //  FLUJO 10: Actualización de datos (botón refetch)
  describe('Flujo 10: Actualización de datos', () => {
    it('lanza una nueva petición al backend al pulsar el botón Actualizar datos', () => {
      cy.intercept('GET', '**/api/dashboard').as('refetch');
      cy.get('button[aria-label="Actualizar datos"]').click();
      cy.wait('@refetch');
    });
  });
});
