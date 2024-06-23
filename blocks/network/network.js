import { decorateIcons } from '../../scripts/aem.js';
import { updateMap } from '../../scripts/block-utils.js';

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

function updateStaticContent(mainContainer) {
    mainContainer.classList.add('community-charging-card-parent-container', 'charging-locator-page-header-variation');
    mainContainer.style.opacity = '1';

// Create header container
    const headerContainer = document.createElement('div');
    headerContainer.classList.add('community-charging-card-parent-container__header-container');

// Create pre-title paragraph
    const preTitle = document.createElement('p');
    preTitle.classList.add('pre-title');
    preTitle.textContent = '1.2 KM PER MINUTE';

// Create title heading
    const title = document.createElement('h2');
    title.classList.add('title');
    title.textContent = 'Fast charging network';

// Append pre-title and title to header container
    headerContainer.appendChild(preTitle);
    headerContainer.appendChild(title);

// Append header container to main container
    mainContainer.appendChild(headerContainer);

// Create statistics container
    const statisticsContainer = document.createElement('div');
    statisticsContainer.classList.add('charging-stations-statistics-container');

// Create details containers for statistics
    const detailsContainersData = [
        { icon: '../../icons/cities_icon.svg', labelText: 'Cities', labelValue: '200+' },
        { icon: '../../icons/charge_icon.svg', labelText: 'Fast Charging Points', labelValue: '2500+' },
        { icon: '../../icons/station_icon.svg', labelText: 'Kms Powered', labelValue: '2.3 Million' }
    ];

    detailsContainersData.forEach(data => {
        const detailsContainer = document.createElement('div');
        detailsContainer.classList.add('charging-stations-statistics-container__details-container');

        // Create icon container
        const iconContainer = document.createElement('div');
        iconContainer.classList.add('icon-container');
        const icon = document.createElement('img');
        icon.src = data.icon;
        icon.alt = 'icon-img';
        iconContainer.appendChild(icon);
        detailsContainer.appendChild(iconContainer);

        // Create content container
        const contentContainer = document.createElement('div');
        contentContainer.classList.add('content-container');
        const labelText = document.createElement('p');
        labelText.classList.add('label-text');
        labelText.textContent = data.labelText;
        const labelValue = document.createElement('p');
        labelValue.classList.add('label-value');
        labelValue.textContent = data.labelValue;
        contentContainer.appendChild(labelText);
        contentContainer.appendChild(labelValue);
        detailsContainer.appendChild(contentContainer);

        // Append details container to statistics container
        statisticsContainer.appendChild(detailsContainer);
    });

// Append statistics container to main container
    mainContainer.appendChild(statisticsContainer);

// Create description container
    const descriptionContainer = document.createElement('div');
    descriptionContainer.classList.add('description-container-right');
    const dummyDiv = document.createElement('div');
    descriptionContainer.appendChild(dummyDiv);
    const description = document.createElement('p');
    description.textContent = 'Experience what fast truly is when you plug in at one of VIDA’s Fast Charging stations.';
    dummyDiv.appendChild(description);
    //descriptionContainer.appendChild(description);

// Append description container to main container
    mainContainer.appendChild(descriptionContainer);

// Create fast charging search container
    const fastChargingSearchContainer = document.createElement('div');
    fastChargingSearchContainer.classList.add('fast-charging-search-container');

// Create search icon
    const searchIcon = document.createElement('div');
    searchIcon.classList.add('fast-charging-search-find-icon');
    const searchImg = document.createElement('img');
    searchImg.src = '../../icons/search_map_icon.svg';
    searchImg.alt = 'search Icon';
    searchIcon.appendChild(searchImg);
    fastChargingSearchContainer.appendChild(searchIcon);

// Create chevron down icon
    const chevronIcon = document.createElement('div');
    chevronIcon.classList.add('fast-charging-chevron-down-icon');
    const chevronImg = document.createElement('img');
    chevronImg.src = '../../icons/drop_down_icon.svg';
    chevronImg.alt = 'drop down icon';
    chevronIcon.appendChild(chevronImg);
    fastChargingSearchContainer.appendChild(chevronIcon);

// Create input field
    const inputField = document.createElement('input');
    inputField.classList.add('fast-charging-city-search-input');
    inputField.placeholder = 'Select City';
    inputField.type = 'text';
    fastChargingSearchContainer.appendChild(inputField);

// Create city option container
    const cityOptionContainer = document.createElement('div');
    cityOptionContainer.classList.add('city-option-container', 'd-none');
    fastChargingSearchContainer.appendChild(cityOptionContainer);

    chevronIcon.addEventListener('click', () => {
        const cityOptionContainerSelected = document.querySelector('.city-option-container');
        // Toggle the 'd-block' and 'd-none' classes on the city option container
        if (cityOptionContainerSelected.classList.contains('d-none')) {
            cityOptionContainerSelected.classList.remove('d-none');
            cityOptionContainerSelected.classList.add('d-block');
        } else {
            cityOptionContainerSelected.classList.remove('d-block');
            cityOptionContainerSelected.classList.add('d-none');
        }
    });

    const cityArray = ['ahmedabad', 'bangalore', 'chennai', 'delhi', 'hyderabad', 'mumbai'];
    cityArray.forEach(city => {
        const cityOption = document.createElement('div');
        cityOption.classList.add('city-option');
        const cityOptionText = document.createElement('p');
        cityOptionText.textContent = city;
        cityOption.appendChild(cityOptionText);
        cityOptionContainer.appendChild(cityOption);
        cityOption.addEventListener('click', () => {
            const cityOptionContainerSelected = document.querySelector('.city-option-container');
            const inputFieldSelected = document.querySelector('.fast-charging-city-search-input');
            inputFieldSelected.value = city;
            cityOptionContainerSelected.classList.remove('d-block');
            cityOptionContainerSelected.classList.add('d-none');
            updateMap(city);
        });


    });

// Create error message paragraph
    const errorMsg = document.createElement('p');
    errorMsg.classList.add('fast-charging-error-msg');
    fastChargingSearchContainer.appendChild(errorMsg);

// Create label count paragraph
    const labelCount = document.createElement('p');
    labelCount.classList.add('label-count');
    labelCount.innerHTML = 'Total number of charging stations in your city <b>39</b>';
    fastChargingSearchContainer.appendChild(labelCount);

// Append fast charging search container to main container
    mainContainer.appendChild(fastChargingSearchContainer);

}

export default async function decorate(block) {

    block.innerHTML= '';
    const containerDiv = document.createElement('div');
    containerDiv.className = 'container';
    block.appendChild(containerDiv);

    const staticContent = document.createElement('div');
    staticContent.className = 'static-content';
    containerDiv.appendChild(staticContent);


    const mapContainer = document.createElement('div');
    mapContainer.className = 'charging-map-my-india-cl-container';
    containerDiv.appendChild(mapContainer);

    const emptyDiv = document.createElement('div');
    mapContainer.appendChild(emptyDiv);

    const mapDiv = document.createElement('div');
    mapDiv.className = 'map mmi-map maplibregl-map mapboxgl-map';
    mapDiv.id = 'map';
    emptyDiv.appendChild(mapDiv);

    // const iconSpan = document.createElement('span');
    // iconSpan.className = 'icon icon-search';
    // mapDiv.appendChild(iconSpan);
    // decorateIcons(mapDiv);

    updateStaticContent(staticContent);

}