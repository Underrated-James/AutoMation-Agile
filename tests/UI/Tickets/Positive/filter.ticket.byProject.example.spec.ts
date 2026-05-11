import { test } from "@playwright/test";
import { testConfig } from "../../../config";

test.describe("Tickets - Function Tests", async () => {
  test("should test functionalities in tickets page", async ({ page }) => {
    await page.goto(testConfig.getUrl(testConfig.pages.tickets));
    await page.waitForLoadState("networkidle");

    // === Open Filter By Status Dropdown ===
    console.log("Opening 'Filter By Project' dropdown...");

    const statusFilter = page
      .getByText("All Projects", { exact: true })
      .or(page.locator("button").filter({ hasText: /All Projects/i }))
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

    console.log("✅ Project Open option selected via keyboard");

    const statusFilter2 = page
      .getByText("TRT - test22", { exact: true })
      .or(page.locator("button").filter({ hasText: /TRT - test22/i }))
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

    console.log("Filter by Project option selected via keyboard");

    const statusFilter3 = page
      .getByText("KDK - Kondo Ko", { exact: true })
      .or(page.locator("button").filter({ hasText: /KDK - Kondo Ko/i }))
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

    console.log("Filter by Project option selected via keyboard");

    const statusFilter4 = page
      .getByText("RIA - Repnote", { exact: true })
      .or(page.locator("button").filter({ hasText: /RIA - Repnotes/i }))
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

    console.log("Filter by Project option selected via keyboard");


    const statusFilter5 = page
      .getByText("NMBS - Nimbus", { exact: true })
      .or(page.locator("button").filter({ hasText: /NMBS - Nimbus/i }))
      .first();

    await statusFilter5.scrollIntoViewIfNeeded();
    await statusFilter5.waitFor({ state: "visible", timeout: 8000 });
    await statusFilter5.click({ force: true });

    await page.waitForTimeout(700); // Give dropdown time to fully open

    console.log("Dropdown opened → Using keyboard to select...");

    // Keyboard navigation (most reliable for many Radix dropdowns)
    await page.keyboard.press("ArrowDown"); // Move to first option
    await page.waitForTimeout(300);
    await page.keyboard.press("Enter"); // Select it
    await page.waitForTimeout(2000);

    console.log("Filter by Project option selected via keyboard");
  });
});
