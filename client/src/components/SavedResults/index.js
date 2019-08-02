import React from "react";
import DeleteBtn from "../DeleteBtn";

export default function SearchResults(props) {

    console.log(props.saveBookClick)
    return (
        <div className="container">
            <div className="row mt-4">

                {props.books.map(book => {

                    return (

                        <div className="card shadow mb-2 col-m3 col-s12"
                            key={book._id}
                        >
                            <div className="card-header">
                                <span className="float-right">
                                    <DeleteBtn data-bookid={book._id} onClick={props.removeBookClick}>
                                    </DeleteBtn>
                                </span>
                            </div>
                            {book.image ? (
                                <div className="card-img">
                                    {book.image ? (<img src={book.image} alt="..." />) : null}
                                </div>
                            ) : null}


                            <div className="card-body">
                                <h5 className="card-title">{book.title}</h5>
                                {book.author.length >= 1 ? (
                                    <p className="card-text">Author: {book.author}</p>
                                ) : null
                                }

                            </div>
                            <div className="card-footer">
                                <a href={book.link} className="card-link btn">More Info...</a>

                            </div>
                        </div>


                    )

                })
                }

            </div>
        </div>
    );
}

