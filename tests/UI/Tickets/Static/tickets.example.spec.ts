import { test, expect } from "@playwright/test";
import { testConfig } from "../../../config";

test.describe("Ticket Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(testConfig.getUrl(testConfig.pages.tickets));
  });

  test("Should render tickets page correctly", async ({ page }) => {
    // Wait for page to fully load
    await page.waitForLoadState("networkidle");

    // Page Title
    await expect(page).toHaveTitle("Tickets | Agile Digest");

    //Main Heading
    await expect(
      page.getByRole("heading", {
        name: "Tickets",
        level: 1,
      }),
    ).toBeVisible();

    //Filters Buttons
    await expect(page.getByText("Filter by Status")).toBeVisible();

    await expect(page.getByText("Filter by Project")).toBeVisible();

    // Buttons
    await expect(
      page.getByRole("button", {
        name: /Add Ticket/i,
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
      "Ticket #",
      "Title",
      "Status",
      "Developer",
      "QA",
      "Dev Est.",
      "QA Est.",
      "Dev Spent",
      "QA Spent",
      "Actions",
    ];

    for (const header of headers) {
      await expect(
        page.getByRole("columnheader", { name: header, exact: true }),
      ).toBeVisible();
    }

    await expect(page.getByPlaceholder("Search by keyword...")).toBeVisible();

    await expect(page.getByRole("table")).toBeVisible();

    await expect(page.getByText("Rows per page:")).toBeVisible();
  });
});
