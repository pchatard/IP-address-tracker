// Map Creation
var mymap = L.map("map").setView([51.505, -0.09], 13);
L.tileLayer(
	"https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
	{
		attribution:
			'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		maxZoom: 18,
		id: "mapbox/streets-v11",
		tileSize: 512,
		zoomOffset: -1,
		accessToken: mapboxAPI,
	}
).addTo(mymap);

var myIcon = L.icon({
	iconUrl: "../images/icon-location.svg",
});
var marker = L.marker([51.5, -0.09], { icon: myIcon }).addTo(mymap);

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
	console.log(IP);
	const data = await fetchDataFromAPI(IP);
	fillResultBoxes(data);
	moveMap(data.location);
}

function getIPFromInput() {
	return input.value;
}

async function fetchDataFromAPI(ipAddress) {
	const response = await fetch(
		`https://geo.ipify.org/api/v1?apiKey=${ipifyToken}&ipAddress=${ipAddress}`
	);
	const jsonResponse = await response.json();
	return jsonResponse;
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
