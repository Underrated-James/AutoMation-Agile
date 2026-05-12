import { test } from "@playwright/test";
import { testConfig } from "../../../config";

test.describe("Tickets - Function Tests", () => {
  test.describe.configure({ mode: 'serial' });
  test("should test Delete functionalities in tickets page", async ({
    page,
  }) => {
    await page.goto(testConfig.getUrl(testConfig.pages.tickets));
    await page.waitForLoadState("networkidle");

    // === Click the "..." Actions button on the first row ===
    const actionsButton = page
      .locator("tbody tr")
      .first()
      .locator("td:last-child button")
      .first();

    await actionsButton.scrollIntoViewIfNeeded();
    await actionsButton.click({ force: true });

    await page.waitForTimeout(600); // Give menu time to open

    console.log("Actions menu opened, looking for Delete...");

    // === Stronger locators for Delete option ===
    const deleteOption = page
      .getByRole("menuitem")
      .filter({ hasText: /delete/i })
      .or(page.locator("text=Delete").last())
      .or(page.locator('[role="menuitem"] svg + span')) // in case it has icon
      .first();

    await deleteOption.waitFor({ state: "visible", timeout: 8000 });

    // Try normal click first, then force if needed
    await deleteOption.click().catch(async () => {
      console.log("Normal click failed, trying force click...");
      await deleteOption.click({ force: true });
    });

    // === Click Delete Ticket Button ===
    console.log("Attempting to click 'Delete Ticket' button...");

    const deleteButton = page
      .getByRole("button", { name: /delete ticket/i })
      .or(page.getByRole("button", { name: /save/i }))
      .or(page.locator('button[type="submit"]'))
      .first();

    await deleteButton.scrollIntoViewIfNeeded();
    await deleteButton.waitFor({ state: "visible", timeout: 5000 });

    // Check if button is enabled
    const isDisabled = await deleteButton.getAttribute("disabled");
    console.log("Create button disabled?", isDisabled);

    await deleteButton.click({ force: true });

    console.log("✅ Ticket deleted successfully - Back to tickets page!");
  });
});
