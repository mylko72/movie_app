import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';

class App extends Component {

  // Render : componentWillMount() -> render() -> componentDidMount()
  // Update : componentWillReceiveProps() -> shouldComponentUpdate() -> componentWillUpdate() -> render() -> componentDidUpdate()
  
  state = {

  }

  componentWillMount(){
    console.log('will mount');
  }

  componentDidMount(){
    console.log('did mount');

    this._getMovies();
  }

  _renderMovies = () => {
    const movies = this.state.movies.map((movie, index) => {
      console.log(movie);
      return <Movie 
              title={movie.title_english} 
              poster={movie.medium_cover_image} 
              genres={movie.genres}
              synopsis={movie.synopsis}
              key={movie.id} 
              />
    });

    return movies;
  }

  _getMovies = async () => {
    const movies = await this._callApi();
    this.setState({
      movies
    })
  }

  _callApi = () => {
    return fetch('https://yts.am/api/v2/list_movies.json?sort_by=download_count')
    .then(response => response.json())
    .then(json => json.data.movies)
    .catch(err => console.log(err));
  }

  render() {
    console.log('did render');   
    const { movies } = this.state; 
    return (
      <div className={movies ? "App" : "App--loading"}>
        {
          movies ? this._renderMovies() : 'loading...'
        }
      </div> 
    );
  }
}

export default App;
