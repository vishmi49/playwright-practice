const { expect } = require('@playwright/test');
const { baseURL } = require('../../playwright.config');


exports.Login = class Login {   

constructor(page) { 
    this.page = page; 
    this.title = page.locator('.mat-mdc-card-title.mat-h1');
    this.username = page.locator('input[placeholder="Username"]'); 
    this.password = page.locator('input[placeholder="Password"]'); 
    this.loginButton = page.locator('mat-card-actions button:has-text("Login")'); 
    // this.errorMessage = page.locator('text=Invalid username or password'); 
    // this.successMessage = page.locator('text=You are logged in!'); 

}
}

