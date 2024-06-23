import { decorateIcons } from '../../scripts/aem.js';

// function initializeMap() {
//     var map;
//     map = new MapmyIndia.Map('map', {
//         center: [28.6139, 77.2090], // Default to New Delhi
//         zoom: 12
//     });
// }

// function onMapMyIndiaLoad() {
//     initializeMap();
//
//     // document.getElementById('cityDropdown').addEventListener('change', function() {
//     //     var selectedCity = this.value;
//     //     if (selectedCity) {
//     //         fetchServiceCenters(selectedCity);
//     //     }
//     // });
// }

// async function checkMapmyIndiaLoaded() {
//     if (typeof MapmyIndia !== 'undefined' && typeof MapmyIndia.Map !== 'undefined') {
//         onMapMyIndiaLoad();
//     } else {
//         setTimeout(checkMapmyIndiaLoaded, 100);
//     }
// }

export default async function decorate(block) {

    block.innerHTML= '';
    const containerDiv = document.createElement('div');
    containerDiv.className = 'container';
    block.appendChild(containerDiv);

    const staticContent = document.createElement('div');
    staticContent.className = 'static-content';
    containerDiv.appendChild(staticContent);

    const mapDiv = document.createElement('div');
    mapDiv.className = 'map';
    mapDiv.id = 'map';
    containerDiv.appendChild(mapDiv);

    const iconSpan = document.createElement('span');
    iconSpan.className = 'icon icon-search';
    mapDiv.appendChild(iconSpan);
    decorateIcons(mapDiv);

  //  checkMapmyIndiaLoaded();

}