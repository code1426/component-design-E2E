describe("To do list application E2E testing", () => {
  beforeEach("visit midterms route", () => {
    cy.visit("/midterms");
    cy.wait(5000);
  });

  describe("Page is rendered properly", () => {
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
  });

  describe("Validations", () => {
    beforeEach(() => {
      cy.get("button").contains("New Task").click();
      cy.wait(2000);
    });

    it("should show title required error when submitting empty form", () => {
      cy.get("button").contains("Create Task").click();
      cy.contains("Title is required");
    });

    it("should require due date for timed tasks", () => {
      cy.get("button")
        .contains(/^Timed$/)
        .click();
      cy.get('input[name="title"]').type("Timed Without Date");
      cy.get("button").contains("Create Task").click();
      cy.contains("Due date is required");
      cy.contains("Due time is required");
    });
  });

  describe("Task Creation", () => {
    beforeEach(() => {
      cy.get("button").contains("New Task").click();
      cy.wait(2000);
    });

    it("creates a basic task successfully", () => {
      cy.get('input[name="title"]').type("Basic Task Example");
      cy.get("button").contains("Create Task").click();
      cy.contains("h3", "Basic Task Example");
    });

    it("creates a timed task successfully", () => {
      cy.get("button")
        .contains(/^Timed$/)
        .click();
      cy.get('input[name="title"]').type("Timed Task Example");
      cy.get('input[type="date"]').type("2025-05-25");
      cy.get('input[type="time"]').type("14:30");
      cy.get("button").contains("Create Task").click();
      cy.contains("h3", "Timed Task Example");
    });

    it("creates a checklist task with items successfully", () => {
      cy.get("button")
        .contains(/^Checklist$/)
        .click();
      cy.get('input[name="title"]').type("Checklist Task Example");
      cy.get('input[type="date"]').type("2025-05-26");
      cy.get('input[type="time"]').type("09:00");
      const items = ["Item A", "Item B", "Item C"];
      items.forEach((item) => {
        cy.get('input[placeholder="Add new item"]').type(item).type("{enter}");
      });
      cy.get("button").contains("Create Task").click();
      cy.contains("h3", "Checklist Task Example");
      cy.contains("Checklist Task Example");
    });
  });
});

describe("Task Interactions", () => {
  beforeEach(() => {
    cy.wait(1000);
  });

  it("toggles task completion", () => {
    cy.get("button").contains("New Task").click();
    cy.get('input[name="title"]').type("Interact Me");
    cy.get("button").contains("Create Task").click();
    cy.contains("h3", "Interact Me")
      .closest("div.rounded-xl")
      .within(() => {
        cy.get('button[role="checkbox"]')
          .should("have.attr", "aria-checked", "false")
          .click()
          .should("have.attr", "aria-checked", "true");
      });
  });
});
