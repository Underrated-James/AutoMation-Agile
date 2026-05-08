import { test } from "@playwright/test";
import { testConfig } from "../../../config";

test.describe("Tickets - Function Tests", async () => {
  test("should test functionalities in tickets page", async ({ page }) => {
    await page.goto(testConfig.getUrl(testConfig.pages.tickets));
    await page.waitForLoadState("networkidle");

    // === Open Filter By Status Dropdown ===
    console.log("Opening 'Filter By Status' dropdown...");

    const statusFilter = page
      .getByText("All Status", { exact: true })
      .or(page.locator("button").filter({ hasText: /All Status/i }))
      .first();

    await statusFilter.scrollIntoViewIfNeeded();
    await statusFilter.waitFor({ state: "visible", timeout: 8000 });
    await statusFilter.click({ force: true });

    await page.waitForTimeout(700); // Give dropdown time to fully open

    console.log("Dropdown opened → Using keyboard to select...");

    // Keyboard navigation (most reliable for many Radix dropdowns)
    await page.keyboard.press("ArrowDown"); // Move to first option
    await page.waitForTimeout(300);
    await page.keyboard.press("Enter"); // Select it
    await page.waitForTimeout(2000);

    console.log("✅ Status Open option selected via keyboard");

    const statusFilter2 = page
      .getByText("All Status", { exact: true })
      .or(page.locator("button").filter({ hasText: /Open/i }))
      .first();

    await statusFilter2.scrollIntoViewIfNeeded();
    await statusFilter2.waitFor({ state: "visible", timeout: 8000 });
    await statusFilter2.click({ force: true });

    await page.waitForTimeout(700); // Give dropdown time to fully open

    console.log("Dropdown opened → Using keyboard to select...");

    // Keyboard navigation (most reliable for many Radix dropdowns)
    await page.keyboard.press("ArrowDown"); // Move to first option
    await page.waitForTimeout(300);
    await page.keyboard.press("Enter"); // Select it
    await page.waitForTimeout(2000);

    console.log("✅ Status In Progress option selected via keyboard");

    const statusFilter3 = page
      .getByText("All Status", { exact: true })
      .or(page.locator("button").filter({ hasText: /In Progress/i }))
      .first();

    await statusFilter3.scrollIntoViewIfNeeded();
    await statusFilter3.waitFor({ state: "visible", timeout: 8000 });
    await statusFilter3.click({ force: true });

    await page.waitForTimeout(700); // Give dropdown time to fully open

    console.log("Dropdown opened → Using keyboard to select...");

    // Keyboard navigation (most reliable for many Radix dropdowns)
    await page.keyboard.press("ArrowDown"); // Move to first option
    await page.waitForTimeout(300);
    await page.keyboard.press("Enter"); // Select it
    await page.waitForTimeout(2000);

    console.log("✅ Status In Completed option selected via keyboard");

    const statusFilter4 = page
      .getByText("All Status", { exact: true })
      .or(page.locator("button").filter({ hasText: /Completed/i }))
      .first();

    await statusFilter4.scrollIntoViewIfNeeded();
    await statusFilter4.waitFor({ state: "visible", timeout: 8000 });
    await statusFilter4.click({ force: true });

    await page.waitForTimeout(700); // Give dropdown time to fully open

    console.log("Dropdown opened → Using keyboard to select...");

    // Keyboard navigation (most reliable for many Radix dropdowns)
    await page.keyboard.press("ArrowDown"); // Move to first option
    await page.waitForTimeout(300);
    await page.keyboard.press("Enter"); // Select it
    await page.waitForTimeout(2000);

    console.log("✅ Status In Cancelled option selected via keyboard");
  });
});
