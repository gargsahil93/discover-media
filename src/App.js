import React from 'react';
import Discover from "./components/discover/Discover";
import DiscoverOptions from "./components/discoverOptions/DiscoverOptions";

import {debounce} from 'debounce';

import './App.css';

class App extends React.Component{
    state = {
        searchParam : {
            type : 'movie',
            rating : 0,
            genre : "-1",
            view : 'popular',
            minYear: 1874,
            maxYear: 2040,
            searchStr: ''
        },
        genres : [],
        contentList : [],
        configuration: {},
        secureBaseURL: 'https://image.tmdb.org/t/p/',
        genreMap: {}
    };

    updateSearchStr = (e) => {
        let searchStr = e.target.value;
        if (searchStr !== this.state.searchParam.searchStr) {
            this.setState({
                searchParam : {
                    ...this.state.searchParam,
                    searchStr
                }
            }, this.searchStr());
        }
    };

    updateRating = (rating) => {
        this.setState({
            searchParam : {
                ...this.state.searchParam,
                rating
            }
        }, this.refreshView);
    };

    updateGenre = (genre) => {
        this.setState({
            searchParam : {
                ...this.state.searchParam,
                genre
            }
        }, this.refreshView);
    };

    updateType = (type) => {
        this.getGenres(type)
            .then(() => {
                this.setState({
                    searchParam : {
                        ...this.state.searchParam,
                        type
                    }
                }, this.refreshView);
            });
    };

    updateMinYear = (year) => {
        this.setState({
            searchParam : {
                ...this.state.searchParam,
                minYear : year
            }
        }, this.refreshView);
    };

    updateMaxYear = (year) => {
        this.setState({
            searchParam : {
                ...this.state.searchParam,
                maxYear : year
            }
        }, this.refreshView);
    };

    searchStr = (() => {
        return debounce(() => {
            this.refreshView();
        }, 500);
    })();

    getConfiguration = () => {
        fetch('https://api.themoviedb.org/3/configuration?api_key=3a94078fb34b772a31d9a1348035bed7')
            .then(res=>res.json())
            .then(data=>this.setState({
                configuration: data
            }));
    };

    getGenres = (genre) => {
        return fetch(`https://api.themoviedb.org/3/genre/${genre}/list?api_key=3a94078fb34b772a31d9a1348035bed7`)
            .then(res=>res.json())
            .then(data => {
                //create genre map for faster access for tiles
                let genreMap = {};
                data.genres.forEach(genre => genreMap[genre.id] = genre.name);

                let currGenre = this.state.searchParam.genre;
                if (!genreMap[currGenre]) currGenre = "-1";

                this.setState({
                    genres : [{
                        id: "-1",
                        name: 'All'
                    }, ...data.genres],
                    genreMap,
                    searchParam : {
                        ...this.state.searchParam,
                        genre: currGenre
                    }
                });
            });
    };

    updateView = (view) => {
        this.setState({
            searchParam : {
                ...this.state.searchParam,
                view,
                searchStr: ''
            }
        }, this.refreshView);
    };

    refreshView = () => {
        fetch(this.getDiscoverURL())
            .then(res => res.json())
            .then(data => {
                this.setState({
                    contentList : data.results
                });
            });
    };

    getDiscoverURL = () => {
        let apiKey = '3a94078fb34b772a31d9a1348035bed7';
        let {type, genre, view, rating, minYear, maxYear, searchStr} = this.state.searchParam;
        let url = 'https://api.themoviedb.org/3/';
        if (!searchStr) {
            url += `discover/${type}?`;
            switch (view) {
                case 'popular':
                    url += '&sort_by=popularity.desc';
                    break;
                case 'new':
                    url += '&sort_by=primary_release_date.desc';
                    break;
                case 'top':
                    url += '&sort_by=vote_average.desc';
                    break;
                case 'trend':
                    url += '&sort_by=revenue.desc';
                    break;
                default:
                    url += '&sort_by=popularity.desc';
                    console.warn('something went wrong');
            }
            if (genre !== "-1") {
                url += `&with_genres=${genre}`
            }
            if (rating !== 0) {
                //api has rating from 1-10, convert 5 scale rating to 10, 3=>5-7
                url += `&vote_average.lte=${rating*2 + 1}&vote_average.gte=${rating*2 - 1}`;
            }
            url += `&primary_release_date.gte=${minYear}-01-01&primary_release_date.lte=${maxYear}-12-31`;
        } else {
            url += `search/${type}?`;
            url += `&query=${this.state.searchParam.searchStr}`;
        }
        url += `&api_key=${apiKey}`;
        return url;
    };

    componentDidMount() {
        this.getGenres(this.state.searchParam.type);
        this.getConfiguration();
        this.updateView('popular');
    }

    render () {
        return (
            <div className="app">
              <Discover
                  contentList={this.state.contentList}
                  secureBaseURL={this.state.secureBaseURL}
                  genreMap={this.state.genreMap}
                  updateView={this.updateView}
                  searchParam={this.state.searchParam}
                  updateSearchStr={this.updateSearchStr}
              />
              <DiscoverOptions
                  updateRating={this.updateRating}
                  updateGenre={this.updateGenre}
                  updateType={this.updateType}
                  genres = {this.state.genres}
                  updateMaxYear={this.updateMaxYear}
                  updateMinYear={this.updateMinYear}
                  searchParam={this.state.searchParam}
              />
            </div>
        );
    }
}

export default App;
