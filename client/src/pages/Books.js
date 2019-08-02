import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { Input, FormBtn } from "../components/Form";
import Pagination from "../components/Pagination";
import SearchResults from "../components/SearchResults";
import axios from "axios";
import Modal from 'react-modal';
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('#root')
class Books extends Component {
    state = {
        books: [],
        savedBookTitles: [],
        title: "",
        author: "",
        synopsis: "",
        googleBooks: [],
        startIndex: 0,
        maxResults: 8,
        totalItems: 0,
        thisPage: 1,
        modalTitle: "Book Information",
        modalMessage: "Book was saved"

    };

    constructor(props) {

        super(props)
        this.state = {
            modalIsOpen: false
        };




    }
    openModal = () => {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal = () => {

        this.subtitle.style.color = '#f00';
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    }


    componentDidMount() {

        //

    }


    showBooks = (googleBooks) => {
        console.log(googleBooks)
        let totalItems = googleBooks.data.totalItems
        let books = googleBooks.data.items
        console.log(books)
        this.setState({ googleBooks: books, totalItems: totalItems })
    };


    saveBookClick = event => {

        let bookId = event.target.getAttribute("data-bookid")
        API.saveBook(bookId).then(res => {
            let bookData = res.data

            let book = {
                title: bookData.volumeInfo.title,
                author: bookData.volumeInfo.authors[0],
                link: bookData.volumeInfo.canonicalVolumeLink,
                image: bookData.volumeInfo.imageLinks.smallThumbnail
            }


            axios.post("/api/books", book).then(res => {
                console.log("Inside save Click")
                console.log(res.data.title)
                this.setState({
                    savedBookTitles: [...this.state.savedBookTitles, res.data.title]
                }, this.openModal)



            }).catch(err => console.log(err))

        }).catch(err => console.log(err));
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();

        if (this.state.title) {
            this.search()
        }

    }


    clickButton = event => {

        let newStartIndex = parseInt(event.target.getAttribute("data-index")) + parseInt(this.state.maxResults);
        if (parseInt(newStartIndex) > 0) {
            this.setState({ startIndex: newStartIndex }, this.search)
        }


    }


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
            <div>
            <Container fluid>
                <Row>
                    <Col size="md-12">
                        <Jumbotron>
                            <h1>Search Google Books?</h1>
                        </Jumbotron>
                    </Col>
                </Row>
            </Container>
            <Container fluid>
                <Row>
                    <Col size="md-12">

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
                        </Col>
                    </Row>
                        <Row>
                        <Col size="md-12">
                            {(this.state.googleBooks && this.state.googleBooks) ? (
                                <div>
                                    <SearchResults
                                        books={this.state.googleBooks}
                                        savedBooks={this.state.savedBookTitles}
                                        saveBookClick={this.saveBookClick}
                                    >
                                    </SearchResults>
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
                <div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel={this.state.modalTitle}
                >
                    <h2>{this.state.modalTitle}</h2>
                    <div>{this.state.modalMessage}</div>
                    <button onClick={this.closeModal}>close</button>
                    </Modal>
               </div>
            </div>
        );
    }
}

export default Books;
