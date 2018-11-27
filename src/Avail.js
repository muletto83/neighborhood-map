/* Reversing previous way to load the google map manually
** Adopting this efficient way:
** - It also separates the loading function from the app.js
** Thanks to Ryan Waite for the hint !*/
export function load_google_maps() {
	return new Promise(function(resolve, reject) {
		// define the global callback that will run when google maps is loaded
		window.resolveGoogleMapsPromise = function() {
			// resolve the google object
			resolve(window.google);
			// delete the global callback to tidy up since it is no longer needed
			delete window.resolveGoogleMapsPromise;
		};
		// Now, Load the Google Maps API
		const script = document.createElement("script");
		const API_KEY = "AIzaSyBkmM5Te-3IitVIhets6Oo2kuDXJz2afJY";
		script.src = `https://maps.googleapis.com/maps/api/js?libraries=places&key=${API_KEY}&callback=resolveGoogleMapsPromise`;
		script.async = true;
		document.body.appendChild(script);
	});
}

// Function that load restaurants from Homemade API
export function loadRestaurants() {
	return fetch("https://api.myjson.com/bins/svl16")
		.then(response => response.json())
		.catch(error => alert("The API is not working... Sorry for the trouble."));
}
