import { test, expect } from "@playwright/test";
import { testConfig } from "../../../config";

test.describe("Sprint Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(testConfig.getUrl(testConfig.pages.sprints));
  });

  test("Should render users page correctly", async ({ page }) => {
    //wait for page to fully load before test
    await page.waitForLoadState("networkidle");

    // Page Title
    await expect(page).toHaveTitle("Sprints | KPI Digest | Agile Digest");

    // Main Heading
    await expect(
      page.getByRole("heading", {
        name: "Sprints",
        level: 1,
      }),
    ).toBeVisible();

    //Filter Buttons
    await expect(page.getByText("Filter by Status")).toBeVisible();

    // Table headers
    const headers = [
      "Project Name",
      "NUmber of Sprints",
      "Project Status",
      "Created Date",
      "Updated Date",
    ];

    for (const header of headers) {
      await expect(
        page.getByRole("columnheader", { name: header }),
      ).toBeVisible();
    }

    await expect(page.getByRole("table")).toBeVisible();

    await expect(page.getByPlaceholder("Search by keyword...")).toBeVisible();

    await expect(page.getByText("Rows per page:")).toBeVisible();
  });
});
