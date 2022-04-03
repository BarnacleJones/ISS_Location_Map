const api_url = "https://api.wheretheiss.at/v1/satellites/25544";


//initialise the map
var map =L.map('map').setView([50, 50], 4);


//put the map layer on - using API from free account
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
maxZoom: 500,
id: 'mapbox/streets-v11',
tileSize: 512,
zoomOffset: -1,
accessToken: 'pk.eyJ1Ijoia2V2aW5zbmFraW4iLCJhIjoiY2wxanVseDJvMGRwNDNtcWd4aGJxOWx6YiJ9.7_YRYZnVe2EBhQHVxy9cnQ'
}).addTo(map);

map.setView([150, 80], 4);



//put the map layer on using openstreetmap
/*
const tileURL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'

const tiles = L.tileLayer(tileURL, {attribution});
tiles.addTo(map);  
*/

async function getISS()
{
    const response = await fetch(api_url);
    const data = await response.json();

    const {latitude, longitude} = data;

    // shorthand way for saying this
    //const latitude = data.latitude
    //const longitude = data.longitude
    //as long as there is those objects in the response

    document.getElementById("lat").innerText = latitude;
    document.getElementById("long").innerText = longitude;

    //update map with area
    map.setView([latitude, longitude], 5);

    //add circle on area
    var circle = L.circle([latitude, longitude], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500
    }).addTo(map);

}

setInterval(getISS, 3000)

