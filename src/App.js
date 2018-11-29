import React, { Component } from "react";
import "./App.css";
import { load_google_maps, loadRestaurants } from "./Avail";
import Header from "./components/Header";
import MapComp from "./components/MapComp";
import Sidebar from "./components/SideBar";

class App extends Component {
  state = {
    map: null,
    infoWindow: null,
    markers: [],
    restaurants: [],
    filteredRestaurants: []
  };
  /* Initialization that requires DOM nodes should go here.
   ** If we need to load data from a remote endpoint,
   ** this is a good place to instantiate the network request. */
  componentDidMount = () => {
    let gMapPromise = load_google_maps();
    let restaurantsPromise = loadRestaurants();

    Promise.all([gMapPromise, restaurantsPromise]).then(values => {
      //Checking the the value content to evaluate our next move
      // console.log(values);
      let google = values[0];
      let restaurants = values[1];

      const markers = [];
      const infoWindow = new google.maps.InfoWindow();

      const map = new google.maps.Map(document.getElementById("map"), {
        //=======================================================================================//
        //========Later trying gesture handling
        //https://developers.google.com/maps/documentation/javascript/interaction#gestureHandling
        // Coordinate of Woodstock GA
        center: {
          lat: 34.101318,
          lng: -84.519379
        },
        zoom: 13
      });

      /* For each restaurant we will have a marker on the map
       ** The animation is a DROP from the sky :)
       ** https://developers.google.com/maps/documentation/javascript/markers */
      if (!restaurants) return;
      restaurants.forEach(restaurant => {
        let marker = new google.maps.Marker({
          id: restaurant.id,
          position: {
            lat: restaurant.position.lat,
            lng: restaurant.position.lng
          },
          map: map,
          name: restaurant.name,
          address: restaurant.address,
          website: restaurant.website,
          animation: google.maps.Animation.DROP
        });

        // Push marker into the array
        markers.push(marker);
        /* The Content of the Info Window
         ** that will appear when users will click on the marker
         ** + <address> https://developer.mozilla.org/en-US/docs/Web/HTML/Element/address */
        let restaurantInfo = this.makeContent(restaurant);
        // Open InfoWindow and populate with content when marker is clicked.
        marker.addListener("click", () => {
          this.animateMarker(marker);
        });
        // Managing the click on the marker
        google.maps.event.addListener(marker, "click", () => {
          infoWindow.setContent(restaurantInfo);
          infoWindow.open(map, marker);
        });
      });
      this.setState({
        restaurants: restaurants,
        map: map,
        markers: markers,
        infoWindow: infoWindow,
        filteredRestaurants: restaurants
      });
    });
  };

  animateMarker = marker => {
    marker.setAnimation(window.google.maps.Animation.BOUNCE);
    /* Lets avoid infinite jumping... it will be Horrible for users
     ** with 1630 should jump 3 times :) ===========================*/
    setTimeout(() => {
      marker.setAnimation(null);
    }, 1630);
  };

  makeContent = restaurant => {
    return `<div className="infowindow-content">
        <h3>${restaurant.name}</h3>
        <address>
          <p>${restaurant.address}</p>
          <p>Website:
            <a href="${restaurant.website}" target="_blank">${
      restaurant.website
    }</a>
          </p>
        </address>
        <p>From:
          <a href="http://myjson.com/svl16" target="_blank">Restaurants-I-Love</a>
        </p>
      </div>`;
  };

  filterRestaurants = query => {
    let matchedRestaurants = [];
    let infoWindow = this.state.infoWindow;
    if (query !== "") {
      infoWindow.close();
    } else if (query === "") {
      this.setState({
        filteredRestaurants: this.state.restaurants
      });
      this.state.markers.forEach(marker => {
        marker.setVisible(true);
      });
      return;
    }
    this.state.restaurants.forEach(restaurant => {
      console.log(restaurant);
      if (restaurant.name.toLowerCase().includes(query.toLowerCase())) {
        matchedRestaurants.push(restaurant);
      }
    });
    this.setState(
      {
        filteredRestaurants: matchedRestaurants
      },
      () => this.handleMarkerVisibility(matchedRestaurants)
    );
  };

  handleMarkerVisibility = restaurants => {
    this.state.markers.forEach(marker => {
      marker.setVisible(false);
    });
    restaurants.forEach(restaurant => {
      this.state.markers.forEach(marker => {
        if (marker.name === restaurant.name) {
          marker.setVisible(true);
        }
      });
    });
  };
  handleClick = restaurant => {
    const { markers, map, infoWindow } = this.state;
    markers.map(marker => {
      if (marker.name === restaurant.name) {
        const content = this.makeContent(restaurant);
        this.animateMarker(marker);
        infoWindow.setContent(content);
        infoWindow.open(map, marker);
      }
    });
  };

  render() {
    return (
      <div className="App" style={{ width: "100vw", height: "100vh" }}>
        <Header />
        <Sidebar
          {...this.state}
          restaurants={this.state.restaurants}
          filteredRestaurants={this.state.filteredRestaurants}
          filterRestaurants={this.filterRestaurants}
          handleClick={this.handleClick}
        />
        <MapComp />
      </div>
    );
  }
}

export default App;
