import { test, expect } from "@playwright/test";
import { testConfig } from "../../../config";

// ==================== SELECTORS ====================
const SELECTORS = {
  pageTitle: "Users | KPI Digest | Agile Digest",
  mainHeading: "Team Members",
  filterByRole: "Filter by Role",
  addUserButton: /Add User/i,
  deleteSelectedButton: /Delete Selected/i,
  searchInput: 'input[placeholder*="Search by keyword"]',
  table: "table",
  rowsPerPageText: "Rows per page:",
  tableHeaders: ["Name", "Email", "Role", "Status", "Actions"],
} as const;

// ==================== TESTS ====================
test.describe("Users Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(testConfig.getUrl(testConfig.pages.users));
    await page.waitForLoadState("networkidle");
  });

  test("should render users page correctly", async ({ page }) => {
    // Page Metadata
    await expect(page).toHaveTitle(SELECTORS.pageTitle);

    // Main Content
    await expect(
      page.getByRole("heading", { name: SELECTORS.mainHeading, level: 1 })
    ).toBeVisible();

    // Filters & Controls
    await expect(page.getByText(SELECTORS.filterByRole)).toBeVisible();
    await expect(
      page.getByRole("button", { name: SELECTORS.addUserButton })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: SELECTORS.deleteSelectedButton })
    ).toBeVisible();

    // Search
    await expect(page.locator(SELECTORS.searchInput)).toBeVisible();

    // Table
    await expect(page.locator(SELECTORS.table)).toBeVisible();

    // Table Headers
    for (const header of SELECTORS.tableHeaders) {
      await expect(
        page.getByRole("columnheader", { name: header, exact: true })
      ).toBeVisible();
    }

    // Pagination
    await expect(page.getByText(SELECTORS.rowsPerPageText)).toBeVisible();

    console.log("✅ Users page rendered successfully with all expected elements");
  });
});