import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { load_google_maps, loadRestaurants } from "./Avail";
import MapComp from "./components/MapComp";

class App extends Component {
  /* Setting the Inital this.state
  ** https://reactjs.org/docs/react-without-es6.html#setting-the-initial-state */
  // constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		//////////////
	// 	};
	// }
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
      this.infoWindow = new google.maps.InfoWindow();

      this.map = new google.maps.Map(document.getElementById("map"), {
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
      restaurants.forEach(restaurant => {
				let marker = new google.maps.Marker({
          id: restaurant.id,
					position: { lat: restaurant.position.lat, lng: restaurant.position.lng },
					map: this.map,
					name: restaurant.name,
					address: restaurant.address,
					website: restaurant.website,
					animation: google.maps.Animation.DROP
				});

        // Push marker into the array
				this.markers.push(marker);
         /* The Content of the Info Window
         ** that will appear when users will click on the marker
         ** + <address> https://developer.mozilla.org/en-US/docs/Web/HTML/Element/address */
				let restaurantInfo = `
          <div className="infowindow-content">
            <h3>${restaurant.name}</h3>
            <address>
              <p>${restaurant.address}</p>
              <p>Website: <a href="${restaurant.website}" target="_blank">${restaurant.website}</a></p>
            </address>
            <p>From: <a href="http://myjson.com/svl16" target="_blank">Restaurants-I-Love</a> </p>
          </div>`;
 				// Open InfoWindow and populate with content when marker is clicked.
				marker.addListener("click", () => {
					marker.setAnimation(google.maps.Animation.BOUNCE);
          /* Lets avoid infinite jumping... it will be Horrible for users
          ** with 1630 should jump 3 times :) ===========================*/
					setTimeout(() => {
						marker.setAnimation(null);
					}, 1630);
				});
        // Managing the click on the marker
				google.maps.event.addListener(marker, "click", () => {
					this.infoWindow.setContent(restaurantInfo);
					this.infoWindow.open(this.map, marker);
				});
			});
    })
  }

  render() {
    return (
      <div className="App">
        <MapComp />
        <img src={logo} className="App-logo" alt="Cool logo in motion" />
      </div>
    )
  }
}

export default App;
