const { expect } = require('@playwright/test');
const { baseURL } = require('../../playwright.config');

exports.BookDetails = class BookDetails {

  constructor(page) {
    this.page = page
    this.title = page.locator('.mat-mdc-card-header-text .mat-mdc-card-title.mat-h1').first();
    this.bookTitle = page.locator('.table.table-lg > tbody > tr:first-child > td:nth-child(2)');
    this.bookAuthor = page.locator('.table.table-lg > tbody > tr:nth-child(2) > td:nth-child(2)');
    this.bookCategory = page.locator('.table.table-lg > tbody > tr:nth-child(3) > td:nth-child(2)');
    this.bookPrice = page.locator('.table.table-lg > tbody > tr:nth-child(4) > td:nth-child(2)');
    this.bookImage = page.locator('.mat-mdc-card-image img');

    this.bookCardContent = page.locator('.mat-mdc-card-content.row.g-0.d-flex.p-3');
    this.addToCartButton = this.bookCardContent.locator('button:has-text("Add to Cart")');
    this.cartConfirmationMessage = page.locator('text=One Item added to cart');

    this.similarBooksSection = page.locator('app-similarbooks');
    this.similarBooksTitle = this.similarBooksSection.locator('.mat-mdc-card-header-text .mat-mdc-card-title.mat-h1');
    this.similarBooks = page.locator('.mat-mat-mdc-card-content p-3-card');


}

}



