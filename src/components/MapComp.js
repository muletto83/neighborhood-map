import React, { Component } from "react";

export default class MapComp extends Component {
  render() {
		return (
			<main>
        {/*https://stackoverflow.com/questions/50503677/proper-use-of-aria-role-for-google-maps*/}
				<div id="map" role="application" aria-label="Map Application" />
			</main>
		);
	}
}
