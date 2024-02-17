
(async () => {
    const { default: fetch } = await import('node-fetch');
    // Your code using fetch here
})();
const fs = require('fs');
const today = new Date();
const monthAgo = new Date(today);
monthAgo.setDate(today.getDate() - 28);

const start = monthAgo.toISOString().split('T')[0];
const end = today.toISOString().split('T')[0];
const mag = 2.0;
const maxLat = 48;
const minLat = 25;
const maxLong = 154;
const minLong = 122;

const url = `https://earthquake.usgs.gov/fdsnws/event/1/query.geojson?starttime=${start}T00:00:00&endtime=${end}T23:59:59&maxlatitude=${maxLat}&minlatitude=${minLat}&maxlongitude=${maxLong}&minlongitude=${minLong}&minmagnitude=${mag}&orderby=time`;

fetch(url)
    .then(response => response.json())
    .then(data => {
        const jsonData = JSON.stringify(data);
        fs.writeFileSync('now.json', jsonData);
        fs.writeFileSync('now.js', "var eq_points = "+jsonData);       
        console.log('Data successfully fetched and written to now.json');

    })
    .catch(error => console.error('Error:', error));

