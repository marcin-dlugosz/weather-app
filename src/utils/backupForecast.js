const request = require('request')
const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/345dbc83571d0e6a0cc9cb432aa8c46f/' + latitude + ',' + longitude + '?lang=pl&units=si'
    request({
        url,
        json: true
    }, (error, response) => {
        const {
            currently,
            locationError,
            daily
        } = response.body
        if (error) {
            callback('Unable to connect to the weather service!')
        } else if (locationError) {
            callback('Unable to find location!')
        } else {
            callback(undefined, `${currently.summary} It is currently                     ${Math.round(currently.temperature)} degrees out. There is a ${currently.precipProbability} % chance of rain. The lowest temperature will be: ${Math.round(daily.data[0].temperatureLow)}`)

        }
    })

}
module.exports = forecast