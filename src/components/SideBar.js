import React from "react";
import logo from '../logo.svg';
import "../App.css"

const SideBar = ({ filteredRestaurants, handleClick }) => {
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
      <h2>Filter Restaurants</h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {filteredRestaurants.map((restaurant, i) => {
          return (
            <li key={i} className="name-list" style={{ padding: 5, margin:10 }} onClick={() => handleClick(restaurant)}>
              {restaurant.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SideBar;
