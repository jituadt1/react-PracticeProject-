import React, { Component } from "react";

class NavBar extends Component {
  state = {};
  render() {
    return (
      <nav className="navbar">
        <span style={{ marginLeft: 150, fontSize: 20 }}>
          Showing {this.props.totalMovies} movies in the database
        </span>
      </nav>
    );
  }
}

export default NavBar;
