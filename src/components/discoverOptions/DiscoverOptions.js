import React from "react";
import  PropTypes from 'prop-types';
import './discoverOptions.css';

class DiscoverOptions extends React.Component {
    state = {
        selectedStar : 0
    };

    updateRatingSearch = (e) => {
        let id = e.target.id;
        if (id.startsWith('star-')) {
            let index = id.indexOf('-') + 1;
            let stars = +id.slice(index);
            this.setState({
                selectedStar : stars
            });
            this.props.updateRating(stars);
        }
    };

    updateGenre = (e) => this.props.updateGenre(e.target.value);

    updateType = (e) => this.props.updateType(e.target.value);

    render () {
        return (
            <div className="discover-options">
                <div className="auto-margin options-inner">
                    <div className="discover-options-header">
                        <h5>DISCOVER OPTIONS</h5>
                    </div>
                    <div className="option">
                        <span>Type</span>
                        <select className="option-input" id="media" onChange={this.updateType}>
                            <option value="movie">Movies</option>
                            <option value="tv">TV Shows</option>
                        </select>
                    </div>
                    <div className="option">
                        <span>Genre</span>
                        <select className="option-input" id="genre" onChange={this.updateGenre}>
                            {this.props.genres.map(genre => {
                                return (
                                    <option key={genre.id} value={genre.id}>{genre.name}</option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="option">
                        <span>Year</span>
                        <div className="select-year">
                            <input name="year-from" className="option-input"/>
                            <span>-</span>
                            <input name="year-to" className="option-input"/>
                        </div>
                    </div>
                    <div className="option">
                        <span>Rating</span>
                        <div className="option-input rating" onClick={this.updateRatingSearch}>
                            <span id="star-5" className={this.state.selectedStar === 5 ? 'selected-star' : undefined}>☆</span>
                            <span id="star-4" className={this.state.selectedStar >= 4 ? 'selected-star' : undefined}>☆</span>
                            <span id="star-3" className={this.state.selectedStar >= 3 ? 'selected-star' : undefined}>☆</span>
                            <span id="star-2" className={this.state.selectedStar >= 2 ? 'selected-star' : undefined}>☆</span>
                            <span id="star-1" className={this.state.selectedStar >= 1 ? 'selected-star' : undefined}>☆</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

DiscoverOptions.propTypes = {
    updateRating: PropTypes.func.isRequired,
    updateGenre: PropTypes.func.isRequired,
    updateType: PropTypes.func.isRequired,
    genres: PropTypes.array.isRequired
};

export default DiscoverOptions;