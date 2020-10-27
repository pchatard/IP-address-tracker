const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

app.get("/map", (req, res, next) => {
	const options = {
		attribution:
			'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		maxZoom: 18,
		id: "mapbox/streets-v11",
		tileSize: 512,
		zoomOffset: -1,
		accessToken: process.env.MAPBOX,
	};
	res.send(options);
});

app.get("/ip/:ip", async (req, res, next) => {
	const ip = req.params.ip;
	const response = await fetch(
		`https://geo.ipify.org/api/v1?apiKey=${process.env.IPIFY}&ipAddress=${ip}`
	);
	const data = await response.json();
	res.send(data);
});

app.listen(5500, () => console.log("Server listening"));
