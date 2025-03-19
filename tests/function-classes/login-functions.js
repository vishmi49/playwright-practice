const { Login } = require('../pages/login');

class LoginFunctions {  
  constructor(page) { 
    if (LoginFunctions.instance) {
      return LoginFunctions.instance;
    }
    this.page = page;
    this.loginPage = new Login(page);
    LoginFunctions.instance = this;
  }

  static getInstance(page) {
    if (!LoginFunctions.instance) {
      LoginFunctions.instance = new LoginFunctions(page);
    }
    return LoginFunctions.instance;
  }

  async login(username, password) {
    await this.loginPage.username.fill(username);
    await this.loginPage.password.fill(password);
    await this.loginPage.loginButton.click();
  }
}

module.exports = { LoginFunctions };