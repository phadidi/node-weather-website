const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=7d1d51433af2aae568bdb28dc988c48c&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=f'
    request({ url: url, json: true }, (error, {body}) => {
        if (error) {
            callback('Failed to connect to forecasting service!', undefined)
        } else if (body.error) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                current: body.current.temperature,
                feelslike: body.current.feelslike,
                precip: body.current.precip
            })
        }
    })
}

module.exports = forecast