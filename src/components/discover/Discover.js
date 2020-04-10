import React from "react";
import PropTypes from 'prop-types';

import DiscoverHeader from "../discoverHeader/DiscoverHeader";
import DiscoverContent from "../discoverContent/DiscoverContent";

import './discover.css';

class Discover extends React.Component {
    render () {
        return (
            <div className="discover">
                <DiscoverHeader
                    updateView={this.props.updateView}
                    view={this.props.view}
                />
                <DiscoverContent
                    contentList={this.props.contentList}
                    secureBaseURL={this.props.secureBaseURL}
                    genreMap={this.props.genreMap}
                    searchParam={this.props.searchParam}
                />
            </div>
        );
    }
}

Discover.propTypes = {
    contentList: PropTypes.array.isRequired,
    secureBaseURL: PropTypes.string.isRequired,
    genreMap: PropTypes.object.isRequired,
    updateView: PropTypes.func.isRequired,
    view: PropTypes.string.isRequired,
    searchParam: PropTypes.object.isRequired
};

export default Discover;