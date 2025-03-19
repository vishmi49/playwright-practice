import { BookList } from "../pages/book-list";

class BookListFunctions {
  constructor(page) {
    if (BookListFunctions.instance) {
      return BookListFunctions.instance;
    }
    this.page = page;
    this.bookList = new BookList(page);
    BookListFunctions.instance = this;
  }

  static getInstance(page) {
    if (!BookListFunctions.instance) {
      BookListFunctions.instance = new BookListFunctions(page);
    }
    return BookListFunctions.instance;
  }

  async searchBook(bookName) {
    await this.bookList.SearchInput.fill(bookName);
    await this.bookList.AutocompleteList.waitFor();
  }

  async selectBook(bookName) {
    const item = await this.bookList.AutocompleteListItem.locator(
      `text=${bookName}`
    );
    await item.click();
  }

  async filterCategory(category) {
    const item = await this.bookList.FilterCategory.locator(`text=${category}`);
    await item.click();
  }

  async filterPrice(bookPrice) {
    await this.bookList.FilterPriceNob.waitFor({
      state: "visible",
      timeout: 60000,
    });
    await this.bookList.FilterPrice.evaluate((node, price) => {
      node.value = price.toString();
      node.dispatchEvent(new Event("input"));
      node.dispatchEvent(new Event("change"));
    }, bookPrice);
  }
}

module.exports = { BookListFunctions };
