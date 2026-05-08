import { test, expect } from "@playwright/test";
import { testConfig } from "../../../config";

test.describe("Users Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(testConfig.getUrl(testConfig.pages.users));
  });

  test("Should render users page correctly", async ({ page }) => {
    //wait for page to fully load before test
    await page.waitForLoadState("networkidle");

    // Page Title
    await expect(page).toHaveTitle("Users | KPI Digest | Agile Digest");

    // Main Heading
    await expect(
      page.getByRole("heading", {
        name: "Team Members",
        level: 1,
      }),
    ).toBeVisible();

    //Filter Buttons
    await expect(page.getByText("Filter by Role")).toBeVisible();

    // Buttons
    await expect(
      page.getByRole("button", {
        name: /Add User/i,
      }),
    ).toBeVisible();

    // Buttons
    await expect(
      page.getByRole("button", {
        name: /Delete Selected/i,
      }),
    ).toBeVisible();

    // Table headers
    const headers = ["Name", "Email", "ROle", "Status", "Actions"];

    for (const header of headers) {
      await expect(
        page.getByRole("columnheader", { name: header }),
      ).toBeVisible();
    }

    await expect(page.getByRole("table")).toBeVisible();

    await expect(page.getByText("Rows per page:")).toBeVisible();

    await expect(page.getByPlaceholder("Search by keyword...")).toBeVisible();
  });
});
