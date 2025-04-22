const { test, expect } = require('@playwright/test');
const { SalesforceApiClient } = require('../../utils/SalesforceApiClient');
const { LoginPage } = require('../../pages/LoginPage');

test.describe('Contact Creation', () => {
  test('create contact via API and verify in UI @regression @hybrid @XRAY-125', async ({ page }) => {
    // API: Create contact
    const apiClient = new SalesforceApiClient();
    const contactData = {
      FirstName: 'John',
      LastName: 'Doe',
      Email: 'john.doe@example.com'
    };
    const response = await apiClient.createRecord('Contact', contactData);
    const contactId = response.id;

    // UI: Verify contact
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(process.env.SF_USERNAME, process.env.SF_PASSWORD);
    await page.goto(`/lightning/r/Contact/${contactId}/view`);
    const contactName = await page.locator('lightning-formatted-name').textContent();
    expect(contactName).toBe('John Doe');
  });
});