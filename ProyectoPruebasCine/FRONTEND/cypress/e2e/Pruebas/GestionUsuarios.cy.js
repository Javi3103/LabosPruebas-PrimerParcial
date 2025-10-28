describe("Pruebas de gestion de usuario", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("Debería registrar un usuario con datos válidos", () => {
    // Paso 1: Navegar a la página de registro
    cy.visit("http://localhost:5173/register");

    // Paso 2: Ingresar datos válidos
    cy.get("#firstName").type("Usuario");
    cy.get("#lastName").type("Prueba");
    cy.get("#username").type("usuarioPrueba");
    cy.get("#email").type("usuario@prueba.com");
    cy.get("#password").type("contraseñaSegura123");
    cy.get("#confirmPassword").type("contraseñaSegura123");

    // Paso 3: Hacer clic en "Registrar"
    cy.get(".text-center > .btn").click();

  });

  //iniciar sesion
  it("Debería permitir a un usuario iniciar sesión con credenciales válidas", () => {
    // Paso 1: Ingresar credenciales válidas
    cy.visit("http://localhost:5173/login");

    cy.get('#emailOrUsername').type('usuarioPrueba');
    cy.get('#password').type('contraseñaSegura123');

    // Paso 2: Hacer clic en "Iniciar sesión"
    cy.get('.text-center > .btn').click();
    //verificar que exista el boton de perfil
    cy.get(':nth-child(4) > .nav-link').should('exist');
    //verificar que exista el boton de cerrar sesion
    cy.get('.d-flex > .btn').should('exist');
    
  });
});


