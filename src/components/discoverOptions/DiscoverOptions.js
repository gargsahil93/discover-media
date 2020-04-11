import React from "react";
import  PropTypes from 'prop-types';
import './discoverOptions.css';

class DiscoverOptions extends React.Component {
    constructor (props) {
        super(props);
        this.MIN_YEAR = 1874;
        this.MAX_YEAR = 2040;
    }

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

    updateMinYear = (e) => this.props.updateMinYear(e.target.value);

    updateMaxYear = (e) => this.props.updateMaxYear(e.target.value);

    render () {
        let years = Array(this.MAX_YEAR - this.MIN_YEAR + 1).fill(1);
        let {minYear, maxYear} = this.props.searchParam;
        return (
            <div className="discover-options">
                <div className="auto-margin options-inner">
                    <div className="discover-options-header">
                        <h5>DISCOVER OPTIONS</h5>
                    </div>
                    <div className="option">
                        <label>Type</label>
                        <select className="option-input" id="media" onChange={this.updateType}>
                            <option value="movie">Movies</option>
                            <option value="tv">TV Shows</option>
                        </select>
                    </div>
                    {!this.props.searchParam.searchStr ?
                        (
                            <React.Fragment>
                                <div className="option">
                                    <label>Genre</label>
                                    <select className="option-input" id="genre" onChange={this.updateGenre}>
                                        {this.props.genres.map(genre => {
                                            return (
                                                <option key={genre.id} value={genre.id}>{genre.name}</option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <div className="option">
                                    <label>Year</label>
                                    <div className="select-year">
                                        <select className="option-input" id="year-from" value={minYear} onChange={this.updateMinYear}>
                                            {years.map((v, k) => {
                                                if (maxYear >= this.MIN_YEAR + k) {
                                                    return (
                                                        <option
                                                            key={k}
                                                            value={k+this.MIN_YEAR}
                                                        >
                                                            {k+this.MIN_YEAR}
                                                        </option>
                                                    );
                                                }
                                            })}
                                        </select>
                                        &nbsp;
                                        <select className="option-input" id="year-to" value={maxYear} onChange={this.updateMaxYear}>
                                            {years.map((v, k) => {
                                                if (minYear <= this.MIN_YEAR + k) {
                                                    return (
                                                        <option
                                                            key={k}
                                                            value={k+this.MIN_YEAR}
                                                        >
                                                            {k+this.MIN_YEAR}
                                                        </option>
                                                    );
                                                }
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className="option">
                                    <label>Rating</label>
                                    <div className="option-input rating" onClick={this.updateRatingSearch}>
                                        <span id="star-5" className={this.state.selectedStar === 5 ? 'selected-star' : undefined}>☆</span>
                                        <span id="star-4" className={this.state.selectedStar >= 4 ? 'selected-star' : undefined}>☆</span>
                                        <span id="star-3" className={this.state.selectedStar >= 3 ? 'selected-star' : undefined}>☆</span>
                                        <span id="star-2" className={this.state.selectedStar >= 2 ? 'selected-star' : undefined}>☆</span>
                                        <span id="star-1" className={this.state.selectedStar >= 1 ? 'selected-star' : undefined}>☆</span>
                                    </div>
                                </div>
                            </React.Fragment>
                        ) : ''}
                </div>
            </div>
        );
    }
}

DiscoverOptions.propTypes = {
    updateRating: PropTypes.func.isRequired,
    updateGenre: PropTypes.func.isRequired,
    updateType: PropTypes.func.isRequired,
    updateMinYear: PropTypes.func.isRequired,
    updateMaxYear: PropTypes.func.isRequired,
    genres: PropTypes.array.isRequired,
    searchParam: PropTypes.object.isRequired
};

export default DiscoverOptions;