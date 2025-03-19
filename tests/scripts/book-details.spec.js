const { test, expect } = require("@playwright/test");
const { BookDetails } = require("../pages/book-details");
const { BookFunctions } = require("../function-classes/book-details-functions");
const { getBookDetails } = require("../function-classes/api-calls");
const config = require("../../playwright.config")

test.describe("Book Details", () => {
  let bookDetails;
  let bookFunctions;
  let bookData;

  test.beforeEach(async ({ page }) => {
    const bookId = 2;
    bookData = await getBookDetails(bookId);
    await page.goto(`${config.use.baseURL}/books/details/${bookId}`);
    bookDetails = new BookDetails(page);
    bookFunctions = new BookFunctions(page);
  });

  test("should display book details", async ({ page }) => {
    await expect(bookDetails.title).toHaveText("Book Details");
    await expect(bookDetails.bookTitle).toHaveText(bookData.title);
    await expect(bookDetails.bookAuthor).toHaveText(bookData.author);
    await expect(bookDetails.bookCategory).toHaveText(bookData.category);
    await expect(bookDetails.bookPrice).toHaveText(`₹${bookData.price}.00`);
  });

  test("should add book to cart", async ({ page }) => {
    await bookFunctions.clickAddToCart() ;
    await expect(bookDetails.cartConfirmationMessage).toBeVisible();

  });
});
