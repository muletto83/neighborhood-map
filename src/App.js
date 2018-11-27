import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { load_google_maps, loadRestaurants } from "./Avail";
import MapComp from "./components/MapComp";

class App extends Component {
  /* Initialization that requires DOM nodes should go here.
  ** If we need to load data from a remote endpoint,
  ** this is a good place to instantiate the network request. */
  componentDidMount() {
    let gMapPromise = load_google_maps();
    let restaurantsPromise = loadRestaurants();

    Promise.all([gMapPromise, restaurantsPromise]).then(values => {
      //Checking the the value content to evaluate our next move
      console.log(values);
      let google = values[0];
      let restaurants = values[1];

      this.google = google;
      this.markers = [];

      this.map = new google.maps.Map(document.getElementById("map"), {
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
      restaurants.forEach(restaurant => {
				let marker = new google.maps.Marker({
					position: { lat: restaurant.position.lat, lng: restaurant.position.lng },
					map: this.map,
					id: restaurant.id,
					name: restaurant.name,
					address: restaurant.address,
					website: restaurant.website,
					animation: google.maps.Animation.DROP
				});
			});
    })
  }


  render() {
    return (
      <div className="App">
        {/*https://stackoverflow.com/questions/50503677/proper-use-of-aria-role-for-google-maps*/}
        <MapComp />
        <img src={logo} className="App-logo" alt="logo in motion" />
      </div>
    )
  }
}

export default App;
