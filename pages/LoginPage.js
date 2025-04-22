const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.url = '/';
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#Login');
    this.errorMessage = page.locator('#error');
    this.lightningToggle = page.locator('text=Switch to Lightning Experience');
  }

  async navigate() {
    await this.page.goto(this.url);
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async switchToLightning() {
    if (await this.lightningToggle.isVisible()) {
      await this.lightningToggle.click();
      await this.page.waitForLoadState('networkidle');
    }
  }

  async getErrorMessage() {
    return this.errorMessage.textContent();
  }

  async assertLoggedIn() {
    await expect(this.page).toHaveURL(/home/i);
  }
}

module.exports = { LoginPage };