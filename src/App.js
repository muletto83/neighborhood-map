import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { load_google_maps } from "./Avail";
import MapComp from "./components/MapComp";

class App extends Component {
  /* Initialization that requires DOM nodes should go here.
  *  If we need to load data from a remote endpoint,
  *  this is a good place to instantiate the network request. */
  componentDidMount() {
    let googleMapPromise = load_google_maps();

    Promise.all([googleMapPromise]).then(values => {
      //Checking the the value content to evaluate our next move
      console.log(values);
      let google = values[0];
      this.map = new google.maps.Map(document.getElementById("map"), {
				// Center map on DFW Metroplex
				center: {
					lat: 34.101318,
					lng: -84.519379
				},
				zoom: 14
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
