
var map;
var markers = [];
function initializeMap() {
    map = new MapmyIndia.Map('map', {
        center: [28.6139, 77.2090], // Default to New Delhi
        zoom: 12
    });
    console.log(map);
    console.log(markers);
}

function onMapMyIndiaLoad() {
    initializeMap();
}
function getHostUrl() {
    let hostUrl = window.location.origin;
    if (!hostUrl || hostUrl === 'null') {
        // eslint-disable-next-line prefer-destructuring
        hostUrl = window.location.ancestorOrigins[0];
    }
    return hostUrl;
}

function fetchData(url, callback) {
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            callback(null, data);
        })
        .catch((error) => {
            callback(error, null);
        });
}

async function updateMap(cityName) {
   // console.log(map);
   // console.log(cityName);
   // console.log(markers);
    fetchData(`${getHostUrl()}/servicestation.json?sheet=${cityName}`, async (error, SSData = []) => {
        console.log(SSData.data);
        markers.forEach(marker => map.removeLayer(marker));
        markers = [];
        SSData.data.forEach(center => {
            var marker = new L.marker([center.Lat, center.Long])
                .addTo(map)
                .bindPopup(cityName);
            markers.push(marker);
        });

        // Adjust map view to fit markers
        var group = new L.featureGroup(markers);
        map.fitBounds(group.getBounds());
    });
}

export {
    getHostUrl,
    updateMap,
    onMapMyIndiaLoad,
};