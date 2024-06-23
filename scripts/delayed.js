// eslint-disable-next-line import/no-cycle
import {loadScript, sampleRUM} from './aem.js';

// Core Web Vitals RUM collection
sampleRUM('cwv');

loadScript('https://apis.mapmyindia.com/advancedmaps/v1/29fe9e3a677a04e5ef17b6165b2d8cb6/map_load?v=3.0');

function initializeMap() {
    var map;
    map = new MapmyIndia.Map('map', {
        center: [28.6139, 77.2090], // Default to New Delhi
        zoom: 12
    });
}

function onMapMyIndiaLoad() {
    initializeMap();
}

function checkMapmyIndiaLoaded() {
    if (typeof MapmyIndia !== 'undefined' && typeof MapmyIndia.Map !== 'undefined') {
        onMapMyIndiaLoad();
    } else {
        setTimeout(checkMapmyIndiaLoaded, 100);
    }
}

checkMapmyIndiaLoaded();



// add more delayed functionality here
