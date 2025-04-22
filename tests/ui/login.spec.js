const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');

test.describe('Salesforce Login', () => {
  test('should login successfully @smoke @ui @XRAY-123', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(process.env.SF_USERNAME, process.env.SF_PASSWORD);
    await loginPage.switchToLightning();
    await loginPage.assertLoggedIn();
  });

  test('should fail with invalid credentials @regression @ui @XRAY-124', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login('invalid@sf.com', 'wrongpassword');
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Please check your username and password');
  });
});