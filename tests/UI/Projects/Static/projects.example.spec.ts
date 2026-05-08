import { test, expect } from "@playwright/test";
import { testConfig } from "../../../config";

test.describe("Project Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(testConfig.getUrl(testConfig.pages.projects));
  });

  test("Should render users page correctly", async ({ page }) => {
    //wait for page to fully load before test
    await page.waitForLoadState("networkidle");

    // Page Title
    await expect(page).toHaveTitle("Projects | KPI Digest | Agile Digest");

    // Main Heading
    await expect(
      page.getByRole("heading", {
        name: "Projects",
        level: 1,
      }),
    ).toBeVisible();

    //Filter Buttons
    await expect(page.getByText("Filter by Status")).toBeVisible();

    // Buttons
    await expect(
      page.getByRole("button", {
        name: /Add Project/i,
      }),
    ).toBeVisible();

    // Buttons
    await expect(
      page.getByRole("button", {
        name: /Delete Selected/i,
      }),
    ).toBeVisible();

    // Table headers
    const headers = [
      "Name",
      "Project Code",
      "Target Finish Date",
      "Status",
      "Actions",
    ];

    for (const header of headers) {
      await expect(
        page.getByRole("columnheader", { name: header }),
      ).toBeVisible();
    }

    await expect(page.getByPlaceholder("Search by keyword...")).toBeVisible();

    await expect(page.getByRole("table")).toBeVisible();

    await expect(page.getByText("Rows per page:")).toBeVisible();
  });
});
