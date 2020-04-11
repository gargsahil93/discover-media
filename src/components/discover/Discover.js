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
                    view={this.props.searchParam.view}
                    searchStr={this.props.searchParam.searchStr}
                    updateSearchStr={this.props.updateSearchStr}
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
    searchParam: PropTypes.object.isRequired,
    updateSearchStr: PropTypes.func.isRequired
};

export default Discover;