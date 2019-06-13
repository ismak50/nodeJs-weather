const request = require('request');
const geoCode = (place, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(place) + '.json';
    const qs = {
        access_token: "pk.eyJ1IjoiaXNtYWsiLCJhIjoiY2p3cW43b2ZuMWJodDQ0dDUzaGpseThoZiJ9.PA55sShJt8l9By6e37je7A",
        limit: 1
    }

    request({ url, qs, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to the service !', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            const dataGeo = body.features[0];
            callback(
                undefined, 
                {
                    longitude : dataGeo.center[0],
                    latitude : dataGeo.center[1],
                    placeName : dataGeo.place_name
                }
            );
        }
    });
};

module.exports = geoCode;