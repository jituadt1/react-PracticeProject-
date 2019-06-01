import React, { Component } from "react";
import "./App.css";
import Movies from "./component/movies";
import { getMovies } from "./services/fakeMovieService";
import Pagination from "./component/common/pagination";
import paginate from "./component/utils/paginate";
import PropTypes from "prop-types";
import ListGroup from "./component/common/listGroup";
import { getGenres } from "./services/fakeGenreService";
import _ from "lodash";

class App extends Component {
  state = {
    movies: [],
    genres: [],
    selectedItem: 0,
    sortColumn: { path: "title", order: "asc" },
    currentPage: 1,
    pageSize: 4
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];

    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = movieID => {
    const movies = this.state.movies.filter(m => m._id !== movieID);
    this.setState({ movies });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenre = genre => {
    this.setState({ selectedItem: genre, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  render() {
    const filteredMovies =
      this.state.selectedItem && this.state.selectedItem._id
        ? this.state.movies.filter(
            m => m.genre._id === this.state.selectedItem._id
          )
        : this.state.movies;

    const orderedMovies = _.orderBy(
      filteredMovies,
      this.state.sortColumn.path,
      this.state.sortColumn.order
    );

    const movies = paginate(
      orderedMovies,
      this.state.currentPage,
      this.state.pageSize
    );

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedItem}
            onItemSelect={this.handleGenre}
          />
        </div>
        <div className="col">
          <main className="container">
            <Movies
              movies={movies}
              sortColumn={this.state.sortColumn}
              onDelete={this.handleDelete}
              onLike={this.handleLike}
              onSort={this.handleSort}
            />
            <Pagination
              itemCount={filteredMovies.length}
              pageSize={this.state.pageSize}
              onPageChange={this.handlePageChange}
              currentPage={this.state.currentPage}
            />
          </main>
        </div>
        {/* <Navbar totalMovies={this.state.movies.length} /> */}
      </div>
    );
  }
}

Pagination.propTypes = {
  itemCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired
};

export default App;
