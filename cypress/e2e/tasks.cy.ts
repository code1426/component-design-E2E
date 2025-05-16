describe("To do list application E2E testing", () => {
  beforeEach("visit midterms route", () => {
    cy.visit("/midterms");
    cy.wait(5000);
  });

  after("clear tasks", () => {
    cy.request("DELETE", "http://localhost:3001/api/tasks");
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

  describe("Task Interactions", () => {
    beforeEach(() => {
      cy.wait(1000);
    });

    before("clear tasks", () => {
      cy.request("DELETE", "http://localhost:3001/api/tasks");
      cy.visit("/midterm");
    });

    it("toggles task completion", () => {
      cy.get("button").contains("New Task").click();
      cy.get('input[name="title"]').type("Interact Me");
      cy.get("button").contains("Create Task").click();
      cy.contains("h3", "Interact Me")
        .closest("div.rounded-xl")
        .within(() => {
          cy.get('button[role="checkbox"]').click();
        });
    });

    it("edits an existing task's title and description", () => {
      // Create a task first
      cy.get("button").contains("New Task").click();
      cy.get('input[name="title"]').type("Task to Edit");
      cy.get("button").contains("Create Task").click();
      cy.wait(2000);

      // Edit the task
      cy.contains("h3", "Task to Edit")
        .closest("div.rounded-xl")
        .within(() => {
          cy.get("button.text-gray-500.h-8.rounded-md").click();
        });

      // Update task details
      cy.get('input[name="title"]').clear().type("Updated Task Title");

      // Edit description
      cy.get('textarea[name="description"]').type("Task Description");
      cy.get("button").contains("Save Changes").click();

      // Verify the task was updated
      cy.contains("h3", "Updated Task Title").should("exist");
      cy.contains("h3", "Task to Edit").should("not.exist");
    });

    it("checks a checklist item", () => {
      cy.get("button").contains("New Task").click();
      cy.get("button")
        .contains(/^Checklist$/)
        .click();
      cy.get('input[name="title"]').type("Checklist Task Example");
      cy.get('input[type="date"]').type("2025-05-26");
      cy.get('input[type="time"]').type("09:00");
      cy.get('input[placeholder="Add new item"]')
        .type("Item A")
        .type("{enter}");
      cy.get("button").contains("Create Task").click();
      cy.contains("h3", "Checklist Task Example")
        .closest("div.rounded-xl")
        .within(() => {
          cy.contains("button", "0/1 items completed").click();
        });
      cy.contains('[role="menu"] li', "Item A")
        .find('[role="checkbox"]')
        .click();
      cy.contains("button", "1/1 items completed").should("exist");
    });

    it("edits due date", () => {
      // Edit the task
      cy.contains("h3", "Checklist Task Example")
        .closest("div.rounded-xl")
        .within(() => {
          cy.get("button.text-gray-500.h-8.rounded-md").click();
        });

      // Update due date
      cy.get('input[type="date"]').clear().type("2025-06-01");
      cy.get("button").contains("Save Changes").click();

      // Verify the task shows the new due date
      cy.contains("h3", "Checklist Task Example")
        .closest("div.rounded-xl")
        .within(() => {
          cy.contains("Due: 6/1/2025").should("exist");
        });
    });

    it("deletes a task", () => {
      // Delete the task
      cy.contains("h3", "Checklist Task Example")
        .closest("div.rounded-xl")
        .within(() => {
          cy.get('button.text-red-500.bg-white').click();
        });

      // Confirm deletion in the confirmation dialog
      cy.get("button").contains("Delete").click();

      // Verify the task was deleted
      cy.contains("h3", "Checklist Task Example").should("not.exist");
    });
  });
});
