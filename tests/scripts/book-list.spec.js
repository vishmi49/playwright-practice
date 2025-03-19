const { test, expect } = require("@playwright/test");
const { BookList } = require("../pages/book-list");
const config = require("../../playwright.config");
const { BookDetails } = require("../pages/book-details");
const {
  BookListFunctions,
} = require("../function-classes/book-list-functions");

test.describe("Book List Tests", () => {
  const bookName = "The Help";
  
  test("Search for a book", async ({ page }) => {
   const bookList = new BookList(page);
   const bookListFunctions = BookListFunctions.getInstance(page);
    
    await page.goto(config.use.baseURL);
    await bookListFunctions.searchBook(bookName);
    await bookListFunctions.selectBook(bookName);

    await expect(bookList.BookListContainer).toHaveCount(1);
    await expect(bookList.SearchResultTitle).toHaveText(bookName);
  }, 60000);

  test("Filter books by category", async ({ page }) => {
    const bookList = new BookList(page);
    const bookListFunctions = BookListFunctions.getInstance(page);
    const bookDetails = new BookDetails(page);

    const category = "Fiction";
    
    await page.goto(config.use.baseURL);
    await bookListFunctions.filterCategory(category);
    await bookList.SearchResultTitle.first().click();
    
    await page.waitForTimeout(5000);
    await expect(bookDetails.title).toHaveText("Book Details");
    await expect(bookDetails.bookCategory).toHaveText(category);
  });

  test("Filter books by price", async ({ page }) => {
    const bookPrice = 511;
    const bookList = new BookList(page);
    const bookListFunctions = BookListFunctions.getInstance(page);
    const bookDetails = new BookDetails(page);

    await page.goto(config.use.baseURL);
    await bookListFunctions.filterPrice(bookPrice);
    await page.waitForTimeout(5000);
    await expect(page.locator('.mdc-slider__value-indicator-text')).toHaveText(bookPrice.toString()); 
    
  })

})
    
    
     
 
       
          
    
     

