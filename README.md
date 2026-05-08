# 🎭 Agile Digest - Playwright Test Automation

A comprehensive end-to-end (E2E) test automation suite for **Agile Digest** using **Playwright**. This suite ensures the quality and reliability of the Agile Digest web application across all critical user workflows.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Writing Tests](#writing-tests)
- [Test Categories](#test-categories)
- [Best Practices](#best-practices)
- [Debugging & Troubleshooting](#debugging--troubleshooting)
- [CI/CD Integration](#cicd-integration)
- [Reports & Analytics](#reports--analytics)

---

## 🎯 Overview

This Playwright automation suite provides comprehensive testing for the Agile Digest platform:

- **UI Testing**: Functional and static validation of all major features
- **API Testing**: Direct API endpoint validation
- **Multi-browser Support**: Chrome, Firefox, WebKit
- **Parallel Execution**: Faster test runs with concurrent workers
- **HTML Reporting**: Detailed test reports with screenshots and videos
- **CI/CD Ready**: GitHub Actions integration included

---

## 📁 Project Structure

```
Auto/
├── tests/
│   ├── API/                          # API-level tests
│   ├── UI/                           # UI tests organized by feature
│   │   ├── Dashboard/
│   │   │   ├── Function/            # Functional tests
│   │   │   └── Static/              # Static/visual tests
│   │   ├── Projects/
│   │   ├── Sprints/
│   │   ├── Tickets/
│   │   │   ├── Positive/            # Happy path scenarios
│   │   │   ├── Function/
│   │   │   └── Static/
│   │   └── Users/
│   └── config.ts                     # Centralized test config
├── playwright.config.ts              # Playwright configuration
├── package.json                      # Dependencies
├── tsconfig.json                     # TypeScript config
├── .env.local                        # Environment variables
└── playwright-report/                # Generated test reports

```

### Test Organization

- **Function Tests**: Validate core functionality, workflows, and interactions
- **Static Tests**: Validate UI elements, layouts, and visual consistency
- **Positive Tests**: Test valid/happy path scenarios (create, update, delete)
- **API Tests**: Test backend endpoints directly

---

## 🔧 Prerequisites

- **Node.js**: v18 or higher
- **npm** or **yarn**: v9+
- **Agile Digest Frontend**: Running on `http://localhost:3003`
- **Agile Digest API**: Running on `http://localhost:3001`

---

## 📦 Installation

### 1. Clone and Setup

```bash
cd Auto
npm install
```

### 2. Create Environment File

Copy `.env.local` and configure:

```bash
# .env.local
BASE_URL=http://localhost:3003
API_BASE_URL=http://localhost:3001
```

### 3. Verify Installation

```bash
npx playwright --version
```

---

## ⚙️ Configuration

### `tests/config.ts` - Centralized Settings

```typescript
export const testConfig = {
  baseUrl: process.env.BASE_URL || "http://localhost:3003",
  api: {
    baseUrl: process.env.API_BASE_URL || "http://localhost:3001",
  },
  timeouts: {
    navigation: 30000,
    networkIdle: 10000,
  },
  pages: {
    home: "/",
    users: "/users",
    projects: "/projects",
    sprints: "/sprints",
    tickets: "/tickets",
  },
};
```

**Usage in Tests:**

```typescript
await page.goto(testConfig.getUrl(testConfig.pages.tickets));
```

---

## 🚀 Running Tests

### Run All Tests

```bash
npx playwright test
```

### Run Specific Test File

```bash
npx playwright test tests/UI/Tickets/Positive/create.ticket.example.spec.ts
```

### Run Tests by Pattern

```bash
# Run all Tickets tests
npx playwright test tests/UI/Tickets

# Run all Function tests
npx playwright test --grep "Function"

# Run all Positive tests
npx playwright test tests/UI/Tickets/Positive
```

### Run with Specific Browser

```bash
# Chrome only
npx playwright test --project=chromium

# Firefox only
npx playwright test --project=firefox

# WebKit only
npx playwright test --project=webkit
```

### Run in Debug Mode

```bash
# Interactive debug mode
npx playwright test --debug

# With UI mode (visual debugging)
npx playwright test --ui
```

### Run with Options

```bash
# Headed mode (see browser)
npx playwright test --headed

# Parallel workers
npx playwright test --workers=4

# Single worker
npx playwright test --workers=1

# Retry failed tests
npx playwright test --repeat-each=2
```

---

## ✍️ Writing Tests

### Basic Test Template

```typescript
import { test, expect } from "@playwright/test";
import { testConfig } from "../../../config";

test.describe("Feature Name - Test Suite", () => {
  test("should perform specific action", async ({ page }) => {
    // 1. NAVIGATE
    await page.goto(testConfig.getUrl(testConfig.pages.tickets));
    await page.waitForLoadState("networkidle");

    // 2. INTERACT
    await page.getByRole("button", { name: /add/i }).click();
    await page.waitForTimeout(600);

    // 3. VERIFY
    await expect(page.locator("form")).toBeVisible();
    console.log("✅ Test passed");
  });
});
```

### Key Locating Strategies

#### 1. **Role-Based Selectors** (Recommended)

```typescript
// Most accessible, reflects UI semantics
await page.getByRole("button", { name: /add ticket/i }).click();
await page.getByRole("heading", { level: 1 }).textContent();
```

#### 2. **Text Content**

```typescript
// Find by exact or partial text
const trigger = form.getByText("Select project", { exact: true }).first();
await trigger.click();
```

#### 3. **CSS Selectors**

```typescript
// Use as fallback
await page.locator('button[data-testid="submit"]').click();
await page.locator('[role="combobox"]').first().click();
```

#### 4. **Combining Filters**

```typescript
// Find button containing "project" text
const projectButton = form
  .locator('button, [role="combobox"]')
  .filter({ hasText: /Select project|project/i })
  .first();
```

### Handling Dropdowns (Radix UI)

```typescript
// Open dropdown
const projectTrigger = form
  .locator('button, [role="combobox"]')
  .filter({ hasText: /Select project/i })
  .first();

await projectTrigger.click({ force: true });
await page.waitForTimeout(600);

// Select option using keyboard
await projectTrigger.press("ArrowDown");
await page.waitForTimeout(400);
await projectTrigger.press("Enter");

// Verify text changed
await expect(projectTrigger).not.toContainText("Select project", {
  timeout: 5000,
});
const selectedText = await projectTrigger.textContent();
console.log(`✅ Selected: ${selectedText?.trim()}`);
```

### Common Assertions

```typescript
// Visibility
await expect(page.locator("form")).toBeVisible();
await expect(button).toBeHidden();

// Text content
await expect(heading).toContainText("Dashboard");
await expect(button).not.toContainText("Disabled");
await expect(button).toHaveText(/exact text/);

// Enabled/Disabled
await expect(button).toBeEnabled();
await expect(button).toBeDisabled();

// Count
await expect(rows).toHaveCount(5);

// Attribute values
await expect(button).toHaveAttribute("aria-expanded", "true");
```

### Waiting Strategies

```typescript
// Wait for network to idle
await page.waitForLoadState("networkidle");

// Wait for specific element
await page.waitForSelector('[role="listbox"]', { timeout: 5000 });

// Wait for element state
await element.waitFor({ state: "visible", timeout: 10000 });

// Custom timeout
await page.waitForTimeout(600);
```

---

## 📊 Test Categories

### Function Tests

**Purpose**: Validate core functionality and user workflows

```typescript
// Example: Verify user can create a new ticket
test("should create new ticket successfully", async ({ page }) => {
  await page.goto(testConfig.getUrl(testConfig.pages.tickets));
  await page.getByRole("button", { name: /add ticket/i }).click();
  // ... fill form, submit, verify
});
```

### Static Tests

**Purpose**: Validate UI elements are present and correctly positioned

```typescript
// Example: Verify Dashboard has all required sections
test("should display all dashboard sections", async ({ page }) => {
  await page.goto(testConfig.getUrl(testConfig.pages.dashboard));
  await expect(page.getByRole("heading", { name: /Overview/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Recent/i })).toBeVisible();
});
```

### Positive Tests

**Purpose**: Test happy path scenarios with valid inputs

```typescript
// Example: Valid ticket creation, filtering, deletion
test("should filter tickets by status", async ({ page }) => {
  // navigate → filter → verify results
});
```

---

## ✅ Best Practices

### 1. **Use Test Config for URLs**

```typescript
// ❌ BAD
await page.goto("http://localhost:3003/tickets");

// ✅ GOOD
await page.goto(testConfig.getUrl(testConfig.pages.tickets));
```

### 2. **Specific Waits, Not Generic Sleeps**

```typescript
// ❌ BAD
await page.waitForTimeout(2000);

// ✅ GOOD
await page.waitForLoadState("networkidle");
await expect(form).toBeVisible();
```

### 3. **Use Role Selectors When Possible**

```typescript
// ❌ BAD
await page.locator(".button-add-ticket").click();

// ✅ GOOD
await page.getByRole("button", { name: /add ticket/i }).click();
```

### 4. **Meaningful Test Names**

```typescript
// ❌ BAD
test("should work", async ({ page }) => {

// ✅ GOOD
test("should create ticket and verify it appears in list", async ({ page }) => {
```

### 5. **Organize Related Tests**

```typescript
test.describe("Ticket Management", () => {
  test("should create ticket", async ({ page }) => { ... });
  test("should edit ticket", async ({ page }) => { ... });
  test("should delete ticket", async ({ page }) => { ... });
});
```

### 6. **Use Logging for Debugging**

```typescript
console.log("✅ Ticket created successfully");
console.log(`Selected project: ${selectedText?.trim()}`);
```

### 7. **Consistent Waits After Actions**

```typescript
await projectTrigger.click({ force: true });
await page.waitForTimeout(600); // Allow dropdown to render

await projectTrigger.press("ArrowDown");
await page.waitForTimeout(400); // Allow selection highlight
```

---

## 🐛 Debugging & Troubleshooting

### Test Timeout Issues

**Problem**: "Test timeout of 30000ms exceeded"

**Solutions**:

```typescript
// 1. Use specific waits instead of generic waits
await page.waitForLoadState("networkidle");

// 2. Increase timeout for specific actions
await page.waitForSelector('[role="option"]', { timeout: 10000 });

// 3. Add debugging logs
console.log("Waiting for dropdown...");
```

### Element Not Found

**Problem**: "Locator: locator('button') failed: element(s) not found"

**Solutions**:

```typescript
// 1. Use more flexible selector
const button = page
  .locator('button, [role="button"]')
  .filter({ hasText: /add/i })
  .first();

// 2. Check element exists before interaction
if ((await button.count()) > 0) {
  await button.click();
}

// 3. Scroll into view if needed
await button.scrollIntoViewIfNeeded();
```

### Dropdown Not Opening

**Problem**: Can click dropdown but options don't appear

**Solutions**:

```typescript
// 1. Use force click
await dropdownButton.click({ force: true });

// 2. Add delay for rendering
await page.waitForTimeout(600);

// 3. Use keyboard navigation
await dropdownButton.press("ArrowDown");
await page.waitForTimeout(400);
await dropdownButton.press("Enter");
```

### Run in Debug Mode

```bash
npx playwright test --debug
npx playwright test --ui
```

### Inspect Element

```typescript
// Pause and inspect
await page.pause();

// Take screenshot
await page.screenshot({ path: "debug.png" });
```

---

## 🔄 CI/CD Integration

### GitHub Actions

Located in `.github/workflows/playwright.yml`:

```yaml
name: Playwright Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

### Local CI Simulation

```bash
# Run with CI settings
CI=true npx playwright test

# This will:
# - Retry failed tests 2x
# - Use single worker
# - Fail if test.only is left in code
```

---

## 📊 Reports & Analytics

### Generate HTML Report

```bash
npx playwright test
# Report auto-generated in playwright-report/
```

### View Report

```bash
npx playwright show-report
```

### Report Contents

- ✅ Passed/Failed test counts
- ⏱️ Test execution times
- 📸 Screenshots of failures
- 🎥 Video recordings
- 📋 Test steps breakdown

---

## 📞 Common Commands Reference

| Command                                | Purpose              |
| -------------------------------------- | -------------------- |
| `npm install`                          | Install dependencies |
| `npx playwright test`                  | Run all tests        |
| `npx playwright test --debug`          | Debug mode           |
| `npx playwright test --ui`             | Visual debugging     |
| `npx playwright test --headed`         | See browser          |
| `npx playwright test --grep "Tickets"` | Run matching tests   |
| `npx playwright show-report`           | View last report     |
| `npx playwright codegen`               | Record test steps    |

---

## 🤝 Contributing

When adding new tests:

1. **Follow naming convention**: `feature.action.spec.ts`
2. **Use test config**: Import `testConfig` from `../../../config`
3. **Add console logs**: Use `console.log()` for debugging
4. **Organize in describe blocks**: Group related tests
5. **Use role selectors**: Prefer accessibility-focused locators
6. **Test in all browsers**: Run with `--project=chromium`, etc.

---

## 📝 Example Test Suite

```typescript
import { test, expect } from "@playwright/test";
import { testConfig } from "../../../config";

test.describe("Tickets - Create Ticket", () => {
  test("should create new ticket with all fields", async ({ page }) => {
    // Navigate
    await page.goto(testConfig.getUrl(testConfig.pages.tickets));
    await page.waitForLoadState("networkidle");

    // Open modal
    await page.getByRole("button", { name: /add ticket/i }).click();
    await expect(page.locator("form")).toBeVisible();

    // Select project
    const projectTrigger = page
      .locator("form")
      .locator('button, [role="combobox"]')
      .filter({ hasText: /select project/i })
      .first();

    await projectTrigger.click({ force: true });
    await page.waitForTimeout(600);
    await projectTrigger.press("ArrowDown");
    await projectTrigger.press("Enter");

    // Fill form
    await page.getByLabel(/title/i).fill("New Ticket");
    await page.getByLabel(/description/i).fill("Test description");

    // Submit
    await page.getByRole("button", { name: /create|save/i }).click();

    // Verify
    await expect(page.getByText("Ticket created")).toBeVisible();
    console.log("✅ Ticket created successfully");
  });
});
```

---

## 📖 Useful Resources

- [Playwright Documentation](https://playwright.dev)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Locator Guide](https://playwright.dev/docs/locators)
- [API Testing](https://playwright.dev/docs/api-testing)

---

**Happy Testing! 🚀**
