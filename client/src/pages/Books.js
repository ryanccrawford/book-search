import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import Pagenation from "../components/Pagenation";
import SearchResults from "../components/SearchResults";

class Books extends Component {
  state = {
    books: [],
    title: "",
    author: "",
      synopsis: "",
      googleBooks: [],
      startIndex: 0,
      maxResults: 8,
      totalItems: 0
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, title: "", author: "", synopsis: "" })
      )
      .catch(err => console.log(err));
    };

    showBooks = (googleBooks) => {
        console.log(googleBooks)
        let totalItems = googleBooks.data.totalItems
        let books = googleBooks.data.items
        console.log(books)
        this.setState({ googleBooks: books, totalItems: totalItems})
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
      event.preventDefault();
      
      if (this.state.title) {
          let newStartIndex = event.target.getAttribute("data-index");
          if (parseInt(newStartIndex) > 0) {
              this.setState({ startIndex: newStartIndex }, this.search)
          } else {
              this.search()
          }
        
    }
  };

    search = () => {
        API.searchBooks({ query: this.state.title, maxResults: this.state.maxResults, startIndex: this.state.startIndex }).then(
            res => this.showBooks(res))
            .catch(err => console.log(err));
    }

    render() {
        let showNextPage = false;
        let showPrevPage = false;
        let nextPage = 0;
        let prevPage = 0;
        let thisPage = 0;
        let totalPages = 0;
        let mr = parseInt(this.state.maxResults)
        
        if (parseInt(this.state.totalItems) > parseInt(this.state.maxResults)) {
            thisPage = parseInt(this.state.startIndex)
            totalPages = parseInt(parseInt(this.state.totalItems) / parseInt(this.state.maxResults))
            if (!this.state.totalItems % this.state.maxResults) {
                totalPages++
            }
            if ((totalPages - thisPage) > 0 && ((thisPage + mr) <= totalPages)) {
                nextPage = thisPage + mr
                showNextPage = true
            }
            if ((thisPage) > mr) {
                prevPage = thisPage - mr
                showPrevPage = true
            }


        }
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>Search Google Books?</h1>
            </Jumbotron>
              <form>
            <div className="form-row align-items-center">
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <FormBtn
                disabled={!(this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Search
              </FormBtn>
             </div>
                    </form>

                    <Col size="md-12">
                        {this.state.googleBooks.length > 0 ? (
                            <div>
                                <SearchResults
                                books={this.state.googleBooks}
                            >
                            </SearchResults>
                            <Pagenation
                                showNextPage={showNextPage}
                                showPrevPage={showPrevPage}
                                nextPage={nextPage}
                                prevPage={prevPage}
                                thisPage={thisPage}
                                    totalPages={totalPages}
                                    maxResults={mr}
                                startIndex={this.state.startIndex}
                                clickButtonHandlers={this.handleFormSubmit}
                            >
                         
                                </Pagenation>
                                </div>
                        ) : (
                                <div>No Results</div>)
                        }
         </Col>
       </Col>
         
        </Row>
      </Container>
    );
  }
}

export default Books;
