// ===========================  MAP ELEMENTS  ===========================

//PLACE FLYTO BUTTOM ON THE MAP
const coordinates =  [36.019838, 32.499705] ; 
const flyButton = document.getElementById('fly-button');

new mapboxgl.Marker({
    element: flyButton,
    anchor: 'bottom',
    offset: [0, -30] // [x, y] in pixels
})
.setLngLat(coordinates)
.addTo(map_zoomout);


// DATA _ COORDINATES AND COUNTRIES LABELS
const countries = {
type: 'FeatureCollection',
features: [
    { type: 'Feature', properties: { title: 'EGYPT'}, geometry: { type: 'Point', coordinates: [33.8083491, 30.467345] }},
    { type: 'Feature', properties: { title: 'ISRAEL'}, geometry: { type: 'Point', coordinates: [34.8758067, 30.9866664] }},
    { type: 'Feature', properties: { title: 'JORDAN'}, geometry: { type: 'Point', coordinates: [36.3655701, 30.683549] }},
    { type: 'Feature', properties: { title: 'IRAQ'}, geometry: { type: 'Point', coordinates: [39.560184, 33.315916] }},
    { type: 'Feature', properties: { title: 'SAUDI\nARABIA'}, geometry: { type: 'Point', coordinates: [37.742222, 29.656151] }}, 
    { type: 'Feature', properties: { title: 'SYRIA'}, geometry: { type: 'Point', coordinates: [36.9178121, 32.938151] }},
    { type: 'Feature', properties: { title: 'LEB.'}, geometry: { type: 'Point', coordinates: [35.5965731, 33.47613] }},
    { type: 'Feature', properties: { title: 'PAL.\nWEST BANK'}, geometry: { type: 'Point', coordinates: [35.2808101, 32.126807] }},
    { type: 'Feature', properties: { title: 'PAL.\nGAZA'}, geometry: { type: 'Point', coordinates: [34.288398, 31.497934] }}
]
};

// DATA _ PRODUCTION SITES COORDINATES
const productionSites = {
type: 'FeatureCollection',
features: [
    { type: 'Feature', properties: { title: 'Tajammouat' }, geometry: { type: 'Point', coordinates: [35.979728, 31.868797] }},
    { type: 'Feature', properties: { title: '' }, geometry: { type: 'Point', coordinates: [36.019838, 32.499705]}},
    { type: 'Feature', properties: { title: 'Aqaba' }, geometry: { type: 'Point', coordinates: [35.028429, 29.598449]}},
    { type: 'Feature', properties: { title: 'Mafraq' }, geometry: { type: 'Point', coordinates: [36.266308, 32.381423]}}, 
    { type: 'Feature', properties: { title: 'Dhulayl' }, geometry: { type: 'Point', coordinates: [36.291064, 32.121074]}} 
]
};

// DATA _ PORTS COORDINATES
const portSites = {
type: 'FeatureCollection',
features: [
    { type: 'Feature', properties: { title: 'Haifa' }, geometry: { type: 'Point', coordinates: [35.008376, 32.817597]}},
    { type: 'Feature', properties: { title: '' }, geometry: { type: 'Point', coordinates: [34.976266, 29.467778]}} 
]
};

