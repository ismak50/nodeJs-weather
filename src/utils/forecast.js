const request = require('request');

const forecast = (longitude, latitude, callback) => {

    const url = 'https://api.darksky.net/forecast/8caa173491bc3a4e8f96c5ef807db70f/' + longitude + ',' +  latitude;
    const qs = {
        lang: "fr",
        units: "si"
    }
    
    request({ url, qs, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to the service !', undefined)
        } else if (body.code === 400) {
            callback(body.error, undefined)
        } else {
            callback(undefined, body.currently);
        }    
    });
}

module.exports = forecast;