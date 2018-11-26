import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  /* Initialization that requires DOM nodes should go here.
  *  If we need to load data from a remote endpoint,
  *  this is a good place to instantiate the network request. */
  componentDidMount() {
    this.mapLoader()
  }

  /*Function to load Google Map  */
  mapLoader = () => {
    scriptLoader("https://maps.googleapis.com/maps/api/js?key=AIzaSyAGwWhii5M0m32NbNxLY2EEyZZWKBfqdKA&callback=initMap");
    window.initMap = this.initMap;
  }
  /*the body of the callback function that we find at the end of the URL for the googleapis
  * for now with only thetwo required options for every map: center and zoom
  * https://developers.google.com/maps/documentation/javascript/tutorial */
  initMap = () => {
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 34.1015, lng: -84.5194},
      zoom: 15
    })
  }

  render() {
    return (
      <main className="App">
        {/*https://stackoverflow.com/questions/50503677/proper-use-of-aria-role-for-google-maps*/}
        <div id="map" role="application" aria-label="Map Application"></div>
        <img src={logo} className="App-logo" alt="logo in motion" />
      </main>
    )
  }
}
/*creating a function to manage the laoding of script withing React
* https://www.fullstackreact.com/articles/Declaratively_loading_JS_libraries/index.html*/
function scriptLoader(url) {
  let index = window.document.getElementsByTagName("script")[0];
  let tag = window.document.createElement("script");
  tag.src = url;
  tag.async = true;
  tag.defer = true;
  index.parentNode.insertBefore(tag, index)
}
export default App;
