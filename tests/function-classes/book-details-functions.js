import { BookDetails } from "../pages/book-details";

class BookFunctions {
  constructor(page) {
    this.page = page;
    this.bookDetails = new BookDetails(page);
  }

  async clickAddToCart() {
    await this.bookDetails.addToCartButton.click();
  }
  async gotoBookDetails(bookId) {
    await this.page.goto(`${baseURL}/books/details/${bookId}`);
  }
}

module.exports = { BookFunctions };
