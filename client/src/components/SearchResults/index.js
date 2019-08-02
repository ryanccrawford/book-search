import React from "react";

export default function SearchResults(props) {

    return (
        <div className="container">
            <div className="row mt-4">

                {props.books.map(book => {
                    let isSaved = false
                    if (props.savedBooks) {
                        isSaved = props.savedBooks.includes(book.title)
                    }
                    console.log(props.savedBooks)
                    return (

                        <div className="card shadow rounded mb-2 col-l3 col-m6 col-s12" style={{ maxWidth: "25%" }}
                            key={book.id}
                        >

                            {book.volumeInfo.imageLinks ? (
                                <div className="card-img">
                                    {book.volumeInfo.imageLinks.smallThumbnail ? (<img src={book.volumeInfo.imageLinks.smallThumbnail} alt="..." />) : null}
                                </div>
                            ) : null}


                            <div className="card-body">
                                <h5 className="card-title">{book.volumeInfo.title}</h5>
                                {book.volumeInfo.authors.length >= 1 ? (
                                    <p className="card-text">Author: {book.volumeInfo.authors[0]}</p>
                                ) : null
                                }
                                {book.volumeInfo.publishedDate ? (
                                    <p className="card-text">Published: {book.volumeInfo.publishedDate}</p>
                                ) : null
                                }

                            </div>
                            <div className="card-footer">

                                <a href={book.volumeInfo.canonicalVolumeLink} className="card-link btn">More Info...</a>
                                {!isSaved ? (
                                    <button
                                        data-bookid={book.id}
                                        onClick={props.saveBookClick}
                                        className="card-link btn btn-primary"
                                    >
                                        Save Book
                                   </button>
                                ) : (
                                        <button
                                            className="card-link btn disabled"
                                        >
                                            Saved
                                   </button>
                                    )}
                            </div>
                        </div>


                    )

                })
                }

            </div>
        </div>
    );
}

