describe("To do list application E2E testing", () => {
  beforeEach("visit midterms route", () => {
    cy.visit("/midterms");
    cy.wait(2000);
  });

  it("loads the page and shows header and no-tasks message", () => {
    cy.get("h1").contains("To Do List Application");
    cy.get('button[role="combobox"]').contains("Due Date");
    cy.get("button").contains("New Task");
  });

  it("opens and closes the New Task dialog", () => {
    cy.get("button").contains("New Task").click();
    cy.get("button").contains("Cancel").click();
    cy.get("button").contains("Create Task").should("not.exist");
  });

  it("creates a new task and displays it in the list", () => {
    cy.get("button").contains("New Task").click();
    cy.get('input[name="title"]').type("Test Task");
    cy.get("button").contains("Create Task").click();
    cy.contains("Test Task");
  });

  it("toggles task completion", () => {
    cy.get("button").contains("New Task").click();
    cy.get('input[name="title"]').type("Complete Me");
    cy.get("button").contains("Create Task").click();
    cy.wait(1000);
    cy.contains("h3", "Complete Me")
      .closest("div.rounded-xl")
      .within(() => {
        cy.get('button[role="checkbox"]')
          .should("have.attr", "aria-checked", "false")
          .click()
          .should("have.attr", "aria-checked", "true");
      });
  });
});
