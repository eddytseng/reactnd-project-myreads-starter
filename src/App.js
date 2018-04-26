import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends React.Component {
    state = {
        bookshelf: [],
        results: []
    };

    componentDidMount() {
        BooksAPI
            .getAll()
            .then((bookshelf) => {
                this.setState({ bookshelf });
            });
    }

    update = (book, shelf) => {
        BooksAPI
            .update(book, shelf)
            .then(() => {
                this.setState(state => ({
                    bookshelf: state.bookshelf.map((b) => {
                        if (b.id === book.id && b.shelf !== shelf) {
                            b.shelf = shelf;
                            return b;
                        } else {
                            return b;
                        }
                    })
                }));
            });
    };

    updateBookshelfFromSearch = (book, shelf) => {
        BooksAPI
            .update(book, shelf)
            .then(() => {

                BooksAPI.getAll().then((bookshelf) => {
                    this.setState({ bookshelf });

                    this.setState(state => ({
                        results: state.results.map((b) => {
                            // Check to see if book from search is already on bookshelf and if so, is it on a different shelf
                            if (b.id === book.id && b.shelf !== shelf) {
                                b.shelf = shelf;
                                return b
                            } else {
                                return b
                            }
                        })

                    }))

                });

            });
    }

    clearQuery = () => {
        this.setState({ results: [] })
    }

    // Handle onchange event on input field for book queries
    handleSearchChange = (event) => {
        const query = event.target.value;
        console.log('Searching for', query);
        if (query) {
            // Search with query
            BooksAPI
                .search(query, 20)
                .then((response) => {
                    if (response.error) {
                        console.log('error', response.error);
                        this.setState({ results: [] });
                    } else {
                        const compareResults = new Promise((resolve, reject) => {
                            // Get the result
                            var modifiedResults = response.map((result) => {
                                // Set the result's shelf to 'none' as default 
                                result.shelf = 'none';

                                // Check to see if the result also appears on the bookshelf
                                this.state.bookshelf.map((book) => {
                                    // If the book matches
                                    if (book.id === result.id) {
                                        // Assign the book's shelf to the result's shelf
                                        result.shelf = book.shelf;
                                    }
                                    return book;
                                })
                                return result;
                            });
                            resolve(modifiedResults);
                        });

                        compareResults.then((results) => {
                            this.setState({ results });
                        });
                    }
                });
        } else {
            this.setState({ results: [] });
        }
    }

    render() {
        return (
            <div className="app">
                <Route exact path="/" render={() => (
                    <ListBooks
                        bookshelf={this.state.bookshelf}
                        onUpdateBook={this.update}
                    />
                )} />
                <Route path="/search" render={() => (
                    <SearchBooks
                        bookshelf={this.state.bookshelf}
                        results={this.state.results}
                        onUpdateBook={this.updateBookshelfFromSearch}
                        onSearchChange={this.handleSearchChange}
                        clearQuery={this.clearQuery} />
                )} />
            </div>
        )
    }
}

export default BooksApp;