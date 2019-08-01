import axios from "axios";
const apiKey = 'AIzaSyC1ev3yy_iWA17_oO6SWUpYZgB4ERdQGic'
const endPoint = 'https://www.googleapis.com/books/v1/volumes?q='

export default {
  // Gets all books
  getBooks: function() {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
    saveBook: function (bookId) {
       return this.searchBook(bookId)
       
    },
    searchBook: function (bookId) {
        const endpoint = 'https://www.googleapis.com/books/v1/volumes/' + bookId + '?key=' + apiKey
        return axios.get(endpoint)
    },
  searchBooks: function (params) {
      let url = endPoint + params.query + "&maxResults=" + params.maxResults + "&startIndex=" + params.startIndex + "&key=" + apiKey
        return axios.get(url)
  }
};
