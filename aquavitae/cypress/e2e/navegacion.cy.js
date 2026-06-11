// Pruebas E2E del sidebar de navegacion (ExpandableSidebar).
// Cubre: items visibles por rol, estado activo, expansion con hover,
// navegacion entre paginas y boton de cerrar sesion.

const MOCK_DIRECTOR_USER = {
  id: 1,
  nombre: 'Director',
  apellido: 'Prueba',
  email: 'director@aquavitae.test',
  rol: 'Director',
};

const MOCK_ADMIN_USER = {
  id: 2,
  nombre: 'Admin',
  apellido: 'Prueba',
  email: 'admin@aquavitae.test',
  rol: 'Administrador',
};

// ===================================================================
// NAVBAR - VISTA DEL DIRECTOR
// ===================================================================
describe('Navbar - Vista del Director', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/**', { statusCode: 200, body: [] });

    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('aquavitae_user', JSON.stringify(MOCK_DIRECTOR_USER));
        win.localStorage.setItem('aquavitae_token', 'cypress-test-token');
      },
    });

    cy.get('aside').should('be.visible');
  });

  // -------------------------------------------------------------------
  // FLUJO 1: Items visibles para el Director
  // -------------------------------------------------------------------
  describe('Flujo 1: Items de navegacion visibles para el Director', () => {
    it('muestra los tres items del Director: Dashboard, Alternativas y Simulacion', () => {
      cy.get('aside button[title="Dashboard"]').should('exist');
      cy.get('aside button[title="Alternativas"]').should('exist');
      cy.get('aside button[title="Simulacion"]').should('exist');
    });

    it('no muestra los items exclusivos del Administrador', () => {
      cy.get('aside button[title="Gestion Usuarios"]').should('not.exist');
      cy.get('aside button[title="Alertas API"]').should('not.exist');
      cy.get('aside button[title="Auditoria"]').should('not.exist');
    });

    it('muestra exactamente cuatro botones en el sidebar (tres de navegacion y Salir)', () => {
      cy.get('aside button').should('have.length', 4);
    });
  });

  // -------------------------------------------------------------------
  // FLUJO 2: Estado activo del item actual
  // -------------------------------------------------------------------
  describe('Flujo 2: Estado activo del item de navegacion', () => {
    it('marca Dashboard como activo al cargar la vista inicial', () => {
      cy.get('aside button[title="Dashboard"]').should('have.class', 'bg-[#eaf1fe]');
    });

    it('no marca Alternativas ni Simulacion como activos en la vista inicial', () => {
      cy.get('aside button[title="Alternativas"]').should('not.have.class', 'bg-[#eaf1fe]');
      cy.get('aside button[title="Simulacion"]').should('not.have.class', 'bg-[#eaf1fe]');
    });
  });

  // -------------------------------------------------------------------
  // FLUJO 3: Expansion del sidebar al hacer hover
  // -------------------------------------------------------------------
  describe('Flujo 3: Expansion del sidebar con hover', () => {
    it('expande el sidebar al pasar el cursor y muestra el nombre de la app', () => {
      cy.get('aside').trigger('mouseover', { force: true });
      cy.contains('AquaVitae').should('be.visible');
    });

    it('muestra el nombre completo del usuario al expandir', () => {
      cy.get('aside').trigger('mouseover', { force: true });
      cy.contains('Director Prueba').should('be.visible');
    });

    it('muestra el rol del usuario al expandir', () => {
      cy.get('aside').trigger('mouseover', { force: true });
      cy.get('aside').contains('Director').should('be.visible');
    });

    it('muestra las etiquetas de los items de navegacion al expandir', () => {
      cy.get('aside').trigger('mouseover', { force: true });
      cy.get('aside').contains('Dashboard').should('be.visible');
      cy.get('aside').contains('Alternativas').should('be.visible');
      cy.get('aside').contains('Simulacion').should('be.visible');
    });

    it('muestra la etiqueta Salir al expandir', () => {
      cy.get('aside').trigger('mouseover', { force: true });
      cy.get('aside').contains('Salir').should('be.visible');
    });

    it('colapsa el sidebar al retirar el cursor y oculta las etiquetas', () => {
      cy.get('aside').trigger('mouseover', { force: true });
      cy.contains('AquaVitae').should('be.visible');
      cy.get('aside').trigger('mouseout', { force: true });
      cy.contains('AquaVitae').should('not.exist');
    });
  });

  // -------------------------------------------------------------------
  // FLUJO 4: Navegacion entre paginas del Director
  // -------------------------------------------------------------------
  describe('Flujo 4: Navegacion entre paginas del Director', () => {
    it('activa el item Alternativas al hacer clic en el', () => {
      cy.get('aside button[title="Alternativas"]').click();
      cy.get('aside button[title="Alternativas"]').should('have.class', 'bg-[#eaf1fe]');
      cy.get('aside button[title="Dashboard"]').should('not.have.class', 'bg-[#eaf1fe]');
    });

    it('activa el item Simulacion al hacer clic en el', () => {
      cy.get('aside button[title="Simulacion"]').click();
      cy.get('aside button[title="Simulacion"]').should('have.class', 'bg-[#eaf1fe]');
      cy.get('aside button[title="Dashboard"]').should('not.have.class', 'bg-[#eaf1fe]');
    });

    it('regresa al Dashboard al hacer clic en su item', () => {
      cy.get('aside button[title="Alternativas"]').click();
      cy.get('aside button[title="Dashboard"]').click();
      cy.get('aside button[title="Dashboard"]').should('have.class', 'bg-[#eaf1fe]');
      cy.get('aside button[title="Alternativas"]').should('not.have.class', 'bg-[#eaf1fe]');
    });

    it('solo un item permanece activo a la vez', () => {
      cy.get('aside button[title="Simulacion"]').click();
      cy.get('aside button.bg-\\[\\#eaf1fe\\]').should('have.length', 1);
    });
  });

  // -------------------------------------------------------------------
  // FLUJO 5: Boton de cerrar sesion
  // -------------------------------------------------------------------
  describe('Flujo 5: Boton de cerrar sesion', () => {
    it('muestra el boton Salir en el sidebar', () => {
      cy.get('aside button[title="Salir"]').should('exist');
    });

    it('muestra la etiqueta Salir al expandir el sidebar', () => {
      cy.get('aside').trigger('mouseover', { force: true });
      cy.get('aside button[title="Salir"]').contains('Salir').should('be.visible');
    });
  });
});

// ===================================================================
// NAVBAR - VISTA DEL ADMINISTRADOR
// ===================================================================
describe('Navbar - Vista del Administrador', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/**', { statusCode: 200, body: [] });
    cy.intercept('POST', '**/api/**', { statusCode: 200, body: {} });

    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('aquavitae_user', JSON.stringify(MOCK_ADMIN_USER));
        win.localStorage.setItem('aquavitae_token', 'cypress-test-token');
      },
    });

    cy.get('aside').should('be.visible');
  });

  // -------------------------------------------------------------------
  // FLUJO 6: Items visibles para el Administrador
  // -------------------------------------------------------------------
  describe('Flujo 6: Items de navegacion visibles para el Administrador', () => {
    it('muestra los tres items del Administrador: Gestion Usuarios, Alertas API y Auditoria', () => {
      cy.get('aside button[title="Gestion Usuarios"]').should('exist');
      cy.get('aside button[title="Alertas API"]').should('exist');
      cy.get('aside button[title="Auditoria"]').should('exist');
    });

    it('no muestra los items exclusivos del Director', () => {
      cy.get('aside button[title="Dashboard"]').should('not.exist');
      cy.get('aside button[title="Alternativas"]').should('not.exist');
      cy.get('aside button[title="Simulacion"]').should('not.exist');
    });

    it('muestra exactamente cuatro botones en el sidebar (tres de navegacion y Salir)', () => {
      cy.get('aside button').should('have.length', 4);
    });
  });

  // -------------------------------------------------------------------
  // FLUJO 7: Estado activo del item actual
  // -------------------------------------------------------------------
  describe('Flujo 7: Estado activo del item de navegacion', () => {
    it('marca Gestion Usuarios como activo al cargar la vista inicial', () => {
      cy.get('aside button[title="Gestion Usuarios"]').should('have.class', 'bg-[#eaf1fe]');
    });

    it('no marca Alertas API ni Auditoria como activos en la vista inicial', () => {
      cy.get('aside button[title="Alertas API"]').should('not.have.class', 'bg-[#eaf1fe]');
      cy.get('aside button[title="Auditoria"]').should('not.have.class', 'bg-[#eaf1fe]');
    });
  });

  // -------------------------------------------------------------------
  // FLUJO 8: Expansion del sidebar al hacer hover
  // -------------------------------------------------------------------
  describe('Flujo 8: Expansion del sidebar con hover', () => {
    it('expande el sidebar al pasar el cursor y muestra el nombre de la app', () => {
      cy.get('aside').trigger('mouseover', { force: true });
      cy.contains('AquaVitae').should('be.visible');
    });

    it('muestra el nombre completo del usuario al expandir', () => {
      cy.get('aside').trigger('mouseover', { force: true });
      cy.contains('Admin Prueba').should('be.visible');
    });

    it('muestra el rol Administrador al expandir', () => {
      cy.get('aside').trigger('mouseover', { force: true });
      cy.get('aside').contains('Administrador').should('be.visible');
    });

    it('muestra las etiquetas de los items de navegacion al expandir', () => {
      cy.get('aside').trigger('mouseover', { force: true });
      cy.get('aside').contains('Gestion Usuarios').should('be.visible');
      cy.get('aside').contains('Alertas API').should('be.visible');
      cy.get('aside').contains('Auditoria').should('be.visible');
    });

    it('colapsa el sidebar al retirar el cursor y oculta las etiquetas', () => {
      cy.get('aside').trigger('mouseover', { force: true });
      cy.contains('AquaVitae').should('be.visible');
      cy.get('aside').trigger('mouseout', { force: true });
      cy.contains('AquaVitae').should('not.exist');
    });
  });

  // -------------------------------------------------------------------
  // FLUJO 9: Navegacion entre paginas del Administrador
  // -------------------------------------------------------------------
  describe('Flujo 9: Navegacion entre paginas del Administrador', () => {
    it('activa el item Alertas API al hacer clic en el', () => {
      cy.get('aside button[title="Alertas API"]').click();
      cy.get('aside button[title="Alertas API"]').should('have.class', 'bg-[#eaf1fe]');
      cy.get('aside button[title="Gestion Usuarios"]').should('not.have.class', 'bg-[#eaf1fe]');
    });

    it('activa el item Auditoria al hacer clic en el', () => {
      cy.get('aside button[title="Auditoria"]').click();
      cy.get('aside button[title="Auditoria"]').should('have.class', 'bg-[#eaf1fe]');
      cy.get('aside button[title="Gestion Usuarios"]').should('not.have.class', 'bg-[#eaf1fe]');
    });

    it('regresa a Gestion Usuarios al hacer clic en su item', () => {
      cy.get('aside button[title="Alertas API"]').click();
      cy.get('aside button[title="Gestion Usuarios"]').click();
      cy.get('aside button[title="Gestion Usuarios"]').should('have.class', 'bg-[#eaf1fe]');
      cy.get('aside button[title="Alertas API"]').should('not.have.class', 'bg-[#eaf1fe]');
    });

    it('solo un item permanece activo a la vez', () => {
      cy.get('aside button[title="Auditoria"]').click();
      cy.get('aside button.bg-\\[\\#eaf1fe\\]').should('have.length', 1);
    });
  });

  // -------------------------------------------------------------------
  // FLUJO 10: Boton de cerrar sesion
  // -------------------------------------------------------------------
  describe('Flujo 10: Boton de cerrar sesion', () => {
    it('muestra el boton Salir en el sidebar', () => {
      cy.get('aside button[title="Salir"]').should('exist');
    });

    it('muestra la etiqueta Salir al expandir el sidebar', () => {
      cy.get('aside').trigger('mouseover', { force: true });
      cy.get('aside button[title="Salir"]').contains('Salir').should('be.visible');
    });
  });
});
