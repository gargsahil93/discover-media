import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './contentTile.css';

class ContentTile extends Component {
    state = {
        imgSize: 342//calculate image size for different screen sizes
    };

    getTileStyle = () => {
        let paddingTopBottom = 15;
        let paddingLeftRight = 5;
        return {
            padding: `${paddingTopBottom}px ${paddingLeftRight}px`,
            width: `${this.state.imgSize + paddingLeftRight*2}px`
        };
    };

    getImageStyle = () => {
        return {
            width: `${this.state.imgSize}px`,
            height: '513px'
        }
    };

    getGenreRow = () => {
        let yearDate = this.props.item.release_date || this.props.item.first_air_date || "";
        let yearIndex = yearDate.indexOf('-');
        let year = yearDate.slice(0, yearIndex);
        let genre, selectedGenre = this.props.searchParam.genre;
        if (selectedGenre === "-1") {
            let genreId = this.props.item.genre_ids[0];
            genre = this.props.genreMap[genreId];
        } else {
            genre = this.props.genreMap[selectedGenre];
        }

        if (!genre) return year;
        if (!year) return genre;
        return `${genre}, ${year}`;
    };

    componentDidMount() {
        if (this.props.reference) {
            this.props.childMounted();
        }
    }

    componentWillUnmount() {
        if (this.props.reference) {
            this.props.removeObserver();
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //to attach observer if the view changes or options are applied
        if (this.props.reference && prevProps.item.id !== this.props.item.id) {
            this.props.childMounted();
        }
    }

    render() {
        return (
            <div className="content-tile" style={this.getTileStyle()} ref={this.props.reference}>
                <img
                    src={this.props.item.poster_path ?
                        `${this.props.secureBaseURL}w${this.state.imgSize}/${this.props.item.poster_path}` :
                        "https://image.freepik.com/free-vector/coming-soon-message-illuminated-with-light-projector_1284-3622.jpg"}
                    alt=""
                    style={this.getImageStyle()}
                />
                <span className="tile-title">{this.props.item.title || this.props.item.original_name}</span>
                <span className="tile-info">{this.getGenreRow()}</span>
            </div>
        );
    }
}

ContentTile.propTypes = {
    item: PropTypes.object.isRequired,
    secureBaseURL: PropTypes.string.isRequired,
    genreMap: PropTypes.object.isRequired,
    searchParam: PropTypes.object.isRequired,
    reference: PropTypes.object,
    childMounted: PropTypes.func.isRequired,
    removeObserver: PropTypes.func.isRequired
};

export default ContentTile;