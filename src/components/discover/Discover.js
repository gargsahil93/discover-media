import React from "react";
import PropTypes from 'prop-types';

import DiscoverHeader from "../discoverHeader/DiscoverHeader";
import DiscoverContent from "../discoverContent/DiscoverContent";

import './discover.css';

class Discover extends React.Component {
    updateView = (str) =>{
        this.props.parentRef.current.scrollTo(0, 0);
        this.props.updateView(str);
    };

    updateSearchStr = (str) => {
        this.props.parentRef.current.scrollTo(0, 0);
        this.props.updateSearchStr(str);
    };

    render () {
        return (
            <div className="discover">
                <DiscoverHeader
                    updateView={this.updateView}
                    view={this.props.searchParam.view}
                    searchStr={this.props.searchParam.searchStr}
                    updateSearchStr={this.updateSearchStr}
                />
                <DiscoverContent
                    contentList={this.props.contentList}
                    secureBaseURL={this.props.secureBaseURL}
                    genreMap={this.props.genreMap}
                    searchParam={this.props.searchParam}
                    getMoreData={this.props.getMoreData}
                    parentRef={this.props.parentRef}
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
    updateSearchStr: PropTypes.func.isRequired,
    getMoreData: PropTypes.func.isRequired,
    parentRef: PropTypes.object.isRequired
};

export default Discover;