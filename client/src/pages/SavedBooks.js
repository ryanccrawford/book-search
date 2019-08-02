
import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import Pagination from "../components/Pagination";
import SavedResults from "../components/SavedResults";

class SavedBooks extends Component {
    state = {
        books: [],
        title: "",
        author: "",
        synopsis: "",
        googleBooks: [],
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
        let showNextPage = false;
        let showPrevPage = false;
        let nextPage = 0;
        let prevPage = 0;
        let thisPage = 0;
        let totalPages = 1;
        let mr = parseInt(this.state.maxResults)

        if (parseInt(this.state.totalItems) > parseInt(this.state.maxResults)) {



            totalPages = parseInt(parseInt(this.state.totalItems) / parseInt(this.state.maxResults))
            if (this.state.totalItems % this.state.maxResults) {
                totalPages++
            }
            console.log("total pages: " + totalPages)
            console.log("total Items: " + parseInt(this.state.totalItems))
            console.log("total index: " + parseInt(this.state.startIndex))
            console.log("total perpage: " + mr)
            thisPage = parseInt(thisPage = (totalPages - Math.abs((parseInt(this.state.totalItems) - parseInt(this.state.startIndex)) / mr) + 1))
            console.log("this page: " + thisPage)

            if ((totalPages - thisPage) > 0 && ((thisPage + mr) <= totalPages)) {
                nextPage = thisPage + 1
                showNextPage = true
            }
            if ((thisPage) > mr) {
                prevPage = thisPage - 1
                showPrevPage = true
            }


        }
        return (

            <Container fluid>
                <Container>
                    <Row>
                        <Col size="md-12">
                            <Jumbotron>
                                <h1>Saved Google Books</h1>
                            </Jumbotron>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Row>

                        <Col size="md-12">
                            {this.state.books.length > 0 ? (
                                <div>
                                    <SavedResults
                                        books={this.state.books}
                                        removeBookClick={this.deleteBook}

                                    >
                                    </SavedResults>
                                    <Pagination
                                        showNextPage={showNextPage}
                                        showPrevPage={showPrevPage}
                                        nextPage={nextPage}
                                        prevPage={prevPage}
                                        thisPage={thisPage}
                                        totalPages={totalPages}
                                        maxResults={mr}
                                        startIndex={this.state.startIndex}
                                        clickButtonHandlers={this.clickButton}

                                    >

                                    </Pagination>
                                </div>
                            ) : (
                                    <div>No Results</div>)
                            }
                        </Col>

                    </Row>
                </Container>
            </Container>
        );
    }
}

export default SavedBooks;
