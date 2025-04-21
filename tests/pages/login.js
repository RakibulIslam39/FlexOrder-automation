const { expect } = require('@playwright/test');

class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameField = page.getByLabel('Username or Email Address');
        this.passwordField = page.getByLabel('Password', { exact: true });
        this.loginButton = page.getByRole('button', { name: 'Log In' });
        this.dashboardButton = page.locator("a[class='wp-first-item wp-has-submenu wp-has-current-submenu wp-menu-open menu-top menu-top-first menu-icon-dashboard menu-top-first menu-top-last'] div[class='wp-menu-name']");
    }

    async navigate() {
        await this.page.goto(process.env.URL);
    }

    async login() {
        await this.usernameField.fill(process.env.USER_NAME);
        await this.passwordField.fill(process.env.PASSWORD);
        await this.loginButton.click();

        await this.dashboardButton.click();
        await expect(this.page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    }
}

module.exports = { LoginPage };
