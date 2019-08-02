
import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import SavedResults from "../components/SavedResults";

class SavedBooks extends Component {
    state = {
        books: [],
        title: "",
        author: "",
        synopsis: "",
        startIndex: 0,
        maxResults: 8,
        totalItems: 0,
        thisPage: 1
    };

    componentDidMount() {
        this.loadSavedBooks();
    }

    loadSavedBooks = () => {
        API.getBooks()
            .then(res => {

                console.log(res.data)
                this.setState({ books: res.data, title: "", author: "", link: "", image: "", date: "" })

            }
            )
            .catch(err => console.log(err));
    };


    deleteBook = (event) => {
        let bookId = event.target.getAttribute("data-bookid")
        console.log("book Id " + bookId)
        if (bookId) {
            API.deleteBook(bookId)
                .then(res => this.loadSavedBooks())
                .catch(err => console.log(err));
        }
    };



    render() {


      return (

            <Container fluid>
                <Container>
                    <Row>
                        <Col size="md-12">
                            <Jumbotron>
                                <h1>My Saved Google Books</h1>
                            </Jumbotron>
                        </Col>
                    </Row>
                </Container>
              <Container fluid>
                    <Row>

                        <Col size="md-12">
                            {this.state.books.length > 0 ? (
                                <div>
                                    <SavedResults
                                        books={this.state.books}
                                        removeBookClick={this.deleteBook}

                                    >
                                    </SavedResults>

                                </div>
                            ) : (
                                  <div className="alert alert-danger">No Results</div>)
                            }
                        </Col>

                    </Row>
                </Container>
            </Container>
        );
    }
}

export default SavedBooks;
