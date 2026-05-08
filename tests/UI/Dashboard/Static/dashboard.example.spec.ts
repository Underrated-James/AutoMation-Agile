import { test, expect } from "@playwright/test";
import { testConfig } from "../../../config";

test.describe("DashBoard Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(testConfig.getUrl(testConfig.pages.home));
  });

  test("Should render users page correctly", async ({ page }) => {
    //wait for page to fully load before test
    await page.waitForLoadState("networkidle");

    // Page Title
    await expect(page).toHaveTitle("Agile Digest | KPI Digest");

    // Main Heading
    await expect(
      page.getByRole("heading", {
        name: "Select a Project",
        level: 1,
      }),
    ).toBeVisible();

    //Filter Buttons
    await expect(page.getByText("+ Sprint", { exact: true })).toBeVisible();

    //Filter Buttons
    await expect(page.getByText("Sprint Summary Card")).toBeVisible();

    await expect(page.getByText("Sprint Summary Card")).toBeVisible();

    await expect(page.getByText("Ticket Summary Card")).toBeVisible();

    await expect(page.getByText("Ticket Completion Trend Card")).toBeVisible();

    await expect(page.getByText("Workload Distribution Card")).toBeVisible();

    await expect(page.getByText("Recent Tickets Card")).toBeVisible();

    await expect(page.getByText("Sprint Overview Card")).toBeVisible();
  });
});
