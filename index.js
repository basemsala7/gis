const express = require("express");
const app = express();
const axios = require("axios");
const port = 3000;
const key = "AIzaSyBwj3AABMp5Sw9qpkfR1ByoBdrF1djZzFQ";
const googleMapsClient = require("@google/maps").createClient({
  key,
  Promise: Promise,
  provider: "google",
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/geo", (req, res) => {
  googleMapsClient
    .geocode({
      address: "1600 Amphitheatre Parkway, Mountain View, CA",
    })
    .asPromise()
    .then((response) => {
      res.json(response.json.results);
      console.log(response.json.results);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/text-search", async (req, res) => {
  const { data } = await axios.get(
    `https://maps.googleapis.com/maps/api/place/textsearch/json?query=portsaid&type=school&key=${key}`
  );
  res.json(data);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
