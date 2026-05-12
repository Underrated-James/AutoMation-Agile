import { test, expect, Page } from "@playwright/test";
import { testConfig } from "../../../config";

test.describe("Tickets - Function Tests", () => {
  test("should filter projects correctly", async ({ page }) => {
    await page.goto(testConfig.getUrl(testConfig.pages.tickets));

    const projects = [
      "All Projects",
      "TRT - test22",
      "KDK - Kondo Ko",
      "RIA - Repnotes",
      "NMBS - Nimbus",
    ];

    for (const project of projects) {
      await selectProject(page, project);
    }
  });
});

async function selectProject(page: Page, projectName: string) {
  console.log(`Selecting: ${projectName}`);

  // Open dropdown
  const dropdown = page.locator('button[role="combobox"]').nth(1);

  await dropdown.click();

  // Click actual dropdown item
  const option = page.getByRole("option", {
    name: projectName,
  });

  await expect(option).toBeVisible();

  await option.click();

  // Verify selected value appears
  await expect(dropdown).toContainText(projectName);

  console.log(`✅ Selected ${projectName}`);
}