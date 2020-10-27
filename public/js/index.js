let mapOptions, mymap, marker;
const baseUrl = 'https://iptrackerbackend.herokuapp.com';

(async function fetchMapOptions() {
	const response = await fetch(`${baseUrl}/map`);
	const data = await response.json();
	mapOptions = data;
	// Map Creation
	mymap = L.map("map").setView([51.505, -0.09], 13);
	L.tileLayer(
		"https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
		{ ...mapOptions }
	).addTo(mymap);

	var myIcon = L.icon({
		iconUrl: "../images/icon-location.svg",
	});
	marker = L.marker([51.5, -0.09], { icon: myIcon }).addTo(mymap);
})();

// Target the input and submit button
const input = document.getElementById("ip-search");
const submitBtn = document.getElementById("submit");

// Target the result boxes
const ipAddress = document.getElementById("ip-result");
const ipLocation = document.getElementById("location");
const timezone = document.getElementById("timezone");
const isp = document.getElementById("isp");

submitBtn.addEventListener("click", getIpInformation);

async function getIpInformation() {
	const IP = getIPFromInput();
	const data = await fetchDataFromAPI(IP);
	fillResultBoxes(data);
	moveMap(data.location);
}

function getIPFromInput() {
	return input.value;
}

async function fetchDataFromAPI(ipAddress) {
	const response = await fetch(`${baseUrl}/ip/${ipAddress}`);
	const data = await response.json();
	console.log(data);
	return data;
}

function fillResultBoxes(data) {
	ipAddress.innerHTML = data.ip;
	ipLocation.innerHTML = `${data.location.city}, ${data.location.country} ${data.location.postalCode}`;
	timezone.innerHTML = data.location.timezone;
	isp.innerHTML = data.isp;
}

function moveMap(dataLocation) {
	mymap.setView([dataLocation.lat, dataLocation.lng]);
	var newLocation = new L.LatLng(dataLocation.lat, dataLocation.lng);
	marker.setLatLng(newLocation);
}
