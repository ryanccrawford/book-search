import React from "react";


// This file exports both the List and ListItem components

export default function SearchResults(props) {

    return (
        <div className="card-group">
      <div className="row mt-4">
         
              {props.books.map( book => {
                  return (

                      <div className="card shadow mb-2 col-3"> 
                        
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
                                <div class="card-footer">
                                    <button className="card-link">More Info...</button>
                                    <button className="card-link">Save Book</button>
                              </div>
                              </div>
                         
                     
                  )
                     
              })
                          }
        
            </div>
            </div>
  );
}

