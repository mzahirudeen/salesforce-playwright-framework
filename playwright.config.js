const { devices } = require("@playwright/test");
require("dotenv").config();

module.exports = {
  testDir: "./tests",
  testMatch: "**/*.spec.js",
  timeout: 30000,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 4 : "50%",
  reporter: [
    ["html", { outputFolder: "reports/playwright-report" }],
    ["allure-playwright", { outputFolder: "reports/allure-results" }],
  ],
  use: {
    baseURL: process.env.BASE_URL || "https://login.salesforce.com",
    headless: process.env.HEADLESS !== "false",
    viewport: { width: 1280, height: 720 },
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
};
