import React from "react";
import PropTypes from 'prop-types';

import ContentTile from "../contentTile/ContentTile";

import './discoverContent.css';

class DiscoverContent extends React.Component {
    constructor (props) {
        super(props);
        this.childRef = React.createRef();
    }

    childMounted = () => {
        this.observer = new IntersectionObserver((entries, obs) => {
            let entry = entries[0];
            if (entry.isIntersecting) {
                this.observer.unobserve(this.childRef.current);
                this.props.getMoreData();
            }
        }, {
            root: this.props.parentRef.current
        });
        this.observer.observe(this.childRef.current);
    };

    removeObserver = () => {
        this.observer.unobserve(this.childRef.current);
    }

    render () {
        return (
            <div className="discover-content" ref={this.props.parentRef}>
                {this.props.contentList.length !== 0 ?
                    this.props.contentList.map((item, key) => {
                        return (
                            <ContentTile
                                key={key}
                                item={item}
                                secureBaseURL={this.props.secureBaseURL}
                                genreMap={this.props.genreMap}
                                searchParam={this.props.searchParam}
                                reference={key === this.props.contentList.length-3 ? this.childRef : undefined}
                                childMounted={this.childMounted}
                                removeObserver={this.removeObserver}
                            />
                        );
                    }) :
                    <div className="empty-container">
                        <h2>No Content found for selected criteria.</h2>
                    </div>}
            </div>
        );
    }
}

DiscoverContent.propTypes = {
    contentList: PropTypes.array.isRequired,
    secureBaseURL: PropTypes.string.isRequired,
    genreMap: PropTypes.object.isRequired,
    searchParam: PropTypes.object.isRequired,
    getMoreData: PropTypes.func.isRequired
};

export default DiscoverContent;