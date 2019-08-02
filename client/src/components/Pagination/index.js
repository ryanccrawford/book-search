import React from "react";



export default function Pagination(props) {

    let next = parseInt(props.nextPage)
    let prev = parseInt(props.prevPage)
    console.log("Next Page: " + next)
    console.log("Prev Page: " + prev)
    return (
        <nav aria-label="Page navigation">
            <ul className="pagination">
                {props.showPrevPage ? (
                    <li className="page-item">
                        <a
                            className={props.showPrevPage ? 'page-link' : 'page-link disabled'}
                            data-index={prev}
                            onClick={props.clickButtonHandlers}
                        >Previous</a>
                    </li>) : null
                }
                <li className="page-item active" aria-current="page">
                    <span className="page-link"> Current Page: {parseInt(props.thisPage)} </span>
                </li>
                {props.showNextPage ? (
                    <li className="page-item"><a
                        className={props.showNextPage ? 'page-link' : 'page-link disabled'}
                        data-index={next}
                        onClick={props.clickButtonHandlers}
                    >Next</a></li>) : null
                }
            </ul>
        </nav>
    );
}


