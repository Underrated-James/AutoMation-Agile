import { test, expect } from "@playwright/test";
import { testConfig } from "../../../config";

test.describe("Tickets - Function Tests", () => {
  test("should test Create functionalities in tickets page", async ({
    page,
  }) => {
    await page.goto(testConfig.getUrl(testConfig.pages.tickets));
    await page.waitForLoadState("networkidle");

    // Open modal
    await page.getByRole("button", { name: /add ticket/i }).click();

    const form = page.locator("form");
    await expect(form).toBeVisible();

    // === Project Selection ===
    const projectTrigger = form
      .locator('button, [role="combobox"]')
      .filter({ hasText: /Select project|project/i })
      .first();

    await projectTrigger.scrollIntoViewIfNeeded();
    await projectTrigger.waitFor({ state: "visible", timeout: 10000 });

    await projectTrigger.click({ force: true });
    await page.waitForTimeout(600);

    await projectTrigger.press("ArrowDown");
    await page.waitForTimeout(400);
    await projectTrigger.press("Enter");

    // Verify project selected
    const projectButton = form.locator('button, [role="combobox"]').first();
    await expect(projectButton).not.toContainText("Select project", {
      timeout: 5000,
    });

    // === Fill Ticket Title ===
    const uniqueTitle = `Fix login issue ${Date.now()}`;
    const titleField = form
      .getByPlaceholder(/ticket title/i)
      .or(form.getByLabel(/title/i))
      .or(form.locator('input[placeholder*="Ticket title"]'))
      .first();

    await titleField.fill(uniqueTitle);
    await titleField.press("Tab");

    // === Fill Description Link ===
    const descriptionLinkField = form
      .getByPlaceholder(/https/i)
      .or(form.locator('input[placeholder*="Description Link"]'))
      .first();

    await descriptionLinkField.fill(
      "https://agiledigest.atlassian.net/browse/RIA-010",
    );
    await descriptionLinkField.press("Tab");

    // === Click Create Ticket Button ===
    console.log("Attempting to click 'Create Ticket' button...");

    const createButton = page
      .getByRole("button", { name: /create ticket/i })
      .or(page.getByRole("button", { name: /save/i }))
      .or(page.locator('button[type="submit"]'))
      .first();

    await createButton.scrollIntoViewIfNeeded();
    await createButton.waitFor({ state: "visible", timeout: 5000 });

    // Check if button is enabled
    const isDisabled = await createButton.getAttribute("disabled");
    console.log("Create button disabled?", isDisabled);

    await createButton.click({ force: true });

    // Wait for modal to close and page to return to tickets list
    await expect(form).toBeHidden({ timeout: 10000 });
    await expect(page.locator("form")).not.toBeVisible({ timeout: 10000 });

    console.log("✅ Ticket created successfully - Back to tickets page!");
  });
});
