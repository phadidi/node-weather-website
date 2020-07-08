const request = require('postman-request')

// Geocoding
// Address -> Latitude + Longitude -> Weather

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaGFkaWRpcCIsImEiOiJja2J2ZGFrMHUwNHphMzVudGxua2Q5cGtuIn0.2_pM7v-AN94TzxmyfV00Gg'
    request({ url: url, json: true }, (error, {body}) => {
        if (error) {
            callback('Failed to connect to geocoding service!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode