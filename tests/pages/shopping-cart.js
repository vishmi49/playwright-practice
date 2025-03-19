const { expect } = require("@playwright/test");
const { baseURL } = require('../../playwright.config');

exports.ShoppingCart = class ShoppingCart {
  constructor(page) { 
    this.page = page;
    this.title = page.locator('.mat-mdc-card-header-text').first();
    this.clearCartButton = page.locator('button:has-text("Clear Cart")');
    this.checkoutButton = page.locator('button:has-text("Checkout")');
    this.cartItems = page.locator('table.mat-mdc-table tbody');
    this.tableRow = page.locator('table.mat-mdc-table tbody tr').nth(1);
    this.deleteItemButton = this.tableRow.locator('button:has-text("Delete")');
    this.cartTotal = page.locator('mat-card-content:nth-of-type(2) td.mat-mdc-cell:nth-of-type(5) strong');
    this.bookTitle = this.tableRow.locator('td').nth(1);
    this.bookQuantity = this.tableRow.locator('td').nth(3);
    this.itemTotal = this.tableRow.locator('td').nth(4);
    // this.plusIcon = this.tableRow.locator('.mat-mdc-focus-indicator').nth(1);
    this.removeIcon = this.tableRow.locator('button mat-icon:has-text("remove_circle")');

// Locator for the "add" icon button in the first row
    this.addIcon = this.tableRow.locator('button mat-icon:has-text("add_circle")');
  }

  // async getTableRow() {
  //   return this.tableRow;
  // }

  // async init() {
  //   this.plusIcon = this.tableRow.locator('button.mat-mdc-icon-button.mat-warn mat-icon[aria-hidden="true"]').nth(1); // Second element
  //   this.minusIcon = this.tableRow.locator('button.mat-mdc-icon-button.mat-warn mat-icon[aria-hidden="true"]').nth(2);
  // }

  // async init() {
  //   this.plusIcon = await this.page.evaluate(() => {
  //     return Array.from(document.querySelectorAll('button.mat-mdc-icon-button.mat-warn mat-icon[aria-hidden="true"]'))
  //       .find(icon => icon.innerHTML.includes('add_circle'));
  //   });

  //   this.minusIcon = await this.page.evaluate(() => {
  //     return Array.from(document.querySelectorAll('button.mat-mdc-icon-button.mat-warn mat-icon[aria-hidden="true"]'))
  //       .find(icon => icon.innerHTML.includes('remove_circle'));
  //   });
  // }
}
