/**
 * Centralized test configuration
 * Single source of truth for all test environment settings
 */

export const testConfig = {
  // Base URL configuration
  baseUrl: process.env.BASE_URL || "http://localhost:3003",

  // API endpoints
  api: {
    baseUrl: process.env.API_BASE_URL || "http://localhost:3001",
  },

  // Timeout settings
  timeouts: {
    navigation: 30000,
    networkIdle: 10000,
  },

  // Page routes
  pages: {
    home: "/",
    users: "/users",
    projects: "/projects",
    sprints: "/sprints",
    tickets: "/tickets",
  },

  // Helper method to construct full URLs
  getUrl: (path: string): string => {
    return `${testConfig.baseUrl}${path}`;
  },
};

/**
 * Usage in tests:
 *
 * import { testConfig } from "../config";
 *
 * test.beforeEach(async ({ page }) => {
 *   await page.goto(testConfig.getUrl(testConfig.pages.users));
 * });
 */