// LOAD ZOOM OUT MAP
map_zoomout.on('load', () => {

    // ____________________________  ADD COUNTRIES LABELS TO THE MAP  ____________________________ 
    
    // Load countries data
    map_zoomout.addSource('countries', {
        type: 'geojson', data: countries
    });
    // Place Countries Labels
    map_zoomout.addLayer({
        id: 'countries',
        type: 'symbol',
        source: 'countries',
        minzoom: 0,
        maxzoom: 15,
        layout: {
            'text-field': ['get', 'title'],
            'text-font': ['Oswald Stencil Bold'],
            'text-size': [
            'interpolate',
            ['linear'],
            ['zoom'],
            0, 20,
            15, 23
            ],
            'text-anchor': 'center',
            'text-offset': [0, 0]   
        },
        paint: {
            'text-color': '#000000',
            'text-halo-color': '#ffffff',
            'text-halo-width': 2,
            'text-halo-blur': 0
        }
    });


    // ____________________________  ADD PORTS LABELS TO THE MAP  ____________________________ //
    
    // Load port data
    map_zoomout.addSource('portSites', {
        type: 'geojson', data: portSites
    });

    // Load port icon
    map_zoomout.loadImage('../assets/port.png', (error, image) => {
        if (error) throw error;
        if (!map_zoomout.hasImage('port-icon')) {
            map_zoomout.addImage('port-icon', image);
        }
        // Place port icons
        map_zoomout.addLayer({
            id: 'portSites-layer',
            type: 'symbol',
            source: 'portSites',
            layout: {
            'icon-image': 'port-icon',
            'icon-size': [
                'interpolate',
                ['linear'],
                ['zoom'],
                0, 0.2,
                15, 0.4
            ],
            'icon-allow-overlap': true,
            'text-field': ['get', 'title'],
            'text-font': ['Source Code Pro Italic'],
            'text-size': [
                'interpolate',
                ['linear'],
                ['zoom'],
                0, 12,
                15, 20
            ],
            'text-anchor': 'left',
            'text-offset': [1, 0],
            'text-allow-overlap': true
            },
            paint: {
            'text-color': '#37445E',
            'text-halo-color': '#ffffff',
            'text-halo-width': 3,
            'text-halo-blur': 5
            }
        });
    });

    // Add click listener for port sites
    map_zoomout.on('click', 'portSites-layer', (e) => {
        const feature = e.features[0];
        const title = feature.properties.title;

        // Only open popup if title is not empty
        const popupHTML = `
            <div class="mapboxgl-popup-content">
                <p><b>Container port</b></p>
                <p>Jordan’s garment industry mainly produces clothing for export to the US market under the Jordan-US Free Trade Agreement (JUSFTA). Producers located in Jordan import most machinery and production materials – such as yarn, cloth and accessories – from China and South Asia, mainly through Aqaba container port in the South of Jordan. As timely delivery to US brands is a central competitive advantage, the finished clothing is then primarily shipped from the Israeli sea port Haifa, which offers the fastest sailing times to the US. </p>
                <p>To read more about Jordan’s garment industry’s dependency on uninterrupted import and export routes, and how regional war and instability have thus impacted the industry, 
                <a href="https://merip.org/2025/01/hanging-by-a-thread/" target="_blank" style="color: blue; text-decoration: underline;">click here</a>.</p>
            </div>`;
        new mapboxgl.Popup({ offset: 25 })
        .setLngLat(feature.geometry.coordinates)
        .setHTML(popupHTML)
        .addTo(map_zoomout);
    });
    // Change cursor to pointer when hovering
    map_zoomout.on('mouseenter', 'portSites-layer', () => {
        map_zoomout.getCanvas().style.cursor = 'pointer';
    });
    map_zoomout.on('mouseleave', 'portSites-layer', () => {
        map_zoomout.getCanvas().style.cursor = '';
    });


    // ____________________________  ADD THE PRODUCTION SITES SOURCE  ____________________________ //
    
    map_zoomout.addSource('productionSites', {
        type: 'geojson', data: productionSites
    });

    // Load sites icon - square marker
    map_zoomout.loadImage('../assets/square-marker.png', (error, image) => {
        if (error) throw error;
        if (!map_zoomout.hasImage('square-icon')) {
            map_zoomout.addImage('square-icon', image);
        }

        // Add the square marker layer
        map_zoomout.addLayer({
            id: 'productionSites-layer',
            type: 'symbol',
            source: 'productionSites',
            layout: {
            'icon-image': 'square-icon',
            'icon-size': [
                'interpolate',
                ['linear'],
                ['zoom'],
                0, 0.2,
                15, 0.4
            ],
            'icon-allow-overlap': true,
            'text-field': ['get', 'title'],
            'text-font': ['Source Code Pro Italic'],
            'text-size': [
                'interpolate',
                ['linear'],
                ['zoom'],
                0, 12,
                15, 20
            ],
            'text-anchor': 'left',
            'text-offset': [1, 0],
            'text-allow-overlap': true
            },
            paint: {
            'text-color': '#000000',
            'text-halo-color': '#ffffff',
            'text-halo-width': 3,
            'text-halo-blur': 5
            }
        });
    });

    // Add click listener for production sites
    map_zoomout.on('click', 'productionSites-layer', (e) => {
        const feature = e.features[0];
        const title = feature.properties.title;

        // Only open popup if title is not empty
        if (title && title.trim() !== '') {
            const popupHTML = `
            <div class="mapboxgl-popup-content">
                <p><b>${title} - Main garment production site</b></p>
                <p>Most clothing factories in Jordan are clustered in the industrial zones you see mapped here. 
                Initially, these zones were established as so-called Qualified Industrial Zones (QIZs), 
                offering an advantageous export regime to industries promoting economic cooperation between Israel and Jordan 
                in the wake of the 1994 peace accords. While ‘free trade’ to the US is no longer tied to these production zones, 
                most garment producers have stayed to establish a dormitory migrant labour regime. 
                Dormitories thus accommodate tens of thousands of migrant workers in these spatially confined production sites 
                and diverse migrant businesses, clinics and marketplaces have developed in their surrounds. </p>
                <p><a href="https://www.jadaliyya.com/Details/46539" target="_blank" style="color: blue; text-decoration: underline;">
                Click here</a> to read more about migrants’ everyday life in Jordan’s industrial zones for clothing production.</p>
            </div>
            `;
            new mapboxgl.Popup({ offset: 25 })
            .setLngLat(feature.geometry.coordinates)
            .setHTML(popupHTML)
            .addTo(map_zoomout);
        }
        else{
            flyZoomIn ();
        }
    });
    // Change cursor to pointer when hovering the markers
    map_zoomout.on('mouseenter', 'productionSites-layer', () => {
        map_zoomout.getCanvas().style.cursor = 'pointer';
    });
    map_zoomout.on('mouseleave', 'productionSites-layer', () => {
        map_zoomout.getCanvas().style.cursor = '';
    });
}); // END OF LOAD ZOOM OUT MAP

// ===========================  END OF MAP ELEMENTS  ===========================


// ===========================  OTHER BUTTONS  ===========================

const zoomoutInfoBtn = document.getElementById('zoomout-info-btn');

// Only run this if on mobile
if (window.matchMedia("(max-width: 600px)").matches) {
    // Close zoomout text
    document.querySelector('#zoomout-text .close-btn').addEventListener('click', () => {
        hidePopup('zoomout-text');
        zoomoutInfoBtn.style.display = 'block'; // Show open button
    });
    // Open zoomout text
    zoomoutInfoBtn.addEventListener('click', () => {
        showPopup('zoomout-text');
        zoomoutInfoBtn.style.display = 'none'; // Hide open button
    });
}
