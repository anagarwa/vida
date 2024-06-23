// eslint-disable-next-line import/no-cycle
import {loadScript, sampleRUM} from './aem.js';

// Core Web Vitals RUM collection
sampleRUM('cwv');

loadScript('https://apis.mapmyindia.com/advancedmaps/v1/29fe9e3a677a04e5ef17b6165b2d8cb6/map_load?v=3.0');

// add more delayed functionality here
