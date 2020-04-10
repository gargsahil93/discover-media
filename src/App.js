import React from 'react';
import Discover from "./components/discover/Discover";
import DiscoverOptions from "./components/discoverOptions/DiscoverOptions";

import './App.css';

class App extends React.Component{
    state = {
        searchParam : {
            type : 'movie',
            rating : null,
            genre : "-1",
            view : 'popular'
        },
        genres : [],
        contentList : [],
        configuration: {},
        secureBaseURL: 'https://image.tmdb.org/t/p/',
        genreMap: {}
    };

    updateRating = (rating) => {
        this.setState({
            searchParam : {
                ...this.state.searchParam,
                rating
            }
        });
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
                view
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
        let baseURL = 'https://api.themoviedb.org/3/';
        let apiKey = '3a94078fb34b772a31d9a1348035bed7';
        let {type, genre} = this.state.searchParam;
        if (this.state.searchParam.view === 'trend') {
            return `${baseURL}trending/${type}/day?api_key=${apiKey}`;
        } else {
            let url = `${baseURL}discover/${type}?api_key=${apiKey}`;
            switch (this.state.searchParam.view) {
                case 'popular':
                    url += '&sort_by=popularity.desc';
                    break;
                case 'new':
                    url += '&sort_by=primary_release_date.desc';
                    break;
                case 'top':
                    url += '&sort_by=vote_average.desc';
                    break;
                default:
                    url += '&sort_by=popularity.desc';
                    console.warn('something went wrong');
            }
            if (genre !== "-1") {
                url += `&with_genres=${genre}`
            }
            return url;
        }
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
                  view={this.state.searchParam.view}
                  searchParam={this.state.searchParam}
              />
              <DiscoverOptions
                  updateRating={this.updateRating}
                  updateGenre={this.updateGenre}
                  updateType={this.updateType}
                  genres = {this.state.genres}
              />
            </div>
        );
    }
}

export default App;
