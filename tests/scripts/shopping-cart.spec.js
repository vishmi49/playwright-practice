const { test, expect } = require("@playwright/test");
const fs = require('fs');
const path = require('path');
const { addBookToCart, getBookDetails, removeBookFromCart } = require("../function-classes/api-calls");
const { ShoppingCart } = require("../pages/shopping-cart");

const authFile = path.join(__dirname, '../.auth/user.json');

test.describe("Shopping Cart Tests", () => {
  let userId;
  let bookId = 2;
  let bookTitle;
  let token;

  // Use the saved session from authFile
  test.use({ storageState: authFile });

  test.beforeEach(async ({ page }) => {
    try {
      // Read the userId and token directly from user.json
      const authData = JSON.parse(fs.readFileSync(authFile, 'utf8'));
      const originData = authData.origins.find(o => o.origin === "https://bookcart.azurewebsites.net");
      const userLocalStorage = originData.localStorage;

      userId = userLocalStorage.find(item => item.name === "userId").value;
      token = userLocalStorage.find(item => item.name === "authToken").value;

      console.log('User Id:', userId);
      console.log('Token:', token);

      // Add book to cart and fetch book details
      await addBookToCart(userId, bookId, token);
      const bookDetails = await getBookDetails(bookId, token);
      bookTitle = bookDetails.title;
      console.log('Added book to cart:', bookTitle);
    } catch (error) {
      console.error('Error during setup:', error);
      throw error;
    }
  });

  test("should display shopping cart", async ({ page }) => {
    const shoppingCart = new ShoppingCart(page);

    // Navigate to the shopping cart page
    await page.goto('https://bookcart.azurewebsites.net/shopping-cart');

    // Assert the title of the shopping cart page
    await expect(shoppingCart.title).toHaveText(" Shopping cart ");
  });

  test("should increase item quantity", async ({ page }) => {
    const shoppingCart = new ShoppingCart(page);

    // Navigate to the shopping cart page
    await page.goto('https://bookcart.azurewebsites.net/shopping-cart');

    // Increase the item quantity
    await shoppingCart.addIcon.click();
    await expect(shoppingCart.bookQuantity).toHaveText("2");
  });

  test.afterEach(async () => {
    try {
      // Remove the book from the cart to clean up after the test
      await removeBookFromCart(userId, bookId, token);
    } catch (error) {
      console.error('Error during teardown:', error);
    }
  });
});
