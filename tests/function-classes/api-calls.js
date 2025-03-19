const axios = require('axios');

async function getBookDetails(bookId, token) {
  const url = `https://bookcart.azurewebsites.net/api/Book/${bookId}`;
  const headers =  {
    'Authorization': 'bearer ' + token
  }
  try {
    const response = await axios.get(url, token);
    if (response.status === 200) {
      const bookDetails = response.data;
      const { title, author, category, price } = bookDetails;
      console.log('Book details:', title, author, category, price);
      return bookDetails;
    }
  } catch (error) {
    console.error('Error fetching book details:', error);
    throw error;
  }
}

async function userLogin(userData) {
  const url = "https://bookcart.azurewebsites.net/api/Login";
  const response = await axios.post(url, userData);



  console.log('User logged in:', response.data);
  return response.data;
}

// async function registerUser(userData) {
//   const url = `https://bookcart.azurewebsites.net/api/User`;
//   try {
//     console.log('Registering user with data:', userData);
//     const response = await axios.post(url, userData);
//     return response.data;
//   } catch (error) {
//     if (error.response) {
//       console.error('Error registering user:', error.response.data);
//       console.error('Status code:', error.response.status);
//       console.error('Headers:', error.response.headers);
//     } else {
//       console.error('Error registering user:', error.message);
//     }
//     throw error;
//   }
// }

async function addBookToCart(userId, bookId, token) {
  const url = `https://bookcart.azurewebsites.net/api/ShoppingCart/AddToCart/${userId}/${bookId}`;
  const headers =  {
    'Authorization': 'bearer ' + token
  }

  try {
    const response = await axios.post(url, headers);
    console.log(response.data)
    console.log('Book added to cart:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error adding book to cart:', error.response ? error.response.data : error);
    throw error;
  }
}

async function removeBookFromCart(userId, bookId, token) {
  const url = `https://bookcart.azurewebsites.net/api/ShoppingCart/RemoveFromCart/${userId}/${bookId}`;
  const headers =  {
    'Authorization': 'bearer ' + token
  }

  try {
    const response = await axios.delete(url, headers);
    return response.data;
  } catch (error) {
    console.error('Error removing book from cart:', error.response ? error.response.data : error);
    throw error;
  }
}

module.exports = { getBookDetails, userLogin, addBookToCart, removeBookFromCart };