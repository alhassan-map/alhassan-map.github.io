//  ____________________________  ANIMATION ZOOM-OUT TO ZOOM-IN  ____________________________  
const togglePpl = document.getElementById("toggle-people");
const toggleBtn = document.getElementById("toggle-info");
const zoominText = document.getElementById("zoomin-text");
const peopleText = document.getElementById("people-text");

document.getElementById('fly-button').addEventListener('click', () => {
    flyZoomIn ();
});

function flyZoomIn (){
    // Define target, zoom in and speed of the animation
    const target = [36.02645,32.49982]; 

    //hide place labels on zoom out map
    if (map_zoomout.getLayer('productionSites-layer')) {
        map_zoomout.setLayoutProperty('productionSites-layer', 'visibility', 'none');
    }
    //switch title logos
    document.getElementById('logo_out').style.display = 'none';
    //switch legends
    document.getElementById('legend_zoomout').style.display = 'none';
    //show zoom controls
    document.getElementById('custom-zoom-controls').style.display = 'flex';
    // Fly on both maps, keeping syncrony
    map_zoomout.flyTo({ 
        center: target, 
        zoom: zoom 
    });
    map.flyTo({ 
        center: target, 
        zoom: zoom, 
        speed: speed 
    });
    document.getElementById('fly-button').style.display = 'none';
    document.getElementById('zoomout-text').style.display = 'none';
    map.once('moveend', () => {
        map.setMaxBounds(bounds);
    });

    setTimeout(() => {
        const mapDiv = document.getElementById('map');
        const legend = document.getElementById('legend');
        const map_zoomoutDiv = document.getElementById('map_zoomout');
        const cornerDiv = document.getElementById('corner-gradient');
        document.getElementById('back-button').style.display = 'block'; // Show back button
        document.getElementById('logo_in').style.display = 'block';
        cornerDiv.style.display = 'block';
        legend.style.display = 'block';
        togglePpl.style.display = 'block !important';
        toggleBtn.style.display = 'block';
        map_zoomoutDiv.style.opacity = 0;
        mapDiv.style.opacity = 1;
        mapDiv.classList.add('active');
        showZoominUI()
    }, 2700);
}
//  ____________________________  END OF ANIMATION ZOOM-OUT TO ZOOM-IN ____________________________  

//  ____________________________   ANIMATION ZOOM-IN TO ZOOM-OUT ____________________________  
document.getElementById('back-button').addEventListener('click', () => {

    map.flyTo({ 
        center: center_intro, 
        zoom: zoom_intro 
    });
    map_zoomout.flyTo({ 
        center: center_intro, 
        zoom: zoom_intro 
    });

    document.getElementById('back-button').style.display = 'none';
    document.getElementById('toggle-info').style.display = 'none';
    document.getElementById('toggle-people').style.display = 'none';
    map.once('moveend', () => {
        document.getElementById('fly-button').style.display = 'block';
        document.getElementById('logo_out').style.display = 'block';
        document.getElementById('legend_zoomout').style.display = 'block';
    });

    // Restore map visibility
    const mapDiv = document.getElementById('map');
    const legend = document.getElementById('legend');
    const map_zoomoutDiv = document.getElementById('map_zoomout');
    const cornerDiv = document.getElementById('corner-gradient');
    const zoomOutText = document.getElementById('zoomout-text');
    if (map_zoomout.getLayer('productionSites-layer')) {
     map_zoomout.setLayoutProperty('productionSites-layer', 'visibility', 'visible');
    }
    const zoomInText = document.getElementById('zoomin-text');

    //switch title-logo
    document.getElementById('logo_in').style.display = 'none';

    //hide zoom controls
    document.getElementById('custom-zoom-controls').style.display = 'none';

    cornerDiv.style.display = 'none';
    legend.style.display = 'none';
    map_zoomoutDiv.style.opacity = 1;
    mapDiv.style.opacity = 0;
    zoomOutText.style.display = 'block';
    zoomInText.style.display = 'none';
    hideZoominUI(); // Hide button + restore zoomin text
    hidePopup('zoomin-text');
    hidePopup('people-text');
    mapDiv.classList.remove('active');

    // Remove bounds restriction
    map.setMaxBounds(null);
});

// Ensure zoomin UI is hidden on initial load
document.addEventListener("DOMContentLoaded", () => {
    const zoominText = document.getElementById('zoomin-text');

    // Hide zoomin-text only on mobile (<600px)
    if (window.innerWidth < 600) {
        zoominText.style.display = 'none';
    } else {
        zoominText.style.display = 'block'; // show on desktop/tablet
    }

    hideZoominUI(); // hide on load (zoom-out mode)
});

// ____________________________  END OF ANIMATION ZOOM-IN TO ZOOM-OUT ____________________________  
