import { test, expect } from "@playwright/test";
import { testConfig } from "../../../config";

test.describe("Tickets - Create Flow", () => {
  test("should create a new ticket", async ({ page }) => {
    await page.goto(testConfig.getUrl(testConfig.pages.tickets));
    await page.waitForLoadState("networkidle");

    // Open Create Ticket Modal
    await page.getByRole("button", { name: /add ticket/i }).click();
    const form = page.locator("form");
    await expect(form).toBeVisible();

    // === Fill Form Fields ===
    await selectProject(page, form);
    await fillTicketTitle(page, form);
    await fillDescriptionLink(page, form);

    // === Submit Form ===
    await submitCreateTicket(page, form);

    console.log("✅ Ticket created successfully!");
  });
});

// ====================== HELPER FUNCTIONS ======================

async function selectProject(page: any, form: any) {
  console.log("Selecting project...");

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

  // Verify selection
  const projectButton = form.locator('button, [role="combobox"]').first();
  await expect(projectButton).not.toContainText("Select project", { timeout: 5000 });
}

async function fillTicketTitle(page: any, form: any) {
  const uniqueTitle = `Fix login issue ${Date.now()}`;

  const titleField = form
    .getByPlaceholder(/ticket title/i)
    .or(form.getByLabel(/title/i))
    .or(form.locator('input[placeholder*="Ticket title"]'))
    .first();

  await titleField.waitFor({ state: "visible", timeout: 5000 });
  await titleField.fill(uniqueTitle);
  await titleField.press("Tab");

  console.log(`✅ Ticket title filled: ${uniqueTitle}`);
}

async function fillDescriptionLink(page: any, form: any) {
  const descriptionLinkField = form
    .getByPlaceholder(/https/i)
    .or(form.locator('input[placeholder*="Description Link"]'))
    .first();

  await descriptionLinkField.waitFor({ state: "visible", timeout: 5000 });
  await descriptionLinkField.fill("https://agiledigest.atlassian.net/browse/RIA-010");
  await descriptionLinkField.press("Tab");

  console.log("✅ Description link filled");
}

async function submitCreateTicket(page: any, form: any) {
  console.log("Submitting ticket...");

  const createButton = page
    .getByRole("button", { name: /create ticket/i })
    .or(page.getByRole("button", { name: /save/i }))
    .or(page.locator('button[type="submit"]'))
    .first();

  await createButton.scrollIntoViewIfNeeded();
  await createButton.waitFor({ state: "visible", timeout: 8000 });

  const isDisabled = await createButton.getAttribute("disabled");
  console.log("Create button disabled?", isDisabled);

  await createButton.click({ force: true });

  // Wait for modal to close
  await expect(form).toBeHidden({ timeout: 12000 });
  await expect(page.locator("form")).not.toBeVisible({ timeout: 10000 });

  console.log("✅ Ticket submitted successfully");
}