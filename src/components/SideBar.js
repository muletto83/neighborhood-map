import React, { Component } from "react";
import logo from "../logo.svg";
import "../App.css";

class SideBar extends Component {
  state = {
    query: ""
  };
  updateQuery = newQuery => {
    this.setState({ query: newQuery });
    this.props.filterRestaurants(newQuery);
  };
  render() {
    return (
      <div
        style={{
          float: "left",
          width: "30vw",
          overflow: "auto",
          height: "calc(100vh - 70px)",
          textAlign: "center"
        }}>
        <img src={logo} className="App-logo" alt="Cool logo in motion" />
        <h3>Filtering</h3>
        <input
          type="search"
          id="search"
          placeholder="Find Your"
          className="filterPlaceholderText"
          name="filter"
          onChange={e => this.updateQuery(e.target.value)}
          value={this.state.query}
        />
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {this.props.filteredRestaurants &&
            this.props.filteredRestaurants.map((restaurant, i) => {
              return (
                <li
                  key={i}
                  className="name-list"
                  style={{ padding: 5, margin: 10 }}
                  >
                  <button
                    tabIndex="0"
                    className="li-button"
                    onClick={() => this.props.handleClick(restaurant)}>{restaurant.name}
                  </button>
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}

export default SideBar;
