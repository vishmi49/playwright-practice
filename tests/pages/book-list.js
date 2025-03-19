const { expect } = require("@playwright/test");
const { baseURL } = require('../../playwright.config');

exports.BookList = class BookList {

  constructor(page) {
    this.page = page;
    this.SearchInput = page.locator('input[placeholder="Search books or authors"]' );
    this.AutocompleteList = page.locator('.cdk-overlay-pane');
    this.AutocompleteListItem = page.locator('.mat-mdc-autocomplete-panel .mat-mdc-option')
    this.SearchResultTitle = page.locator('app-book-card mat-card-content a strong');
    this.BookListContainer = page.locator('.card-deck-container');
    this.FilterCategory = page.locator('mat-nav-list > mat-list-item');
    this.FilterPrice = page.locator('input[type="range"]');
    this.FilterPriceNob  = page.locator('.mdc-slider__thumb-knob');
    this.FilterPriceInput = page.locator('input[type="range"].mdc-slider__input');
    this.FilterPriceValue = page.locator('input[type="range"].mdc-slider__input[aria-valuetext="311"]');
    this.loggedInUser = page.locator('.mat-toolbar-row .mat-mdc-menu-trigger .mdc-button__label');

  }
};
