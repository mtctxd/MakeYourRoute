const getLocation = () => {
    if (navigator.geolocation) {
        const location_timeout = setTimeout("geolocFail()", 10000);
    
        navigator.geolocation.getCurrentPosition(function(position) {
            clearTimeout(location_timeout);
    
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
    
            // geocodeLatLng(lat, lng);
            console.log(lat, lng);
            
        }, function(error) {
            clearTimeout(location_timeout);
            // geolocFail();
            console.log('failed to get location 1');
            
        });
    } else {
        // Fallback for no geolocation
        // geolocFail();
        console.log('failed to get location 2');
    }
};

export default getLocation;