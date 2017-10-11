import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ListBooks extends Component {
    state = {
        shelves: [
            {
                id: 'currentlyReading',
                title: 'Currently Reading'
            },
            {
                id: 'wantToRead',
                title: 'Want To Read'
            },
            {
                id: 'read',
                title: 'Read'
            }
        ]
    }

    render() {
        const { shelves } = this.state;
        const { bookshelf, onUpdateBook } = this.props;

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>

                <div className="list-books-content">
                    <div>
                        {shelves.map(shelf => (
                            <div className="bookshelf" key={shelf.id}>
                                <h2 className="bookshelf-title">{shelf.title}</h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid">
                                        {bookshelf.filter(book => (book.shelf === `${shelf.id}`)).map(book => (
                                            <li key={book.id}>
                                                <div className="book">
                                                    <div className="book-top">
                                                        <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
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
                        ))}
                    </div>
                </div>

                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        )
    }
}

export default ListBooks;