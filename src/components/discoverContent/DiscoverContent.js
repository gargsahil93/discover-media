import React from "react";
import PropTypes from 'prop-types';

import ContentTile from "../contentTile/ContentTile";

import './discoverContent.css';

class DiscoverContent extends React.Component {
    render () {
        return (
            <div className="discover-content">
                {this.props.contentList.map(item => {
                    return (
                        <ContentTile
                            key={item.id}
                            item={item}
                            secureBaseURL={this.props.secureBaseURL}
                            genreMap={this.props.genreMap}
                            searchParam={this.props.searchParam}
                        />
                    );
                })}
            </div>
        );
    }
}

DiscoverContent.propTypes = {
    contentList: PropTypes.array.isRequired,
    secureBaseURL: PropTypes.string.isRequired,
    genreMap: PropTypes.object.isRequired,
    searchParam: PropTypes.object.isRequired
};

export default DiscoverContent;