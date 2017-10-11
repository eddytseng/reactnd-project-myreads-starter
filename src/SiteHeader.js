import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class SiteHeader extends Component {
    render() {
        return (
            <nav className="global-nav">
                <ul>
                    <li>
                        <Link to="/" title="Go to homepage">
                            <img src="" alt="Bedrosians Tiles and Stone logo and lockup" />
                        </Link>
                    </li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </nav>
        )
    }
}

export default SiteHeader;