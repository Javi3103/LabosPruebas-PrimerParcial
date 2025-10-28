describe("Pruebas de gestion de usuario", () => {
    beforeEach(() => {
        cy.visit("http://localhost:5173/");
    });

  //Seleccionar pelicula de la cartelera
  it("Debería seleccionar una película de la cartelera", () => {
    //incia sesion
    cy.visit("http://localhost:5173/login");
    cy.get("#emailOrUsername").type("usuarioPrueba");
    cy.get("#password").type("contraseñaSegura123");
    cy.get(".text-center > .btn").click();
    cy.wait(2000);
    // Paso 1: Seleccionar una película
    cy.get(":nth-child(3) > .nav-link").click();
    cy.get(":nth-child(1) > .card > .card-body > .btn").click();
    // Paso 2: Seleccionar un horario
    cy.get("#showtime").select("08:00");
    // Paso 3: Click en comprar
    cy.get(".card-body > .btn").click();
    // Paso 4: Seleccionar asientos
    cy.get(".card-body > .row > :nth-child(1)").click();
    // Paso 5: Click en Confirmar seleccion
    cy.get('.text-center > .btn').click();
    // Paso 6: Click en Confirmar compra
    cy.wait(1000);
    cy.get('.text-center > .btn').click();
    //validar mensaje de compra exitosa
    cy.contains('¡La compra se ha realizado con éxito!');
  });
});
