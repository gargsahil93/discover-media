import React from "react";
import PropTypes from 'prop-types';

import './discoverHeader.css';

class DiscoverHeader extends React.Component{
    changeView = (e) => {
        this.props.updateView(e.target.id);
    }

    render () {
        let view = !this.props.searchStr ? this.props.view : 'search';
        return (
            <div className="discover-header">
                <h2 className="white-text">Discover</h2>
                <div className="header-links" onClick={this.changeView}>
                    <span className={(view === "popular" && "white-text link") || "link"} id="popular">Popular</span>
                    <span className={(view === "trend" && "white-text link") || "link"} id="trend">Trend</span>
                    <span className={(view === "new" && "white-text link") || "link"} id="new">Newest</span>
                    <span className={(view === "top" && "white-text link") || "link"} id="top">Top Rated</span>
                </div>
                <div className="search">
                    <i className="material-icons">search</i>
                    <input
                        type="text"
                        name="search"
                        className="search-box"
                        placeholder="Search"
                        onChange={this.props.updateSearchStr}
                    />
                </div>
            </div>
        );
    }
}

DiscoverHeader.propTypes = {
    updateView: PropTypes.func.isRequired,
    view: PropTypes.string.isRequired,
    searchStr: PropTypes.string.isRequired,
    updateSearchStr: PropTypes.func.isRequired
}

export default DiscoverHeader;