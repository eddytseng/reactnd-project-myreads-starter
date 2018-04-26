import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Debounce } from 'react-throttle';

class SearchBooks extends Component {
    render() {
        const { results, onUpdateBook, onSearchChange, clearQuery } = this.props;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link onClick={() => clearQuery()} to="/" className="close-search" title="Go back to bookshelf">Close</Link>
                    <div className="search-books-input-wrapper">
                        <Debounce time="400" handler="onChange">
                            <input
                                type="text"
                                placeholder="Search by title or author"
                                onChange={(event) => onSearchChange(event)}
                                autoFocus
                            />
                        </Debounce>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {results.map(book => (
                            <li key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <div
                                            className="book-cover"
                                            style={{ width: 128, height: 192, backgroundImage: `url(${book.imageLinks.thumbnail})` }}
                                        />
                                        <div className="book-shelf-changer">
                                            <select
                                                value={book.shelf}
                                                onChange={(event) => onUpdateBook(book, event.target.value)}
                                            >
                                                <option value="none" disabled>Move to...</option>
                                                <option value="currentlyReading">Currently Reading</option>
                                                <option value="wantToRead">Want to Read</option>
                                                <option value="read">Read</option>
                                                <option value="none">None</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="book-title">{book.title}</div>
                                    <div className="book-authors">{book.authors}</div>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks;