import { test, expect } from "@playwright/test";
import { testConfig } from "../../../config";

const TABLE_HEADERS = [
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

test.describe("Ticket Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(testConfig.getUrl(testConfig.pages.tickets));
  });

  test("Should render tickets page correctly", async ({ page }) => {
    await test.step("Verify page title and heading", async () => {
      await expect(page).toHaveTitle("Tickets | Agile Digest");

      await expect(
        page.getByRole("heading", {
          name: "Tickets",
          level: 1,
        }),
      ).toBeVisible();
    });

    await test.step("Verify action buttons and filters", async () => {
      const elements = [
        page.getByRole("button", { name: /Add Ticket/i }),
        page.getByRole("button", { name: /Delete Selected/i }),
        page.getByText("Filter by Status"),
        page.getByText("Filter by Project"),
        page.getByPlaceholder("Search by keyword..."),
        page.getByRole("table"),
        page.getByText("Rows per page:"),
      ];

      for (const element of elements) {
        await expect(element).toBeVisible();
      }
    });

    await test.step("Verify table headers", async () => {
      for (const header of TABLE_HEADERS) {
        await expect(
          page.getByRole("columnheader", {
            name: header,
            exact: true,
          }),
        ).toBeVisible();
      }
    });
  });
});