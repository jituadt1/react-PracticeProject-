import React, { Component } from "react";
import TableHeader from "./common/tableHeader";
import TableBody from "./common/tableBody";
import Like from "./common/like";

class Movies extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: movie => (
        <Like liked={movie.liked} onLike={() => this.props.onLike(movie)} />
      )
    },
    {
      key: "delete",
      content: movie => (
        <button
          onClick={() => this.props.onDelete(movie._id)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      )
    }
  ];

  render() {
    if (this.props.movies.length === 0)
      return <p>There are no movies in the database.</p>;

    return (
      <React.Fragment>
        <p>Showing {this.props.movies.length} movies in the database.</p>
        <table className="table">
          <TableHeader
            columns={this.columns}
            onSort={this.props.onSort}
            sortColumn={this.props.sortColumn}
          />
          <TableBody data={this.props.movies} columns={this.columns} />
        </table>
      </React.Fragment>
    );
  }
}

export default Movies;
